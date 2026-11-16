"use client";

import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

// Adapted from "Origin Button" by edwinvakayil on 21st.dev
// (https://21st.dev/@lyanchouss/components/origin-button). Same idea: the fill
// grows from the point where the pointer came in (or from the centre for
// keyboard focus). Ported from Motion to a CSS transition so GSAP stays the
// only animation library, restyled to the site tokens, and made a link.

function coverDiameter(w: number, h: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(w - x, y),
        Math.hypot(x, h - y),
        Math.hypot(w - x, h - y),
      ),
  );
}

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Visual tone: "ink" for light surfaces, "light" for navy and royal ones. */
  tone?: "ink" | "light";
  external?: boolean;
  "aria-label"?: string;
};

export function OriginButton({ href, children, className, tone = "ink", external, ...rest }: Props) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const place = (x: number, y: number) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--ox", `${x}px`);
    node.style.setProperty("--oy", `${y}px`);
    node.style.setProperty("--od", `${coverDiameter(rect.width, rect.height, x, y)}px`);
  };
  const fromPointer = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    place(e.clientX - rect.left, e.clientY - rect.top);
  };
  const fromCentre = () => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    place(rect.width / 2, rect.height / 2);
  };

  const props = {
    ref,
    className: cn("origin-btn", `origin-btn--${tone}`, className),
    onPointerEnter: fromPointer,
    onPointerDown: fromPointer,
    onFocus: (e: React.FocusEvent<HTMLAnchorElement>) => {
      if (e.currentTarget.matches(":focus-visible")) fromCentre();
    },
    ...rest,
  };
  const inner = (
    <>
      <span className="origin-btn__fill" aria-hidden="true" />
      <span className="origin-btn__label">{children}</span>
    </>
  );

  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    const blank = href.startsWith("http");
    return (
      <a
        {...props}
        href={href}
        target={blank ? "_blank" : undefined}
        rel={blank ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link {...props} href={href}>
      {inner}
    </Link>
  );
}
