import { useQuery } from "@tanstack/react-query";
import {
  DateElement,
  Game,
  Schedule as MlbSchedule,
} from "../types/mlb/Schedule";
import { ScheduleGameCard } from "./ScheduleGameCard";
import { isFinal, isInProgress } from "../utils/gameState";
import { Loading } from "./Loading";
import { Error } from "./Error";
// import { HeroGame } from "./HeroGame";
import { SelectedGameContextProvider } from "../contexts/selected-game-context/provider";
import { useLocalTimezone } from "../hooks/use-local-timezone";
import { useDateParam } from "../hooks/use-date-param";

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

const ScheduleDate = ({
  date,
  onDateChange,
  currentDate,
}: {
  date: DateElement;
  onDateChange: (days: number) => void;
  currentDate: Date;
}) => {
  const scheduledGames: Game[] = [];
  const activeGames: Game[] = [];
  const completedGames: Game[] = [];

  date.games.forEach((game) => {
    if (isFinal(game)) {
      completedGames.push(game);
    } else if (isInProgress(game)) {
      activeGames.push(game);
    } else {
      scheduledGames.push(game);
    }
  });

  const isToday =
    new Date(date.date).toDateString() === currentDate.toDateString();

  return (
    <div key={date.date.toString()}>
      <div className="flex items-center justify-center gap-4">
        <DateNavigationButton
          direction="prev"
          onClick={() => onDateChange(-1)}
        />
        <h2 className="my-3 text-center text-2xl font-bold">
          {new Date(date.date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <DateNavigationButton
          direction="next"
          onClick={() => onDateChange(1)}
        />
        {!isToday && (
          <button
            onClick={() => onDateChange(0)}
            className="rounded-full bg-white/20 px-4 py-2 text-sm hover:bg-white/30"
            aria-label="Jump to today"
          >
            Jump to Today
          </button>
        )}
      </div>
      <p className="text-center">
        All times are in your local timezone (
        {Intl.DateTimeFormat().resolvedOptions().timeZone})
      </p>

      {/* <HeroGame /> */}

      <ScheduleDateSection title="Active Games" games={activeGames} />
      <ScheduleDateSection title="Scheduled Games" games={scheduledGames} />
      <ScheduleDateSection title="Completed Games" games={completedGames} />
    </div>
  );
};

const DateNavigationButton = ({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) => {
  const isPrev = direction === "prev";
  const ariaLabel = isPrev ? "Previous day" : "Next day";
  const path = isPrev
    ? "M15.75 19.5L8.25 12l7.5-7.5"
    : "M8.25 4.5l7.5 7.5-7.5 7.5";

  return (
    <button
      onClick={onClick}
      className="rounded-full p-2 hover:bg-white/20"
      aria-label={ariaLabel}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </button>
  );
};

export const Schedule = () => {
  const [timezone] = useLocalTimezone();
  const [date, setDate] = useDateParam();

  const queryUrl = new URL("https://statsapi.mlb.com/api/v1/schedule");

  queryUrl.searchParams.set("sportId", "1");
  queryUrl.searchParams.set("hydrate", "linescore");
  queryUrl.searchParams.set("timeZone", timezone);
  queryUrl.searchParams.set("startDate", date.toISOString().split("T")[0]);
  queryUrl.searchParams.set("endDate", date.toISOString().split("T")[0]);

  const handleDateChange = (days: number) => {
    if (days === 0) {
      setDate(new Date());
    } else {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      setDate(newDate);
    }
  };

  const { isLoading, error, data } = useQuery<MlbSchedule>({
    queryKey: ["schedule", date.toISOString().split("T")[0]],
    queryFn: () => fetch(queryUrl).then((res) => res.json()),
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  });

  return (
    <div className="my-6 rounded-3xl border border-white/20 bg-white/10 py-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md">
      <h1 className="my-4 text-center text-6xl font-bold drop-shadow-lg">
        MLB Schedule
      </h1>

      {isLoading && <Loading />}
      {error && <Error error={error} />}

      <SelectedGameContextProvider>
        {data?.dates.map((date) => (
          <ScheduleDate
            key={date.date.toString()}
            date={date}
            onDateChange={handleDateChange}
            currentDate={new Date()}
          />
        ))}
      </SelectedGameContextProvider>
    </div>
  );
};
