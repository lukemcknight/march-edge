import { Link } from 'react-router-dom';
import useBracketStore from '../lib/store';

const cards = [
  { id: '01', title: 'Power Rankings', text: 'Teams ranked by tournament ceiling and consistency.' },
  { id: '02', title: 'Upset Watch', text: 'Potential bracket busters with profile edges.' },
  { id: '03', title: 'Sleepers', text: 'Undervalued teams primed for a run.' },
];

const steps = [
  { id: '1', title: 'Pick a strategy', text: 'Choose safe, chaos, balanced, or custom to set your risk profile.' },
  { id: '2', title: 'Review matchups', text: 'See win probabilities and detailed analysis for each game before you pick.' },
  { id: '3', title: 'Track your bracket', text: 'Every choice is saved in your bracket view so you can review quickly.' },
];

function Home() {
  const teams = useBracketStore((state) => state.teams);
  const matchups = useBracketStore((state) => state.matchups);
  const bracketLive = matchups.length > 0;

  return (
    <div className="relative space-y-6 pb-8 pt-1 lg:space-y-7">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[var(--accent-primary)]/42 via-orange-300/18 to-transparent blur-3xl"
        style={{ animation: 'orb-float 8s ease-in-out infinite' }}
      />

      <section className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 lg:col-span-8 lg:p-8">
          <div className="pointer-events-none absolute -bottom-14 -right-16 h-44 w-44 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">March Edge</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[var(--text-primary)] lg:max-w-xl lg:text-4xl">
            Your edge for the Big Dance
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] lg:max-w-2xl lg:text-base">
            Build smarter picks with matchup probabilities, strategy-based recommendations, and scouting insights in one streamlined flow.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link to={bracketLive ? '/build' : '/intel'} className="primary-btn inline-flex items-center justify-center px-5">
              {bracketLive ? 'Build My Bracket' : 'Explore Intel'}
            </Link>
            <Link to="/my-bracket" className="secondary-btn inline-flex items-center justify-center px-4">
              View Picks
            </Link>
          </div>
        </div>

        <aside className="glass-card rounded-3xl p-5 lg:col-span-4 lg:p-6">
          <p className="section-title">At A Glance</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
              <p className="stats-font text-[11px] text-[var(--text-dim)]">Flow</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Strategy → Matchups → Bracket</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
              <p className="stats-font text-[11px] text-[var(--text-dim)]">Designed For</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Quick, confident bracket decisions</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
              <p className="stats-font text-[11px] text-[var(--text-dim)]">Coverage</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{teams.length} tracked teams</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
              <p className="stats-font text-[11px] text-[var(--text-dim)]">Analysis</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Matchup breakdowns + scouting reports</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-3">
        <h2 className="section-title">How It Works</h2>
        <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
          {steps.map((step) => (
            <article key={step.id} className="glass-card rounded-2xl p-4 transition-all duration-300 hover:border-white/20">
              <span className="stats-font text-[10px] text-[var(--accent-primary)]">STEP {step.id}</span>
              <h3 className="mt-1.5 text-base font-bold text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="section-title">Pre-Tournament Intel</h2>
        <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
          {cards.map((card) => (
            <article key={card.title} className="glass-card rounded-2xl p-4 transition-all duration-300 hover:border-white/20">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-bold text-[var(--text-primary)]">{card.title}</h3>
                <span className="stats-font text-[10px] text-[var(--text-dim)]">{card.id}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
