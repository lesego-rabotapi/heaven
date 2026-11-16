import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** True when motion styles are active (class set before paint in <head>). */
export function motionOK() {
  return (
    typeof document !== "undefined" && document.documentElement.classList.contains("js-motion")
  );
}

export function finePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/** The one smooth-scroll instance, shared so sections can read its velocity. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

/**
 * Splits an element's text into masked words. Assistive tech gets the
 * untouched sentence; the animated copies are hidden from it.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>(".w"));
  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = el.textContent;
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");

  const add = (text: string, wrap?: HTMLElement) => {
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
    if (node.nodeType === Node.TEXT_NODE) add(node.textContent ?? "");
    else if (node instanceof HTMLBRElement) visual.appendChild(document.createElement("br"));
    else if (node instanceof HTMLElement) add(node.textContent ?? "", node);
  });
  el.textContent = "";
  el.append(sr, visual);
  el.dataset.splitDone = "true";
  return Array.from(visual.querySelectorAll<HTMLElement>(".w"));
}

export { gsap, ScrollTrigger, useGSAP };
