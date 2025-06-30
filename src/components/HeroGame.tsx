import { useContext } from "react";
import { SelectedGameContext } from "../contexts/selected-game-context/context";
import { TeamLogo } from "./TeamLogo";
import { Away } from "../types/mlb/Schedule";
import { Bases } from "./Bases";
import { isDelayed, isInProgress, showScores } from "../utils/gameState";

const Team = ({ team }: { team: Away }) => {
  return (
    <div className="flex w-full items-center justify-around gap-8 first:flex-row-reverse">
      <div className="text-9xl font-extrabold">{team.score}</div>
      <div className="text-center">
        <TeamLogo team={team} className="h-auto w-full" />
        <span className="text-lg font-bold">{team.team.name}</span> (
        {team.leagueRecord.wins} - {team.leagueRecord.losses})
      </div>
    </div>
  );
};

export const HeroGame = () => {
  const selectedGameContext = useContext(SelectedGameContext);
  const game = selectedGameContext?.selectedGame;

  if (!game) {
    return null;
  }

  const showScore = showScores(game);
  const showBases = isInProgress(game);

  return (
    <div className="mx-4 my-4 rounded-sm border bg-white p-4">
      <div className="flex items-center">
        <Team team={game.teams.away} />
        <div className="w-fit whitespace-nowrap text-center">
          {showBases ? (
            <span>
              <span className="font-semibold">
                {game.linescore.inningState}
              </span>{" "}
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
          {showBases && <Bases linescore={game.linescore} />}
        </div>
        <Team team={game.teams.home} />
      </div>
    </div>
  );
};
