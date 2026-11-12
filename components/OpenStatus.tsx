"use client";

import { useEffect, useState } from "react";
import { openStatus, type OpenState } from "@/lib/hours";
import { SITE } from "@/content/site";

/** Live "Open now" pill. Shows the plain hours until the clock is read. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<{ state: OpenState; label: string } | null>(null);

  useEffect(() => {
    const update = () => setStatus(openStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`status ${className}`} data-state={status?.state ?? "unknown"}>
      <span className="status__dot" aria-hidden="true" />
      {status?.label ?? `Daily ${SITE.hours.open} to ${SITE.hours.close}`}
    </span>
  );
}
