import { twMerge } from "tailwind-merge";
import { Away, Game, Linescore } from "../types/mlb/Schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  isDelayed,
  isFinal,
  isInProgress,
  isPregame,
  showScores,
} from "../utils/gameState";
import { cva } from "class-variance-authority";

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

const TeamScoreLine = ({
  team,
  className,
  game,
}: {
  team: Away;
  game: Game;

  className?: string;
}) => {
  const teamShortName =
    teamMappings[team.team.name as keyof typeof teamMappings];
  const showLeagueRecord = !isInProgress(game);
  const showScore = isInProgress(game) || isFinal(game);

  return (
    <div className={twMerge("grid grid-cols-3 text-lg", className)}>
      <div className="flex items-center">
        <img
          src={`/mlb/light/${teamShortName.toLowerCase()}_l.svg`}
          alt={team.team.name}
          className="h-8 w-8"
        />
        <span className="ml-2 font-semibold">{teamShortName}</span>
      </div>
      {showLeagueRecord && (
        <span className={twMerge("text-end", !showScore ? "col-span-2" : "")}>
          {team.leagueRecord.wins} - {team.leagueRecord.losses}
        </span>
      )}
      {showScore && (
        <span
          className={twMerge(
            "text-end font-bold",
            !showLeagueRecord ? "col-span-2" : "",
          )}
        >
          {team.score}
        </span>
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
      </div>
    </div>
  );
};

const scheduleGameCardVariant = cva(
  ["m-2 rounded border border-t-4 px-4 py-2 drop-shadow"],
  {
    variants: {
      gameState: {
        default: ["bordert-t-slate-800"],
        pregame: ["border-t-blue-700", "bg-slate-50", "grayscale"],
        inProgress: ["border-t-green-700"],
        delayed: ["border-t-red-900", "bg-slate-300"],
        final: ["border-t-slate-800", "bg-slate-100"],
      },
    },
    defaultVariants: {
      gameState: "default",
    },
  },
);

interface ScheduleGameCardProps {
  game: Game;
}
export const ScheduleGameCard = ({ game }: ScheduleGameCardProps) => {
  const showScore = showScores(game);
  const showBases = isInProgress(game);
  const outs = [];

  for (let i = 0; i < 3; i++) {
    if (game?.linescore?.outs && i < game.linescore.outs) {
      outs.push(<FontAwesomeIcon key={i} icon={faCircleSolid} />);
      continue;
    }
    outs.push(<FontAwesomeIcon key={i} icon={faCircle} />);
  }

  const gameState = isFinal(game)
    ? "final"
    : isInProgress(game)
      ? "inProgress"
      : isDelayed(game)
        ? "delayed"
        : isPregame(game)
          ? "pregame"
          : "default";

  const classes = twMerge(scheduleGameCardVariant({ gameState: gameState }));

  return (
    <div className={classes}>
      <h2 className="text-lg font-bold">
        {game.teams.away.team.name} @ {game.teams.home.team.name}
      </h2>
      <div className="text-center">
        {showBases ? (
          <span>
            <span className="font-semibold">{game.linescore.inningState}</span>{" "}
            of the{" "}
            <span className="font-semibold">
              {game.linescore.currentInningOrdinal}
            </span>
          </span>
        ) : showScore ? (
          <span className="font-semibold">{game.status.detailedState}</span>
        ) : (
          <>
            {isDelayed(game) && (
              <>
                <span className="font-bold italic underline">
                  {game.status.detailedState}
                </span>
                {" - "}
              </>
            )}
            <span className="font-semibold">Time:</span>{" "}
            {new Date(game.gameDate).toLocaleTimeString()}{" "}
          </>
        )}
      </div>
      <div className="my-2 grid grid-cols-6 grid-rows-2 gap-2">
        <TeamScoreLine
          team={game.teams.away}
          game={game}
          className={`row-start-1 ${showBases ? "col-span-3" : "col-span-6"}`}
        />
        <TeamScoreLine
          team={game.teams.home}
          game={game}
          className={`row-start-2 ${showBases ? "col-span-3" : "col-span-6"}`}
        />

        {showBases && <Bases linescore={game.linescore} />}
      </div>
    </div>
  );
};
