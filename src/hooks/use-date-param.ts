import { parseAsIsoDate, useQueryState } from "nuqs";

export function useDateParam() {
  const [date, setDate] = useQueryState(
    "date",
    parseAsIsoDate.withDefault(new Date()),
  );

  return [date, setDate] as const;
}
