"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, motionOK } from "@/lib/gsap";

declare global {
  interface Window {
    __heavenReady?: boolean;
  }
}

/** Splits an element's text into masked words. Screen readers get the
 *  untouched sentence; the animated words are hidden from them. */
function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitDone) {
    return Array.from(el.querySelectorAll<HTMLElement>(".w"));
  }
  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = el.textContent;

  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");

  const addWords = (text: string, wrap?: HTMLElement) => {
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (!part.trim()) {
        visual.appendChild(document.createTextNode(" "));
        return;
      }
      const mask = document.createElement("span");
      mask.className = "w-mask";
      const word = (wrap ? wrap.cloneNode(false) : document.createElement("span")) as HTMLElement;
      word.classList.add("w");
      word.textContent = part;
      mask.appendChild(word);
      visual.appendChild(mask);
    });
  };

  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) addWords(node.textContent ?? "");
    else if (node instanceof HTMLBRElement) visual.appendChild(document.createElement("br"));
    else if (node instanceof HTMLElement) addWords(node.textContent ?? "", node);
  });

  el.textContent = "";
  el.append(sr, visual);
  el.dataset.splitDone = "true";
  return Array.from(visual.querySelectorAll<HTMLElement>(".w"));
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.__heavenReady = true;
    if (!motionOK()) return;

    const root = document.documentElement;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (root.classList.contains("is-loading")) lenis.stop();

    const lock = () => lenis.stop();
    const unlock = () => lenis.start();
    window.addEventListener("heaven:lock", lock);
    window.addEventListener("heaven:unlock", unlock);

    // In-page links ride the smooth scroller instead of jumping.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!;
      const target = id === "#top" ? document.body : document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.start();
      lenis.scrollTo(id === "#top" ? 0 : target, { duration: 1.4 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      // Single elements that rise in once.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // Headings: masked word-by-word reveal, once.
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          words,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.055,
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          },
        );
      });

      // The long statement lights up word by word as it is read.
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          words,
          { opacity: 0.24 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 52%", scrub: 0.8 },
          },
        );
      });

      // Small drifting layers.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) * 100;
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      ctx.revert();
      document.removeEventListener("click", onClick);
      window.removeEventListener("heaven:lock", lock);
      window.removeEventListener("heaven:unlock", unlock);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
