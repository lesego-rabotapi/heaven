"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK, archPoints } from "@/lib/gsap";
import { Wordmark } from "./Wordmark";

/**
 * Navy curtain with the wordmark. It leaves by opening a Gothic arch from the
 * sill upward, as if the door itself swung open onto the square, then hands
 * over to the hero's entrance. Not rendered at all without motion (CSS).
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    const finish = () => {
      root.classList.remove("is-loading");
      window.dispatchEvent(new Event("heaven:unlock"));
    };
    if (!el || !motionOK()) {
      finish();
      return;
    }

    root.classList.add("is-loading");
    window.dispatchEvent(new Event("heaven:lock"));
    const unit = archPoints();
    const state = { s: 0 };
    const cut = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Grows until the arch's shoulders clear both top corners.
      const aw = state.s * Math.max(w, h) * 3.4;
      const ah = aw * 1.35;
      const hole = unit
        .map(([x, y]) => `${(w / 2 + x * aw).toFixed(1)}px ${(h - y * ah).toFixed(1)}px`)
        .join(",");
      el.style.clipPath = `polygon(evenodd, 0 0, ${w}px 0, ${w}px ${h}px, 0 ${h}px, 0 0, ${hole})`;
    };

    const ctx = gsap.context(() => {
      const intro = gsap.utils.toArray<HTMLElement>("[data-intro]");
      gsap.set(intro, { autoAlpha: 0, y: 44 });
      gsap.set("[data-intro-figure]", { autoAlpha: 0, scale: 1.08, y: 60 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".preloader__mark", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 })
        .fromTo(
          ".preloader .wordmark__swoosh",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          0.15,
        )
        .fromTo(".preloader__line", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.7)
        .to(".preloader__inner", { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, "+=0.35")
        .to(state, { s: 1, duration: 1.25, ease: "power3.inOut", onUpdate: cut }, "-=0.1")
        .add(finish, "-=0.75")
        .to("[data-intro-figure]", { autoAlpha: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=0.95")
        .to(intro, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09 }, "-=1.25")
        .set(el, { display: "none" });
    });

    // Never trap the visitor behind the curtain.
    const failsafe = window.setTimeout(() => {
      el.style.display = "none";
      gsap.set("[data-intro], [data-intro-figure]", { autoAlpha: 1, y: 0, scale: 1 });
      finish();
    }, 7000);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      finish();
    };
  }, []);

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="preloader__inner">
        <Wordmark className="preloader__mark" />
        <p className="preloader__line">38 Burg Street · Cape Town</p>
      </div>
    </div>
  );
}
