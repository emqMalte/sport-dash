import { twMerge } from "tailwind-merge";
import { teamMappings } from "../utils/teamMappings";
import { Away } from "../types/mlb/Schedule";

interface TeamLogoProps {
  team: Away;
  className?: string;
}
export const TeamLogo = ({ team, className }: TeamLogoProps) => {
  const teamShortName =
    teamMappings[team.team.name as keyof typeof teamMappings];

  if (!teamShortName) {
    return null;
  }

  return (
    <img
      src={`/mlb/light/${teamShortName.toLowerCase()}_l.svg`}
      alt={team.team.name}
      className={twMerge("h-8 w-8", className)}
    />
  );
};
