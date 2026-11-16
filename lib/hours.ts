import { SITE } from "@/content/site";

const toHours = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h + m / 60;
};

export const OPEN = toHours(SITE.hours.open);
export const CLOSE = toHours(SITE.hours.close);

/** Position of the opening hours on a 24-hour ruler, in percent. */
export function hoursBar() {
  return { left: (OPEN / 24) * 100, width: ((CLOSE - OPEN) / 24) * 100 };
}

/** The time in Cape Town right now, whatever the visitor's own time zone. */
export function capeTownNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const hours = h + m / 60;
  return {
    hours,
    label: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
    open: hours >= OPEN && hours < CLOSE,
  };
}
