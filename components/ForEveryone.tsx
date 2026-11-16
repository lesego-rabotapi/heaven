"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { FOR_WHOM } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP, motionOK } from "@/lib/motion";
import { ArchPhoto } from "./Photo";
import { OriginButton } from "./ui/origin-button";

/**
 * "Heaven is for ___": the line stays put while the photos scroll past, and
 * its last word rolls over to match the photo in view.
 *
 * The behaviour follows the "image scroll" demo of Text Rotate by danielpetho
 * on 21st.dev (https://21st.dev/@danielpetho/components/text-rotate). Its
 * source could not be retrieved through the connector (daily limit) and it is
 * built on Motion, so it is rebuilt here on GSAP ScrollTrigger.
 * Without motion the line simply reads "Heaven is for everyone".
 */
export function ForEveryone() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const arranged = useRef(false);

  useGSAP(
    () => {
      if (!motionOK()) return;
      setLive(true);
      gsap.utils.toArray<HTMLElement>(".for__photo").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    },
    { scope: root },
  );

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || !live) return;
    const slot = el.querySelector<HTMLElement>(".for__slot");
    const words = Array.from(el.querySelectorAll<HTMLElement>(".for__word"));
    if (!slot || !words.length) return;
    const place = (j: number) => (j === active ? 0 : j < active ? -115 : 115);
    if (!arranged.current) {
      // First arrangement happens before paint, with no animation.
      arranged.current = true;
      words.forEach((word, j) => gsap.set(word, { yPercent: place(j) }));
      gsap.set(slot, { width: words[active].offsetWidth });
      return;
    }
    words.forEach((word, j) => {
      gsap.to(word, { yPercent: place(j), duration: 0.75, ease: "power4.out", overwrite: true });
    });
    gsap.to(slot, { width: words[active].offsetWidth, duration: 0.6, ease: "power3.out", overwrite: true });
  }, [active, live]);

  return (
    <section className="for" ref={root} aria-labelledby="for-title" data-live={live}>
      <div className="for__sticky">
        <p className="eyebrow" data-reveal>
          The open door
        </p>
        <h2 className="for__title" id="for-title">
          <span className="sr-only">Heaven is for everyone</span>
          <span aria-hidden="true">
            Heaven is for{" "}
            <span className="for__slot">
              {FOR_WHOM.map((item) => (
                <span className="for__word" key={item.word}>
                  {item.word}
                </span>
              ))}
            </span>
          </span>
        </h2>
        <p className="for__note">{FOR_WHOM[live ? active : FOR_WHOM.length - 1].note}</p>
        <OriginButton href="/story" className="for__link">
          How it started
        </OriginButton>
      </div>

      <ol className="for__photos">
        {FOR_WHOM.map((item, i) => (
          <li className="for__photo" key={item.word} data-side={i % 2 ? "b" : "a"}>
            <ArchPhoto image={item.image} sizes="(min-width: 900px) 30vw, 78vw" />
            <p className="for__caption">
              <strong>For {item.word}.</strong> {item.note}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
