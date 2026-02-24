-- Add provider identity columns for deterministic data syncs
-- Run this once on existing databases created before provider ids were added.

begin;

alter table public.teams
  add column if not exists provider_team_id text;
alter table public.teams
  add column if not exists turnovers_per_game numeric(4,1);

alter table public.matchups
  add column if not exists provider_game_id text;

create unique index if not exists ux_teams_provider_team_id
  on public.teams(provider_team_id)
  where provider_team_id is not null;

create unique index if not exists ux_matchups_provider_game_id
  on public.matchups(provider_game_id)
  where provider_game_id is not null;

commit;
