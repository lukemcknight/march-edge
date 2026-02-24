import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BracketBuilder from './pages/BracketBuilder';
import Home from './pages/Home';
import MyBracket from './pages/MyBracket';
import Team from './pages/Team';
import { bracketStorageKey, supabase } from './lib/supabase';
import teamsSeed from './data/teams-seed.json';
import matchupsSeed from './data/matchups-seed.json';
import useBracketStore from './lib/store';
import Insights from './pages/Insights';

function normalizeTeamToken(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripCommonMascotSuffix(name) {
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
  ];

  const cleaned = normalizeTeamToken(name);
  for (const mascot of mascots) {
    const suffix = ` ${mascot}`;
    if (cleaned.endsWith(suffix)) {
      return cleaned.slice(0, -suffix.length).trim();
    }
  }

  return cleaned;
}

function teamQualityScore(team) {
  const hasValue = (value) => value !== null && value !== undefined && value !== '';
  const statValue = (keys) => {
    for (const key of keys) {
      if (hasValue(team[key])) return team[key];
    }
    return null;
  };

  const wins = Number(team.wins) || 0;
  const losses = Number(team.losses) || 0;
  const games = wins + losses;
  const winPct = games > 0 ? wins / games : 0;
  const criticalMetrics = [
    statValue(['three_point_pct', 'threePointPct', 'three_pt_pct']),
    statValue(['turnover_rate', 'turnoverRate', 'to_rate']),
  ].filter(hasValue).length;
  const supportingMetrics = [
    statValue(['offensive_rating', 'offensiveRating']),
    statValue(['defensive_rating', 'defensiveRating']),
    statValue(['net_rating', 'netRating']),
    statValue(['strength_of_schedule', 'strengthOfSchedule']),
    statValue(['rebound_margin', 'reboundMargin']),
    statValue(['ppg']),
    statValue(['opp_ppg', 'oppPpg']),
  ].filter(hasValue).length;

  return (
    winPct * 100 +
    games * 0.15 +
    criticalMetrics * 20 +
    supportingMetrics * 3 +
    (team.logo_url ? 4 : 0) +
    (normalizeTeamToken(team.name).split(' ').length > 1 ? 1 : 0)
  );
}

function dedupeTeams(teams) {
  const byKey = new Map();

  for (const team of teams || []) {
    const shortName = normalizeTeamToken(team.short_name);
    const schoolName = stripCommonMascotSuffix(team.name);
    const fullName = normalizeTeamToken(team.name);

    // Use multiple keys to catch duplicates with different name formats
    const keys = [shortName, schoolName, fullName].filter(Boolean);
    if (!keys.length) keys.push(String(team.id));

    // Find if any key already maps to an existing team
    let existingKey = null;
    for (const k of keys) {
      if (byKey.has(k)) {
        existingKey = k;
        break;
      }
    }

    if (existingKey) {
      const current = byKey.get(existingKey);
      if (teamQualityScore(team) > teamQualityScore(current)) {
        // Replace the old entry with the better one under all its keys
        for (const k of keys) {
          byKey.set(k, team);
        }
      }
    } else {
      // New team - register under all keys
      for (const k of keys) {
        byKey.set(k, team);
      }
    }
  }

  // Extract unique teams (Map values may have duplicates since multiple keys point to same team)
  const seen = new Set();
  const result = [];
  for (const team of byKey.values()) {
    if (!seen.has(team.id)) {
      seen.add(team.id);
      result.push(team);
    }
  }

  return result;
}

function App() {
  const loadTeams = useBracketStore((state) => state.loadTeams);
  const loadMatchups = useBracketStore((state) => state.loadMatchups);
  const hydrateBracket = useBracketStore((state) => state.hydrateBracket);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [{ data: teamsRaw, error: teamsError }, { data: matchupsRaw, error: matchupsError }] = await Promise.all([
          supabase.from('teams').select('*'),
          supabase
            .from('matchups')
            .select('*')
            .gte('round', 1)
            .lte('round', 6)
            .not('team_a_seed', 'is', null)
            .not('team_b_seed', 'is', null)
            .order('round', { ascending: true })
            .order('game_number', { ascending: true }),
        ]);

        if (teamsError || !teamsRaw?.length) {
          throw teamsError || new Error('No teams returned from Supabase');
        }

        const matchups = matchupsError ? [] : matchupsRaw || [];
        const teamIdsFromMatchups = [...new Set(matchups.flatMap((item) => [item.team_a_id, item.team_b_id]).filter(Boolean))];
        let teams;
        if (teamIdsFromMatchups.length > 0) {
          teams = teamsRaw.filter((team) => teamIdsFromMatchups.includes(team.id));
        } else {
          // Pre-tournament: filter to teams with a seed or meaningful stats (D1 teams)
          teams = teamsRaw.filter((team) => {
            if (team.seed >= 1 && team.seed <= 16) return true;
            // Keep teams that have real game data (wins+losses > 0) and a known conference
            const games = (Number(team.wins) || 0) + (Number(team.losses) || 0);
            return games > 0 && team.conference && team.conference !== 'Unknown';
          });
        }

        const dedupedTeams = dedupeTeams(teams.length ? teams : teamsRaw);
        loadTeams(dedupedTeams.length ? dedupedTeams : teamsRaw);
        loadMatchups(matchups);

        let bracket = null;
        const storedBracketId = typeof window !== 'undefined' ? window.localStorage.getItem(bracketStorageKey) : null;

        if (storedBracketId) {
          const { data } = await supabase.from('user_brackets').select('id,strategy').eq('id', storedBracketId).maybeSingle();
          bracket = data || null;
        }

        if (!bracket) {
          const { data } = await supabase.from('user_brackets').select('id,strategy').order('updated_at', { ascending: false }).limit(1).maybeSingle();
          bracket = data || null;
        }

        if (bracket?.id) {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(bracketStorageKey, bracket.id);
          }

          const { data: picks } = await supabase.from('user_picks').select('matchup_id,picked_team_id').eq('bracket_id', bracket.id);
          const mappedPicks = (picks || []).reduce((acc, pick) => {
            acc[pick.matchup_id] = pick.picked_team_id;
            return acc;
          }, {});

          hydrateBracket({
            bracketId: bracket.id,
            strategy: bracket.strategy || 'balanced',
            userPicks: mappedPicks,
          });
        }
      } catch (error) {
        console.warn('Falling back to local seed data:', error);
        loadTeams(teamsSeed);
        loadMatchups(matchupsSeed);
      }
    };

    bootstrap();
  }, [hydrateBracket, loadMatchups, loadTeams]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/intel" element={<Insights />} />
        <Route path="/build" element={<BracketBuilder />} />
        <Route path="/my-bracket" element={<MyBracket />} />
        <Route path="/team/:id" element={<Team />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
