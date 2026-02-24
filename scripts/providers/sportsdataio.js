import {
  DataProvider,
  safeText,
  toNumber,
  winLossToRecord,
  cleanRegion,
  normalizeSeed,
  normalizeTeamText,
  stripMascotSuffix,
  teamScore,
  dedupeTeams,
} from './base.js';

const D1_CONFERENCE_ALIASES = [
  'aec',
  'americaneast',
  'americaneastconference',
  'aac',
  'americanathletic',
  'americanathleticconference',
  'acc',
  'atlanticcoast',
  'atlanticcoastconference',
  'a10',
  'atlantic10',
  'atlantic10conference',
  'asun',
  'atlanticsun',
  'atlanticsunconference',
  'big12',
  'big12conference',
  'bigeast',
  'bigeastconference',
  'bigsky',
  'bigskyconference',
  'bigsouth',
  'bigsouthconference',
  'bigten',
  'bigtenconference',
  'bigwest',
  'bigwestconference',
  'caa',
  'coastalathleticassociation',
  'colonialathleticassociation',
  'conferenceusa',
  'cusa',
  'horizon',
  'horizonleague',
  'ivy',
  'ivyleague',
  'maac',
  'metroatlanticathleticconference',
  'mac',
  'midamericanconference',
  'meac',
  'mideasternathleticconference',
  'mvc',
  'missourivalleyconference',
  'mwc',
  'mountainwest',
  'mountainwestconference',
  'nec',
  'northeastconference',
  'ovc',
  'ohiovalleyconference',
  'patriot',
  'patriotleague',
  'sec',
  'southeasternconference',
  'socon',
  'southernconference',
  'southland',
  'southlandconference',
  'summit',
  'summitleague',
  'sunbelt',
  'sunbeltconference',
  'swac',
  'southwesternathleticconference',
  'wac',
  'westernathleticconference',
  'wcc',
  'westcoastconference',
  'independent',
  'independents',
];

function buildHeaders(apiKey) {
  return {
    'Ocp-Apim-Subscription-Key': apiKey,
    Accept: 'application/json',
  };
}

