import { twMerge } from "tailwind-merge";
import { Away, Game } from "../types/mlb/Schedule";
import {
  isDelayed,
  isFinal,
  isInProgress,
  isPregame,
  showScores,
} from "../utils/gameState";
import { cva } from "class-variance-authority";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { SelectedGameContext } from "../contexts/selected-game-context/context";
import { TeamLogo } from "./TeamLogo";
import { TeamShortName } from "./TeamShortName";
import { Bases } from "./Bases";
import { useScoreChangeHook } from "../hooks/use-score-change-hook";

// Home Run Particle component
const HomeRunParticle = ({
  teamId,
  index,
  total = 12,
}: {
  teamId: number;
  index: number;
  total?: number;
}) => {
  // Create different particles with different trajectories
  const angle = (index * Math.PI * 2) / total;
  const x = 150 * Math.cos(angle);
  const y = 150 * Math.sin(angle);
  const size = Math.random() * 6 + 2; // Random size between 2-8px
  const rotation = Math.random() * 360; // Random rotation

  return (
    <div
      className="animate-hr-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={
        {
          backgroundColor: `var(--team-${teamId}-color, #22c55e)`,
          "--x": `${x}px`,
          "--y": `${y}px`,
          "--rot": `${rotation}deg`,
          width: `${size}px`,
          height: `${size}px`,
        } as React.CSSProperties
      }
    />
  );
};

// Epic Home Run Animation Component for the entire card
const FullCardHomeRunAnimation = ({
  teamId,
  isVisible,
}: {
  teamId: number;
  isVisible: boolean;
}) => {
  if (!isVisible) return null;

  const particles = Array(24).fill(0);

  return (
    <div className="absolute inset-0 z-30 overflow-hidden rounded-sm">
      {/* Darkening overlay */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* Background explosion effect */}
      <div
        className="animate-hr-explosion absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: `var(--team-${teamId}-color, #22c55e)` }}
      />

      {/* Multiple radiating waves */}
      <div
        className="animate-hr-wave absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          border: `3px solid var(--team-${teamId}-color, #22c55e)`,
          animationDelay: "0.1s",
        }}
      />
      <div
        className="animate-hr-wave absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          border: `3px solid var(--team-${teamId}-color, #22c55e)`,
          animationDelay: "0.3s",
        }}
      />
      <div
        className="animate-hr-wave absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          border: `3px solid var(--team-${teamId}-color, #22c55e)`,
          animationDelay: "0.5s",
        }}
      />

      {/* Corner explosions */}
      <div
        className="animate-hr-explosion absolute top-0 left-0 size-2 rounded-full bg-white"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="animate-hr-explosion absolute top-0 right-0 size-2 rounded-full bg-white"
        style={{ animationDelay: "0.3s" }}
      />
      <div
        className="animate-hr-explosion absolute bottom-0 left-0 size-2 rounded-full bg-white"
        style={{ animationDelay: "0.4s" }}
      />
      <div
        className="animate-hr-explosion absolute right-0 bottom-0 size-2 rounded-full bg-white"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Particle effects */}
      {particles.map((_, i) => (
        <HomeRunParticle
          key={i}
          teamId={teamId}
          index={i}
          total={particles.length}
        />
      ))}

      {/* HOME RUN! text */}
      <div
        className="animate-hr-float-in absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold whitespace-nowrap"
        style={{
          color: "white",
          textShadow: `0 0 15px var(--team-${teamId}-color, #22c55e), 0 0 30px var(--team-${teamId}-color, #22c55e)`,
        }}
      >
        HOME RUN!
      </div>
    </div>
  );
};

// Animated Score Component
const AnimatedScore = ({
  score,
  isAnimating,
  isHomeRun,
  teamId,
}: {
  score: number;
  isAnimating: boolean;
  isHomeRun: boolean;
  teamId: number;
}) => {
  return (
    <div className="relative">
      <span
        className={twMerge(
          "inline-block w-[2ch] font-extrabold transition-all",
          isAnimating &&
            (isHomeRun ? "animate-hr-text" : "animate-score-pulse"),
        )}
        style={
          isAnimating
            ? { color: `var(--team-${teamId}-color, rgb(22 163 74))` }
            : {}
        }
      >
        {score}
      </span>
      {isAnimating && !isHomeRun && (
        <span
          className="animate-score-increment absolute -top-3 left-1/2 -translate-x-1/2 font-bold opacity-0"
          style={{ color: `var(--team-${teamId}-color, rgb(22 163 74))` }}
        >
          +1
        </span>
      )}
    </div>
  );
};

