import { useSyncExternalStore } from "react";

export type WeekendOption = {
  /** Exact string submitted to Google Sheets / EmailJS, e.g. "Saturday, 27-09-2026". */
  value: string;
  weekday: string;
  day: string;
  month: string;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * The next three Saturdays/Sundays (today included when it is a weekend).
 * `value` is built exactly like the original site's demo-date select so the
 * submitted data does not change.
 */
function nextWeekends(): WeekendOption[] {
  const weekends: WeekendOption[] = [];
  const today = new Date();
  let count = 0;

  while (weekends.length < 3 && count < 30) {
    const day = today.getDay();
    if (day === 6 || day === 0) {
      const dateStr = today
        .toLocaleDateString("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
      weekends.push({
        value: dateStr,
        weekday: day === 6 ? "Sat" : "Sun",
        day: String(today.getDate()),
        month: months[today.getMonth()],
      });
    }
    today.setDate(today.getDate() + 1);
    count++;
  }

  return weekends;
}

const serverSnapshot: WeekendOption[] = [];
let cache: { key: string; options: WeekendOption[] } | null = null;

function clientSnapshot() {
  const key = new Date().toDateString();
  if (!cache || cache.key !== key) cache = { key, options: nextWeekends() };
  return cache.options;
}

const subscribe = () => () => {};

/**
 * Dates depend on the visitor's clock, so they are only computed in the
 * browser: the server (and the hydration pass) render an empty list, then
 * React re-renders with the real dates — no hydration mismatch.
 */
export function useWeekendOptions() {
  return useSyncExternalStore(subscribe, clientSnapshot, () => serverSnapshot);
}
