import { Link } from 'react-router-dom';
import BracketView from '../components/BracketView';
import useBracketStore from '../lib/store';

function MyBracket() {
  const matchups = useBracketStore((state) => state.matchups);
  const teams = useBracketStore((state) => state.teams);
  const picks = useBracketStore((state) => state.userPicks);

  const total = matchups.length;
  const done = Object.keys(picks).length;
  const completion = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="grid gap-4 pt-1 lg:grid-cols-12 lg:gap-5">
      <header className="glass-card rounded-2xl p-4 lg:col-span-4 lg:h-fit lg:sticky lg:top-6">
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">My Bracket</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Track every pick you have made so far.</p>
        <p className="stats-font mt-3 text-xs text-[var(--text-dim)]">Progress {done}/{total}</p>

        <div className="mt-4 space-y-2">
          <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
            <p className="stats-font text-[11px] text-[var(--text-dim)]">Completion</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{completion}%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
            <p className="stats-font text-[11px] text-[var(--text-dim)]">Total Games</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{total}</p>
          </div>
        </div>

        {done === 0 ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
            <p className="text-sm text-[var(--text-secondary)]">No picks yet. Start building to populate your bracket.</p>
            <Link to="/build" className="primary-btn mt-3 inline-flex items-center justify-center px-4">
              Go To Builder
            </Link>
          </div>
        ) : null}
      </header>

      <section className="lg:col-span-8">
        <BracketView matchups={matchups} teams={teams} picks={picks} />
      </section>
    </div>
  );
}

export default MyBracket;
