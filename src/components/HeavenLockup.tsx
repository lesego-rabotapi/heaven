import type { ElementType } from 'react';

// The Heaven Coffee logo as it appears on the sign, the cup and the awning: "heaven" light and widely
// spaced, a thin swoosh under it, and a small "coffee" centred below. Set in type, because no vector logo
// has been supplied; a client SVG would replace the inside of this one component. The header shows the
// two words on one line, and the footer "heaven" and the swoosh alone.
type Size = 'header' | 'hero' | 'footer';

export function HeavenLockup({ as: Tag = 'div', size }: { as?: ElementType; size: Size }) {
  return (
    <Tag className={`lockup lockup-${size}`}>
      <span className="lockup-heaven">heaven</span>
      {size !== 'header' && (
        <svg className="lockup-swoosh" data-swoosh viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 15.5C62 5 150 1.2 300 1.6 176 3.4 84 7.6 0 15.5Z" />
        </svg>
      )}
      {' '}
      {size !== 'footer' && <span className="lockup-coffee">coffee</span>}
    </Tag>
  );
}
