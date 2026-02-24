# BracketAI Operating Runbook

This is your quick reference for what to do now (pre-bracket) and then (when the official bracket drops).

## Now (Pre-Bracket Mode)

### 1. Ensure DB setup is applied
Run these in Supabase SQL Editor (once):

1. `supabase/schema.sql`
2. `supabase/provider-columns.sql`
3. `supabase/publish-function.sql`

### 2. Set `.env`
Make sure these are present:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_GEMINI_API_KEY=...

SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...

DATA_PROVIDER=sportsdataio
SPORTSDATAIO_API_KEY=...
SPORTSDATAIO_SEASON=2025

# Pre-bracket defaults
SYNC_D1_ONLY=true
SYNC_REQUIRE_SEED=false
SYNC_TOURNAMENT_ONLY=false
SYNC_PRUNE_MATCHUPS=false
SYNC_TEAM_LIMIT=0
```

### 3. Sync teams/intel data
```bash
npm run sync:data
```

### 4. Run app
```bash
npm run dev
```

Use `/intel` for pre-bracket value (rankings, upset watch, sleepers, team explorer).

### 5. Quick verification queries (Supabase SQL)
```sql
select count(*) as teams from public.teams;
select count(*) as matchups from public.matchups;
```

## Then (Selection Sunday / Official Bracket Release)

### 1. Prepare official bracket JSON
Create a file based on:
- `supabase/bracket-release.template.json`

Required per matchup item:
- `round` (1..6)
- `game_number`
- `team_a_id`
- `team_b_id`
- `team_a_seed`
- `team_b_seed`
- optional: `round_name`, `region`, AI fields

### 2. Publish bracket atomically
```bash
npm run bracket:publish -- path/to/official-bracket.json
```

This will:
- replace tournament matchups
- reset existing user brackets/picks (current function behavior)
- mark bracket as published in `app_state`

### 3. Switch sync settings for bracket period
In `.env`, update:

```env
SYNC_REQUIRE_SEED=true
SYNC_TOURNAMENT_ONLY=true
SYNC_PRUNE_MATCHUPS=true
```

Then run:
```bash
npm run sync:data
```

### 4. Smoke test app
1. Open `/build`
2. Confirm matchup flow loads
3. Make a few picks
4. Refresh and verify picks persist in `/my-bracket`

## Optional: Scheduled Sync
A workflow exists at `.github/workflows/sync-data.yml`.
Set GitHub repo secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SPORTSDATAIO_API_KEY`
- optional endpoint overrides (`SPORTSDATAIO_*`)

## If Something Breaks

### Common fix order
1. Re-run SQL files (`schema.sql`, `provider-columns.sql`, `publish-function.sql`)
2. Check `.env` keys and typos
3. Run `npm run sync:data` and inspect error
4. Run `npm run build`

### Recovery fallback
If bracket data is unavailable, run:
- `supabase/seed.sql`

This restores sample matchup flow while you debug provider feeds.
