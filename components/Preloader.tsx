"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/motion";

/**
 * First load only: a navy screen with a three-light lancet window that fills
 * with amber, pane by pane, then lifts onto the page. Never shown without
 * motion (CSS), and never able to trap the visitor (failsafe below).
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.classList.remove("is-loading");
      window.dispatchEvent(new Event("heaven:unlock"));
      window.dispatchEvent(new Event("heaven:ready"));
    };
    if (!el || !motionOK()) {
      finish();
      return;
    }

    const count = el.querySelector<HTMLElement>(".preloader__count");
    const state = { n: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".preloader__pane", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 })
        .fromTo(
          ".preloader__light",
          { scaleY: 0 },
          { scaleY: 1, duration: 1.1, ease: "power2.inOut", stagger: 0.16 },
          0.2,
        )
        .to(
          state,
          {
            n: 100,
            duration: 1.4,
            ease: "power1.inOut",
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(state.n)).padStart(3, "0");
            },
          },
          0.2,
        )
        .fromTo(".preloader__line", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.5)
        .to(".preloader__inner", { autoAlpha: 0, y: -30, duration: 0.45, ease: "power2.in" }, "+=0.2")
        .to(el, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.15")
        .add(finish, "-=0.6")
        .set(el, { display: "none" });
    }, el);

    const failsafe = window.setTimeout(() => {
      el.style.display = "none";
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
        <div className="preloader__window">
          {[0, 1, 2].map((i) => (
            <span className="preloader__pane" key={i}>
              <span className="preloader__light" />
            </span>
          ))}
        </div>
        <p className="preloader__line">
          <span className="wordmark">
            heaven <small>coffee</small>
          </span>
          <span className="preloader__count">000</span>
        </p>
      </div>
    </div>
  );
}
