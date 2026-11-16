import type { ReactNode } from "react";
import { WaveText } from "./ui/wave-text";

/** The opening of an inner page: navy, the page's name in poster type, one line beside it. */
export function PageHero({
  eyebrow,
  title,
  aside,
  long,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: string;
  /** A long title: set smaller so two full lines fit. */
  long?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={long ? "page-hero page-hero--long" : "page-hero"}>
      <div className="page-hero__glow" aria-hidden="true" />
      <p className="eyebrow eyebrow--onDark" data-intro>
        {eyebrow}
      </p>
      <div className="page-hero__row">
        <div data-intro>
          <WaveText as="h1" className="page-hero__title" delay={350}>
            {title}
          </WaveText>
        </div>
        {aside && (
          <p className="page-hero__aside" data-intro>
            {aside}
          </p>
        )}
      </div>
      {children && <div data-intro>{children}</div>}
    </header>
  );
}
