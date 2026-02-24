import {
  DataProvider,
  safeText,
  toNumber,
  winLossToRecord,
  normalizeSeed,
  cleanRegion,
  dedupeTeams,
} from './base.js';

const TEAMS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?limit=1000';
const STANDINGS_URL = 'https://site.web.api.espn.com/apis/v2/sports/basketball/mens-college-basketball/standings';
const TEAM_STATS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams';
const SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard';

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`ESPN ${res.status} for ${url}: ${body.slice(0, 240)}`);
  }

  return res.json();
}

function extractStatValue(stats, statName) {
  if (!Array.isArray(stats)) return null;
  const stat = stats.find(
    (s) => s.name === statName || s.abbreviation === statName || s.displayName === statName
  );
  return stat ? toNumber(stat.value ?? stat.displayValue, null) : null;
}

function collectStatsFromPayload(payload, bucket = []) {
  if (!payload || typeof payload !== 'object') {
    return bucket;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      collectStatsFromPayload(item, bucket);
    }
    return bucket;
  }

  if (Array.isArray(payload.stats)) {
    bucket.push(...payload.stats);
  } else if (payload.stats && typeof payload.stats === 'object') {
    bucket.push(payload.stats);
    collectStatsFromPayload(payload.stats, bucket);
  }

  if (Array.isArray(payload.categories)) {
    for (const category of payload.categories) {
      collectStatsFromPayload(category, bucket);
    }
  }

  if (Array.isArray(payload.splits)) {
    for (const split of payload.splits) {
      collectStatsFromPayload(split, bucket);
    }
  }

  if (payload.results) {
    collectStatsFromPayload(payload.results, bucket);
  }

  if (payload.team) {
    collectStatsFromPayload(payload.team, bucket);
  }

  return bucket;
}

function extractStatAny(stats, names) {
  for (const name of names) {
    const value = extractStatValue(stats, name);
    if (value !== null) {
      return value;
    }
  }
  return null;
}

function pickStandingsStat(entryStats, name) {
  if (!Array.isArray(entryStats)) return null;
  const exactType = name.toLowerCase();
  const exact = entryStats.find((s) => s?.name === name && String(s?.type || '').toLowerCase() === exactType);
  if (exact) return toNumber(exact.value ?? exact.displayValue, null);
  const fallback = entryStats.find((s) => s?.name === name);
  return fallback ? toNumber(fallback.value ?? fallback.displayValue, null) : null;
}

function parseOverallRecord(entryStats) {
  if (!Array.isArray(entryStats)) return null;
  const overall = entryStats.find((s) => s?.name === 'overall');
  const text = safeText(overall?.summary ?? overall?.displayValue, '');
  const match = text.match(/^(\d+)-(\d+)$/);
  if (!match) return null;
  return { wins: Number(match[1]), losses: Number(match[2]) };
}

function normalizePct(value) {
  if (value === null) return null;
  if (value >= 0 && value <= 1) {
    return Math.round(value * 1000) / 10;
  }
  return Math.round(value * 10) / 10;
}

function normalizePerGame(value) {
  if (value === null) return null;
  return Math.round(value * 10) / 10;
}

function estimatePossessionsFromPerGame(stats) {
  const fga = extractStatAny(stats, ['avgFieldGoalsAttempted']);
  const offReb = extractStatAny(stats, ['avgOffensiveRebounds']);
  const turnovers = extractStatAny(stats, ['avgTurnovers']);
  const fta = extractStatAny(stats, ['avgFreeThrowsAttempted']);

  if ([fga, offReb, turnovers, fta].some((v) => v === null)) {
    return null;
  }

  const poss = fga - offReb + turnovers + (0.475 * fta);
  if (!Number.isFinite(poss) || poss <= 0) return null;
  return poss;
}

async function fetchTeamStats(teamId) {
  try {
    const data = await fetchJson(`${TEAM_STATS_URL}/${teamId}/statistics`);
    return collectStatsFromPayload(data, []);
  } catch {
    return [];
  }
}

