export type Schedule = {
  copyright: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  dates: DateElement[];
};

export type DateElement = {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  games: Game[];
  events: unknown[];
};

export type Game = {
  gamePk: number;
  gameGuid: string;
  link: string;
  gameType: GameType;
  season: string;
  gameDate: string;
  officialDate: string;
  status: Status;
  teams: Teams;
  linescore: Linescore;
  venue: Venue;
  scoringPlays: ScoringPlay[];
  content: Content;
  seriesStatus: SeriesStatus;
  gameNumber: number;
  publicFacing: boolean;
  doubleHeader: DoubleHeader;
  gamedayType: GamedayType;
  tiebreaker: DoubleHeader;
  calendarEventID: string;
  seasonDisplay: string;
  dayNight: DayNight;
  scheduledInnings: number;
  reverseHomeAwayStatus: boolean;
  inningBreakLength: number;
  gamesInSeries: number;
  seriesGameNumber: number;
  seriesDescription: SeriesDescription;
  recordSource: RecordSource;
  ifNecessary: DoubleHeader;
  ifNecessaryDescription: IfNecessaryDescription;
  rescheduleDate?: string;
  rescheduleGameDate?: string;
  resumeDate?: string;
  resumeGameDate?: string;
  resumedFrom?: string;
  resumedFromDate?: string;
  description?: string;
};

export type Content = {
  link: string;
};

export type DayNight = "day" | "night";

export type DoubleHeader = "N" | "Y";

export type GameType = "R";

export type GamedayType = "P" | "F";

export type IfNecessaryDescription = "Normal Game";

export type RecordSource = "S" | "P" | "D" | "I";

export type SeriesDescription =
  | "Regular Season"
  | "Division Series"
  | "League Championship Series"
  | "World Series"
  | "Wild Card"
  | (string & {});

export interface SeriesStatus {
  gameNumber: number;
  totalGames: number;
  isTied: boolean;
  isOver: boolean;
  wins: number;
  losses: number;
  winningTeam?: IngTeam;
  losingTeam?: IngTeam;
  description: SeriesStatusDescription;
  shortDescription: string;
  result?: string;
  shortName: ShortNameEnum;
  abbreviation: ShortNameEnum;
}

export type ShortNameEnum =
  | "NLDS"
  | "ALDS"
  | "NLCS"
  | "ALCS"
  | "WS"
  | (string & {});

export type SeriesStatusDescription =
  | "NL Division Series"
  | "AL Division Series"
  | "NL Championship Series"
  | "AL Championship Series"
  | "World Series"
  | (string & {});

export interface IngTeam {
  springLeague: Venue;
  allStarStatus: DoubleHeader;
  id: number;
  name: string;
  link: string;
}

export type Status = {
  abstractGameState: AbstractGameState;
  codedGameState: RecordSource;
  detailedState: DetailedState;
  statusCode: StatusCode;
  startTimeTBD: boolean;
  abstractGameCode: GamedayType;
  reason?: string;
};

export type AbstractGameState = "Preview" | "Final" | "Live";

export type DetailedState =
  | "Pre-Game"
  | "Scheduled"
  | "Postponed"
  | "Warmup"
  | "In Progress"
  | "Game Over"
  | "Final";

export type StatusCode = "P" | "S" | "DI" | "PW" | "I";

export type Teams = {
  away: Away;
  home: Away;
};

export type Away = {
  leagueRecord: LeagueRecord;
  score?: number;
  team: Venue;
  splitSquad: boolean;
  seriesNumber: number;
};

export type LeagueRecord = {
  wins: number;
  losses: number;
  pct: string;
};

export type Venue = {
  id: number;
  name: string;
  link: string;
};

export type InningHalfEnum = "Top" | "Bottom" | "Middle";

export type InningAway = {
  runs?: number;
  hits?: number;
  errors?: number;
  leftOnBase?: number;
};

export type Inning = {
  num: number;
  ordinalNum: string;
  home: InningAway;
  away: InningAway;
};

export type LinescoreTeams = {
  home: InningAway;
  away: InningAway;
};

export type Linescore = {
  currentInning?: number;
  currentInningOrdinal?: string;
  inningState?: InningHalfEnum;
  inningHalf?: InningHalfEnum;
  isTopInning?: boolean;
  scheduledInnings: number;
  innings: Inning[];
  teams: LinescoreTeams;
  defense: Defense;
  offense: Offense;
  balls?: number;
  strikes?: number;
  outs?: number;
};

export type Batter = {
  id: number;
  fullName: string;
  link: string;
};

export type Defense = {
  pitcher?: Batter;
  catcher?: Batter;
  first?: Batter;
  second?: Batter;
  third?: Batter;
  shortstop?: Batter;
  left?: Batter;
  center?: Batter;
  right?: Batter;
  batter?: Batter;
  onDeck?: Batter;
  inHole?: Batter;
  battingOrder?: number;
  team: Venue;
};

export type Offense = {
  batter?: Batter;
  onDeck?: Batter;
  inHole?: Batter;
  pitcher?: Batter;
  battingOrder?: number;
  team: Venue;
  first?: Batter;
  second?: Batter;
  third?: Batter;
};

export interface ScoringPlay {
  result: Result;
  about: About;
  count: Count;
  matchup: Matchup;
  // pitchIndex:  any[];
  // actionIndex: any[];
  // runnerIndex: any[];
  // runners:     any[];
  // playEvents:  any[];
}

export interface About {
  halfInning: string;
  inning: number;
}

export interface Count {
  balls: number;
  strikes: number;
  outs: number;
}

export interface Matchup {
  batter: Batter;
  pitcher: Batter;
  // batterHotColdZones:  any[];
  // pitcherHotColdZones: any[];
  // splits:              Splits;
}

export interface Result {
  type: string;
  event: string;
  description: string;
  rbi: number;
  awayScore: number;
  homeScore: number;
}
