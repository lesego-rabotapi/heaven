import { FeedStrip } from './FeedStrip';
import { Roll } from './Roll';

export function Feed() {
  return (
    <section id="feed" className="feed-section">
      <div className="feed-head">
        <div className="feed-title">
          <span className="t-label t-accent reveal">From the feed</span>
          <h2 className="t-title feed-h2 reveal">
            Heaven,
            {' '}
            <span className="font-quote italic feed-h2-quote">as posted</span>
          </h2>
        </div>
        <a href="https://instagram.com/heavencoffeect" rel="noopener noreferrer" target="_blank" className="hv-btn hv-link btn btn-action reveal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
          <Roll>Follow @heavencoffeect</Roll>
        </a>
      </div>
      <FeedStrip />
    </section>
  );
}
