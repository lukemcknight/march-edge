import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';
import { normalizeTeamText, stripMascotSuffix } from './providers/base.js';

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;

  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function canonicalKey(team) {
  const stripped = stripMascotSuffix(team.name);
  const shortName = normalizeTeamText(team.short_name);
  const nameKey = normalizeTeamText(team.name);
  return stripped || (shortName.length >= 3 ? shortName : '') || nameKey || String(team.id);
}

function mapRowsBy(rows, keyFn) {
  const groups = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  return groups;
}

function printSample(title, rows, formatter, limit = 15) {
  if (!rows.length) return;
  console.log(`\n${title} (${rows.length})`);
  for (const row of rows.slice(0, limit)) {
    console.log(`- ${formatter(row)}`);
  }
}

async function main() {
  loadDotEnv();

  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    required('SUPABASE_SERVICE_ROLE_KEY')
  );

  const { data: teams, error } = await supabase
    .from('teams')
    .select('id,provider_team_id,name,short_name,seed,conference,record,wins,losses,offensive_rating,defensive_rating,net_rating');

  if (error) throw new Error(`Failed to read teams: ${error.message}`);
  const rows = teams || [];

  const byProviderId = mapRowsBy(rows, (team) => team.provider_team_id || '');
  const providerDuplicates = [...byProviderId.entries()]
    .filter(([key, list]) => key && list.length > 1)
    .map(([, list]) => list)
    .flat();

  const byCanonical = mapRowsBy(rows, canonicalKey);
  const nameDuplicates = [...byCanonical.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([, list]) => list)
    .flat();

  const badSeed = rows.filter((team) => team.seed !== null && (team.seed < 1 || team.seed > 16));
  const seededWithNoGames = rows.filter((team) => team.seed !== null && Number(team.wins) + Number(team.losses) === 0);
  const unknownConference = rows.filter((team) => !team.conference || team.conference === 'Unknown');
  const missingProviderId = rows.filter((team) => !team.provider_team_id);
  const recordMismatch = rows.filter((team) => `${team.wins}-${team.losses}` !== team.record);
  const missingMetrics = rows.filter(
    (team) => team.offensive_rating === null || team.defensive_rating === null || team.net_rating === null
  );

  console.log(`Audited ${rows.length} team rows`);
  console.log(`provider_team_id duplicates: ${providerDuplicates.length}`);
  console.log(`name-key duplicates: ${nameDuplicates.length}`);
  console.log(`bad seed values: ${badSeed.length}`);
  console.log(`seeded teams with 0-0 record: ${seededWithNoGames.length}`);
  console.log(`Unknown/missing conference: ${unknownConference.length}`);
  console.log(`missing provider_team_id: ${missingProviderId.length}`);
  console.log(`record mismatch vs wins-losses: ${recordMismatch.length}`);
  console.log(`missing core ratings (off/def/net): ${missingMetrics.length}`);

  printSample(
    'Duplicate provider_team_id rows',
    providerDuplicates,
    (team) => `id=${team.id} provider_team_id=${team.provider_team_id} name=${team.name}`
  );
  printSample(
    'Duplicate name-key rows',
    nameDuplicates,
    (team) => `id=${team.id} key=${canonicalKey(team)} name=${team.name} short=${team.short_name}`
  );
  printSample(
    'Seeded teams with 0-0 record',
    seededWithNoGames,
    (team) => `id=${team.id} seed=${team.seed} name=${team.name} record=${team.record}`
  );
  printSample(
    'Unknown conference rows',
    unknownConference,
    (team) => `id=${team.id} name=${team.name} conference=${team.conference}`
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
