import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useBracketStore from '../lib/store';

function toNumber(value, fallback = 0) {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const raw = typeof value === 'string'
    ? value.replace(/[%,$]/g, '').trim()
    : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function scoreTeam(team) {
  const net = toNumber(team.net_rating);
  const off = toNumber(team.offensive_rating);
  const def = toNumber(team.defensive_rating, 100);
  const wins = toNumber(team.wins);
  const losses = toNumber(team.losses);
  const winPct = wins + losses > 0 ? wins / (wins + losses) : 0;
  return net + (off - def) * 0.3 + winPct * 10;
}

function normalizeTeams(teams) {
  const pick = (team, keys) => {
    for (const key of keys) {
      if (team[key] !== null && team[key] !== undefined && team[key] !== '') {
        return team[key];
      }
    }
    return null;
  };

  return teams.map((team) => {
    const normalized = {
      ...team,
      three_point_pct: pick(team, ['three_point_pct', 'threePointPct', 'three_pt_pct', 'threePointPercentage']),
      turnover_rate: pick(team, ['turnover_rate', 'turnoverRate', 'to_rate', 'turnover_percentage']),
      net_rating: pick(team, ['net_rating', 'netRating']),
      offensive_rating: pick(team, ['offensive_rating', 'offensiveRating']),
      defensive_rating: pick(team, ['defensive_rating', 'defensiveRating']),
      region: pick(team, ['region', 'bracket_region']),
    };
    return {
      ...normalized,
      model_score: scoreTeam(normalized),
    };
  });
}

function fmtNumber(value, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : 'N/A';
}

/** Format a raw field value — returns 'N/A' for null/undefined instead of converting to 0 */
function fmtStat(raw, digits = 1) {
  const n = toNumber(raw, null);
  return Number.isFinite(n) ? n.toFixed(digits) : 'N/A';
}

const confidenceRank = {
  high: 3,
  medium: 2,
  tossup: 1,
  upset_alert: 0,
};

function Insights() {
  const teams = useBracketStore((state) => state.teams);
  const matchups = useBracketStore((state) => state.matchups);
  const [query, setQuery] = useState('');

  const normalized = useMemo(() => normalizeTeams(teams), [teams]);

  const teamsById = useMemo(() => {
    const map = new Map();
    normalized.forEach((team) => map.set(team.id, team));
    return map;
  }, [normalized]);

  const powerRankings = useMemo(
    () => [...normalized].sort((a, b) => b.model_score - a.model_score).slice(0, 25),
    [normalized]
  );

  const upsetWatch = useMemo(
    () =>
      [...normalized]
        .filter((team) => (team.seed || 99) >= 8 || !team.seed)
        .sort((a, b) => (toNumber(b.three_point_pct) + toNumber(b.net_rating)) - (toNumber(a.three_point_pct) + toNumber(a.net_rating)))
        .slice(0, 10),
    [normalized]
  );

  const sleepers = useMemo(
    () =>
      [...normalized]
        .filter((team) => {
          const seed = toNumber(team.seed, 11);
          return seed >= 6 && seed <= 12;
        })
        .sort((a, b) => b.model_score - a.model_score)
        .slice(0, 10),
    [normalized]
  );

  const filteredTeams = useMemo(
    () =>
      [...normalized]
        .filter((team) => {
          const q = query.toLowerCase();
          return team.name.toLowerCase().includes(q) || (team.short_name || '').toLowerCase().includes(q);
        })
        .sort((a, b) => b.model_score - a.model_score)
        .slice(0, 40),
    [normalized, query]
  );

  const championBoard = useMemo(
    () =>
      [...normalized]
        .filter((team) => toNumber(team.seed, 99) <= 4)
        .sort((a, b) => b.model_score - a.model_score)
        .slice(0, 8),
    [normalized]
  );

  const twoWayTeams = useMemo(
    () =>
      [...normalized]
        .filter((team) => toNumber(team.offensive_rating) >= 116 && toNumber(team.defensive_rating, 200) <= 96)
        .sort((a, b) => b.model_score - a.model_score)
        .slice(0, 8),
    [normalized]
  );

  const volatilityTeams = useMemo(
    () =>
      [...normalized]
        .map((team) => ({
          ...team,
          volatility_score: toNumber(team.three_point_pct) * 1.3 + toNumber(team.turnover_rate) * 1.4,
        }))
        .sort((a, b) => b.volatility_score - a.volatility_score)
        .slice(0, 8),
    [normalized]
  );

  const conferenceIntel = useMemo(() => {
    const groups = new Map();
    normalized.forEach((team) => {
      const conference = team.conference || 'Other';
      if (!groups.has(conference)) {
        groups.set(conference, { conference, teams: 0, modelTotal: 0, netTotal: 0, topSeed: 99 });
      }
      const bucket = groups.get(conference);
      bucket.teams += 1;
      bucket.modelTotal += team.model_score;
      bucket.netTotal += toNumber(team.net_rating);
      bucket.topSeed = Math.min(bucket.topSeed, toNumber(team.seed, 99));
    });

    return [...groups.values()]
      .filter((item) => item.teams >= 2)
      .map((item) => ({
        ...item,
        avgModel: item.modelTotal / item.teams,
        avgNet: item.netTotal / item.teams,
      }))
      .sort((a, b) => b.avgModel - a.avgModel)
      .slice(0, 8);
  }, [normalized]);

  const regionIntel = useMemo(() => {
    const groups = new Map();
    normalized.forEach((team) => {
      const region = team.region || 'Unknown';
      if (!groups.has(region)) {
        groups.set(region, { region, teams: 0, modelTotal: 0, topSeedCount: 0 });
      }
      const bucket = groups.get(region);
      bucket.teams += 1;
      bucket.modelTotal += team.model_score;
      if (toNumber(team.seed, 99) <= 4) {
        bucket.topSeedCount += 1;
      }
    });

    return [...groups.values()]
      .filter((item) => item.teams > 0)
      .map((item) => ({
        ...item,
        avgModel: item.modelTotal / item.teams,
      }))
      .sort((a, b) => b.avgModel - a.avgModel);
  }, [normalized]);

  const firstRoundDanger = useMemo(() => {
    return [...matchups]
      .filter((matchup) => toNumber(matchup.round, null) === 1)
      .map((matchup) => {
        const teamA = teamsById.get(matchup.team_a_id);
        const teamB = teamsById.get(matchup.team_b_id);
        const probability = toNumber(matchup.ai_win_probability, 50);
        const edge = Math.abs(probability - 50);
        const confidence = matchup.ai_confidence || 'tossup';

        return {
          ...matchup,
          teamA,
          teamB,
          edge,
          confidence,
          confidenceScore: confidenceRank[confidence] ?? 1,
        };
      })
      .sort((a, b) => {
        if (a.confidenceScore !== b.confidenceScore) {
          return a.confidenceScore - b.confidenceScore;
        }
        return a.edge - b.edge;
      })
      .slice(0, 8);
  }, [matchups, teamsById]);

  const overview = useMemo(() => {
    const seeded = normalized.filter((team) => toNumber(team.seed, 99) <= 16).length;
    const avgNet = normalized.length > 0 ? normalized.reduce((sum, team) => sum + toNumber(team.net_rating), 0) / normalized.length : 0;
    const likelyUpsets = normalized.filter((team) => toNumber(team.seed, 99) >= 9 && toNumber(team.three_point_pct) >= 35.5 && toNumber(team.net_rating) >= 16).length;
    const twoWayCount = normalized.filter((team) => toNumber(team.offensive_rating) >= 116 && toNumber(team.defensive_rating, 200) <= 96).length;

    return { seeded, avgNet, likelyUpsets, twoWayCount };
  }, [normalized]);

  return (
    <div className="space-y-5 pb-6">
      <header className="glass-card rounded-2xl p-4 lg:p-5">
        <p className="section-title">Pre-Bracket Mode</p>
        <h1 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">Tournament Intel</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Full-board prep with contenders, upset spots, matchup volatility, and bracket-building guidance.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="glass-card rounded-2xl p-4">
          <p className="stats-font text-[11px] text-[var(--text-dim)]">Teams Tracked</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{normalized.length}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{overview.seeded} with current seeds</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="stats-font text-[11px] text-[var(--text-dim)]">Avg Net Rating</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{fmtNumber(overview.avgNet)}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Field-wide baseline strength</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="stats-font text-[11px] text-[var(--text-dim)]">Upset-Ready Teams</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{overview.likelyUpsets}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Seed 9+ with shooting + net profile</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="stats-font text-[11px] text-[var(--text-dim)]">Two-Way Teams</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{overview.twoWayCount}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Off 116+ and Def 96 or better</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <article className="glass-card rounded-2xl p-4 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="section-title">Power Rankings</h2>
            <span className="stats-font text-[11px] text-[var(--text-dim)]">Top 25</span>
          </div>
          <div className="space-y-2">
            {powerRankings.map((team, idx) => (
              <Link key={team.id} to={`/team/${team.id}`} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f172a]/55 p-2.5 transition-all duration-300 hover:border-white/25">
                <p className="text-sm text-[var(--text-primary)]">
                  <span className="stats-font mr-2 text-[var(--text-dim)]">#{idx + 1}</span>
                  {team.name}
                </p>
                <span className="stats-font text-xs text-[var(--accent-secondary)]">Model {fmtNumber(team.model_score)}</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4 lg:col-span-5">
          <h2 className="section-title">Championship Board</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Highest model teams with protected seeds (1-4).</p>
          <div className="mt-3 space-y-2">
            {championBoard.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="block rounded-xl border border-white/10 bg-[#0f172a]/55 p-3 transition-all duration-300 hover:border-[var(--accent-primary)]/40">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{team.name}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  Seed {team.seed || 'TBD'} • Net {fmtStat(team.net_rating)} • Record {team.record}
                </p>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <article className="glass-card rounded-2xl p-4 lg:col-span-4">
          <h2 className="section-title">Upset Watch</h2>
          <div className="mt-3 space-y-2">
            {upsetWatch.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="block rounded-xl border border-white/10 bg-[#0f172a]/55 p-3 transition-all duration-300 hover:border-[var(--accent-danger)]/40">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{team.name}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  Seed {team.seed || 'TBD'} • 3PT {fmtStat(team.three_point_pct)}% • Net {fmtStat(team.net_rating)}
                </p>
              </Link>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4 lg:col-span-4">
          <h2 className="section-title">Two-Way Trust Index</h2>
          <div className="mt-3 space-y-2">
            {twoWayTeams.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="block rounded-xl border border-white/10 bg-[#0f172a]/55 p-3 transition-all duration-300 hover:border-[var(--accent-secondary)]/35">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{team.name}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  Off {fmtStat(team.offensive_rating)} • Def {fmtStat(team.defensive_rating)}
                </p>
              </Link>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4 lg:col-span-4">
          <h2 className="section-title">Volatility Meter</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">High 3PT reliance and turnover pressure can swing outcomes quickly.</p>
          <div className="mt-3 space-y-2">
            {volatilityTeams.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="block rounded-xl border border-white/10 bg-[#0f172a]/55 p-3 transition-all duration-300 hover:border-white/25">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{team.name}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  Vol {fmtStat(team.volatility_score)} • 3PT {fmtStat(team.three_point_pct)}% • TO {fmtStat(team.turnover_rate)}
                </p>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <article className="glass-card rounded-2xl p-4 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="section-title">First-Round Danger Board</h2>
            <span className="stats-font text-[11px] text-[var(--text-dim)]">Most Fragile Favorites</span>
          </div>
          <div className="space-y-2">
            {firstRoundDanger.length > 0 ? (
              firstRoundDanger.map((game) => {
                const teamAName = game.teamA?.name || 'Team A';
                const teamBName = game.teamB?.name || 'Team B';
                return (
                  <div key={game.id} className="rounded-xl border border-white/10 bg-[#0f172a]/55 p-3">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {teamAName} vs {teamBName}
                    </p>
                    <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                      {game.region || 'Region TBD'} • Lean {game.ai_win_probability || 50}% • Confidence {game.confidence.replace('_', ' ')}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">Round 1 matchups are not loaded yet.</p>
            )}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4 lg:col-span-5">
          <h2 className="section-title">Bracket Blueprint</h2>
          <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-[#0f172a]/55 p-3 text-sm text-[var(--text-secondary)]">
            <p>1. Start with two-way teams for your Final Four core.</p>
            <p>2. Limit first-round upsets to 2-4 and target the Upset Watch list.</p>
            <p>3. Use championship board teams for title picks unless injury/news changes profile.</p>
            <p>4. Fade high-volatility teams in coin-flip games unless matchup edge is clear.</p>
            <p>5. Build one contrarian path through the weakest region by avg model score.</p>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <article className="glass-card rounded-2xl p-4 lg:col-span-6">
          <h2 className="section-title">Conference Strength</h2>
          <div className="mt-3 space-y-2">
            {conferenceIntel.map((conf) => (
              <div key={conf.conference} className="rounded-xl border border-white/10 bg-[#0f172a]/55 p-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{conf.conference}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  Teams {conf.teams} • Avg Model {fmtNumber(conf.avgModel)} • Avg Net {fmtNumber(conf.avgNet)} • Best Seed {conf.topSeed <= 16 ? conf.topSeed : 'TBD'}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4 lg:col-span-6">
          <h2 className="section-title">Region Difficulty</h2>
          <div className="mt-3 space-y-2">
            {regionIntel.map((region) => (
              <div key={region.region} className="rounded-xl border border-white/10 bg-[#0f172a]/55 p-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{region.region}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  Avg Model {fmtNumber(region.avgModel)} • Top-4 Seeds {region.topSeedCount} • Teams {region.teams}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <article className="glass-card rounded-2xl p-4 lg:col-span-5">
          <h2 className="section-title">Sleepers</h2>
          <div className="mt-3 space-y-2">
            {sleepers.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="block rounded-xl border border-white/10 bg-[#0f172a]/55 p-3 transition-all duration-300 hover:border-[var(--accent-primary)]/40">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{team.name}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">Seed {team.seed || 'TBD'} • Net {fmtStat(team.net_rating)}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="section-title">Team Explorer</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search teams"
              className="h-10 w-44 rounded-lg border border-white/10 bg-[#0f172a]/70 px-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-300 focus:border-[var(--accent-primary)]"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {filteredTeams.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="rounded-xl border border-white/10 bg-[#0f172a]/55 p-2.5 transition-all duration-300 hover:border-white/25">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{team.name}</p>
                <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">
                  {team.record} • Off {team.offensive_rating || 'N/A'} • Def {team.defensive_rating || 'N/A'} • Model {fmtNumber(team.model_score)}
                </p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Insights;
