"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { finePointer, motionOK } from "@/lib/motion";

/**
 * A navy surface with a pool of amber light that follows the pointer, like
 * sun through a window moving across a wall. Purely decorative: on touch, or
 * without motion, the light rests in one place.
 */
export function Spotlight({
  as: Tag = "section",
  className,
  children,
  ...rest
}: {
  as?: "section" | "div";
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK() || !finePointer()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      el.style.setProperty("--sx", `${x}px`);
      el.style.setProperty("--sy", `${y}px`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Tag ref={ref as never} className={`spotlight ${className ?? ""}`} {...rest}>
      {children}
    </Tag>
  );
}
