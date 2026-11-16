"use client";

import { useRef } from "react";
import { SITE } from "@/content/site";
import { gsap, useGSAP, motionOK, finePointer } from "@/lib/motion";
import { ArchPhoto } from "./Photo";
import { OpenStatus } from "./OpenStatus";
import { Seal } from "./Seal";
import { FlowButton } from "./ui/flow-button";
import { OriginButton } from "./ui/origin-button";
import { WaveText } from "./ui/wave-text";

/**
 * The window. Three lancet panes (the door, the nave, the square) under the
 * name, with amber light that follows the pointer. The panes drift with the
 * pointer at different depths; nothing depends on that to be readable.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !motionOK() || !finePointer()) return;
      const tiles = gsap.utils.toArray<HTMLElement>(".hero__drift");
      const movers = tiles.map((tile) => ({
        depth: Number(tile.dataset.depth ?? 1),
        x: gsap.quickTo(tile, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(tile, "y", { duration: 0.9, ease: "power3.out" }),
      }));

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m) => {
          m.x(nx * -26 * m.depth);
          m.y(ny * -18 * m.depth);
        });
        el.style.setProperty("--mx", `${((nx + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${((ny + 0.5) * 100).toFixed(1)}%`);
      };
      const leave = () => movers.forEach((m) => (m.x(0), m.y(0)));
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />

      <p className="eyebrow eyebrow--onDark hero__eyebrow" data-intro>
        <span>Est. 2017</span>
        <span>38 Burg Street, Cape Town</span>
      </p>

      <div className="hero__name" data-intro>
        <WaveText as="h1" id="hero-title" className="hero__title" delay={500}>
          Heaven
          <br />
          Coffee
        </WaveText>
      </div>

      <div className="hero__band">
        <figure className="hero__tile hero__tile--side" data-intro>
          <div className="hero__drift" data-depth="1.6">
            <ArchPhoto image="door-sign" sizes="(min-width: 900px) 22vw, 40vw" focus="50% 40%" />
          </div>
          <figcaption>The door</figcaption>
        </figure>
        <figure className="hero__tile hero__tile--centre" data-intro>
          <div className="hero__drift" data-depth="0.7">
            <ArchPhoto
              image="nave-croissants"
              sizes="(min-width: 900px) 28vw, 62vw"
              focus="50% 35%"
              priority
            />
          </div>
          <figcaption>The nave</figcaption>
        </figure>
        <figure className="hero__tile hero__tile--side" data-intro>
          <div className="hero__drift" data-depth="1.6">
            <ArchPhoto image="pavement-row" sizes="(min-width: 900px) 22vw, 40vw" focus="40% 60%" />
          </div>
          <figcaption>The square</figcaption>
        </figure>
      </div>

      <div className="hero__foot">
        <p className="hero__lede" data-intro>
          Sanctuary coffee at Greenmarket Square, inside a working 19th-century church.
        </p>
        <div className="hero__actions" data-intro>
          <OpenStatus className="status--onDark" />
          <div className="hero__cta">
            <FlowButton href={SITE.mapsUrl} tone="amber">
              Get directions
            </FlowButton>
            <OriginButton href="/story" tone="light">
              Read the story
            </OriginButton>
          </div>
        </div>
      </div>

      <div className="hero__seal" data-intro>
        <Seal />
      </div>
    </section>
  );
}
