export class DataProvider {
  constructor(name) {
    this.name = name;
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchTeams() {
    throw new Error('fetchTeams() must be implemented by provider');
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchMatchups() {
    throw new Error('fetchMatchups() must be implemented by provider');
  }
}

export function toNumber(value, fallback = null) {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function safeText(value, fallback = '') {
  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value).trim() || fallback;
}

export function winLossToRecord(wins, losses, fallback = '0-0') {
  const w = toNumber(wins, null);
  const l = toNumber(losses, null);

  if (w === null || l === null) {
    return fallback;
  }

  return `${w}-${l}`;
}

export function cleanRegion(name) {
  const lower = safeText(name).toLowerCase();
  if (lower.includes('east')) return 'East';
  if (lower.includes('west')) return 'West';
  if (lower.includes('south')) return 'South';
  if (lower.includes('midwest')) return 'Midwest';
  return null;
}

export function normalizeSeed(value) {
  const parsed = toNumber(value, null);
  if (parsed === null) {
    return null;
  }

  return parsed >= 1 && parsed <= 16 ? parsed : null;
}

export function normalizeTeamText(value) {
  return safeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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
  ['ole miss', 'ole miss'],
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
  ['miami florida', 'miami fl'],
  ['miami fl', 'miami fl'],
  ['miami ohio', 'miami oh'],
  ['miami oh', 'miami oh'],
  ['iowa st', 'iowa state'],
  ['nc state', 'n c state'],
  ['st johns', 'st john s'],
]);

function aliasTeamName(value) {
  const normalized = normalizeTeamText(value);
  return TEAM_ALIASES.get(normalized) ?? normalized;
}

export function stripMascotSuffix(value) {
  const mascots = [
    'wildcats',
    'bulldogs',
    'tigers',
    'eagles',
    'bears',
    'hawks',
    'lions',
    'panthers',
    'cougars',
    'aggies',
    'broncos',
    'spartans',
    'raiders',
    'wolves',
    'knights',
    'owls',
    'mustangs',
    'terriers',
    'cardinals',
    'trojans',
    'huskies',
    'pirates',
    'colonials',
    'gaels',
    'rams',
    'bobcats',
    'warriors',
    'titans',
    'beavers',
    'boilermakers',
    'volunteers',
    'blue devils',
    'fighting irish',
    'crimson tide',
    'rebels',
    'utes',
    'miners',
    'roadrunners',
    'horned frogs',
    'blazers',
    'gaels',
    'phoenix',
    'quakers',
    'midshipmen',
    'black knights',
  ];

  const normalized = normalizeTeamText(value);
  for (const mascot of mascots) {
    const suffix = ` ${mascot}`;
    if (normalized.endsWith(suffix)) {
      return normalized.slice(0, -suffix.length).trim();
    }
  }

  return normalized;
}

function shouldUseShortKey(shortName) {
  if (!shortName) return false;
  if (shortName.length <= 2) return false;
  if (/^\d+$/.test(shortName)) return false;
  const blocked = new Set(['state', 'tech', 'college', 'university', 'team']);
  return !blocked.has(shortName);
}

function teamDedupeKeys(team) {
  const keys = new Set();
  const fullName = aliasTeamName(team.name);
  const strippedName = aliasTeamName(stripMascotSuffix(team.name));
  const shortName = aliasTeamName(team.short_name);

  if (fullName) keys.add(`n:${fullName}`);
  if (strippedName) keys.add(`s:${strippedName}`);
  if (shouldUseShortKey(shortName)) keys.add(`k:${shortName}`);

  return [...keys];
}

export function teamScore(team) {
  const wins = Number(team.wins) || 0;
  const losses = Number(team.losses) || 0;
  const games = wins + losses;
  const winPct = games > 0 ? wins / games : 0;
  const metricCount = [
    team.offensive_rating,
    team.defensive_rating,
    team.net_rating,
    team.strength_of_schedule,
    team.three_point_pct,
    team.turnover_rate,
    team.turnovers_per_game,
    team.rebound_margin,
    team.ppg,
    team.opp_ppg,
  ].filter((value) => value !== null && value !== undefined).length;

  return winPct * 100 + metricCount + (team.logo_url ? 2 : 0);
}

export function dedupeTeams(teams) {
  const byKey = new Map();

  for (const team of teams) {
    const keys = teamDedupeKeys(team);
    if (!keys.length && team.provider_team_id) {
      keys.push(`p:${team.provider_team_id}`);
    }
    if (!keys.length) {
      keys.push(`f:${normalizeTeamText(team.name) || 'unknown'}`);
    }

    const current = keys.map((key) => byKey.get(key)).find(Boolean);
    const winner = !current || teamScore(team) > teamScore(current) ? team : current;

    for (const key of keys) {
      byKey.set(key, winner);
    }
  }

  const unique = [];
  const seen = new Set();
  for (const team of byKey.values()) {
    const rowKey = `${safeText(team.provider_team_id, '')}:${normalizeTeamText(team.name)}:${normalizeTeamText(team.short_name)}`;
    if (seen.has(rowKey)) continue;
    seen.add(rowKey);
    unique.push(team);
  }

  return unique;
}
