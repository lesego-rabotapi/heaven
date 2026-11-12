/**
 * The Heaven Coffee wordmark, redrawn from the shop's own signage (door glass,
 * umbrellas, counter board): wide-set light lowercase "heaven", a tapering
 * swoosh, "coffee" beneath. No logo file exists yet; swap this for the real
 * artwork when one does. Size it with font-size; colour follows currentColor.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} role="img" aria-label="heaven coffee">
      <span className="wordmark__name" aria-hidden="true">
        heaven
      </span>
      <svg
        className="wordmark__swoosh"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 11 C 46 1.5 118 -1.5 200 7.5 C 118 2.2 46 4.6 0 11 Z" fill="currentColor" />
      </svg>
      <span className="wordmark__sub" aria-hidden="true">
        coffee
      </span>
    </span>
  );
}
