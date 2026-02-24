import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { createSportsDataIOProviderFromEnv } from './providers/sportsdataio.js';
import { createESPNProviderFromEnv } from './providers/espn.js';
import { createTorvikovProviderFromEnv } from './providers/torvik.js';
import { createCombinedProviderFromEnv } from './providers/combined.js';
import { dedupeTeams, normalizeSeed, safeText, toNumber, winLossToRecord } from './providers/base.js';

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function pickProvider() {
  const providerName = (process.env.DATA_PROVIDER || 'espn').toLowerCase();

  if (providerName === 'espn') {
    return createESPNProviderFromEnv(process.env);
  }

  if (providerName === 'torvik') {
    return createTorvikovProviderFromEnv(process.env);
  }

  if (providerName === 'combined') {
    return createCombinedProviderFromEnv(process.env);
  }

  if (providerName === 'sportsdataio') {
    const apiKey = required('SPORTSDATAIO_API_KEY');
    return createSportsDataIOProviderFromEnv({
      ...process.env,
      SPORTSDATAIO_API_KEY: apiKey,
    });
  }

  throw new Error(`Unsupported DATA_PROVIDER: ${providerName}. Valid options: espn, torvik, combined, sportsdataio`);
}

function envBool(name, defaultValue) {
  const raw = process.env[name];
  if (!raw) {
    return defaultValue;
  }
  return String(raw).toLowerCase() !== 'false';
}

function envInt(name, defaultValue) {
  const raw = Number(process.env[name]);
  return Number.isFinite(raw) ? raw : defaultValue;
}

function applyTeamLimit(teams, limit) {
  if (!Number.isFinite(limit) || limit <= 0) {
    return teams;
  }

  return teams.slice(0, limit);
}

const CONFERENCE_ALIASES = new Map([
  ['acc', 'ACC'],
  ['a10', 'A10'],
  ['aac', 'Amer'],
  ['amer', 'Amer'],
  ['asun', 'ASun'],
  ['be', 'BE'],
  ['b10', 'B10'],
  ['b12', 'B12'],
  ['bsky', 'BSky'],
  ['bw', 'BW'],
  ['caa', 'CAA'],
  ['cusa', 'CUSA'],
  ['mac', 'MAC'],
  ['maac', 'MAAC'],
  ['mvc', 'MVC'],
  ['mwc', 'MWC'],
  ['patriot', 'Patriot'],
  ['sec', 'SEC'],
  ['sc', 'SoCon'],
  ['slnd', 'Slnd'],
  ['sum', 'Sum'],
  ['wac', 'WAC'],
  ['wcc', 'WCC'],
]);

function normalizeConference(value) {
  const cleaned = safeText(value, 'Unknown');
  const key = cleaned.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!key || key === 'unknown') {
    return 'Unknown';
  }
  return CONFERENCE_ALIASES.get(key) || cleaned;
}

function deriveShortName(team) {
  const raw = safeText(team.short_name);
  if (raw.length >= 3 && raw !== 'ST.') {
    return raw.toUpperCase();
  }

  const tokens = safeText(team.name)
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) {
    return raw.toUpperCase() || 'TEAM';
  }

  const tail = tokens[tokens.length - 1].toLowerCase();
  if (['st', 'state', 'tech', 'college', 'university'].includes(tail) && tokens.length > 1) {
    return `${tokens[tokens.length - 2]} ${tokens[tokens.length - 1]}`.toUpperCase();
  }

  return tokens[tokens.length - 1].toUpperCase();
}

function cleanTeamRow(team) {
  const wins = Math.max(0, toNumber(team.wins, 0));
  const losses = Math.max(0, toNumber(team.losses, 0));
  const normalizedRecord = wins + losses > 0
    ? winLossToRecord(wins, losses)
    : safeText(team.record, '0-0');
  const quad1Wins = Math.max(0, toNumber(team.quad1_wins, 0));
  const quad1Losses = Math.max(0, toNumber(team.quad1_losses, 0));

  return {
    ...team,
    provider_team_id: safeText(team.provider_team_id, null),
    short_name: deriveShortName(team),
    seed: normalizeSeed(team.seed),
    conference: normalizeConference(team.conference),
    record: normalizedRecord,
    wins,
    losses,
    offensive_rating: toNumber(team.offensive_rating, null),
    defensive_rating: toNumber(team.defensive_rating, null),
    net_rating: toNumber(team.net_rating, null),
    strength_of_schedule: toNumber(team.strength_of_schedule, null),
    three_point_pct: toNumber(team.three_point_pct, null),
    turnover_rate: toNumber(team.turnover_rate, null),
    turnovers_per_game: toNumber(team.turnovers_per_game, null),
    rebound_margin: toNumber(team.rebound_margin, null),
    ppg: toNumber(team.ppg, null),
    opp_ppg: toNumber(team.opp_ppg, null),
    quad1_wins: quad1Wins,
    quad1_losses: quad1Losses,
    region: safeText(team.region, null),
    logo_url: safeText(team.logo_url, null),
  };
}

