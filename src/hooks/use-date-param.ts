import { parseAsIsoDate, useQueryState } from "nuqs";

export function useDateParam() {
  const now = new Date();
  const [date, setQueryDate] = useQueryState(
    "date",
    parseAsIsoDate.withDefault(now),
  );

  function setDate(date: Date) {
    const newDate = date.toDateString() === now.toDateString() ? null : date;
    return setQueryDate(newDate);
  }

  return [date, setDate] as const;
}
