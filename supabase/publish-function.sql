-- Publish official bracket matchups atomically.
-- Run this once in Supabase SQL editor.

begin;

create table if not exists public.app_state (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.publish_bracket(
  p_matchups jsonb,
  p_clear_existing boolean default true,
  p_reset_user_brackets boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if p_matchups is null or jsonb_typeof(p_matchups) <> 'array' then
    raise exception 'p_matchups must be a JSON array';
  end if;

  if p_reset_user_brackets then
    delete from public.user_picks;
    delete from public.user_brackets;
  end if;

  if p_clear_existing then
    delete from public.matchups where round between 1 and 6;
  end if;

  insert into public.matchups (
    round,
    round_name,
    region,
    game_number,
    team_a_id,
    team_b_id,
    team_a_seed,
    team_b_seed,
    ai_pick_team_id,
    ai_confidence,
    ai_win_probability,
    ai_rationale
  )
  select
    m.round,
    coalesce(m.round_name,
      case m.round
        when 1 then 'Round of 64'
        when 2 then 'Round of 32'
        when 3 then 'Sweet 16'
        when 4 then 'Elite Eight'
        when 5 then 'Final Four'
        when 6 then 'Championship'
        else concat('Round ', m.round::text)
      end
    ) as round_name,
    m.region,
    m.game_number,
    m.team_a_id,
    m.team_b_id,
    m.team_a_seed,
    m.team_b_seed,
    m.ai_pick_team_id,
    m.ai_confidence,
    m.ai_win_probability,
    m.ai_rationale
  from jsonb_to_recordset(p_matchups) as m(
    round integer,
    round_name text,
    region text,
    game_number integer,
    team_a_id bigint,
    team_b_id bigint,
    team_a_seed integer,
    team_b_seed integer,
    ai_pick_team_id bigint,
    ai_confidence text,
    ai_win_probability numeric,
    ai_rationale text
  )
  where m.round between 1 and 6
    and m.game_number is not null
    and m.team_a_id is not null
    and m.team_b_id is not null;

  get diagnostics v_count = row_count;

  insert into public.app_state (key, value, updated_at)
  values (
    'bracket',
    jsonb_build_object(
      'published', true,
      'published_at', now(),
      'games_inserted', v_count
    ),
    now()
  )
  on conflict (key)
  do update set value = excluded.value, updated_at = excluded.updated_at;

  return jsonb_build_object(
    'ok', true,
    'games_inserted', v_count,
    'reset_user_brackets', p_reset_user_brackets
  );
end;
$$;

grant execute on function public.publish_bracket(jsonb, boolean, boolean) to service_role;

commit;
