# BracketAI — AI-Powered March Madness Bracket Assistant

## Project Overview

BracketAI is a mobile-first web app that helps casual college basketball fans fill out their NCAA Tournament bracket using AI-powered analysis. Users swipe through matchups one at a time, see AI-generated win probabilities, scouting reports, and pick recommendations, then export/share their completed bracket.

**Launch target:** Before Selection Sunday, March 15, 2026.
**Primary audience:** Casual fans filling out office pool brackets who want an edge without doing hours of research.

---

## Tech Stack

- **Frontend:** React 18+ with Vite, TailwindCSS v3
- **Backend/Database:** Supabase (Postgres + Auth + REST API)
- **AI:** Google Gemini API (gemini-2.0-flash) for generating scouting reports, pick rationales, and matchup analysis
- **Hosting:** Vercel (deploy as static site with serverless API routes) or Netlify
- **State Management:** Zustand (lightweight, simple)
- **Routing:** React Router v6

---

## Environment Variables

Create a `.env` file in project root:

```
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_GEMINI_API_KEY=<your-gemini-api-key>
```

**IMPORTANT:** The Gemini API key should be called server-side only (via Supabase Edge Function or a lightweight API route) in production. For the MVP, calling from the client is acceptable but flag it as a TODO for migration.

---

## Database Schema (Supabase)

