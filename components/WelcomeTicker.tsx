"use client";

import { useEffect, useRef } from "react";
import { WELCOME } from "@/content/site";
import { motionOK, scroller } from "@/lib/motion";
import { Icon } from "./Icon";

/**
 * "Welcome" in the languages you hear on the square. It drifts on its own and
 * picks up speed and direction from the scroll. Paused off screen; without
 * motion it is a static, wrapped list.
 */
export function WelcomeTicker() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || !motionOK()) return;
    const set = el.querySelector<HTMLElement>(".ticker__set");
    if (!set) return;

    let x = 0;
    let dir = 1;
    let last = 0;
    let raf = 0;
    let visible = false;
    let prevScroll = window.scrollY;

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      last = t;
      const lenis = scroller.lenis;
      const v = lenis ? lenis.velocity * 60 : (window.scrollY - prevScroll) / Math.max(dt, 0.001);
      prevScroll = window.scrollY;
      if (Math.abs(v) > 20) dir = v > 0 ? 1 : -1;
      const speed = 70 + Math.min(900, Math.abs(v) * 0.55);
      const width = set.offsetWidth;
      x -= dir * speed * dt;
      if (width > 0) x = ((x % width) - width) % width;
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el.parentElement ?? el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = (hidden: boolean) => (
    <ul className="ticker__set" aria-hidden={hidden || undefined}>
      {WELCOME.map((w) => (
        <li key={w.text} lang={w.lang}>
          {w.text}
          <Icon name="stars-minimalistic-bold" size={22} className="ticker__star" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="ticker" aria-label="Welcome, in the languages of the square">
      <div className="ticker__track" ref={track}>
        {words(false)}
        {words(true)}
        {words(true)}
      </div>
    </section>
  );
}
