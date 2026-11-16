"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { capeTownNow, hoursBar } from "@/lib/hours";

/**
 * The hours ruler from the old site: one row, because every day is the same.
 * An amber marker shows where "now" is in Cape Town.
 */
export function Hours() {
  const bar = hoursBar();
  const [now, setNow] = useState<ReturnType<typeof capeTownNow> | null>(null);

  useEffect(() => {
    const update = () => setNow(capeTownNow());
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="ruler"
      role="img"
      aria-label={`Open every day from ${SITE.hours.open} to ${SITE.hours.close}${
        now ? `. It is ${now.label} in Cape Town, so Heaven is ${now.open ? "open" : "closed"} right now.` : "."
      }`}
    >
      <div className="ruler__scale" aria-hidden="true">
        <span>DAY</span>
        <div>
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
        <span>HOURS</span>
      </div>
      <div className="ruler__row" aria-hidden="true">
        <span className="ruler__day">{SITE.hours.label}</span>
        <div className="ruler__track">
          <div className="ruler__bar" style={{ left: `${bar.left}%`, width: `${bar.width}%` }} />
          {now && (
            <div className="ruler__now" style={{ left: `${(now.hours / 24) * 100}%` }}>
              <span>{now.label} now</span>
            </div>
          )}
        </div>
        <span className="ruler__time">
          {SITE.hours.open} — {SITE.hours.close}
        </span>
      </div>
    </div>
  );
}
