import { SITE } from "@/content/site";

export type OpenState = "open" | "closing" | "closed";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Open / closing soon / closed, judged on Cape Town's clock, not the visitor's. */
export function openStatus(now = new Date()): { state: OpenState; label: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const mins = (get("hour") % 24) * 60 + get("minute");
  const open = toMinutes(SITE.hours.open);
  const close = toMinutes(SITE.hours.close);

  if (mins >= open && mins < close - 30) {
    return { state: "open", label: `Open now · until ${SITE.hours.close}` };
  }
  if (mins >= close - 30 && mins < close) {
    return { state: "closing", label: `Closing soon · ${SITE.hours.close}` };
  }
  return { state: "closed", label: `Closed · opens ${SITE.hours.open}` };
}

/** Left offset and width (percent of a 24h track) of the open window. */
export function hoursBar() {
  const open = toMinutes(SITE.hours.open);
  const close = toMinutes(SITE.hours.close);
  return { left: (open / 1440) * 100, width: ((close - open) / 1440) * 100 };
}
