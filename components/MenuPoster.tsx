"use client";

import { useRef } from "react";
import { MENU } from "@/content/site";
import { gsap, useGSAP, motionOK, finePointer } from "@/lib/motion";
import { Photo } from "./Photo";

/**
 * The menu board from the old site, kept as a navy poster. With a mouse,
 * each column floats a photo beside the cursor while you read it.
 * Prices appear only once Heaven confirms them.
 */
export function MenuPoster() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !motionOK() || !finePointer()) return;
      const float = el.querySelector<HTMLElement>(".menu__float");
      const cols = el.querySelector<HTMLElement>(".menu__cols");
      if (!float || !cols) return;
      const x = gsap.quickTo(float, "x", { duration: 0.55, ease: "power3.out" });
      const y = gsap.quickTo(float, "y", { duration: 0.55, ease: "power3.out" });
      const rot = gsap.quickTo(float, "rotation", { duration: 0.8, ease: "power3.out" });
      let lastX = 0;
      let shown = false;

      const move = (e: PointerEvent) => {
        const cat = (e.target as HTMLElement).closest<HTMLElement>(".menu__cat");
        if (!cat) return;
        float.dataset.active = cat.dataset.index;
        // Sit on whichever side of the cursor has room.
        const side = e.clientX > window.innerWidth * 0.62 ? -float.offsetWidth - 28 : 28;
        if (!shown) {
          shown = true;
          gsap.set(float, { x: e.clientX + side, y: e.clientY - float.offsetHeight / 2 });
          gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        }
        x(e.clientX + side);
        y(e.clientY - float.offsetHeight / 2);
        rot(Math.max(-8, Math.min(8, (e.clientX - lastX) * 0.6)));
        lastX = e.clientX;
      };
      const leave = () => {
        shown = false;
        gsap.to(float, { autoAlpha: 0, scale: 0.92, duration: 0.25, ease: "power2.in", overwrite: "auto" });
      };
      cols.addEventListener("pointermove", move);
      cols.addEventListener("pointerleave", leave);
      return () => {
        cols.removeEventListener("pointermove", move);
        cols.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <section className="menu" ref={root} aria-label="Menu board">
      <div className="menu__ruler" aria-hidden="true" />
      <div className="menu__cols">
        {MENU.map((cat, i) => (
          <section className="menu__cat" key={cat.title} data-index={i} data-reveal data-reveal-delay={i * 0.06}>
            <header className="menu__cat-head">
              <span className="menu__no" aria-hidden="true">
                {cat.no}
              </span>
              <h2 className="menu__cat-title">{cat.title}</h2>
            </header>
            <ul className="menu__list">
              {cat.items.map((item) => (
                <li className="menu__item" key={item.name}>
                  <div className="menu__row">
                    <span className="menu__name">{item.name}</span>
                    {item.price !== null && (
                      <>
                        <span className="menu__dots" aria-hidden="true" />
                        <span className="menu__price">R{item.price}</span>
                      </>
                    )}
                  </div>
                  <span className="menu__note">{item.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="menu__foot">
        <span>Sample menu. Final items and prices to be confirmed with Heaven.</span>
        <span className="menu__ask">Ask at the counter for today&rsquo;s bakes</span>
      </div>

      <div className="menu__float" aria-hidden="true">
        {MENU.map((cat, i) => (
          <span key={cat.title} data-i={i}>
            <Photo image={cat.image} sizes="260px" alt="" />
          </span>
        ))}
      </div>
    </section>
  );
}
