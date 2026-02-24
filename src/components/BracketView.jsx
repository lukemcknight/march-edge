import { Link } from 'react-router-dom';

function BracketView({ matchups, teams, picks }) {
  if (!matchups.length) {
    return (
      <div className="glass-card rounded-2xl p-4">
        <p className="text-sm text-[var(--text-secondary)]">No matchups loaded yet. Connect Supabase tables or use seed data to begin.</p>
      </div>
    );
  }

  const rounds = [...new Set(matchups.map((matchup) => matchup.round))].sort((a, b) => a - b);

  const getTeam = (id) => teams.find((team) => team.id === id);

  return (
    <div className="space-y-4">
      {rounds.map((round) => {
        const roundMatchups = matchups.filter((matchup) => matchup.round === round);
        const picksInRound = roundMatchups.filter((matchup) => picks[matchup.id]).length;

        return (
          <section key={round} className="glass-card space-y-3 rounded-2xl p-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                {roundMatchups[0]?.round_name || `Round ${round}`}
              </h2>
              <span className="stats-font text-[11px] text-[var(--text-dim)]">{picksInRound}/{roundMatchups.length}</span>
            </div>
            <div className="space-y-2">
              {roundMatchups.map((matchup) => {
                const teamA = getTeam(matchup.team_a_id);
                const teamB = getTeam(matchup.team_b_id);
                const picked = getTeam(picks[matchup.id]);

                return (
                  <article key={matchup.id} className="rounded-xl border border-white/10 bg-[#0f172a]/55 p-3">
                    <p className="text-sm text-[var(--text-primary)]">
                      {teamA ? (
                        <Link to={`/team/${teamA.id}`} className="transition-all duration-300 hover:text-[var(--accent-secondary)]">
                          {teamA.seed}. {teamA.name}
                        </Link>
                      ) : (
                        <span>Team A</span>
                      )}{' '}
                      <span className="text-[var(--text-dim)]">vs</span>{' '}
                      {teamB ? (
                        <Link to={`/team/${teamB.id}`} className="transition-all duration-300 hover:text-[var(--accent-secondary)]">
                          {teamB.seed}. {teamB.name}
                        </Link>
                      ) : (
                        <span>Team B</span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      Pick: <span className="font-semibold text-[var(--accent-primary)]">{picked?.name || 'Not selected'}</span>
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default BracketView;
