import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

const defaultAnalysis = {
  pick: null,
  confidence: 'tossup',
  win_probability: 50,
  rationale: 'Analysis unavailable right now. Use team form and seed profile as a tiebreaker.',
  key_factor: 'Unavailable',
};

function extractJson(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error('No JSON payload found in Gemini response');
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

async function runPrompt(prompt, fallback) {
  if (!genAI) {
    return fallback;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return extractJson(result.response.text());
  } catch (error) {
    console.error('Gemini request failed', error);
    return fallback;
  }
}

export async function generateMatchupAnalysis(teamA, teamB) {
  const prompt = `You are an expert NCAA Tournament analyst. Compare both teams and return strict JSON.

Team A: ${teamA.name} (${teamA.seed}-seed, ${teamA.record})
- Offensive Rating: ${teamA.offensive_rating}
- Defensive Rating: ${teamA.defensive_rating}
- Strength of Schedule: ${teamA.strength_of_schedule}
- 3PT%: ${teamA.three_point_pct}
- Quad 1 Record: ${teamA.quad1_wins}-${teamA.quad1_losses}

Team B: ${teamB.name} (${teamB.seed}-seed, ${teamB.record})
- Offensive Rating: ${teamB.offensive_rating}
- Defensive Rating: ${teamB.defensive_rating}
- Strength of Schedule: ${teamB.strength_of_schedule}
- 3PT%: ${teamB.three_point_pct}
- Quad 1 Record: ${teamB.quad1_wins}-${teamB.quad1_losses}

Respond only in JSON:
{
  "pick": "${teamA.name}" | "${teamB.name}",
  "confidence": "high" | "medium" | "tossup" | "upset_alert",
  "win_probability": number,
  "rationale": "1-2 sentence rationale",
  "key_factor": "single matchup swing factor"
}`;

  return runPrompt(prompt, {
    ...defaultAnalysis,
    pick: teamA.name,
    win_probability: 52,
    rationale: `${teamA.name} gets a slight nod on profile strength, but this is close enough to monitor foul trouble and turnover margin.`,
    key_factor: 'Shot quality in half-court possessions',
  });
}

export async function generateScoutingReport(team) {
  const prompt = `You are an NCAA scouting analyst. Return strict JSON with a 2-3 paragraph scouting report.

Team: ${team.name}
Record: ${team.record}
Seed: ${team.seed}
Conference: ${team.conference}
Offensive Rating: ${team.offensive_rating}
Defensive Rating: ${team.defensive_rating}
3PT%: ${team.three_point_pct}
Turnover Rate: ${team.turnover_rate}
Rebound Margin: ${team.rebound_margin}
Quad 1 Record: ${team.quad1_wins}-${team.quad1_losses}

Respond only in JSON:
{
  "team": "${team.name}",
  "report": "2-3 paragraphs",
  "ceiling": "single sentence",
  "floor": "single sentence",
  "key_players": ["player or role 1", "player or role 2", "player or role 3"]
}`;

  return runPrompt(prompt, {
    team: team.name,
    report: `${team.name} has the profile of a team that can sustain efficient offense while surviving variance-heavy tournament games. Their season trend suggests reliable shot creation in late-clock possessions, but half-court defensive rebounding can decide how deep they go.\n\nAgainst top competition, ${team.name} has shown enough composure to win tight games, yet their margin for error shrinks when perimeter shots are not falling. If they control turnovers and keep second-chance points even, they are built to survive the first weekend and push further.`,
    ceiling: 'Second weekend with a path to the Final Four if shot quality holds.',
    floor: 'An early exit if transition defense and ball security slip.',
    key_players: ['Lead guard initiator', 'Primary rim protector', 'High-volume wing shooter'],
  });
}

export async function generateStrategyPicks(teamA, teamB, strategy) {
  const strategyGuide = {
    safe: 'Favor lower risk, stronger metrics, and higher seed consistency.',
    chaos: 'Lean toward upset paths and volatility where plausible.',
    balanced: 'Use data-first picks with selective upset opportunities.',
    custom: 'Apply moderate risk with momentum and matchup fit as tiebreakers.',
  };

  const prompt = `You are helping a user fill an NCAA bracket with strategy "${strategy}".
Strategy rule: ${strategyGuide[strategy] || strategyGuide.balanced}

Team A: ${teamA.name} (${teamA.seed}-seed, ${teamA.record})
- Offensive Rating: ${teamA.offensive_rating}
- Defensive Rating: ${teamA.defensive_rating}

Team B: ${teamB.name} (${teamB.seed}-seed, ${teamB.record})
- Offensive Rating: ${teamB.offensive_rating}
- Defensive Rating: ${teamB.defensive_rating}

Return JSON only:
{
  "pick": "${teamA.name}" | "${teamB.name}",
  "confidence": "high" | "medium" | "tossup" | "upset_alert",
  "win_probability": number,
  "rationale": "1-2 sentence explanation tied to the strategy",
  "key_factor": "single deciding factor",
  "strategy_bias": "brief description of how strategy changed recommendation"
}`;

  const fallbackPick = strategy === 'chaos' && teamA.seed < teamB.seed ? teamB : teamA;

  return runPrompt(prompt, {
    ...defaultAnalysis,
    pick: fallbackPick.name,
    confidence: strategy === 'chaos' ? 'upset_alert' : 'medium',
    win_probability: strategy === 'chaos' ? 45 : 57,
    rationale:
      strategy === 'chaos'
        ? `${fallbackPick.name} offers a viable upset profile if pace and shot variance swing their way.`
        : `${fallbackPick.name} is the higher-floor pick under a ${strategy} strategy with steadier efficiency trends.`,
    key_factor: strategy === 'chaos' ? '3PT variance and live-ball turnovers' : 'Half-court execution stability',
    strategy_bias: `Adjusted toward a ${strategy} bracket philosophy.`,
  });
}
