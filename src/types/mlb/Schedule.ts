export type Schedule = {
  copyright: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  dates: DateElement[];
};

export type DateElement = {
  date: Date;
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
  gameDate: Date;
  officialDate: Date;
  status: Status;
  teams: Teams;
  venue: Venue;
  content: Content;
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
  rescheduleDate?: Date;
  rescheduleGameDate?: Date;
  description?: string;
};

export type Content = {
  link: string;
};

export type DayNight = "day" | "night";

export type DoubleHeader = "N";

export type GameType = "R";

export type GamedayType = "P" | "F";

export type IfNecessaryDescription = "Normal Game";

export type RecordSource = "S" | "P" | "D" | "I";

export type SeriesDescription = "Regular Season";

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
  | "In Progress";

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
