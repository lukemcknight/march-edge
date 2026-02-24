import {
  DataProvider,
  safeText,
  toNumber,
  winLossToRecord,
  normalizeSeed,
  normalizeTeamText,
  dedupeTeams,
} from './base.js';

const TORVIK_BASE = 'https://barttorvik.com';

// Column indices for the team_results positional array
const COL = {
  RANK: 0,
  NAME: 1,
  CONF: 2,
  RECORD: 3,
  ADJ_O: 4,
  ADJ_O_RANK: 5,
  ADJ_D: 6,
  ADJ_D_RANK: 7,
  BARTHAG: 8,
  BARTHAG_RANK: 9,
  SOS: 33,
};

// columns_now.json array indices
const QUAD = {
  Q1_WINS: 0,
  Q1_LOSSES: 1,
};

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Torvik ${res.status} for ${url}: ${body.slice(0, 240)}`);
  }

  return res.json();
}

async function safeFetchJson(url, label) {
  try {
    return await fetchJson(url);
  } catch (error) {
    const msg = error?.message || String(error);
    if (msg.includes('403') || msg.includes('Cloudflare') || msg.includes('challenge')) {
      console.warn(`[torvik] ${label} blocked (likely Cloudflare), continuing without it`);
      return null;
    }
    throw error;
  }
}

function parseRecord(recordStr) {
  const match = safeText(recordStr).match(/^(\d+)-(\d+)$/);
  if (!match) return { wins: 0, losses: 0 };
  return { wins: Number(match[1]), losses: Number(match[2]) };
}

export class TorvikovProvider extends DataProvider {
  constructor(config = {}) {
    super('torvik');
    this.season = config.season || String(new Date().getFullYear());
  }

  async fetchTeams() {
    const [resultsRaw, seedingRaw, columnsRaw] = await Promise.all([
      safeFetchJson(`${TORVIK_BASE}/${this.season}_team_results.json`, 'team_results'),
      safeFetchJson(`${TORVIK_BASE}/now_seeding.json`, 'seeding'),
      safeFetchJson(`${TORVIK_BASE}/columns_now.json`, 'columns'),
    ]);

    // Build seeding lookup: normalized team name → seed number
    // seedingRaw is { "team_name": seed_number, ... }
    const seedingMap = new Map();
    if (seedingRaw && typeof seedingRaw === 'object' && !Array.isArray(seedingRaw)) {
      for (const [name, seed] of Object.entries(seedingRaw)) {
        const key = normalizeTeamText(name);
        seedingMap.set(key, normalizeSeed(seed));
      }
    }

    // Build quad record lookup from columns_now.json
    // columnsRaw is an array of 14 objects; index 0 = Q1 wins, index 1 = Q1 losses
    // Each object maps team names to counts
    const quadMap = new Map();
    if (Array.isArray(columnsRaw) && columnsRaw.length > QUAD.Q1_LOSSES) {
      const q1wObj = columnsRaw[QUAD.Q1_WINS] || {};
      const q1lObj = columnsRaw[QUAD.Q1_LOSSES] || {};
      const allNames = new Set([...Object.keys(q1wObj), ...Object.keys(q1lObj)]);
      for (const name of allNames) {
        const key = normalizeTeamText(name);
        quadMap.set(key, {
          quad1_wins: toNumber(q1wObj[name], 0),
          quad1_losses: toNumber(q1lObj[name], 0),
        });
      }
    }

    // Parse team results — array of positional arrays
    const teams = [];
    if (Array.isArray(resultsRaw)) {
      for (const row of resultsRaw) {
        if (!Array.isArray(row) || row.length < 10) continue;

        const name = safeText(row[COL.NAME]);
        if (!name) continue;

        const key = normalizeTeamText(name);
        const adjO = toNumber(row[COL.ADJ_O], null);
        const adjD = toNumber(row[COL.ADJ_D], null);
        const netRating = adjO !== null && adjD !== null
          ? Math.round((adjO - adjD) * 10) / 10
          : null;

        const { wins, losses } = parseRecord(safeText(row[COL.RECORD]));
        const quad = quadMap.get(key) || {};
        const seed = seedingMap.get(key) ?? null;

        teams.push({
          provider_team_id: key,
          name,
          short_name: name.split(' ').slice(-1)[0].toUpperCase(),
          seed,
          conference: safeText(row[COL.CONF], 'Unknown'),
          record: winLossToRecord(wins, losses),
          wins,
          losses,
          offensive_rating: adjO,
          defensive_rating: adjD,
          net_rating: netRating,
          strength_of_schedule: toNumber(row[COL.SOS], null),
          three_point_pct: null,
          turnover_rate: null,
          turnovers_per_game: null,
          rebound_margin: null,
          ppg: null,
          opp_ppg: null,
          quad1_wins: toNumber(quad.quad1_wins ?? 0, 0),
          quad1_losses: toNumber(quad.quad1_losses ?? 0, 0),
          region: null,
          logo_url: null,
        });
      }
    }

    return dedupeTeams(teams);
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchMatchups() {
    return [];
  }
}

export function createTorvikovProviderFromEnv(env = {}) {
  return new TorvikovProvider({
    season: env.TORVIK_SEASON || String(new Date().getFullYear()),
  });
}