### Table: `teams`
```sql
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,        -- e.g., "DUKE", "GONZ"
  seed INTEGER,                     -- 1-16, NULL before Selection Sunday
  conference TEXT NOT NULL,
  record TEXT NOT NULL,             -- e.g., "28-3"
  wins INTEGER NOT NULL,
  losses INTEGER NOT NULL,
  offensive_rating DECIMAL(5,1),
  defensive_rating DECIMAL(5,1),
  net_rating DECIMAL(5,1),
  strength_of_schedule DECIMAL(5,2),
  three_point_pct DECIMAL(4,1),
  turnover_rate DECIMAL(4,1),
  rebound_margin DECIMAL(4,1),
  ppg DECIMAL(4,1),                -- points per game
  opp_ppg DECIMAL(4,1),           -- opponent points per game
  quad1_wins INTEGER DEFAULT 0,
  quad1_losses INTEGER DEFAULT 0,
  region TEXT,                      -- e.g., "East", "West", "South", "Midwest"
  logo_url TEXT,
  primary_color TEXT,               -- hex color for UI theming
  secondary_color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `matchups`
```sql
CREATE TABLE matchups (
  id SERIAL PRIMARY KEY,
  round INTEGER NOT NULL,           -- 1=R64, 2=R32, 3=S16, 4=E8, 5=F4, 6=Championship
  round_name TEXT NOT NULL,         -- "Round of 64", "Round of 32", etc.
  region TEXT,                       -- NULL for Final Four and Championship
  game_number INTEGER NOT NULL,     -- ordering within the round
  team_a_id INTEGER REFERENCES teams(id),
  team_b_id INTEGER REFERENCES teams(id),
  team_a_seed INTEGER,
  team_b_seed INTEGER,
  ai_pick_team_id INTEGER REFERENCES teams(id),
  ai_confidence TEXT CHECK (ai_confidence IN ('high', 'medium', 'tossup', 'upset_alert')),
  ai_win_probability DECIMAL(4,1), -- percentage for team_a
  ai_rationale TEXT,
  ai_scouting_report TEXT,
  winner_id INTEGER REFERENCES teams(id),  -- actual result, filled in during tournament
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `user_brackets`
```sql
CREATE TABLE user_brackets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,         -- anonymous session ID (no auth for MVP)
  bracket_name TEXT DEFAULT 'My Bracket',
  strategy TEXT DEFAULT 'balanced', -- 'safe', 'chaos', 'balanced', 'custom'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `user_picks`
```sql
CREATE TABLE user_picks (
  id SERIAL PRIMARY KEY,
  bracket_id UUID REFERENCES user_brackets(id) ON DELETE CASCADE,
  matchup_id INTEGER REFERENCES matchups(id),
  picked_team_id INTEGER REFERENCES teams(id),
  followed_ai BOOLEAN DEFAULT FALSE,  -- did they follow the AI recommendation?
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bracket_id, matchup_id)
);
```

### Row Level Security

Enable RLS on all tables. For the MVP:
- `teams` and `matchups`: public read access, no public write
- `user_brackets` and `user_picks`: users can read/write their own rows (matched by session_id)

---

## Gemini API Integration

### Primary Use Cases

1. **Matchup Analysis** — When a user views a matchup card, generate a 1-2 sentence pick rationale and a confidence level. Cache these in the `matchups` table so you don't re-call for every user.

2. **Team Scouting Report** — On the team deep dive screen, generate a 2-3 paragraph scouting report covering strengths, weaknesses, tournament ceiling/floor, and key players.

3. **Strategy-Based Picks** — When a user selects a strategy (safe/chaos/balanced), use the strategy as a system prompt modifier to bias the AI's recommendations.

### Gemini API Call Pattern

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function generateMatchupAnalysis(teamA, teamB) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are an expert college basketball analyst. Analyze this NCAA Tournament matchup and provide a pick.

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

Respond in JSON format:
{
  "pick": "Team A" or "Team B",
  "confidence": "high" | "medium" | "tossup" | "upset_alert",
  "win_probability": <number 0-100 for Team A>,
  "rationale": "<1-2 sentence explanation>",
  "key_factor": "<single most important factor in this matchup>"
}`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
```

### Caching Strategy

Pre-generate all 32 first-round matchup analyses once the bracket drops and store them in the `matchups` table. Later rounds get generated as the user progresses through their bracket (since the matchups depend on their picks). This keeps API costs low and response times fast.

---

## App Structure

```
src/
├── main.jsx
├── App.jsx
├── index.css                    # Tailwind imports + custom styles
├── lib/
│   ├── supabase.js              # Supabase client init
│   ├── gemini.js                # Gemini API helper functions
│   └── store.js                 # Zustand store
├── components/
│   ├── Layout.jsx               # App shell, nav, background
│   ├── MatchupCard.jsx          # Core swipe-through matchup card
│   ├── TeamCard.jsx             # Team info within a matchup
│   ├── BracketView.jsx          # Full bracket visualization
│   ├── TeamDeepDive.jsx         # Team scouting report page
│   ├── ConfidenceBadge.jsx      # High/Medium/Tossup/Upset badge
│   ├── ProbabilityBar.jsx       # Visual win probability bar
│   ├── ProgressTracker.jsx      # Round progress indicator
│   ├── StrategySelector.jsx     # Pre-bracket strategy picker
│   ├── ShareCard.jsx            # Export/share completed bracket
│   └── PowerRankings.jsx        # Pre-tournament team rankings
├── pages/
│   ├── Home.jsx                 # Landing page
│   ├── BracketBuilder.jsx       # Matchup-by-matchup bracket flow
│   ├── MyBracket.jsx            # Bracket overview/visualization
│   ├── Team.jsx                 # Team deep dive page
│   ├── Rankings.jsx             # Pre-tournament power rankings
│   └── Share.jsx                # Share/export page
└── data/
    └── teams-seed.json          # Fallback static team data
