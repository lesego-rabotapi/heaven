import { feed, type FeedPost } from '../lib/content';

// A row of square photos that you scroll by hand (swipe, trackpad, arrow keys on the focused row, or Tab
// through the tiles). Nothing in it moves by itself, so there is nothing to pause. Each tile is a link to
// the Instagram profile; CSS snaps the row to the tiles.
function FeedTile({ post }: { post: FeedPost }) {
  return (
    <a
      className="feed-tile tile"
      href={'https://instagram.com/heavencoffeect'}
      target="_blank"
      rel="noopener noreferrer"
      title="View on Instagram"
      style={{ position: 'relative', display: 'block', flexShrink: 0, overflow: 'hidden', background: '#A9CDF0', color: '#fff' }}
    >
      <picture className="block w-full h-full">
        <source type="image/webp" srcSet={post.image.replace(/\.jpg$/, '.webp')} />
        <img src={post.image} alt={post.alt} width={post.width} height={post.height} className="w-full h-full object-cover block" loading="lazy" decoding="async" />
      </picture>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,27,45,.72) 0%, rgba(15,27,45,0) 34%)' }} />
      <div className="absolute flex flex-col" style={{ top: '12px', left: '14px', lineHeight: 1.2 }}>
        <span style={{ fontSize: '12px', fontWeight: 700 }}>{post.place}</span>
      </div>
    </a>
  );
}

export function FeedStrip() {
  return (
    <div id="feed-row" className="feed-row mt-9 lg:mt-16" tabIndex={0} role="region" aria-label="Heaven in pictures, scroll sideways">
      <div id="feed-track" className="feed-track flex" style={{ gap: '12px', width: 'max-content' }}>
        {feed.map((p) => <FeedTile key={p.image} post={p} />)}
      </div>
    </div>
  );
}
