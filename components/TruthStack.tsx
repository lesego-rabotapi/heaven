"use client";

import { useRef } from "react";
import { TRUTHS } from "@/content/site";
import { gsap, useGSAP, motionOK } from "@/lib/gsap";
import { ArchPhoto } from "./Photo";

/** Four cards that stack as you scroll; each recedes as the next arrives. */
export function TruthStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!motionOK()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".truth");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        // Explicit start value: tweening a filter from "none" passes through black.
        gsap.fromTo(
          card.querySelector(".truth__inner"),
          { scale: 1, filter: "brightness(1)" },
          {
          scale: 0.94,
          filter: "brightness(0.82)",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 85%",
            end: "top 18%",
            scrub: true,
            invalidateOnRefresh: true,
          },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="truths" ref={root} data-tone="dark" aria-labelledby="truths-title">
      <div className="truths__head">
        <p className="eyebrow eyebrow--onDark" data-reveal>
          Before you climb the steps
        </p>
        <h2 className="truths__title" id="truths-title" data-split>
          Four things worth <em>knowing.</em>
        </h2>
      </div>

      <ol className="truths__list">
        {TRUTHS.map((t, i) => (
          <li className="truth" key={t.no} style={{ ["--i" as string]: i }}>
            <article className={`truth__inner truth__inner--${t.tone}`}>
              <div className="truth__media">
                <ArchPhoto image={t.image} sizes="(min-width: 900px) 30vw, 70vw" />
              </div>
              <div className="truth__copy">
                <span className="truth__no">{t.no}</span>
                <h3 className="truth__title">{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