async function batchFetchTeamStats(teamIds, concurrency) {
  const results = new Map();
  const queue = [...teamIds];

  async function worker() {
    while (queue.length) {
      const id = queue.shift();
      const stats = await fetchTeamStats(id);
      results.set(String(id), stats);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

export class ESPNProvider extends DataProvider {
  constructor(config = {}) {
    super('espn');
    this.season = config.season || String(new Date().getFullYear());
    this.concurrency = config.concurrency || 10;
  }

  async fetchTeams() {
    const [teamsData, standingsData] = await Promise.all([
      fetchJson(TEAMS_URL),
      fetchJson(`${STANDINGS_URL}?season=${this.season}&type=0&level=2`).catch((err) => {
        console.warn(`[espn] Standings fetch failed: ${err.message}, continuing without`);
        return null;
      }),
    ]);

    // Parse teams list
    const rawTeams = [];
    const sports = teamsData?.sports ?? [];
    for (const sport of sports) {
      for (const league of sport.leagues ?? []) {
        for (const team of league.teams ?? []) {
          const t = team.team ?? team;
          rawTeams.push(t);
        }
      }
    }

    // Build standings lookup: espn team id → stats
    const standingsMap = new Map();
    const standingsConferenceMap = new Map();
    if (standingsData) {
      const children = Array.isArray(standingsData?.children) ? standingsData.children : [];
      const rootEntries = Array.isArray(standingsData?.standings?.entries) ? standingsData.standings.entries : [];

      // New ESPN shape: conference entries under children[] (level=2)
      for (const conf of children) {
        const confLabel = safeText(conf?.abbreviation ?? conf?.shortName ?? conf?.name, 'Unknown');
        const standings = conf?.standings?.entries ?? [];
        for (const entry of standings) {
          const teamRef = entry.team ?? {};
          const id = String(teamRef.id ?? '');
          if (!id) continue;
          const entryStats = entry.stats ?? [];
          const overall = parseOverallRecord(entryStats);
          const stats = {
            wins: overall?.wins ?? pickStandingsStat(entryStats, 'wins'),
            losses: overall?.losses ?? pickStandingsStat(entryStats, 'losses'),
            avgPointsFor: pickStandingsStat(entryStats, 'avgPointsFor'),
            avgPointsAgainst: pickStandingsStat(entryStats, 'avgPointsAgainst'),
            pointsFor: pickStandingsStat(entryStats, 'pointsFor'),
            pointsAgainst: pickStandingsStat(entryStats, 'pointsAgainst'),
          };
          standingsMap.set(id, stats);
          standingsConferenceMap.set(id, confLabel);
        }
      }

      // Fallback if API returns only root standings entries
      for (const entry of rootEntries) {
        const teamRef = entry.team ?? {};
        const id = String(teamRef.id ?? '');
        if (!id || standingsMap.has(id)) continue;
        const entryStats = entry.stats ?? [];
        const overall = parseOverallRecord(entryStats);
        const stats = {
          wins: overall?.wins ?? pickStandingsStat(entryStats, 'wins'),
          losses: overall?.losses ?? pickStandingsStat(entryStats, 'losses'),
          avgPointsFor: pickStandingsStat(entryStats, 'avgPointsFor'),
          avgPointsAgainst: pickStandingsStat(entryStats, 'avgPointsAgainst'),
          pointsFor: pickStandingsStat(entryStats, 'pointsFor'),
          pointsAgainst: pickStandingsStat(entryStats, 'pointsAgainst'),
        };
        standingsMap.set(id, stats);
      }
    }

    // Batch fetch per-team statistics
    const teamIds = rawTeams.map((t) => t.id).filter(Boolean);
    const teamStatsMap = await batchFetchTeamStats(teamIds, this.concurrency);

    const teams = rawTeams.map((t, idx) => {
      const id = String(t.id ?? idx);
      const standing = standingsMap.get(id) || {};
      const perTeamStats = teamStatsMap.get(id) || [];

      const wins = toNumber(standing.wins ?? standing.overall?.wins ?? t.record?.items?.[0]?.stats?.find?.((s) => s.name === 'wins')?.value, 0);
      const losses = toNumber(standing.losses ?? standing.overall?.losses ?? t.record?.items?.[0]?.stats?.find?.((s) => s.name === 'losses')?.value, 0);

      const ppg = toNumber(standing.avgPointsFor ?? standing.pointsFor, null);
      const oppPpg = toNumber(standing.avgPointsAgainst ?? standing.pointsAgainst, null);
      const possPerGame = estimatePossessionsFromPerGame(perTeamStats);

      // Per-team stats (3PT%, TO rate, rebounds)
      const threePctRaw = extractStatAny(perTeamStats, [
        'threePointFieldGoalPct',
        'threePointPct',
        'threePointPercentage',
        '3P%',
      ]);
      const toRateRaw = extractStatAny(perTeamStats, [
        'turnoverRatio',
        'turnoverRate',
        'turnoversPerGame',
        'TORate',
      ]);
      const turnoversPerGameRaw = extractStatAny(perTeamStats, [
        'avgTurnovers',
        'turnoversPerGame',
        'turnovers',
        'TO',
      ]);
      const rebMargin = extractStatAny(perTeamStats, [
        'reboundMargin',
        'avgRebounds',
        'totalReboundsPerGame',
      ]);
      const offRating = extractStatAny(perTeamStats, [
        'offensiveRating',
        'offensiveEfficiency',
        'adjOffensiveEfficiency',
      ]);
      const defRating = extractStatAny(perTeamStats, [
        'defensiveRating',
        'defensiveEfficiency',
        'adjDefensiveEfficiency',
      ]);
      const netRating = extractStatAny(perTeamStats, [
        'netRating',
        'efficiencyMargin',
      ]);
      const sos = extractStatAny(perTeamStats, [
        'strengthOfSchedule',
        'scheduleStrength',
      ]);
      const threePct = normalizePct(threePctRaw);
      const turnoversPerGame = normalizePerGame(turnoversPerGameRaw);
      const derivedToRate = turnoversPerGame !== null && possPerGame !== null
        ? Math.round((turnoversPerGame / possPerGame) * 1000) / 10
        : null;
      const toRate = normalizePct(toRateRaw ?? derivedToRate);
      const derivedOffRating = ppg !== null && possPerGame !== null
        ? Math.round((ppg / possPerGame) * 1000) / 10
        : null;
      const derivedDefRating = oppPpg !== null && possPerGame !== null
        ? Math.round((oppPpg / possPerGame) * 1000) / 10
        : null;
      const derivedNetRating = derivedOffRating !== null && derivedDefRating !== null
        ? Math.round((derivedOffRating - derivedDefRating) * 10) / 10
        : (ppg !== null && oppPpg !== null ? Math.round((ppg - oppPpg) * 10) / 10 : null);

      const logo = t.logos?.[0]?.href ?? t.logo ?? null;
      const conf = t.groups?.name
        ?? t.conference?.name
        ?? standingsConferenceMap.get(id)
        ?? t.standingSummary?.split?.(' in ')?.[1]
        ?? 'Unknown';

      return {
        provider_team_id: id,
        name: safeText(t.displayName ?? t.name, `Team ${idx + 1}`),
        short_name: safeText(t.abbreviation ?? t.shortDisplayName ?? '', '').toUpperCase() || safeText(t.name, '').slice(0, 4).toUpperCase(),
        seed: null,
        conference: safeText(conf, 'Unknown'),
        record: winLossToRecord(wins, losses),
        wins,
        losses,
        offensive_rating: offRating ?? derivedOffRating,
        defensive_rating: defRating ?? derivedDefRating,
        net_rating: netRating
          ?? (offRating !== null && defRating !== null ? Math.round((offRating - defRating) * 10) / 10 : null)
          ?? derivedNetRating,
        strength_of_schedule: sos,
        three_point_pct: threePct,
        turnover_rate: toRate,
        turnovers_per_game: turnoversPerGame,
        rebound_margin: rebMargin,
        ppg,
        opp_ppg: oppPpg,
        quad1_wins: 0,
        quad1_losses: 0,
        region: null,
        logo_url: logo,
      };
    });

    return dedupeTeams(teams);
  }

  async fetchMatchups(teamIdLookup = new Map()) {
    // Fetch NCAA tournament scoreboard (group 100 = NCAA tournament)
    const today = new Date();
    const year = Number(this.season);
    // Tournament typically runs mid-March to early April
    const startDate = `${year}0301`;
    const endDate = `${year}0410`;

    let allGames = [];
    // Fetch day by day across date range
    const start = new Date(year, 2, 1); // March 1
    const end = new Date(year, 3, 10);  // April 10

    const dateStrings = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      dateStrings.push(`${yyyy}${mm}${dd}`);
    }

    // Batch fetch scoreboards
    const batchSize = 10;
    for (let i = 0; i < dateStrings.length; i += batchSize) {
      const batch = dateStrings.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map((date) =>
          fetchJson(`${SCOREBOARD_URL}?groups=100&dates=${date}`).catch(() => null)
        )
      );
      for (const data of results) {
        if (!data) continue;
        const events = data.events ?? [];
        allGames.push(...events);
      }
    }

    const normalized = [];
    const roundCounts = new Map();

    for (const event of allGames) {
      const competition = event.competitions?.[0];
      if (!competition) continue;

      const competitors = competition.competitors ?? [];
      if (competitors.length < 2) continue;

      const home = competitors.find((c) => c.homeAway === 'home') ?? competitors[0];
      const away = competitors.find((c) => c.homeAway === 'away') ?? competitors[1];

      const homeId = String(home.team?.id ?? '');
      const awayId = String(away.team?.id ?? '');
      const teamAId = teamIdLookup.get(homeId) || null;
      const teamBId = teamIdLookup.get(awayId) || null;

      if (!teamAId || !teamBId) continue;

      const noteName = safeText(
        event.season?.slug ?? competition.type?.text ?? event.name ?? '',
        ''
      ).toLowerCase();

      let round = null;
      if (noteName.includes('round of 64') || noteName.includes('first round')) round = 1;
      else if (noteName.includes('round of 32') || noteName.includes('second round')) round = 2;
      else if (noteName.includes('sweet 16') || noteName.includes('sweet sixteen')) round = 3;
      else if (noteName.includes('elite 8') || noteName.includes('elite eight')) round = 4;
      else if (noteName.includes('final four') || noteName.includes('semifinal')) round = 5;
      else if (noteName.includes('championship') || noteName.includes('title')) round = 6;
      else round = 1;

      const running = (roundCounts.get(round) || 0) + 1;
      roundCounts.set(round, running);

      const roundNames = {
        1: 'Round of 64',
        2: 'Round of 32',
        3: 'Sweet 16',
        4: 'Elite Eight',
        5: 'Final Four',
        6: 'Championship',
      };

      normalized.push({
        provider_game_id: safeText(event.id ?? `${round}-${running}`),
        round,
        round_name: roundNames[round] || `Round ${round}`,
        region: null,
        game_number: running,
        team_a_id: teamAId,
        team_b_id: teamBId,
        team_a_seed: normalizeSeed(home.curatedRank?.current ?? home.seed ?? null),
        team_b_seed: normalizeSeed(away.curatedRank?.current ?? away.seed ?? null),
      });
    }

    return normalized;
  }
}

export function createESPNProviderFromEnv(env = {}) {
  return new ESPNProvider({
    season: env.ESPN_SEASON || String(new Date().getFullYear()),
    concurrency: Number(env.ESPN_CONCURRENCY) || 10,
  });
}
