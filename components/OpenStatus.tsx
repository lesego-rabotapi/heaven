"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { capeTownNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Open or closed right now, on Cape Town time, so it is right for a visitor
 * still at home in another time zone. Before the script runs it shows the
 * plain hours.
 */
export function OpenStatus({ className }: { className?: string }) {
  const [now, setNow] = useState<ReturnType<typeof capeTownNow> | null>(null);

  useEffect(() => {
    const update = () => setNow(capeTownNow());
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={cn("status", className)} data-open={now ? now.open : undefined}>
      <span className="status__dot" aria-hidden="true" />
      {now ? (
        <span>
          {now.open ? `Open now until ${SITE.hours.close}` : `Closed now, opens ${SITE.hours.open}`}
          <span className="status__time"> · {now.label} in Cape Town</span>
        </span>
      ) : (
        <span>
          Open daily {SITE.hours.open} to {SITE.hours.close}
        </span>
      )}
    </p>
  );
}
