const strategies = [
  { id: 'safe', code: 'SF', name: 'Safe', description: 'Lean on favorites and stable efficiency.', note: 'Lower variance' },
  { id: 'chaos', code: 'CH', name: 'Chaos', description: 'Chase upset paths and variance swings.', note: 'High volatility' },
  { id: 'balanced', code: 'BL', name: 'Balanced', description: 'Data-first with selective risk.', note: 'Recommended' },
  { id: 'custom', code: 'CU', name: 'Custom', description: 'Blend momentum and matchup fit.', note: 'Manual blend' },
];

function StrategySelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {strategies.map((strategy, index) => {
        const isSelected = selected === strategy.id;

        return (
          <button
            key={strategy.id}
            type="button"
            onClick={() => onSelect(strategy.id)}
            className={`group min-h-34 rounded-2xl border p-4 text-left transition-all duration-300 ${
              isSelected
                ? 'border-[var(--accent-primary)]/45 bg-[var(--accent-primary)]/14 shadow-[0_0_24px_rgba(255,107,43,0.24)]'
                : 'border-white/10 bg-white/5 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8'
            }`}
          >
            <div className="mb-3 flex items-start justify-between">
              <span className="stats-font rounded-lg border border-white/10 bg-[#0f172a]/80 px-2 py-1 text-[10px] font-bold text-[var(--text-secondary)]">
                {strategy.code}
              </span>
              <span className="text-[10px] text-[var(--text-dim)]">0{index + 1}</span>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">{strategy.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{strategy.description}</p>
            <p className="mt-2 text-[11px] font-semibold text-[var(--accent-secondary)]">{strategy.note}</p>
          </button>
        );
      })}
    </div>
  );
}

export default StrategySelector;
