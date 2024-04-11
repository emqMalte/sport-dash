import { twMerge } from "tailwind-merge";
import { Away, DetailedState, Game, Linescore } from "../types/mlb/Schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

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
  className,
}: {
  team: Away;
  detailedState: DetailedState;
  className?: string;
}) => {
  const teamShortName =
    teamMappings[team.team.name as keyof typeof teamMappings];

  return (
    <div
      className={twMerge(
        "col-span-3 flex flex-row items-center justify-between text-lg",
        className,
      )}
    >
      <div className="flex">
        <img
          src={`/mlb/light/${teamShortName.toLowerCase()}_l.svg`}
          alt={team.team.name}
          className="h-8 w-8"
        />
        <span className="ml-2 font-semibold">{teamShortName}</span>
      </div>
      {detailedState !== "In Progress" && (
        <span>
          {team.leagueRecord.wins} - {team.leagueRecord.losses}
        </span>
      )}
      {showScoreDetailedStates.includes(detailedState) && (
        <span className="font-bold">{team.score}</span>
      )}
    </div>
  );
};

const Bases = ({ linescore }: { linescore: Linescore }) => {
  const outs = [];

  for (let i = 0; i < 3; i++) {
    if (linescore?.outs && i < linescore.outs) {
      outs.push(
        <FontAwesomeIcon
          key={i}
          icon={faCircleSolid}
          className="text-red-800"
        />,
      );
      continue;
    }
    outs.push(<FontAwesomeIcon key={i} icon={faCircle} />);
  }

  return (
    <div className="col-span-3 row-span-2 ">
      <div className="relative m-3 mx-auto h-16 w-24">
        <div
          className={`mx-auto h-8 w-8 rotate-45 border-2 border-black transition-colors ${linescore.offense.second && "bg-orange-700"}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 inline-block h-8 w-8 rotate-45 border-2 border-black transition-colors ${linescore.offense.third && "bg-orange-700"} `}
        ></div>
        <div
          className={`absolute bottom-0 right-0 inline-block h-8 w-8 rotate-45 border-2 border-black transition-colors ${linescore.offense.first && "bg-orange-700"}`}
        ></div>
        <div className="absolute -bottom-2 right-1/2 flex translate-x-1/2 gap-1 text-xs">
          {outs}
        </div>
        {
          //<div className="absolute -right-4 top-0  font-semibold">
          //<FontAwesomeIcon icon={faCaretUp} />
          //17th
          //</div>
        }
      </div>
    </div>
  );
};

interface ScheduleGameCardProps {
  game: Game;
}
export const ScheduleGameCard = ({ game }: ScheduleGameCardProps) => {
  const showScore = showScoreDetailedStates.includes(game.status.detailedState);
  const showBases = game.status.detailedState === "In Progress";
  const outs = [];

  for (let i = 0; i < 3; i++) {
    if (game?.linescore?.outs && i < game.linescore.outs) {
      outs.push(<FontAwesomeIcon key={i} icon={faCircleSolid} />);
      continue;
    }
    outs.push(<FontAwesomeIcon key={i} icon={faCircle} />);
  }

  return (
    <div
      className={`m-2 rounded border px-4 py-2 drop-shadow ${game.status.detailedState !== "In Progress" ? "bg-slate-200 grayscale" : ""}`}
    >
      <h2 className="text-lg font-bold">
        {game.teams.away.team.name} @ {game.teams.home.team.name}{" "}
      </h2>
      <div className="text-center">
        {showScore ? (
          <span>
            <span className="font-semibold">{game.linescore.inningState}</span>{" "}
            of the{" "}
            <span className="font-semibold">
              {game.linescore.currentInningOrdinal}
            </span>
          </span>
        ) : (
          <>
            <span className="font-semibold">Time:</span>{" "}
            {new Date(game.gameDate).toLocaleTimeString()}
          </>
        )}
      </div>
      <div className="my-2 grid grid-cols-6 grid-rows-2 gap-2">
        <TeamScore
          team={game.teams.away}
          detailedState={game.status.detailedState}
          className={`row-start-1 ${showBases ? "col-span-3" : "col-span-6"}`}
        />
        <TeamScore
          team={game.teams.home}
          detailedState={game.status.detailedState}
          className={`row-start-2 ${showBases ? "col-span-3" : "col-span-6"}`}
        />

        {showBases && <Bases linescore={game.linescore} />}
      </div>
      <div className="flex justify-center gap-2">
        <div>
          <span className="font-semibold">Status:</span>{" "}
          {game.status.detailedState}
        </div>
      </div>
    </div>
  );
};
