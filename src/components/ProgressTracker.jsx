function ProgressTracker({ currentRoundName, picksMade, totalPicks }) {
  const progress = totalPicks ? Math.round((picksMade / totalPicks) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--text-primary)]">{currentRoundName}</h2>
        <span className="stats-font rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-[var(--text-secondary)]">
          {picksMade}/{totalPicks}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#ff7e46] to-[var(--accent-primary)] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-2 text-xs text-[var(--text-secondary)]">{picksMade} of {totalPicks} picks locked</p>
    </div>
  );
}

export default ProgressTracker;
