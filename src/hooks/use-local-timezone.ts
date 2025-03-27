import { useQueryState } from "nuqs";

export function useLocalTimezone() {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [timezone, setTimezone] = useQueryState("tz", {
    defaultValue: localTimezone,
  });

  return [timezone, setTimezone] as const;
}
