import { Away, DetailedState, Game } from "../types/mlb/Schedule";

const teamMappings = {
  "Baltimore Orioles": "BAL",
  "Boston Red Sox": "BOS",
  "New York Yankees": "NYY",
  "Tampa Bay Rays": "TB",
  "Toronto Blue Jays": "TOR",
  "Chicago White Sox": "CWS",
  "Cleveland Guardians": "CLE",
  "Detroit Tigers": "DET",
  "Kansas City Royals": "KC",
  "Minnesota Twins": "MIN",
  "Houston Astros": "HOU",
  "Los Angeles Angels": "LAA",
  "Oakland Athletics": "OAK",
  "Seattle Mariners": "SEA",
  "Texas Rangers": "TEX",
  "Atlanta Braves": "ATL",
  "Miami Marlins": "MIA",
  "New York Mets": "NYM",
  "Philadelphia Phillies": "PHI",
  "Washington Nationals": "WSH",
  "Chicago Cubs": "CHC",
  "Cincinnati Reds": "CIN",
  "Milwaukee Brewers": "MIL",
  "Pittsburgh Pirates": "PIT",
  "St. Louis Cardinals": "STL",
  "Arizona Diamondbacks": "ARI",
  "Colorado Rockies": "COL",
  "Los Angeles Dodgers": "LAD",
  "San Diego Padres": "SD",
  "San Francisco Giants": "SF",
};

const showScoreDetailedStates: DetailedState[] = [
  "In Progress",
  "Game Over",
  "Final",
];

const TeamScore = ({
  team,
  detailedState,
}: {
  team: Away;
  detailedState: DetailedState;
}) => {
  return (
    <div className="flex flex-row items-center justify-between text-lg">
      <img
        src={`/mlb/light/${teamMappings[team.team.name as keyof typeof teamMappings].toLowerCase()}_l.svg`}
        alt={team.team.name}
        className="h-8 w-8"
      />
      {showScoreDetailedStates.includes(detailedState) ? (
        <span className="font-bold">{team.score}</span>
      ) : (
        <span className="">
          {team.leagueRecord.wins} - {team.leagueRecord.losses}
        </span>
      )}
    </div>
  );
};

interface ScheduleGameCardProps {
  game: Game;
}
export const ScheduleGameCard = ({ game }: ScheduleGameCardProps) => {
  return (
    <div
      className={`m-2 rounded border px-4 py-2 drop-shadow ${game.status.detailedState !== "In Progress" ? "bg-slate-200 grayscale" : ""}`}
    >
      <h2 className="text-lg font-bold">
        {game.teams.away.team.name} @ {game.teams.home.team.name}{" "}
      </h2>
      <div>
        <TeamScore
          team={game.teams.away}
          detailedState={game.status.detailedState}
        />
        <TeamScore
          team={game.teams.home}
          detailedState={game.status.detailedState}
        />
      </div>
      <div className="flex justify-between gap-2">
        <div>
          <span className="font-semibold">Status:</span>{" "}
          {game.status.detailedState}
        </div>
        <div>
          <span className="font-semibold">Time:</span>{" "}
          {new Date(game.gameDate).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
