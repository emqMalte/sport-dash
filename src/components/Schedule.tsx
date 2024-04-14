import { useQuery } from "@tanstack/react-query";
import {
  DateElement,
  Game,
  Schedule as MlbSchedule,
} from "../types/mlb/Schedule";
import { ScheduleGameCard } from "./ScheduleGameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { isDelayed, isFinal, isInProgress } from "../utils/gameState";

const Loading = () => (
  <div className="my-16 text-center text-2xl font-bold">
    <FontAwesomeIcon
      icon={faSpinner}
      className="mx-auto my-2 block animate-spin text-6xl"
    />
    Loading...
  </div>
);

const Errror = ({ error }: { error: Error }) => (
  <div className="rounded border bg-red-800 p-4 text-center text-2xl text-white drop-shadow-xl">
    <span className="font-extrabold">Error</span>: {error.message}
  </div>
);

const ScheduleDateSection = ({
  title,
  games,
}: {
  title: string;
  games: Game[];
}) => {
  if (games.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <h2 className="mb-4 text-center text-xl font-bold">{title}</h2>
      <div className="flex flex-wrap justify-center">
        {games.map((game) => (
          <ScheduleGameCard key={game.gamePk} game={game} />
        ))}
      </div>
    </section>
  );
};

const ScheduleDate = ({ date }: { date: DateElement }) => {
  const scheduledGames: Game[] = [];
  const activeGames: Game[] = [];
  const completedGames: Game[] = [];

  date.games.forEach((game) => {
    if (isFinal(game) || isDelayed(game)) {
      completedGames.push(game);
    } else if (isInProgress(game)) {
      activeGames.push(game);
    } else {
      scheduledGames.push(game);
    }
  });

  return (
    <div key={date.date.toString()}>
      <h2 className="my-3 text-center text-2xl font-bold">
        {new Date(date.date).toLocaleDateString()}
      </h2>
      <p className="text-center">
        All times are in your local timezone (
        {Intl.DateTimeFormat().resolvedOptions().timeZone})
      </p>

      <ScheduleDateSection title="Active Games" games={activeGames} />
      <ScheduleDateSection title="Scheduled Games" games={scheduledGames} />
      <ScheduleDateSection title="Completed Games" games={completedGames} />
    </div>
  );
};

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
    <div className="my-6 rounded-3xl bg-white/20 py-4 drop-shadow-2xl backdrop-blur">
      <h1 className="my-4 text-center text-6xl font-bold">MLB Schedule</h1>

      {isLoading && <Loading />}
      {error && <Errror error={error} />}

      {data?.dates.map((date) => (
        <ScheduleDate key={date.date.toString()} date={date} />
      ))}
    </div>
  );
};
