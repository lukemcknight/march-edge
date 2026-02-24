const styles = {
  high: 'bg-[var(--accent-safe)]/18 text-[var(--accent-safe)] border-[var(--accent-safe)]/45',
  medium: 'bg-orange-400/16 text-orange-300 border-orange-300/45',
  tossup: 'bg-[var(--accent-tossup)]/16 text-[var(--accent-tossup)] border-[var(--accent-tossup)]/45',
  upset_alert: 'bg-[var(--accent-danger)]/16 text-[var(--accent-danger)] border-[var(--accent-danger)]/45 animate-pulse',
};

const labels = {
  high: 'High Confidence',
  medium: 'Medium',
  tossup: 'Toss-Up',
  upset_alert: 'Upset Alert',
};

function ConfidenceBadge({ confidence = 'tossup' }) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full border px-3 text-[11px] font-bold uppercase tracking-[0.09em] transition-all duration-300 ${
        styles[confidence] || styles.tossup
      }`}
    >
      {labels[confidence] || labels.tossup}
    </span>
  );
}

export default ConfidenceBadge;
