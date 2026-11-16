"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Adapted from "Wave Text" by kevingirelli on 21st.dev
// (https://21st.dev/@kevingirelli/components/wave-text). Bands of colour wash
// through the letters: a gradient clipped to the text, moved by one CSS
// animation of a registered custom property. Here the bands are the amber of
// light through glass, the wave is sent once, and it can wait for a signal
// (the preloader lifting) before it starts.

if (typeof CSS !== "undefined" && "registerProperty" in CSS) {
  try {
    CSS.registerProperty({
      name: "--wave-text-offset",
      syntax: "<number>",
      inherits: false,
      initialValue: "-25",
    });
  } catch {
    // Already registered.
  }
}

const LIGHT = ["#fbe3b5", "#f2a93b", "#ffd27a", "#f2a93b", "#fbe3b5", "#ffffff"];

type Props = {
  as?: "h1" | "h2" | "p" | "span";
  children: ReactNode;
  className?: string;
  id?: string;
  colors?: string[];
  base?: string;
  bands?: number;
  bandWidth?: number;
  duration?: number;
  /** ms to wait once the wave is allowed to start */
  delay?: number;
};

export function WaveText({
  as: Tag = "span",
  children,
  className,
  id,
  colors = LIGHT,
  base = "currentColor",
  bands = 6,
  bandWidth = 5,
  duration = 3.2,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seen = false;
    let ready = !document.documentElement.classList.contains("is-loading");
    const check = () => {
      if (seen && ready) setGo(true);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen = true;
          io.disconnect();
          check();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    const onReady = () => {
      ready = true;
      check();
    };
    window.addEventListener("heaven:ready", onReady);
    return () => {
      io.disconnect();
      window.removeEventListener("heaven:ready", onReady);
    };
  }, []);

  const gradient = useMemo(() => {
    const at = (offset: number) => `calc((var(--wave-text-offset) + ${offset}) * 1%)`;
    const stops = [`${base} ${at(0)}`];
    for (let band = 0; band < bands; band++) {
      stops.push(`${colors[band % colors.length]} ${at((band + 2) * bandWidth)}`);
    }
    stops.push(`${base} ${at((bands + 2) * bandWidth)}`);
    return `linear-gradient(100deg, ${stops.join(", ")})`;
  }, [colors, base, bands, bandWidth]);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={cn("wave-text", go && "wave-text--go", className)}
      style={
        {
          "--wave-text-offset": -25,
          backgroundImage: gradient,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
