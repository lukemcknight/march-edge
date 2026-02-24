import { create } from 'zustand';

const roundNames = {
  1: 'Round of 64',
  2: 'Round of 32',
  3: 'Sweet 16',
  4: 'Elite Eight',
  5: 'Final Four',
  6: 'Championship',
};

const createBracketId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `bracket-${Date.now()}`;
};

const useBracketStore = create((set, get) => ({
  teams: [],
  matchups: [],
  currentRound: 1,
  currentMatchupIndex: 0,
  userPicks: {},
  strategy: 'balanced',
  bracketId: createBracketId(),
  analysisCache: {},

  setStrategy: (strategy) => set({ strategy }),

  setBracketId: (bracketId) => set({ bracketId }),

  makePick: (matchupId, teamId) =>
    set((state) => ({
      userPicks: {
        ...state.userPicks,
        [matchupId]: teamId,
      },
    })),

  nextMatchup: () => {
    const state = get();
    const roundMatchups = state.matchups.filter((matchup) => matchup.round === state.currentRound);

    if (state.currentMatchupIndex < roundMatchups.length - 1) {
      set({ currentMatchupIndex: state.currentMatchupIndex + 1 });
      return;
    }

    if (state.currentRound < 6) {
      set({ currentRound: state.currentRound + 1, currentMatchupIndex: 0 });
    }
  },

  prevMatchup: () => {
    const state = get();

    if (state.currentMatchupIndex > 0) {
      set({ currentMatchupIndex: state.currentMatchupIndex - 1 });
      return;
    }

    if (state.currentRound > 1) {
      const previousRound = state.currentRound - 1;
      const previousRoundMatchups = state.matchups.filter((matchup) => matchup.round === previousRound);
      set({ currentRound: previousRound, currentMatchupIndex: Math.max(previousRoundMatchups.length - 1, 0) });
    }
  },

  loadTeams: (teams) => set({ teams }),

  loadMatchups: (matchups) => set({ matchups }),

  loadUserPicks: (userPicks) => set({ userPicks }),

  hydrateBracket: ({ bracketId, strategy, userPicks }) =>
    set((state) => ({
      bracketId: bracketId || state.bracketId,
      strategy: strategy || state.strategy,
      userPicks: userPicks || state.userPicks,
    })),

  cacheAnalysis: (matchupId, analysis) =>
    set((state) => ({
      analysisCache: {
        ...state.analysisCache,
        [matchupId]: analysis,
      },
    })),

  getCurrentMatchup: () => {
    const state = get();
    const roundMatchups = state.matchups.filter((matchup) => matchup.round === state.currentRound);
    const matchup = roundMatchups[state.currentMatchupIndex] || null;

    if (!matchup) {
      return null;
    }

    const teamA = state.teams.find((team) => team.id === matchup.team_a_id);
    const teamB = state.teams.find((team) => team.id === matchup.team_b_id);

    return {
      ...matchup,
      teamA,
      teamB,
      round_name: matchup.round_name || roundNames[state.currentRound],
      analysis: state.analysisCache[matchup.id] || null,
    };
  },
}));

export default useBracketStore;
