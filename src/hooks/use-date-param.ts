import { createParser, useQueryState } from "nuqs";

/**
 * Converts a Date object to a string in 'YYYY-MM-DD' format.
 * Uses the Swedish locale ('sv') to ensure ISO-like formatting.
 *
 * @param date - The Date object to format.
 * @returns The date as a string in 'YYYY-MM-DD' format.
 */
export function splitDate(date: Date) {
  return date.toLocaleDateString("sv").split("T")[0];
}

/**
 * Parser for handling the "date" query parameter as a local Date object.
 */
const parseAsLocalDate = createParser({
  /**
   * Parses the query parameter value into a Date object.
   * @param queryValue - The string value from the query parameter.
   * @returns - The corresponding Date object.
   */
  parse(queryValue) {
    return new Date(queryValue);
  },
  /**
   * Serializes a Date object into a 'YYYY-MM-DD' string for the query parameter.
   * @param value - The Date object to serialize.
   * @returns - The formatted date string.
   */
  serialize(value) {
    return splitDate(value);
  },
  /**
   * Checks if the given date is equal to today's date (ignoring time).
   * @param a - The Date object to compare.
   * @returns - True if the date is today, false otherwise.
   */
  eq(a) {
    return splitDate(a) === splitDate(new Date());
  },
});

/**
 * Custom React hook for managing the "date" query parameter in the URL.
 *
 * This hook provides a convenient way to read and update the "date" parameter
 * in the URL as a JavaScript Date object. If the "date" parameter is not present,
 * it defaults to today's date.
 *
 * @returns - A tuple containing:
 *   - date: The current date from the query parameter (as a Date object).
 *   - setQueryDate: A function to update the "date" query parameter.
 *
 * @example
 * const [date, setDate] = useDateParam();
 * // date is a Date object representing the current "date" query param or today
 * // setDate(new Date(2024, 5, 1)) will update the URL query param to "2024-06-01"
 */
export function useDateParam() {
  const [date, setQueryDate] = useQueryState(
    "date",
    parseAsLocalDate.withDefault(new Date()),
  );

  return [date, setQueryDate] as const;
}
