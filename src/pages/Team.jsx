import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateScoutingReport } from '../lib/gemini';
import useBracketStore from '../lib/store';

function Team() {
  const { id } = useParams();
  const teams = useBracketStore((state) => state.teams);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const team = useMemo(() => teams.find((item) => String(item.id) === id), [id, teams]);

  useEffect(() => {
    if (!team) {
      return;
    }

    const loadReport = async () => {
      setLoading(true);
      const scouting = await generateScoutingReport(team);
      setReport(scouting);
      setLoading(false);
    };

    loadReport();
  }, [team]);

  if (!team) {
    return <p className="pt-4 text-sm text-[var(--text-secondary)]">Team not found.</p>;
  }

  return (
    <div className="space-y-4 pt-3">
      <header className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="stats-font text-xs text-[var(--text-secondary)]">Seed {team.seed} • {team.conference}</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{team.name}</h1>
        <p className="stats-font mt-1 text-sm text-[var(--text-secondary)]">{team.record}</p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--accent-primary)]">Team Snapshot</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
          <p className="stats-font">OffRtg: {team.offensive_rating}</p>
          <p className="stats-font">DefRtg: {team.defensive_rating}</p>
          <p className="stats-font">3PT%: {team.three_point_pct}</p>
          <p className="stats-font">TO/G: {team.turnovers_per_game ?? 'N/A'}</p>
          <p className="stats-font">Reb Margin: {team.rebound_margin}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--accent-primary)]">Scouting Report</h2>
        {loading ? (
          <p className="mt-3 text-sm text-[var(--text-secondary)]">Building scouting report...</p>
        ) : (
          <>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--text-secondary)]">{report?.report}</p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Ceiling: <span className="text-[var(--text-primary)]">{report?.ceiling}</span>
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Floor: <span className="text-[var(--text-primary)]">{report?.floor}</span>
            </p>
          </>
        )}
      </section>
    </div>
  );
}

export default Team;
