import { twMerge } from "tailwind-merge";
import { Away, Game } from "../types/mlb/Schedule";
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
import { useContext } from "react";
import { SelectedGameContext } from "../contexts/SelectedGameContext";
import { TeamLogo } from "./TeamLogo";
import { TeamShortName } from "./TeamShortName";
import { Bases } from "./Bases";

const TeamScoreLine = ({
  team,
  className,
  game,
}: {
  team: Away;
  game: Game;

  className?: string;
}) => {
  const showLeagueRecord = !isInProgress(game);
  const showScore = isInProgress(game) || isFinal(game);

  return (
    <div
      className={twMerge("grid grid-cols-3 items-center text-lg", className)}
    >
      <div className="flex items-center">
        <TeamLogo team={team} />
        <TeamShortName team={team} />
      </div>
      <div className={twMerge("text-end", !showScore ? "col-span-2" : "")}>
        {team.leagueRecord.wins} - {team.leagueRecord.losses}
      </div>
      {showScore && (
        <div
          className={twMerge(
            "text-end font-bold",
            !showLeagueRecord ? "col-span-1" : "",
          )}
        >
          {team.score}
        </div>
      )}
    </div>
  );
};

const scheduleGameCardVariant = cva(
  ["m-2 rounded border border-t-4 px-4 py-2 drop-shadow"],
  {
    variants: {
      gameState: {
        default: ["bordert-t-slate-800 bg-slate-100"],
        pregame: ["border-t-blue-900", "bg-slate-50"],
        inProgress: ["border-t-green-700 bg-white"],
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
  const selectedGameContext = useContext(SelectedGameContext);

  const showScore = showScores(game);
  const showBases = isInProgress(game);
  const outs = [];

  const onClick = () => {
    selectedGameContext?.setSelectedGame(game);
  };

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
    <div className={classes} onClick={onClick}>
      {/* <h2 className="text-lg font-bold"> */}
      {/*   {game.teams.away.team.name} @ {game.teams.home.team.name} */}
      {/* </h2> */}
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
      <div className="my-2 grid auto-cols-max grid-cols-5 grid-rows-2 gap-2">
        <TeamScoreLine
          team={game.teams.away}
          game={game}
          className={`row-start-1 ${showBases ? "col-span-3" : "col-span-full"}`}
        />
        <TeamScoreLine
          team={game.teams.home}
          game={game}
          className={`row-start-2 ${showBases ? "col-span-3" : "col-span-full"}`}
        />

        {showBases && <Bases linescore={game.linescore} />}
      </div>
    </div>
  );
};
