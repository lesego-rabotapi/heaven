"use client";

import { Fragment, useRef } from "react";
import type { ImageKey } from "@/content/images";
import { gsap, useGSAP, motionOK, finePointer } from "@/lib/motion";
import { Photo } from "../Photo";

const PARTS: (string | { image: ImageKey; focus?: string })[] = [
  "Coffee",
  { image: "latte" },
  "between the pews",
  { image: "sanctuary", focus: "50% 70%" },
  "of a working church,",
  { image: "door-sign", focus: "50% 30%" },
  "one step off",
  { image: "pavement-row", focus: "40% 55%" },
  "Greenmarket Square.",
];
const SENTENCE = PARTS.filter((p): p is string => typeof p === "string").join(" ");
const IMAGES = PARTS.filter((p): p is { image: ImageKey; focus?: string } => typeof p !== "string");

/**
 * One sentence that says what the place is. As it scrolls into view the words
 * light up and small photos open between them; hovering a photo floats a
 * larger print of it beside the cursor.
 *
 * After "ImgText Reveal Scroll Animation" by ajith66310 on 21st.dev
 * (https://21st.dev/@ajith66310/components/imgtext-reveal-scroll-animation).
 * Its source could not be retrieved through the connector (daily limit), so
 * the behaviour is rebuilt here with GSAP ScrollTrigger. Without motion the
 * sentence and its photos are simply there.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !motionOK()) return;
      const words = gsap.utils.toArray<HTMLElement>(".statement__w");
      const chips = gsap.utils.toArray<HTMLElement>(".statement__img");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 62%", scrub: 0.8 },
      });
      tl.fromTo(words, { opacity: 0.16 }, { opacity: 1, stagger: 0.4, duration: 1 }, 0);
      chips.forEach((chip, i) => {
        tl.fromTo(
          chip,
          { width: 0, marginInline: 0, opacity: 0 },
          { width: "1.55em", marginInline: "0.12em", opacity: 1, duration: 2.2, ease: "power2.out" },
          0.6 + i * 1.5,
        );
      });

      if (!finePointer()) return;
      const preview = el.querySelector<HTMLElement>(".statement__preview");
      if (!preview) return;
      const x = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        x(e.clientX + 24);
        y(e.clientY - preview.offsetHeight / 2);
      };
      const cleanups: (() => void)[] = [];
      chips.forEach((chip, i) => {
        const enter = (e: PointerEvent) => {
          preview.dataset.active = String(i);
          gsap.set(preview, { x: e.clientX + 24, y: e.clientY - preview.offsetHeight / 2 });
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        };
        const leave = () =>
          gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.25, ease: "power2.in", overwrite: "auto" });
        chip.addEventListener("pointerenter", enter);
        chip.addEventListener("pointermove", move);
        chip.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          chip.removeEventListener("pointerenter", enter);
          chip.removeEventListener("pointermove", move);
          chip.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <section className="statement" ref={root} aria-label="What Heaven is">
      <p className="statement__text">
        <span className="sr-only">{SENTENCE}</span>
        <span aria-hidden="true">
          {PARTS.map((part, i) =>
            typeof part === "string" ? (
              <Fragment key={i}>
                {part.split(" ").map((word, j) => (
                  <Fragment key={j}>
                    <span className="statement__w">{word}</span>{" "}
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <span className="statement__img">
                  <Photo image={part.image} sizes="160px" alt="" focus={part.focus} />
                </span>{" "}
              </Fragment>
            ),
          )}
        </span>
      </p>
      <div className="statement__preview" aria-hidden="true">
        {IMAGES.map((part, i) => (
          <span key={part.image} data-i={i}>
            <Photo image={part.image} sizes="320px" alt="" focus={part.focus} />
          </span>
        ))}
      </div>
    </section>
  );
}
