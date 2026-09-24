/**
 * Tiny analytics helper. Forwards events to whichever trackers are loaded
 * (Google Analytics 4 / Google Tag Manager / Meta Pixel) and does nothing
 * when none are configured. See components/analytics/Analytics.tsx.
 */
type Params = Record<string, string | number | boolean | undefined>;

type TrackerWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
};

/** Meta Pixel has its own standard event names. */
const metaEvents: Record<string, string> = {
  generate_lead: "Lead",
  contact: "Contact",
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackerWindow;
  w.gtag?.("event", event, params);
  w.dataLayer?.push({ event, ...params });
  const metaEvent = metaEvents[event];
  if (metaEvent) w.fbq?.("track", metaEvent, params);
  else w.fbq?.("trackCustom", event, params);
}