const TeamScoreLine = ({
  team,
  className,
  game,
  onHomeRun,
}: {
  team: Away;
  game: Game;
  className?: string;
  onHomeRun: (isHomeRun: boolean, teamId: number) => void;
}) => {
  const showLeagueRecord = !isInProgress(game);
  const showScore = isInProgress(game) || isFinal(game);
  const { isScoreChanged, isHomeRun } = useScoreChangeHook(
    team.score || 0,
    game.scoringPlays,
  );

  // Report home run to parent component
  useEffect(() => {
    if (isHomeRun) {
      onHomeRun(true, team.team.id);
    }
  }, [isHomeRun, team.team.id, onHomeRun]);

  return (
    <div
      className={twMerge(
        "grid grid-cols-subgrid items-center gap-4 text-lg",
        isScoreChanged && !isHomeRun && "animate-team-score-flash", // Only flash if not home run
        className,
      )}
      style={
        isScoreChanged && !isHomeRun
          ? ({
              "--team-flash-color": `var(--team-${team.team.id}-color, rgb(22 163 74))`,
            } as React.CSSProperties)
          : {}
      }
    >
      <div className="flex items-center">
        <TeamLogo team={team} />
        <TeamShortName team={team} />
      </div>
      <div
        className={twMerge(
          "text-end font-mono text-sm",
          !showScore ? "col-span-2" : "",
        )}
      >
        {team.leagueRecord.wins} - {team.leagueRecord.losses}
      </div>
      {showScore && (
        <div
          className={twMerge(
            "text-end font-mono text-xl font-bold",
            !showLeagueRecord ? "col-span-1" : "",
          )}
        >
          <AnimatedScore
            score={team.score || 0}
            isAnimating={isScoreChanged}
            isHomeRun={isHomeRun}
            teamId={team.team.id}
          />
        </div>
      )}
    </div>
  );
};

const scheduleGameCardVariant = cva(
  ["relative w-3xs rounded-sm border border-t-4 px-4 py-2 drop-shadow-sm"],
  {
    variants: {
      gameState: {
        default: ["bordert-t-slate-800 bg-slate-100"],
        pregame: ["border-t-blue-900", "bg-slate-50"],
        inProgress: ["border-t-green-700 bg-white", "w-sm"],
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
  const [homeRunInfo, setHomeRunInfo] = useState<{
    active: boolean;
    teamId: number;
  }>({
    active: false,
    teamId: 0,
  });

  const showScore = showScores(game);
  const showBases = isInProgress(game);

  const onClick = () => {
    selectedGameContext?.setSelectedGame(game);
  };

  const gameState = useMemo(() => {
    return isFinal(game)
      ? "final"
      : isInProgress(game)
        ? "inProgress"
        : isDelayed(game)
          ? "delayed"
          : isPregame(game)
            ? "pregame"
            : "default";
  }, [game]);

  const classes = twMerge(
    scheduleGameCardVariant({ gameState: gameState }),
    homeRunInfo.active && "animate-hr-card-shake",
  );

  // Handle home run notification from TeamScoreLine
  const handleHomeRun = useCallback((isHomeRun: boolean, teamId: number) => {
    if (isHomeRun) {
      setHomeRunInfo({ active: true, teamId });

      // Reset the animation after it completes
      const timer = setTimeout(() => {
        setHomeRunInfo({ active: false, teamId: 0 });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={classes} onClick={onClick}>
      {/* Full card home run animation overlay */}
      <FullCardHomeRunAnimation
        teamId={homeRunInfo.teamId}
        isVisible={homeRunInfo.active}
      />

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
        ) : isDelayed(game) ? (
          <div className="font-bold italic underline">
            {game.status.detailedState}
          </div>
        ) : (
          <>
            <span className="font-semibold">Time:</span>{" "}
            {new Date(game.gameDate).toLocaleTimeString()}{" "}
          </>
        )}
      </div>
      <ScheduleGameScoreLine
        game={game}
        showBases={showBases}
        handleHomeRun={handleHomeRun}
      />
    </div>
  );
};

const ScheduleGameScoreLineVariants = cva(
  "grid grid-cols-[max-content_max-content_1fr] grid-rows-2 gap-2",
  {
    variants: {
      showBases: {
        true: "grid-cols-[max-content_max-content_max-content_1fr_1fr]",
      },
    },
  },
);

export const ScheduleGameScoreLine = ({
  game,
  showBases,
  handleHomeRun,
}: {
  game: Game;
  showBases: boolean;
  handleHomeRun: (isHomeRun: boolean, teamId: number) => void;
}) => {
  return (
    <div className={ScheduleGameScoreLineVariants({ showBases })}>
      <TeamScoreLine
        team={game.teams.away}
        game={game}
        className={`row-start-1 ${showBases ? "col-span-3" : "col-span-full"}`}
        onHomeRun={handleHomeRun}
      />
      <TeamScoreLine
        team={game.teams.home}
        game={game}
        className={`row-start-2 ${showBases ? "col-span-3" : "col-span-full"}`}
        onHomeRun={handleHomeRun}
      />

      {showBases && <Bases linescore={game.linescore} />}
    </div>
  );
};
