function ProbabilityBar({ teamAName, teamBName, teamAProbability = 50 }) {
  const bounded = Math.max(0, Math.min(100, Number(teamAProbability) || 50));

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] stats-font">
        <span>{teamAName}: {bounded.toFixed(0)}%</span>
        <span>{teamBName}: {(100 - bounded).toFixed(0)}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-[#0f172a] p-[2px]">
        <div className="flex h-full overflow-hidden rounded-full">
          <div className="bg-gradient-to-r from-[#ff7e46] to-[var(--accent-primary)] transition-all duration-300" style={{ width: `${bounded}%` }} />
          <div className="bg-gradient-to-r from-[#1fcab0] to-[var(--accent-secondary)]/70 transition-all duration-300" style={{ width: `${100 - bounded}%` }} />
        </div>
      </div>
    </div>
  );
}

export default ProbabilityBar;
