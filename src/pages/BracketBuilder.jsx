import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MatchupCard from '../components/MatchupCard';
import ProgressTracker from '../components/ProgressTracker';
import StrategySelector from '../components/StrategySelector';
import { generateMatchupAnalysis, generateStrategyPicks } from '../lib/gemini';
import { bracketStorageKey, supabase } from '../lib/supabase';
import useBracketStore from '../lib/store';

function BracketBuilder() {
  const strategy = useBracketStore((state) => state.strategy);
  const setStrategy = useBracketStore((state) => state.setStrategy);
  const bracketId = useBracketStore((state) => state.bracketId);
  const setBracketId = useBracketStore((state) => state.setBracketId);
  const getCurrentMatchup = useBracketStore((state) => state.getCurrentMatchup);
  const makePick = useBracketStore((state) => state.makePick);
  const nextMatchup = useBracketStore((state) => state.nextMatchup);
  const prevMatchup = useBracketStore((state) => state.prevMatchup);
  const cacheAnalysis = useBracketStore((state) => state.cacheAnalysis);
  const userPicks = useBracketStore((state) => state.userPicks);
  const matchups = useBracketStore((state) => state.matchups);
  const currentRound = useBracketStore((state) => state.currentRound);
  const analysisCache = useBracketStore((state) => state.analysisCache);

  const [strategyLocked, setStrategyLocked] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const bracketInitRef = useRef(null);

  const matchup = getCurrentMatchup();
  const hasBracket = matchups.length > 0;

  const roundMatchups = useMemo(() => matchups.filter((item) => item.round === currentRound), [currentRound, matchups]);
  const picksMade = roundMatchups.filter((item) => userPicks[item.id]).length;
  const totalPicked = Object.keys(userPicks).length;
  const currentGameNumber = matchup ? roundMatchups.findIndex((item) => item.id === matchup.id) + 1 : 0;

  const ensureBracket = useCallback(async () => {
    if (bracketInitRef.current) {
      return bracketInitRef.current;
    }

    bracketInitRef.current = (async () => {
      try {
        const { data: existing } = await supabase.from('user_brackets').select('id').eq('id', bracketId).maybeSingle();
        if (existing?.id) {
          return existing.id;
        }

        const { data: inserted, error: insertError } = await supabase
          .from('user_brackets')
          .insert({ strategy })
          .select('id')
          .single();

        if (insertError || !inserted?.id) {
          throw insertError || new Error('Failed to create bracket');
        }

        setBracketId(inserted.id);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(bracketStorageKey, inserted.id);
        }

        return inserted.id;
      } catch (error) {
        console.warn('Unable to initialize bracket persistence', error);
        return null;
      }
    })();

    return bracketInitRef.current;
  }, [bracketId, setBracketId, strategy]);

  useEffect(() => {
    bracketInitRef.current = null;
  }, [bracketId]);

  useEffect(() => {
    if (!strategyLocked) {
      return;
    }

    const syncStrategy = async () => {
      const persistedBracketId = await ensureBracket();
      if (!persistedBracketId) {
        return;
      }

      await supabase.from('user_brackets').update({ strategy }).eq('id', persistedBracketId);
    };

    syncStrategy();
  }, [ensureBracket, strategy, strategyLocked]);

  useEffect(() => {
    if (!strategyLocked || !matchup || !matchup.teamA || !matchup.teamB) {
      return;
    }

    if (analysisCache[matchup.id]) {
      return;
    }

    const loadAnalysis = async () => {
      setLoadingAnalysis(true);
      const analysis =
        strategy === 'balanced'
          ? await generateMatchupAnalysis(matchup.teamA, matchup.teamB)
          : await generateStrategyPicks(matchup.teamA, matchup.teamB, strategy);
      cacheAnalysis(matchup.id, analysis);
      setLoadingAnalysis(false);
    };

    loadAnalysis();
  }, [analysisCache, cacheAnalysis, matchup, strategy, strategyLocked]);

  const handlePick = (teamId) => {
    if (!matchup) {
      return;
    }

    const pickedMatchup = matchup;
    makePick(matchup.id, teamId);
    nextMatchup();

    const followedAi =
      (typeof pickedMatchup.ai_pick_team_id === 'number' && pickedMatchup.ai_pick_team_id === teamId) ||
      (typeof analysisCache[pickedMatchup.id]?.pick === 'number' && analysisCache[pickedMatchup.id]?.pick === teamId) ||
      (typeof analysisCache[pickedMatchup.id]?.pick === 'string' &&
        (analysisCache[pickedMatchup.id]?.pick === pickedMatchup.teamA?.name
          ? pickedMatchup.teamA?.id === teamId
          : pickedMatchup.teamB?.id === teamId));

    void (async () => {
      const persistedBracketId = await ensureBracket();
      if (!persistedBracketId) {
        return;
      }

      const { error } = await supabase.from('user_picks').upsert(
        {
          bracket_id: persistedBracketId,
          matchup_id: pickedMatchup.id,
          picked_team_id: teamId,
          followed_ai: Boolean(followedAi),
        },
        { onConflict: 'bracket_id,matchup_id' }
      );

      if (error) {
        console.warn('Failed to persist pick', error);
      }
    })();
  };

  if (!hasBracket) {
    return (
      <div className="grid gap-4 pt-1 lg:grid-cols-12 lg:gap-5">
        <section className="glass-card rounded-2xl p-5 lg:col-span-8">
          <p className="section-title">Pre-Bracket Mode</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">Bracket Builder Unlocks On Selection Sunday</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Once official matchups are published, this flow will switch automatically to pick-by-pick bracket building.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link to="/intel" className="primary-btn inline-flex items-center justify-center px-4">
              Go To Tournament Intel
            </Link>
            <Link to="/intel" className="secondary-btn inline-flex items-center justify-center px-4">
              View Rankings
            </Link>
          </div>
        </section>
        <aside className="glass-card rounded-2xl p-4 lg:col-span-4">
          <p className="section-title">What Happens Next</p>
          <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
            <p className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">1. You run the publish function with official bracket JSON.</p>
            <p className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">2. Matchups populate instantly in Supabase.</p>
            <p className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">3. Builder is live for every user on refresh.</p>
          </div>
        </aside>
      </div>
    );
  }

  if (!strategyLocked) {
    return (
      <div className="grid gap-4 pt-1 lg:grid-cols-12 lg:gap-5">
        <section className="glass-card rounded-2xl p-4 lg:col-span-4 lg:p-5">
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Choose Strategy</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Select how aggressive your bracket should be. Recommendations will adapt to your risk profile.
          </p>
          <div className="mt-4 rounded-xl border border-white/10 bg-[#0f172a]/45 p-3 text-sm text-[var(--text-secondary)]">
            Balanced is a strong default for larger pools where you need upside without sacrificing too much floor.
          </div>
        </section>

        <section className="space-y-4 lg:col-span-8">
          <StrategySelector selected={strategy} onSelect={setStrategy} />
          <button type="button" onClick={() => setStrategyLocked(true)} className="primary-btn w-full lg:max-w-sm">
            Start Round of 64
          </button>
        </section>
      </div>
    );
  }

  if (!matchup || !matchup.teamA || !matchup.teamB) {
    return (
      <div className="glass-card rounded-2xl p-5">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Bracket flow complete</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">You have no remaining seeded matchups in this dataset.</p>
        <button type="button" onClick={() => setStrategyLocked(false)} className="secondary-btn mt-4 inline-flex items-center justify-center px-4">
          Start New Pass
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 pt-1 lg:grid-cols-12 lg:gap-5">
      <section className="space-y-4 lg:col-span-8">
        <ProgressTracker currentRoundName={matchup.round_name} picksMade={picksMade} totalPicks={roundMatchups.length} />

        <div className="glass-card flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3">
          <p className="stats-font text-xs text-[var(--text-secondary)]">Game {currentGameNumber} of {roundMatchups.length}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevMatchup}
              className="secondary-btn h-10 px-3 text-xs"
              disabled={currentGameNumber <= 1 && currentRound <= 1}
            >
              Previous Matchup
            </button>
            <button type="button" onClick={() => setStrategyLocked(false)} className="secondary-btn h-10 px-3 text-xs">
              Change Strategy
            </button>
          </div>
        </div>

        <MatchupCard matchup={matchup} analysis={analysisCache[matchup.id]} loadingAnalysis={loadingAnalysis} onPick={handlePick} />
      </section>

      <aside className="glass-card h-fit rounded-2xl p-4 lg:col-span-4 lg:sticky lg:top-6">
        <p className="section-title">Session Summary</p>
        <div className="mt-3 space-y-2.5 text-sm">
          <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
            <p className="stats-font text-[11px] text-[var(--text-dim)]">Strategy</p>
            <p className="mt-1 font-semibold uppercase tracking-wide text-[var(--text-primary)]">{strategy}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
            <p className="stats-font text-[11px] text-[var(--text-dim)]">Round Progress</p>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">{picksMade}/{roundMatchups.length} picks</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0f172a]/50 p-3">
            <p className="stats-font text-[11px] text-[var(--text-dim)]">Total Picks Made</p>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">{totalPicked}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default BracketBuilder;
