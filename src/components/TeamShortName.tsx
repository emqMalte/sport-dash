import { Away } from "../types/mlb/Schedule";
import { teamMappings } from "../utils/teamMappings";

export const TeamShortName = ({ team }: { team: Away }) => {
  const teamShortName =
    teamMappings[team.team.name as keyof typeof teamMappings];

  return <span className="ml-2 font-semibold">{teamShortName}</span>;
};
