import { hours } from '../lib/content';
import { DirectionsLink } from './DirectionsLink';
import { Roll } from './Roll';

// The two things a visitor came for, on the first screen: when it is open and how to get there.
export function HoursCard() {
  const group = hours.groups[0];
  return (
    <div data-intro className="hours-card on-light">
      <span className="t-label hours-card-label">Open daily</span>
      {group && <span className="hours-card-time">{group.open} — {group.close}</span>}
      <span className="hours-card-address">38 Burg Street, Cape Town</span>
      <DirectionsLink data-magnet className="hv-btn hv-link btn btn-accent hours-card-go">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l19-9-9 19-2-8-8-2z" />
        </svg>
        <Roll>Get directions</Roll>
      </DirectionsLink>
    </div>
  );
}
