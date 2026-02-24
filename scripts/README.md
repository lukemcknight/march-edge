# Data Sync Adapters

This project uses a provider adapter pattern for importing real NCAA data into Supabase.

## Supported provider

- `espn` (default)
- `torvik`
- `combined` (ESPN base + Torvik metric overlay)
- `sportsdataio`

## Run sync

```bash
npm run sync:data
```

## Audit data quality

```bash
npm run audit:data
```

This checks `teams` for:
- duplicate `provider_team_id`
- duplicate canonical name keys
- seeded teams with `0-0` records
- Unknown conferences
- missing provider IDs
- record mismatches (`record` vs `wins-losses`)
- missing core ratings

Before first provider-based sync on existing DBs, run:

```sql
-- in Supabase SQL editor
-- file: supabase/provider-columns.sql
```

## Required env vars

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATA_PROVIDER` (`espn` by default)

## ESPN vars (recommended defaults)

- `ESPN_SEASON` (default: current year)
- `ESPN_CONCURRENCY` (default: `10`)
- `SYNC_TOURNAMENT_ONLY` (default: `false` when provider is ESPN)
- `SYNC_REQUIRE_SEED` (default follows `SYNC_TOURNAMENT_ONLY`)
- `SYNC_TEAM_LIMIT` (default: `0` when not tournament-only)

## Optional SportsDataIO vars

- `SPORTSDATAIO_BASE_URL` (default: `https://api.sportsdata.io/v3/cbb/stats`)
- `SPORTSDATAIO_SEASON` (default: `2025`)
- `SPORTSDATAIO_TEAMS_PATH` (default: `/json/teams,/json/Teams`)
- `SPORTSDATAIO_STANDINGS_PATH` (default: `/json/Standings/{season},/json/TeamSeasonStats/{season},/json/StandingsBasic/{season}`)
- `SPORTSDATAIO_GAMES_PATH` (default: `/json/Games/{season},/json/GamesBySeason/{season}`)
- `SPORTSDATAIO_API_KEY` (required when `DATA_PROVIDER=sportsdataio`)
- `SYNC_TOURNAMENT_ONLY` (default: `true` when not ESPN)
- `SYNC_D1_ONLY` (default: `true`)
- `SYNC_REQUIRE_SEED` (default follows `SYNC_TOURNAMENT_ONLY`)
- `SYNC_TEAM_LIMIT` (default: `68`)
- `SYNC_PRUNE_MATCHUPS` (default: `true`)

## Notes

- The sync maps provider data into your existing `teams` and `matchups` tables.
- Teams are matched by `name`/`short_name` and upserted by primary key.
- Matchups are matched by `(round, game_number)` and upserted by primary key.
- If provider ID columns exist, sync uses `provider_team_id` and `provider_game_id` for deterministic updates.
- If provider endpoints differ by plan, override `*_PATH` variables.

## Scheduled sync

A GitHub Actions workflow is included at `.github/workflows/sync-data.yml`.
Add repo secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SPORTSDATAIO_API_KEY`
- Optional endpoint/season overrides:
  - `SPORTSDATAIO_BASE_URL`
  - `SPORTSDATAIO_SEASON`
  - `SPORTSDATAIO_TEAMS_PATH`
  - `SPORTSDATAIO_STANDINGS_PATH`
  - `SPORTSDATAIO_GAMES_PATH`

## Publish official bracket

1. Run `supabase/publish-function.sql` once in Supabase SQL Editor.
2. Create/update your release file (example: `supabase/bracket-release.template.json`).
3. Publish:

```bash
npm run bracket:publish -- supabase/bracket-release.template.json
```
