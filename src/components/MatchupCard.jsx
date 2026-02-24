import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfidenceBadge from './ConfidenceBadge';
import ProbabilityBar from './ProbabilityBar';

function TeamPanel({ team, highlighted, side }) {
  return (
    <div
      className={`rounded-xl border p-3 transition-all duration-300 ${
        highlighted
          ? 'border-[var(--accent-primary)]/55 bg-[var(--accent-primary)]/12 shadow-[0_0_20px_rgba(255,107,43,0.16)]'
          : 'border-white/10 bg-[#0f172a]/45'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="stats-font text-[11px] uppercase text-[var(--text-secondary)]">{side}</p>
        <p className="stats-font text-[11px] text-[var(--text-dim)]">Seed {team.seed}</p>
      </div>
      <h3 className="text-base font-bold text-[var(--text-primary)]">{team.name}</h3>
      <p className="stats-font mt-1 text-xs text-[var(--text-secondary)]">{team.record}</p>
      <Link to={`/team/${team.id}`} className="mt-2 inline-flex text-xs font-semibold text-[var(--accent-secondary)] transition-all duration-300 hover:brightness-110">
        View Team Intel
      </Link>
    </div>
  );
}

function MatchupCard({ matchup, analysis, loadingAnalysis, onPick }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsExiting(false);
  }, [matchup.id]);

  const handlePick = (teamId) => {
    setIsExiting(true);
    window.setTimeout(() => onPick(teamId), 220);
  };

  const confidence = analysis?.confidence || matchup.ai_confidence || 'tossup';
  const rationale =
    analysis?.rationale || matchup.ai_rationale || 'Breaking down this matchup. Compare rebounding and perimeter shot quality.';
  const winProbability = analysis?.win_probability ?? matchup.ai_win_probability ?? 50;
  const recommendedName = analysis?.pick || matchup.ai_pick_team_id;
  const keyFactor = analysis?.key_factor;

  return (
    <article
      className={`glass-card relative w-full overflow-hidden rounded-2xl p-4 transition-all duration-300 lg:p-5 ${
        isExiting ? 'slide-out' : 'slide-in'
      }`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--accent-primary)]/18 blur-2xl" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
          {matchup.region} • Game {matchup.game_number}
        </p>
        <ConfidenceBadge confidence={confidence} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <TeamPanel
          team={matchup.teamA}
          side="Team A"
          highlighted={recommendedName === matchup.teamA.name || recommendedName === matchup.teamA.id}
        />
        <TeamPanel
          team={matchup.teamB}
          side="Team B"
          highlighted={recommendedName === matchup.teamB.name || recommendedName === matchup.teamB.id}
        />
      </div>

      <div className="mt-3 rounded-xl border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 p-2.5">
        <p className="text-xs text-[var(--text-primary)]">
          <span className="font-bold text-[var(--accent-primary)]">Our Pick:</span>{' '}
          {typeof recommendedName === 'number'
            ? recommendedName === matchup.teamA.id
              ? matchup.teamA.name
              : matchup.teamB.name
            : recommendedName || 'No clear edge'}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary)]">Win Probability</p>
        <ProbabilityBar
          teamAName={matchup.teamA.short_name || matchup.teamA.name}
          teamBName={matchup.teamB.short_name || matchup.teamB.name}
          teamAProbability={winProbability}
        />
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-[#0f172a]/45 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-primary)]">Matchup Analysis</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {loadingAnalysis ? 'Breaking down the matchup...' : rationale}
        </p>
        {keyFactor ? (
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">Key Factor:</span> {keyFactor}
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => handlePick(matchup.teamA.id)}
          className="primary-btn"
          aria-label={`Pick ${matchup.teamA.name}`}
        >
          Pick {matchup.teamA.short_name}
        </button>
        <button
          type="button"
          onClick={() => handlePick(matchup.teamB.id)}
          className="secondary-btn"
          aria-label={`Pick ${matchup.teamB.name}`}
        >
          Pick {matchup.teamB.short_name}
        </button>
      </div>
    </article>
  );
}

export default MatchupCard;
