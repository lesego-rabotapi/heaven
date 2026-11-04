import type { CSSProperties, ElementType } from 'react';
import './heaven-wordmark.css';

// The one Heaven wordmark: "heaven" in light upright lower case, tracked from the brand tokens, as on the awning. The header
// adds a small "coffee" beside it (withSub); the footers show it alone and set its size from
// their own CSS. Use this component anywhere the name appears as a logo, so the wordmark cannot drift.
export function HeavenWordmark({ as: Tag = 'span', withSub = false, className = '', style }: {
  as?: ElementType;
  withSub?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag className={`heaven-wordmark-wrap ${className}`.trim()} style={style}>
      <span className="heaven-wordmark">heaven</span>
      {withSub && (
        <>
          {' '}
          <span className="heaven-wordmark-sub">coffee</span>
        </>
      )}
    </Tag>
  );
}
