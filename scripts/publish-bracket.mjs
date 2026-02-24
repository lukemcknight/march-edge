import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

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

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
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

async function main() {
  loadDotEnv();

  const fileArg = process.argv[2] || 'supabase/bracket-release.template.json';
  const filePath = path.resolve(process.cwd(), fileArg);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Bracket file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  const matchups = Array.isArray(parsed) ? parsed : parsed.matchups;

  if (!Array.isArray(matchups)) {
    throw new Error('Bracket file must be a JSON array or an object with `matchups` array');
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL (or VITE_SUPABASE_URL)');
  }

  const serviceKey = required('SUPABASE_SERVICE_ROLE_KEY');
  const supabase = createClient(supabaseUrl, serviceKey);

  const { data, error } = await supabase.rpc('publish_bracket', {
    p_matchups: matchups,
    p_clear_existing: true,
    p_reset_user_brackets: true,
  });

  if (error) {
    throw new Error(`publish_bracket failed: ${error.message}`);
  }

  console.log('Bracket published:', JSON.stringify(data));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
