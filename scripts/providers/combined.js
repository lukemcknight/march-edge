import {
  DataProvider,
  normalizeTeamText,
  stripMascotSuffix,
  dedupeTeams,
} from './base.js';
import { ESPNProvider } from './espn.js';
import { TorvikovProvider } from './torvik.js';

// Hardcoded alias map for known name mismatches between ESPN and Torvik
const TEAM_ALIASES = new Map([
  ['connecticut', 'uconn'],
  ['southern methodist', 'smu'],
  ['brigham young', 'byu'],
  ['louisiana state', 'lsu'],
  ['virginia commonwealth', 'vcu'],
  ['southern california', 'usc'],
  ['central florida', 'ucf'],
  ['texas christian', 'tcu'],
  ['mississippi', 'ole miss'],
  ['pittsburgh', 'pitt'],
  ['massachusetts', 'umass'],
  ['nevada las vegas', 'unlv'],
  ['texas el paso', 'utep'],
  ['north carolina charlotte', 'charlotte'],
  ['alabama birmingham', 'uab'],
  ['louisiana monroe', 'ul monroe'],
  ['texas san antonio', 'utsa'],
  ['texas arlington', 'ut arlington'],
  ['maryland baltimore county', 'umbc'],
  ['california baptist', 'cal baptist'],
  ['saint marys', 'saint marys'],
  ['miami florida', 'miami fl'],
]);

function buildMatchKey(name) {
  const stripped = stripMascotSuffix(name);
  return TEAM_ALIASES.get(stripped) ?? stripped;
}

function candidateKeys(team) {
  const keys = new Set();
  const nameKey = buildMatchKey(team.name);
  if (nameKey) keys.add(nameKey);

  const normalized = normalizeTeamText(team.name);
  if (normalized) keys.add(TEAM_ALIASES.get(normalized) ?? normalized);

  const shortKey = normalizeTeamText(team.short_name);
  if (shortKey) keys.add(shortKey);

  return [...keys];
}

function mergeTeam(espnTeam, torvikTeam) {
  const espnGames = (Number(espnTeam.wins) || 0) + (Number(espnTeam.losses) || 0);
  const torvikGames = (Number(torvikTeam.wins) || 0) + (Number(torvikTeam.losses) || 0);
  const conference =
    espnTeam.conference && espnTeam.conference !== 'Unknown'
      ? espnTeam.conference
      : torvikTeam.conference ?? espnTeam.conference;

  // ESPN = base, Torvik = overlay for advanced stats
  return {
    provider_team_id: espnTeam.provider_team_id,
    name: espnTeam.name,
    short_name: espnTeam.short_name,
    seed: torvikTeam.seed ?? espnTeam.seed,
    conference,
    record: espnGames > 0 ? espnTeam.record : torvikTeam.record ?? espnTeam.record,
    wins: espnGames > 0 ? espnTeam.wins : torvikTeam.wins ?? espnTeam.wins,
    losses: espnGames > 0 ? espnTeam.losses : torvikTeam.losses ?? espnTeam.losses,
    offensive_rating: torvikTeam.offensive_rating ?? espnTeam.offensive_rating,
    defensive_rating: torvikTeam.defensive_rating ?? espnTeam.defensive_rating,
    net_rating: torvikTeam.net_rating ?? espnTeam.net_rating,
    strength_of_schedule: torvikTeam.strength_of_schedule ?? espnTeam.strength_of_schedule,
    // Torvik preferred, ESPN as fallback
    three_point_pct: torvikTeam.three_point_pct ?? espnTeam.three_point_pct,
    turnover_rate: torvikTeam.turnover_rate ?? espnTeam.turnover_rate,
    turnovers_per_game: espnTeam.turnovers_per_game ?? torvikTeam.turnovers_per_game,
    rebound_margin: torvikTeam.rebound_margin ?? espnTeam.rebound_margin,
    ppg: espnTeam.ppg ?? torvikTeam.ppg,
    opp_ppg: espnTeam.opp_ppg ?? torvikTeam.opp_ppg,
    quad1_wins: torvikTeam.quad1_wins ?? espnTeam.quad1_wins ?? 0,
    quad1_losses: torvikTeam.quad1_losses ?? espnTeam.quad1_losses ?? 0,
    region: torvikTeam.region ?? espnTeam.region,
    logo_url: espnTeam.logo_url ?? torvikTeam.logo_url,
  };
}

export class CombinedProvider extends DataProvider {
  constructor(config = {}) {
    super('combined');
    this.espn = new ESPNProvider({
      season: config.espnSeason ?? config.season,
      concurrency: config.concurrency,
    });
    this.torvik = new TorvikovProvider({
      season: config.torvikSeason ?? config.season,
    });
  }

  async fetchTeams() {
    const [espnTeams, torvikTeams] = await Promise.all([
      this.espn.fetchTeams(),
      this.torvik.fetchTeams().catch((err) => {
        console.warn(`[combined] Torvik fetch failed: ${err.message}, using ESPN only`);
        return [];
      }),
    ]);

    if (!torvikTeams.length) {
      return espnTeams;
    }

    // Build Torvik lookup by multiple name variants
    const torvikByKey = new Map();
    for (const team of torvikTeams) {
      for (const key of candidateKeys(team)) {
        torvikByKey.set(key, team);
      }
    }

    let matched = 0;
    let unmatched = 0;
    const merged = [];

    for (const espnTeam of espnTeams) {
      const keys = candidateKeys(espnTeam);
      const torvikTeam = keys.map((k) => torvikByKey.get(k)).find(Boolean);

      if (torvikTeam) {
        merged.push(mergeTeam(espnTeam, torvikTeam));
        for (const key of keys) {
          torvikByKey.delete(key);
        }
        for (const key of candidateKeys(torvikTeam)) {
          torvikByKey.delete(key);
        }
        matched++;
      } else {
        merged.push(espnTeam);
        unmatched++;
      }
    }

    // Add any Torvik-only teams that didn't match ESPN
    const torvikOnly = [...torvikByKey.values()];

    console.log(
      `[combined] Matched ${matched} teams, ${unmatched} ESPN-only, ${torvikOnly.length} Torvik-only`
    );

    if (unmatched > 0 && unmatched <= 30) {
      const unmatchedNames = espnTeams
        .filter((t) => !merged.some((m) => m.provider_team_id === t.provider_team_id && m.offensive_rating !== null))
        .slice(0, 20)
        .map((t) => `  "${t.name}" → key "${buildMatchKey(t.name)}"`);
      if (unmatchedNames.length) {
        console.log(`[combined] Sample unmatched ESPN teams:\n${unmatchedNames.join('\n')}`);
      }
    }

    return dedupeTeams([...merged, ...torvikOnly]);
  }

  async fetchMatchups(teamIdLookup) {
    return this.espn.fetchMatchups(teamIdLookup);
  }
}

export function createCombinedProviderFromEnv(env = {}) {
  return new CombinedProvider({
    espnSeason: env.ESPN_SEASON,
    torvikSeason: env.TORVIK_SEASON,
    season: String(new Date().getFullYear()),
    concurrency: Number(env.ESPN_CONCURRENCY) || 10,
  });
}
