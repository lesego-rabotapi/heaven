import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/Icon";

// After "FlowButton" by xubohuah on 21st.dev
// (https://21st.dev/@xubohuah/components/flow-button): a pill whose arrow
// travels through it while a fill flows up behind the label. The source could
// not be retrieved through the connector (daily limit), so this is rebuilt
// from its behaviour in plain CSS. Used for primary calls to action only.

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** "royal" on light surfaces, "amber" on navy and royal ones. */
  tone?: "royal" | "amber";
  size?: "md" | "sm";
};

export function FlowButton({ href, children, className, tone = "royal", size = "md" }: Props) {
  const cls = cn("flow-btn", `flow-btn--${tone}`, size === "sm" && "flow-btn--sm", className);
  const inner = (
    <>
      <span className="flow-btn__fill" aria-hidden="true" />
      <Icon name="arrow-right-linear" size={18} className="flow-btn__arrow flow-btn__arrow--in" />
      <span className="flow-btn__label">{children}</span>
      <Icon name="arrow-right-linear" size={18} className="flow-btn__arrow flow-btn__arrow--out" />
    </>
  );
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const blank = href.startsWith("http");
    return (
      <a
        className={cls}
        href={href}
        target={blank ? "_blank" : undefined}
        rel={blank ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}
