import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createESPNProviderFromEnv } from './providers/espn.js';

const TORVIK_API_URL = 'https://api.cbbstat.com/ratings/factors/splits';

function parseArgs(argv) {
  const opts = {
    source: 'espn',
    season: String(new Date().getFullYear()),
    out: null,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--source' && argv[i + 1]) {
      opts.source = String(argv[++i]).toLowerCase();
      continue;
    }
    if (arg === '--season' && argv[i + 1]) {
      opts.season = String(argv[++i]);
      continue;
    }
    if (arg === '--out' && argv[i + 1]) {
      opts.out = String(argv[++i]);
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  if (!['espn', 'torvik'].includes(opts.source)) {
    throw new Error(`Unsupported --source "${opts.source}". Use "espn" or "torvik".`);
  }

  if (!opts.out) {
    opts.out = path.resolve(process.cwd(), `dist/team-3pt-${opts.source}-${opts.season}.csv`);
  } else {
    opts.out = path.resolve(process.cwd(), opts.out);
  }

  return opts;
}

function printHelp() {
  console.log(
    [
      'Usage:',
      '  node scripts/export-team-3pt.mjs --source espn --season 2026',
      '  node scripts/export-team-3pt.mjs --source torvik --season 2026 --out dist/torvik-3pt.csv',
      '',
      'Options:',
      '  --source   espn | torvik (default: espn)',
      '  --season   season/year (default: current year)',
      '  --out      output CSV path (default: dist/team-3pt-<source>-<season>.csv)',
    ].join('\n')
  );
}

function toPct(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  if (n >= 0 && n <= 1) return Math.round(n * 1000) / 10;
  return Math.round(n * 10) / 10;
}

function escapeCsv(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (!text.includes('"') && !text.includes(',') && !text.includes('\n')) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function writeCsv(rows, outPath) {
  const lines = ['team,conference,three_point_pct,source,season'];
  for (const row of rows) {
    lines.push(
      [
        row.team,
        row.conference,
        row.three_point_pct,
        row.source,
        row.season,
      ].map(escapeCsv).join(',')
    );
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');
}

async function fetchEspnRows(season) {
  const provider = createESPNProviderFromEnv({
    ESPN_SEASON: season,
    ESPN_CONCURRENCY: process.env.ESPN_CONCURRENCY || '12',
  });
  const teams = await provider.fetchTeams();

  return teams
    .map((team) => ({
      team: team.name,
      conference: team.conference || '',
      three_point_pct: toPct(team.three_point_pct),
      source: 'espn',
      season,
    }))
    .filter((row) => row.team && row.three_point_pct !== null)
    .sort((a, b) => b.three_point_pct - a.three_point_pct || a.team.localeCompare(b.team));
}

function normalizeTorvikRows(payload, season) {
  const rows = Array.isArray(payload) ? payload : (Array.isArray(payload?.results) ? payload.results : []);
  return rows
    .map((row) => ({
      team: row.team_name || row.team || '',
      conference: row.conference || row.conf || '',
      three_point_pct: toPct(row.t_three_point_pct ?? row.three_point_pct),
      source: 'torvik',
      season,
    }))
    .filter((row) => row.team && row.three_point_pct !== null)
    .sort((a, b) => b.three_point_pct - a.three_point_pct || a.team.localeCompare(b.team));
}

async function fetchTorvikRows(season) {
  const url = new URL(TORVIK_API_URL);
  url.searchParams.set('year', season);
  url.searchParams.set('venue', 'all');
  url.searchParams.set('type', 'all');
  url.searchParams.set('quad', '4');
  url.searchParams.set('top', '0');

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Torvik API ${res.status}: ${body.slice(0, 240)}`);
  }

  const payload = await res.json();
  return normalizeTorvikRows(payload, season);
}

async function main() {
  const opts = parseArgs(process.argv);
  const rows = opts.source === 'torvik'
    ? await fetchTorvikRows(opts.season)
    : await fetchEspnRows(opts.season);

  if (!rows.length) {
    throw new Error(`No rows found for source=${opts.source} season=${opts.season}`);
  }

  writeCsv(rows, opts.out);
  console.log(`Wrote ${rows.length} rows to ${opts.out}`);
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});
