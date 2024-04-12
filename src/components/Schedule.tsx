import { useQuery } from "@tanstack/react-query";
import { Schedule as MlbSchedule } from "../types/mlb/Schedule";
import { ScheduleGameCard } from "./ScheduleGameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Schedule = () => {
  const { isLoading, error, data } = useQuery<MlbSchedule>({
    queryKey: ["schedule"],
    queryFn: () =>
      fetch(
        "https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=linescore",
      ).then((res) => res.json()),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: false,
  });

  return (
    <div>
      <h1 className="my-4 text-center text-6xl font-bold">MLB Schedule</h1>

      {isLoading && (
        <div className="my-16 text-center text-2xl font-bold">
          <FontAwesomeIcon
            icon={faSpinner}
            className="mx-auto my-2 block animate-spin text-6xl"
          />
          Loading...
        </div>
      )}

      {error && (
        <div className="rounded border bg-red-800 p-4 text-center text-2xl text-white drop-shadow-xl">
          <span className="font-extrabold">Error</span>: {error.message}
        </div>
      )}

      {data?.dates.map((date) => (
        <div key={date.date.toString()}>
          <h2 className="my-3 text-center text-2xl font-bold">
            {new Date(date.date).toLocaleDateString()}
          </h2>
          <p className="text-center">
            All times are in your local timezone (
            {Intl.DateTimeFormat().resolvedOptions().timeZone})
          </p>

          <div className="my-8 flex flex-wrap justify-center">
            {date.games.map((game) => (
              <ScheduleGameCard key={game.gamePk} game={game} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