```

---

## Design System

### Color Palette
```css
:root {
  --bg-primary: #0B1120;          /* Deep navy, almost black */
  --bg-secondary: #111B2E;        /* Slightly lighter navy */
  --bg-card: #162036;             /* Card backgrounds */
  --accent-primary: #FF6B2B;      /* Tournament orange */
  --accent-secondary: #00D4AA;    /* Teal/mint for secondary actions */
  --accent-danger: #FF3B5C;       /* Upset alert red */
  --accent-safe: #00D4AA;         /* High confidence green */
  --accent-tossup: #FFB800;       /* Tossup yellow */
  --text-primary: #F1F5F9;        /* Near white */
  --text-secondary: #94A3B8;      /* Muted blue-gray */
  --text-dim: #475569;            /* Very muted */
  --border: #1E293B;              /* Subtle borders */
}
```

### Typography
- **Display/Headers:** "Outfit" (Google Fonts) — bold, geometric, sporty without being generic
- **Body:** "Plus Jakarta Sans" (Google Fonts) — clean, modern, excellent readability
- **Stats/Numbers:** "JetBrains Mono" or "Space Mono" — monospace for stat displays

### Design Principles
- **Dark mode only** — sports premium feel, like a broadcast studio
- **Card-based UI** — rounded corners (12-16px), subtle glass morphism on cards
- **Motion:** Smooth card transitions when picking teams. Slide-in animations for matchup cards. Pulse animation on upset alerts.
- **Mobile-first:** Design for 375px width first. Cards should be full-width with comfortable tap targets (min 48px).
- **Data visualization:** Use horizontal bars for probability, colored badges for confidence, and simple stat comparisons (not charts).

---

## Pre-Tournament Mode (Ship This First)

Before the bracket drops on March 15, the app should still provide value:

1. **Power Rankings** — Show all projected tournament teams ranked by AI analysis. Pull from current AP rankings, NET rankings, and KenPom-style metrics.
2. **Upset Watch** — AI-identified teams likely to bust brackets. Mid-majors with strong metrics, hot streaks, etc.
3. **Sleeper Picks** — Teams the AI thinks are undervalued.
4. **Team Explorer** — Browse all ~68 projected teams with scouting reports.
5. **Strategy Quiz** — "What kind of bracket picker are you?" fun quiz that recommends a strategy.

This gives you content to share and market in the 3 weeks before the tournament.

---

## Key User Flows

### Flow 1: Build a Bracket (Post-Selection Sunday)
1. User lands on home page → taps "Build My Bracket"
2. Strategy Selector → user picks safe/chaos/balanced/custom
3. Matchup Card flow → one matchup at a time, starting with Round of 64
4. For each matchup: see AI analysis → tap to pick a team → next matchup
5. After Round of 64, show bracket overview, then continue to Round of 32
6. Repeat through Championship
7. Show completed bracket → share/export options

### Flow 2: Explore Teams (Pre-Tournament)
1. User browses Power Rankings
2. Taps a team → sees deep dive with AI scouting report
3. Can flag teams as "my sleeper" or "avoid" for later bracket building

---

## MVP Priorities (Tonight)

### Must Have
- [ ] Landing page with branding and CTA
- [ ] Strategy selector screen
- [ ] Matchup card component with AI analysis display
- [ ] Ability to pick a team and advance to next matchup
- [ ] Basic bracket overview showing picks
- [ ] Supabase connected with teams table seeded
- [ ] Gemini API integration for matchup analysis
- [ ] Mobile-responsive dark theme

### Nice to Have (This Week)
- [ ] Share bracket as image
- [ ] Team deep dive pages
- [ ] Pre-tournament power rankings
- [ ] Progress persistence (refresh doesn't lose picks)
- [ ] Multiple bracket support

### Later
- [ ] User auth
- [ ] Live tournament results tracking
- [ ] Bracket comparison with friends
- [ ] Premium tier with advanced strategies

---

## Seeding Team Data

For the MVP, manually compile team data from publicly available sources:
- **KenPom** (kenpom.com) — offensive/defensive ratings
- **NCAA NET Rankings** — official NCAA ranking metric
- **ESPN BPI** — Basketball Power Index
- **Sports Reference** (sports-reference.com) — box score stats

Create a `teams-seed.json` in `/src/data/` as a fallback, and also insert into Supabase. Until Selection Sunday, use projected field of 68 from ESPN Bracketology.

---

## Important Notes

1. **NCAA Trademark:** "March Madness" is trademarked by the NCAA. Use "NCAA Tournament" or "The Big Dance" or "college basketball tournament" in marketing copy. "BracketAI" as a product name is fine.
2. **No gambling features.** This is a bracket assistant, not a betting app. No odds, no sportsbook integration, no real-money wagers.
3. **Gemini API rate limits:** Cache aggressively. Pre-generate Round of 64 analysis. Don't call the API on every page load.
4. **Accessibility:** High contrast text on dark backgrounds. Large tap targets. Screen reader labels on interactive elements.
5. **Performance:** Target < 3 second initial load. Lazy load team images. Keep bundle small.