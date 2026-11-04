// Map links for one place, in the order a visitor's phone makes most useful.
//
// A query string ("Heaven Coffee, 38 Burg Street, Cape Town 8000") rather than coordinates: no pin has
// been confirmed with the client yet (plan question 9), and the name plus street finds the place in all
// three apps. Swap in the Google Business Profile link or coordinates when they exist.
export type MapLink = { name: string; url: string };

export function directionsLinks(query: string, appleFirst: boolean): { primary: MapLink; others: MapLink[] } {
  const q = encodeURIComponent(query);
  const google = { name: 'Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=' + q };
  const apple = { name: 'Apple Maps', url: 'https://maps.apple.com/?q=' + q };
  const waze = { name: 'Waze', url: 'https://waze.com/ul?q=' + q + '&navigate=yes' };
  return appleFirst ? { primary: apple, others: [google, waze] } : { primary: google, others: [apple, waze] };
}

// iPhone and iPod say so in the user agent; iPadOS 13+ pretends to be a Mac, but a Mac has no touch
// screen, so "MacIntel with touch points" is an iPad.
export function prefersAppleMaps(userAgent: string, platform: string, maxTouchPoints: number): boolean {
  if (/iPhone|iPad|iPod/.test(userAgent || '')) return true;
  return platform === 'MacIntel' && maxTouchPoints > 1;
}