function normalizeToken(value) {
  return safeText(value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function pickNumber(row, keys, fallback = null) {
  for (const key of keys) {
    if (key in row) {
      const parsed = toNumber(row[key], null);
      if (parsed !== null) {
        return parsed;
      }
    }
  }
  return fallback;
}

function perGame(total, games) {
  if (total === null || games <= 0) {
    return null;
  }
  return Math.round((total / games) * 10) / 10;
}

function normalizePercent(value) {
  if (value === null) {
    return null;
  }
  if (value >= 0 && value <= 1) {
    return Math.round(value * 1000) / 10;
  }
  return Math.round(value * 10) / 10;
}

function isKnownDivisionOneConference(value) {
  const normalized = normalizeToken(value);
  if (!normalized) {
    return false;
  }

  return D1_CONFERENCE_ALIASES.some((alias) => normalized.includes(alias) || alias.includes(normalized));
}

function inferDivisionOne(row = {}, team = {}) {
  const numericDivision = toNumber(
    row.Division ?? row.DivisionNumber ?? team.Division ?? team.DivisionNumber ?? null,
    null
  );
  if (numericDivision !== null) {
    return numericDivision === 1;
  }

  const divisionText = [
    row.DivisionName,
    row.Division,
    row.Level,
    row.Classification,
    row.Subdivision,
    team.DivisionName,
    team.Division,
    team.Level,
    team.Classification,
    team.Subdivision,
  ]
    .map((value) => safeText(value).toLowerCase())
    .filter(Boolean)
    .join(' ');

  if (divisionText.includes('division i') || divisionText.includes('division 1') || divisionText.includes('d1')) {
    return true;
  }

  if (
    divisionText.includes('division ii') ||
    divisionText.includes('division iii') ||
    divisionText.includes('division 2') ||
    divisionText.includes('division 3') ||
    divisionText.includes('d2') ||
    divisionText.includes('d3') ||
    divisionText.includes('naia') ||
    divisionText.includes('njcaa') ||
    divisionText.includes('juco')
  ) {
    return false;
  }

  const conference = [
    row.Conference,
    row.ConferenceName,
    row.ConferenceShortName,
    row.League,
    row.LeagueName,
    team.Conference,
    team.ConferenceName,
    team.ConferenceShortName,
    team.League,
    team.LeagueName,
  ]
    .map((value) => safeText(value))
    .find(Boolean);
  if (isKnownDivisionOneConference(conference)) {
    return true;
  }

  return false;
}

export class SportsDataIOProvider extends DataProvider {
  constructor(config) {
    super('sportsdataio');
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
    this.teamsPath = config.teamsPath;
    this.standingsPath = config.standingsPath;
    this.gamesPath = config.gamesPath;
    this.season = config.season;
    this.tournamentOnly = config.tournamentOnly;
    this.d1Only = config.d1Only;
  }

  async request(pathTemplate, options = {}) {
    const path = pathTemplate.replace('{season}', this.season);
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: buildHeaders(this.apiKey),
      ...options,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`SportsDataIO ${res.status} for ${url}: ${body.slice(0, 240)}`);
    }

    return res.json();
  }

  async requestFirst(paths) {
    let lastError = null;
    for (const p of paths) {
      try {
        return await this.request(p);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('All provider paths failed');
  }

  async fetchTeams() {
    const [teamsRaw, standingsRaw] = await Promise.all([
      this.requestFirst(this.teamsPath),
      this.requestFirst(this.standingsPath),
    ]);

    const teamsByKey = new Map();
    for (const team of Array.isArray(teamsRaw) ? teamsRaw : []) {
      // Use stable unique identifiers only — avoid Name (mascot) which is non-unique
      const keys = [
        team.TeamID,
        team.Key,
        team.Team,
        team.School,
        team.GlobalTeamID,
      ];
      for (const key of keys) {
        if (key !== undefined && key !== null && safeText(key)) {
          teamsByKey.set(String(key), team);
        }
      }
    }

    // Build a set of D1 team IDs using the teams endpoint's Conference field
    const d1TeamIds = new Set();
    if (this.d1Only) {
      for (const team of Array.isArray(teamsRaw) ? teamsRaw : []) {
        if (isKnownDivisionOneConference(team.Conference) || inferDivisionOne({}, team)) {
          if (team.TeamID !== undefined) d1TeamIds.add(String(team.TeamID));
          if (team.GlobalTeamID !== undefined) d1TeamIds.add(String(team.GlobalTeamID));
          if (team.Key) d1TeamIds.add(String(team.Key));
        }
      }
    }

    const standings = Array.isArray(standingsRaw) ? standingsRaw : [];
    const filteredStandings = standings.filter((row) => {
      if (!this.d1Only) {
        return true;
      }

      // Match standings to D1 teams via ID-based lookup
      const rowIds = [row.TeamID, row.GlobalTeamID, row.Key, row.Team];
      return rowIds.some((id) => id !== undefined && id !== null && d1TeamIds.has(String(id)));
    });

    let standingsForNormalization = filteredStandings;
    if (this.d1Only && standings.length && !filteredStandings.length) {
      console.warn(
        `D1 filter matched 0 of ${standings.length} standings rows (${d1TeamIds.size} D1 team IDs found); falling back to unfiltered standings.`
      );
      standingsForNormalization = standings;
    } else if (this.d1Only) {
      console.log(`D1 filter: ${filteredStandings.length} of ${standings.length} standings rows matched D1 teams`);
    }

    const normalized = standingsForNormalization.map((row, idx) => {
      const rowKeys = [
        row.TeamID,
        row.Key,
        row.Team,
        row.School,
        row.Name,
        row.GlobalTeamID,
      ];
      const team =
        rowKeys
          .map((value) => (value !== undefined && value !== null ? teamsByKey.get(String(value)) : null))
          .find(Boolean) || {};
      const key = row.TeamID ?? row.Key ?? row.Team ?? row.School ?? row.Name;

      const wins = pickNumber(row, ['Wins', 'OverallWins', 'TotalWins', 'Win'], 0);
      const losses = pickNumber(row, ['Losses', 'OverallLosses', 'TotalLosses', 'Loss'], 0);
      const games = pickNumber(row, ['Games', 'GamesPlayed', 'TotalGames'], wins + losses) || 1;
      const possessions = pickNumber(row, [
        'Possessions',
        'EstimatedPossessions',
        'OffensivePossessions',
        'TeamPossessions',
      ]);
      const points = pickNumber(row, [
        'Points',
        'PointsFor',
        'TotalPoints',
        'Scored',
      ]);
      const teamName = safeText(
        row.Name ?? row.School ?? row.TeamName ?? team.School ?? team.Name,
        `Team ${idx + 1}`
      );
      const shortName = safeText(row.Key ?? team.Key ?? teamName.split(' ').slice(-1)[0], teamName.slice(0, 4).toUpperCase());

      // Compute per-game and efficiency stats from season totals
      const ppg = perGame(points, games);
      const oppPoints = pickNumber(row, [
        'OpponentPoints',
        'PointsAgainst',
        'OpponentPointsAgainst',
        'TotalPointsAgainst',
        'Allowed',
      ]);
      const oppPpg = perGame(oppPoints, games);
      const offRtg = possessions && points !== null ? Math.round((points / possessions) * 1000) / 10 : null;
      const defRtg = possessions && oppPoints !== null ? Math.round((oppPoints / possessions) * 1000) / 10 : null;
      const totalReb = pickNumber(row, ['Rebounds', 'TotalRebounds']);
      const rebPerGame = perGame(totalReb, games);
      const threeMade = pickNumber(row, [
        'ThreePointersMade',
        'ThreePointFieldGoalsMade',
        'ThreePointFGM',
        'ThreePointMade',
      ]);
      const threeAtt = pickNumber(row, [
        'ThreePointersAttempted',
        'ThreePointFieldGoalsAttempted',
        'ThreePointFGA',
        'ThreePointAttempted',
      ]);
      const computedThreePct = threeMade !== null && threeAtt > 0 ? Math.round((threeMade / threeAtt) * 1000) / 10 : null;
      const turnovers = pickNumber(row, ['Turnovers', 'TurnoversCommitted', 'Turnover']);
      const computedTurnoverRate = turnovers !== null && possessions > 0 ? Math.round((turnovers / possessions) * 1000) / 10 : null;
      const explicitOffRtg = pickNumber(row, [
        'OffensiveRating',
        'OffRating',
        'OffensiveEfficiency',
        'AdjOffensiveRating',
      ]);
      const explicitDefRtg = pickNumber(row, [
        'DefensiveRating',
        'DefRating',
        'DefensiveEfficiency',
        'AdjDefensiveRating',
      ]);
      const explicitNetRtg = pickNumber(row, [
        'NetRating',
        'NetEfficiency',
        'EfficiencyMargin',
      ]);
      const explicitThreePct = pickNumber(row, [
        'ThreePointersPercentage',
        'ThreePointPercentage',
        'ThreePointPct',
        'ThreePointFieldGoalPercentage',
        'ThreePointShootingPercentage',
      ]);
      const explicitTurnoverRate = pickNumber(row, [
        'TurnOversPercentage',
        'TurnoverPercentage',
        'TurnoverRate',
        'TurnoversPerPossession',
      ]);
      const explicitTurnoversPerGame = pickNumber(row, [
        'TurnoversPerGame',
        'AvgTurnovers',
        'AverageTurnovers',
      ]);
      const explicitReboundMargin = pickNumber(row, [
        'ReboundMargin',
        'AvgReboundMargin',
      ]);
      const explicitPpg = pickNumber(row, [
        'PointsPerGame',
        'PPG',
        'AveragePointsScored',
        'PointsForPerGame',
      ]);
      const explicitOppPpg = pickNumber(row, [
        'OpponentPointsPerGame',
        'OppPPG',
        'AveragePointsAllowed',
        'PointsAgainstPerGame',
      ]);
      const explicitSos = pickNumber(row, [
        'StrengthOfSchedule',
        'SOS',
        'StrengthOfScheduleValue',
      ]);

      return {
        provider_team_id: safeText(key, `${idx + 1}`),
        name: teamName,
        short_name: shortName.toUpperCase(),
        seed: normalizeSeed(row.Seed ?? row.TournamentSeed ?? null),
        conference: safeText(
          team.Conference ??
            team.ConferenceName ??
            team.ConferenceShortName ??
            row.Conference ??
            row.ConferenceName ??
            row.ConferenceShortName ??
            row.League ??
            row.LeagueName ??
            team.League ??
            team.LeagueName,
          'Unknown'
        ),
        record: winLossToRecord(wins, losses),
        wins,
        losses,
        offensive_rating: explicitOffRtg ?? offRtg,
        defensive_rating: explicitDefRtg ?? defRtg,
        net_rating: explicitNetRtg ?? (explicitOffRtg !== null && explicitDefRtg !== null
          ? Math.round((explicitOffRtg - explicitDefRtg) * 10) / 10
          : offRtg !== null && defRtg !== null
            ? Math.round((offRtg - defRtg) * 10) / 10
            : null),
        strength_of_schedule: explicitSos,
        three_point_pct: normalizePercent(explicitThreePct ?? computedThreePct),
        turnover_rate: normalizePercent(explicitTurnoverRate ?? computedTurnoverRate),
        turnovers_per_game: explicitTurnoversPerGame ?? perGame(turnovers, games),
        rebound_margin: explicitReboundMargin ?? rebPerGame,
        ppg: explicitPpg ?? ppg,
        opp_ppg: explicitOppPpg ?? oppPpg,
        quad1_wins: toNumber(row.Quad1Wins ?? 0, 0),
        quad1_losses: toNumber(row.Quad1Losses ?? 0, 0),
        region: cleanRegion(row.Region ?? row.TournamentRegion),
        logo_url: safeText(team.TeamLogoUrl ?? team.WikipediaLogoUrl ?? team.LogoUrl ?? null, null),
      };
    });

    return dedupeTeams(normalized);
  }

  async fetchMatchups(teamIdLookup = new Map()) {
    const gamesRaw = await this.requestFirst(this.gamesPath);
    const games = Array.isArray(gamesRaw) ? gamesRaw : [];

    const normalized = [];
    const roundCounts = new Map();

    const inferRound = (game) => {
      const fromNumber = toNumber(game.TournamentRound ?? game.Round ?? null, null);
      if (fromNumber !== null && fromNumber >= 1 && fromNumber <= 6) {
        return fromNumber;
      }

      const name = safeText(game.RoundName ?? game.Name ?? '', '').toLowerCase();
      if (!name) {
        return null;
      }

      if (name.includes('round of 64')) return 1;
      if (name.includes('round of 32')) return 2;
      if (name.includes('sweet 16')) return 3;
      if (name.includes('elite 8') || name.includes('elite eight')) return 4;
      if (name.includes('final four')) return 5;
      if (name.includes('championship') || name.includes('title')) return 6;
      return null;
    };

    const inferRoundName = (round, game) => {
      const mapped = {
        1: 'Round of 64',
        2: 'Round of 32',
        3: 'Sweet 16',
        4: 'Elite Eight',
        5: 'Final Four',
        6: 'Championship',
      };
      return safeText(game.RoundName, mapped[round] || `Round ${round}`);
    };

    for (const game of games) {
      const homeProviderId = safeText(game.HomeTeamID ?? game.HomeTeam ?? '');
      const awayProviderId = safeText(game.AwayTeamID ?? game.AwayTeam ?? '');
      const teamAId = teamIdLookup.get(homeProviderId) || null;
      const teamBId = teamIdLookup.get(awayProviderId) || null;

      if (!teamAId || !teamBId) {
        continue;
      }

      const round = inferRound(game);
      if (this.tournamentOnly && (round === null || round < 1 || round > 6)) {
        continue;
      }

      const safeRound = round || 1;
      const running = (roundCounts.get(safeRound) || 0) + 1;
      roundCounts.set(safeRound, running);
      const providerGameId = safeText(game.GameID ?? game.GlobalGameID ?? `${safeRound}-${running}`);

      normalized.push({
        provider_game_id: providerGameId,
        round: safeRound,
        round_name: inferRoundName(safeRound, game),
        region: cleanRegion(game.Region ?? game.TournamentRegion),
        game_number: running,
        team_a_id: teamAId,
        team_b_id: teamBId,
        team_a_seed: normalizeSeed(game.HomeTeamSeed ?? null),
        team_b_seed: normalizeSeed(game.AwayTeamSeed ?? null),
      });
    }

    return normalized;
  }
}

export function createSportsDataIOProviderFromEnv(env) {
  const splitPaths = (value, fallback) =>
    String(value || fallback)
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

  return new SportsDataIOProvider({
    apiKey: env.SPORTSDATAIO_API_KEY,
    baseUrl: env.SPORTSDATAIO_BASE_URL || 'https://api.sportsdata.io/v3/cbb/stats',
    teamsPath: splitPaths(env.SPORTSDATAIO_TEAMS_PATH, '/json/teams,/json/Teams'),
    standingsPath: splitPaths(
      env.SPORTSDATAIO_STANDINGS_PATH,
      '/json/Standings/{season},/json/TeamSeasonStats/{season},/json/StandingsBasic/{season}'
    ),
    gamesPath: splitPaths(env.SPORTSDATAIO_GAMES_PATH, '/json/Games/{season},/json/GamesBySeason/{season}'),
    season: env.SPORTSDATAIO_SEASON || '2025',
    tournamentOnly: String(env.SYNC_TOURNAMENT_ONLY || 'true').toLowerCase() !== 'false',
    d1Only: String(env.SYNC_D1_ONLY || 'true').toLowerCase() !== 'false',
  });
}