function cleanAndAuditTeams(teams) {
  const cleaned = teams.map(cleanTeamRow);
  const deduped = dedupeTeams(cleaned);

  const unknownConference = deduped.filter((team) => team.conference === 'Unknown').length;
  const missingProviderId = deduped.filter((team) => !team.provider_team_id).length;
  const seededWithNoGames = deduped.filter(
    (team) => team.seed !== null && Number(team.wins) + Number(team.losses) === 0
  ).length;

  const droppedDuplicates = cleaned.length - deduped.length;
  if (droppedDuplicates > 0) {
    console.warn(`Removed ${droppedDuplicates} duplicate team rows during cleanup`);
  }
  if (unknownConference > 0) {
    console.warn(`Found ${unknownConference} teams with Unknown conference after cleanup`);
  }
  if (missingProviderId > 0) {
    console.warn(`Found ${missingProviderId} teams missing provider_team_id`);
  }
  if (seededWithNoGames > 0) {
    console.warn(`Found ${seededWithNoGames} seeded teams with 0-0 record`);
  }

  return deduped;
}

function chooseTeamsForSync(teams) {
  const providerName = (process.env.DATA_PROVIDER || 'espn').toLowerCase();
  const tournamentOnlyDefault = providerName === 'espn' ? false : true;
  const tournamentOnly = envBool('SYNC_TOURNAMENT_ONLY', tournamentOnlyDefault);
  const requireSeed = envBool('SYNC_REQUIRE_SEED', tournamentOnly);
  const limit = envInt('SYNC_TEAM_LIMIT', tournamentOnly ? 68 : 0);

  const sorted = [...teams].sort((a, b) => {
    const aScore = (Number(a.net_rating) || 0) + (Number(a.wins) || 0) * 0.2;
    const bScore = (Number(b.net_rating) || 0) + (Number(b.wins) || 0) * 0.2;
    return bScore - aScore;
  });

  if (!tournamentOnly) {
    return applyTeamLimit(sorted, limit);
  }

  const seeded = teams.filter((team) => Number.isInteger(team.seed) && team.seed >= 1 && team.seed <= 16);
  if (seeded.length) {
    return applyTeamLimit(seeded, limit);
  }

  if (requireSeed) {
    throw new Error('SYNC_REQUIRE_SEED=true but provider returned zero seeded teams.');
  }

  return applyTeamLimit(sorted, limit);
}

async function detectProviderColumns(supabase) {
  const { error: teamError } = await supabase.from('teams').select('provider_team_id').limit(1);
  const { error: matchupError } = await supabase.from('matchups').select('provider_game_id').limit(1);
  const { error: turnoversPerGameError } = await supabase.from('teams').select('turnovers_per_game').limit(1);

  return {
    hasProviderTeamId: !teamError,
    hasProviderGameId: !matchupError,
    hasTurnoversPerGame: !turnoversPerGameError,
  };
}

