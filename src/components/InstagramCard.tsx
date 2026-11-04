import { brand, type FeedPost } from '../lib/content';
import './instagram-card.css';

// Counts come from the Instagram Graph API (Meta), which needs the business account connected and the
// owner's approval. Until then no count exists, so none is drawn: with no `stats` the card shows the
// photo, the caption and the handle, and nothing that looks like engagement. Pass `stats` once the API
// is connected and the action row appears. Never fill it with numbers that are not real.
export type InstagramStats = { likes?: number; comments?: number };

const nf = new Intl.NumberFormat('en-ZA', { notation: 'compact', maximumFractionDigits: 1 });
const PROFILE = `https://instagram.com/${brand.instagram}`;

const icon = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false } as const;

export function InstagramCard({ post, stats, index = 0 }: { post: FeedPost; stats?: InstagramStats; index?: number }) {
  const hasStats = stats && (stats.likes !== undefined || stats.comments !== undefined);
  return (
    <article className="igc reveal" style={{ '--i': index }}>
      <header className="igc-head">
        <span className="igc-avatar font-display" aria-hidden="true">h</span>
        <div className="igc-who">
          <a className="igc-handle" href={PROFILE} target="_blank" rel="noopener noreferrer">@{brand.instagram}</a>
          <span className="igc-place">{post.place}</span>
        </div>
      </header>
      <a className="igc-photo" href={PROFILE} target="_blank" rel="noopener noreferrer" aria-label={`${post.alt}. Open ${brand.name} on Instagram.`}>
        <picture>
          <source type="image/webp" srcSet={post.image.replace(/\.jpg$/, '.webp')} />
          <img src={post.image} alt="" width={800} height={800} loading="lazy" decoding="async" />
        </picture>
      </a>
      {hasStats && (
        <ul className="igc-actions" aria-label="Engagement on Instagram">
          {stats.likes !== undefined && (
            <li><svg {...icon}><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.7a4.3 4.3 0 0 1 7.5 2.8c0 5.4-7.5 10-7.5 10z" /></svg><span>{nf.format(stats.likes)} likes</span></li>
          )}
          {stats.comments !== undefined && (
            <li><svg {...icon}><path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.6A8 8 0 1 1 20.5 11.5z" /></svg><span>{nf.format(stats.comments)} comments</span></li>
          )}
        </ul>
      )}
      <p className="igc-caption"><a className="igc-handle" href={PROFILE} target="_blank" rel="noopener noreferrer">{brand.instagram}</a> {post.alt}</p>
      <a className="igc-link" href={PROFILE} target="_blank" rel="noopener noreferrer">View on Instagram</a>
    </article>
  );
}

// A short row of cards under the marquee. Photos are the café's own; the captions describe what is in
// them, they are not claimed to be posts.
export function InstagramCards({ posts }: { posts: FeedPost[] }) {
  return (
    <ul className="igc-grid" aria-label="Photos from Heaven Coffee">
      {posts.map((p, i) => (
        <li key={p.image}><InstagramCard post={p} index={i} /></li>
      ))}
    </ul>
  );
}
