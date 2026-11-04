import { DirectionsLink } from './DirectionsLink';
export function ActionBar() {
  return (
    <div id="action-bar" className="action-bar lg:hidden">
      <DirectionsLink className="action-bar-go hv-btn hv-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l19-9-9 19-2-8-8-2z" />
        </svg>
        {' '}
        Directions
      </DirectionsLink>
    </div>
  );
}