async function selectAllRows(supabase, table, columns, options = {}) {
  const pageSize = options.pageSize || 1000;
  const all = [];
  let from = 0;

  while (true) {
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .order('id', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to read existing ${table}: ${error.message}`);
    }

    const rows = data || [];
    if (!rows.length) {
      break;
    }

    all.push(...rows);
    if (rows.length < pageSize) {
      break;
    }

    from += pageSize;
  }

  return all;
}

async function deleteByIdsInBatches(supabase, table, column, ids, batchSize = 100) {
  if (!ids.length) {
    return;
  }

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const { error } = await supabase.from(table).delete().in(column, batch);
    if (error) {
      throw new Error(`Failed to delete from ${table}: ${error.message}`);
    }
  }
}

async function deleteMatchupsReferencingTeams(supabase, teamIds) {
  if (!teamIds.length) {
    return 0;
  }

  const inList = `(${teamIds.join(',')})`;
  const { data, error } = await supabase
    .from('matchups')
    .select('id')
    .or(
      `team_a_id.in.${inList},team_b_id.in.${inList},ai_pick_team_id.in.${inList},winner_id.in.${inList}`
    );

  if (error) {
    throw new Error(`Failed to find matchups referencing stale teams: ${error.message}`);
  }

  const matchupIds = (data || []).map((row) => row.id);
  if (!matchupIds.length) {
    return 0;
  }

  await deleteByIdsInBatches(supabase, 'user_picks', 'matchup_id', matchupIds);
  await deleteByIdsInBatches(supabase, 'matchups', 'id', matchupIds);
  return matchupIds.length;
}

async function upsertTeams(supabase, teams, options = {}) {
  const { hasProviderTeamId = false, hasTurnoversPerGame = false } = options;
  const selectColumns = hasProviderTeamId ? 'id,name,short_name,provider_team_id' : 'id,name,short_name';
  const existing = await selectAllRows(supabase, 'teams', selectColumns);

  const existingByName = new Map();
  const existingByProviderId = new Map();
  for (const row of existing || []) {
    existingByName.set(String(row.name).toLowerCase(), row.id);
    existingByName.set(String(row.short_name).toLowerCase(), row.id);
    if (hasProviderTeamId && row.provider_team_id) {
      existingByProviderId.set(String(row.provider_team_id), row.id);
    }
  }

  const mapped = teams.map((team) => {
    const existingId =
      (hasProviderTeamId ? existingByProviderId.get(String(team.provider_team_id)) : null) ||
      existingByName.get(String(team.name).toLowerCase()) ||
      existingByName.get(String(team.short_name).toLowerCase()) ||
      null;

    return {
      existingId,
      name: team.name,
      short_name: team.short_name,
      seed: team.seed,
      conference: team.conference,
      record: team.record,
      wins: team.wins,
      losses: team.losses,
      offensive_rating: team.offensive_rating,
      defensive_rating: team.defensive_rating,
      net_rating: team.net_rating,
      strength_of_schedule: team.strength_of_schedule,
      three_point_pct: team.three_point_pct,
      turnover_rate: team.turnover_rate,
      ...(hasTurnoversPerGame ? { turnovers_per_game: team.turnovers_per_game } : {}),
      rebound_margin: team.rebound_margin,
      ppg: team.ppg,
      opp_ppg: team.opp_ppg,
      quad1_wins: team.quad1_wins,
      quad1_losses: team.quad1_losses,
      region: team.region,
      logo_url: team.logo_url,
      ...(hasProviderTeamId ? { provider_team_id: team.provider_team_id } : {}),
    };
  });

  const updates = mapped.filter((row) => row.existingId);
  const inserts = mapped.filter((row) => !row.existingId);

  for (const row of updates) {
    const { existingId, ...payload } = row;
    const { error } = await supabase.from('teams').update(payload).eq('id', existingId);
    if (error) {
      throw new Error(`Failed to update team ${payload.name}: ${error.message}`);
    }
  }

  if (inserts.length) {
    const insertPayload = inserts.map(({ existingId, ...payload }) => payload);
    const { error } = await supabase.from('teams').insert(insertPayload);
    if (error) {
      throw new Error(`Failed to insert teams: ${error.message}`);
    }
  }
}

async function fetchTeamLookup(supabase) {
  const { data, error } = await supabase.from('teams').select('id,name,short_name');
  if (error) {
    throw new Error(`Failed to read teams for lookup: ${error.message}`);
  }

  const lookup = new Map();
  for (const row of data || []) {
    lookup.set(String(row.name).toLowerCase(), row.id);
    lookup.set(String(row.short_name).toLowerCase(), row.id);
  }

  return lookup;
}

async function upsertMatchups(supabase, matchups, options = {}) {
  const { hasProviderGameId = false } = options;
  if (!matchups.length) {
    return;
  }

  const selectColumns = hasProviderGameId ? 'id,round,game_number,provider_game_id' : 'id,round,game_number';
  const existing = await selectAllRows(supabase, 'matchups', selectColumns);

  const existingByRoundGame = new Map();
  const existingByProviderId = new Map();
  for (const row of existing || []) {
    existingByRoundGame.set(`${row.round}:${row.game_number}`, row.id);
    if (hasProviderGameId && row.provider_game_id) {
      existingByProviderId.set(String(row.provider_game_id), row.id);
    }
  }

  const mapped = matchups.map((m) => {
    const providerGameId = hasProviderGameId && m.provider_game_id ? String(m.provider_game_id) : null;
    const existingId =
      (providerGameId ? existingByProviderId.get(providerGameId) : null) ||
      existingByRoundGame.get(`${m.round}:${m.game_number}`) ||
      null;
    return {
      existingId,
      round: m.round,
      round_name: m.round_name,
      region: m.region,
      game_number: m.game_number,
      team_a_id: m.team_a_id,
      team_b_id: m.team_b_id,
      team_a_seed: m.team_a_seed,
      team_b_seed: m.team_b_seed,
      ...(hasProviderGameId ? { provider_game_id: providerGameId } : {}),
    };
  });

  const dedupedMap = new Map();
  let duplicateCount = 0;
  for (const row of mapped) {
    const key =
      hasProviderGameId && row.provider_game_id
        ? `provider:${row.provider_game_id}`
        : `round-game:${row.round}:${row.game_number}`;
    if (dedupedMap.has(key)) {
      duplicateCount += 1;
    }
    dedupedMap.set(key, row);
  }

  if (duplicateCount > 0) {
    console.warn(`Deduplicated ${duplicateCount} duplicate matchup rows from provider payload`);
  }

  const deduped = [...dedupedMap.values()];
  const updates = deduped.filter((row) => row.existingId);
  const inserts = deduped.filter((row) => !row.existingId);

  for (const row of updates) {
    const { existingId, ...payload } = row;
    const { error } = await supabase.from('matchups').update(payload).eq('id', existingId);
    if (error) {
      throw new Error(`Failed to update matchup round ${payload.round} game ${payload.game_number}: ${error.message}`);
    }
  }

  if (inserts.length) {
    const insertPayload = inserts.map(({ existingId, ...payload }) => payload);
    const { error } = await supabase.from('matchups').insert(insertPayload);
    if (error) {
      throw new Error(`Failed to insert matchups: ${error.message}`);
    }
  }
}

async function pruneMatchups(supabase, keptTeamIds) {
  if (!keptTeamIds.length) {
    return;
  }

  const inList = `(${keptTeamIds.join(',')})`;

  const deletes = [
    supabase.from('matchups').delete().lt('round', 1),
    supabase.from('matchups').delete().gt('round', 6),
    supabase.from('matchups').delete().is('team_a_seed', null),
    supabase.from('matchups').delete().is('team_b_seed', null),
    supabase.from('matchups').delete().not('team_a_id', 'in', inList),
    supabase.from('matchups').delete().not('team_b_id', 'in', inList),
  ];

  for (const op of deletes) {
    const { error } = await op;
    if (error) {
      throw new Error(`Failed to prune matchups: ${error.message}`);
    }
  }
}

function mapTeamsToIds(teams, lookup) {
  const idLookup = new Map();
  for (const team of teams) {
    const id = lookup.get(String(team.name).toLowerCase()) || lookup.get(String(team.short_name).toLowerCase());
    if (id) {
      idLookup.set(String(team.provider_team_id), id);
    }
  }
  return idLookup;
}

async function main() {
  loadDotEnv();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('Missing required env var: SUPABASE_URL (or VITE_SUPABASE_URL)');
  }

  const supabaseServiceKey = required('SUPABASE_SERVICE_ROLE_KEY');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { hasProviderTeamId, hasProviderGameId, hasTurnoversPerGame } = await detectProviderColumns(supabase);

  const provider = pickProvider();
  const prune = envBool('SYNC_PRUNE_MATCHUPS', true);

  console.log(`Using provider: ${provider.name}`);
  const allTeams = await provider.fetchTeams();
  if (!allTeams.length) {
    throw new Error('Provider returned zero teams. Check provider endpoints or season values.');
  }
  const teams = cleanAndAuditTeams(chooseTeamsForSync(allTeams));
  console.log(`Filtered teams to ${teams.length} tournament candidates`);

  if (!hasTurnoversPerGame) {
    console.warn(
      "teams.turnovers_per_game column not found; continuing without TO/G writes. Run supabase/provider-columns.sql to add it."
    );
  }

  await upsertTeams(supabase, teams, { hasProviderTeamId, hasTurnoversPerGame });
  console.log(`Upserted ${teams.length} teams`);

  const lookup = await fetchTeamLookup(supabase);
  const idLookup = mapTeamsToIds(teams, lookup);
  const keptTeamIds = [...idLookup.values()];

  // Delete stale teams not in the current sync set
  if (keptTeamIds.length) {
    const allDbTeams = await selectAllRows(supabase, 'teams', 'id');
    const keptSet = new Set(keptTeamIds);
    const staleIds = allDbTeams.map((r) => r.id).filter((id) => !keptSet.has(id));
    if (staleIds.length) {
      let removedMatchups = 0;
      let removedTeams = 0;
      for (let i = 0; i < staleIds.length; i += 100) {
        const batch = staleIds.slice(i, i + 100);
        removedMatchups += await deleteMatchupsReferencingTeams(supabase, batch);
        await deleteByIdsInBatches(supabase, 'user_picks', 'picked_team_id', batch);
        const { error } = await supabase.from('teams').delete().in('id', batch);
        if (error) {
          throw new Error(`Failed to delete stale teams batch: ${error.message}`);
        }
        removedTeams += batch.length;
      }
      if (removedMatchups) {
        console.log(`Deleted ${removedMatchups} stale matchups linked to removed teams`);
      }
      console.log(`Deleted ${removedTeams} stale teams not in current sync`);
    }
  }

  const matchups = await provider.fetchMatchups(idLookup);
  await upsertMatchups(supabase, matchups, { hasProviderGameId });
  console.log(`Upserted ${matchups.length} matchups`);

  if (prune) {
    await pruneMatchups(supabase, keptTeamIds);
    console.log('Pruned non-tournament matchups');
  }

  console.log('Sync complete.');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
