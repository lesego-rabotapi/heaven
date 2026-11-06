import { useRef } from 'react';
import { feed, type FeedPost } from '../lib/content';
import { useDragScroll } from '../lib/useDragScroll';
import { useFeedDrift } from '../lib/useFeedDrift';

// A row of square photos that drifts by itself and can be moved by hand (mouse drag, swipe, trackpad,
// arrow keys on the focused row, or Tab through the tiles). Each tile is a link to the Instagram profile.
// The copies exist only to make the loop seamless, so assistive tech and the keyboard skip them.
function FeedTile({ post, copy = false }: { post: FeedPost; copy?: boolean }) {
  return (
    <a
      className="feed-tile tile"
      href={'https://instagram.com/heavencoffeect'}
      target="_blank"
      rel="noopener noreferrer"
      title={copy ? undefined : 'View on Instagram'}
      aria-hidden={copy || undefined}
      tabIndex={copy ? -1 : undefined}
      style={{ position: 'relative', display: 'block', flexShrink: 0, overflow: 'hidden', background: '#A9CDF0', color: '#fff' }}
    >
      <picture className="block w-full h-full">
        <source type="image/webp" srcSet={post.image.replace(/\.jpg$/, '.webp')} />
        <img src={post.image} alt={copy ? '' : post.alt} width={post.width} height={post.height} className="w-full h-full object-cover block" loading="lazy" decoding="async" />
      </picture>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,27,45,.72) 0%, rgba(15,27,45,0) 34%)' }} />
      <div className="absolute flex flex-col" style={{ top: '12px', left: '14px', lineHeight: 1.2 }}>
        <span style={{ fontSize: '12px', fontWeight: 700 }}>heavencoffeect</span>
        <span style={{ fontSize: '12px', opacity: 0.9 }}>{post.place}</span>
      </div>
    </a>
  );
}

export function FeedStrip() {
  const row = useRef<HTMLDivElement>(null);
  const looped = useFeedDrift(row);
  useDragScroll(row);
  return (
    <div id="feed-row" ref={row} className="feed-row mt-9 lg:mt-16" tabIndex={0} role="region" aria-label="From the feed, scroll sideways">
      <div id="feed-track" className="feed-track flex" style={{ gap: '12px', width: 'max-content' }}>
        {feed.map((p) => <FeedTile key={p.image} post={p} />)}
        {looped && feed.map((p) => <FeedTile key={`copy-${p.image}`} post={p} copy />)}
      </div>
    </div>
  );
}
