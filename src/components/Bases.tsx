import { Linescore } from "../types/mlb/Schedule";
import { twMerge } from "tailwind-merge";
import { FaCircleRegular, FaCircleSolid } from "./icons/FaCircle";

const Base = ({
  isOnBase,
  teamId,
  className,
}: {
  isOnBase: boolean;
  teamId: number;
  className?: string;
}) => {
  const color = isOnBase ? `var(--team-${teamId}-color)` : undefined;

  return (
    <div
      className={twMerge(
        `h-8 w-8 rotate-45 border-2 border-black transition-colors duration-500`,
        className,
      )}
      style={{
        backgroundColor: color,
      }}
    ></div>
  );
};

export const Bases = ({ linescore }: { linescore: Linescore }) => {
  const outs = [];
  const teamId = linescore.offense.team.id;

  for (let i = 0; i < 3; i++) {
    if (linescore?.outs && i < linescore.outs) {
      outs.push(<FaCircleSolid key={i} className="size-3 text-red-800" />);
      continue;
    }
    outs.push(<FaCircleRegular key={i} className="size-3 text-red-800" />);
  }

  return (
    <div className="col-span-2 row-span-2">
      <div className="relative mx-auto my-3 h-16 w-24">
        <Base
          className="mx-auto"
          isOnBase={!!linescore.offense.second}
          teamId={teamId}
        />
        <Base
          className="absolute bottom-0 left-0"
          isOnBase={!!linescore.offense.third}
          teamId={teamId}
        />
        <Base
          className="absolute right-0 bottom-0"
          isOnBase={!!linescore.offense.first}
          teamId={teamId}
        />
        <div className="absolute right-1/2 -bottom-2 flex translate-x-1/2 gap-1 text-xs">
          {outs}
        </div>
      </div>
    </div>
  );
};
