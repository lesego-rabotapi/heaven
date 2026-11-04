// Single source for what the page says. Moved from HEAVEN_CONTENT in the legacy index.html.
// TODO(content): the phone number is not confirmed. The four phone placeholders are plain text, never
// links, so nobody taps a fake number. To go live, turn each into <a href="tel:+27XXXXXXXXX">.
// TODO(content): confirm public-holiday hours with Heaven before launch.
// TODO(content): the footer used to say "As seen on: Cape Town CCID (2021)"; not confirmed with the
// client, so it was removed. Add a press column back once it is.

export const brand = { name: 'Heaven Coffee', instagram: 'heavencoffeect', tagline: 'born in love, by love, for love' } as const;
export type HoursGroup = { label: string; open: string; close: string };
export const hours: { groups: HoursGroup[] } = { groups: [{ label: 'Every day', open: '07:00', close: '18:00' }] };
export const address = '38 Burg Street, corner of Burg & Longmarket, Cape Town 8000';
// What the map apps search for: the name and street find the place; "corner of ..." does not.
export const mapQuery = 'Heaven Coffee, 38 Burg Street, Cape Town 8000';

// What may be said on the page. 'confirmed' (the client told us), 'photo' (seen in a photo we hold) or
// 'unknown' (not known, so never shown). Components render a fact-gated item only when isKnown(key).
export type FactStatus = 'confirmed' | 'photo' | 'unknown';
export const facts: Record<string, { status: FactStatus; source: string }> = {
  dogs: { status: 'photo', source: 'Coco, the collie, in the photos' },
  outdoorTables: { status: 'photo', source: 'tables and umbrellas outside in the photos' },
  steps: { status: 'photo', source: 'a flight of steps up to the door in the photo' },
  cardPayments: { status: 'unknown', source: 'a Capitec sign in the photos; card payment not confirmed' },
  wifi: { status: 'unknown', source: 'not asked yet' },
  stepFree: { status: 'unknown', source: 'a wheelchair sign by the steps; the step-free route is not known' },
  phone: { status: 'unknown', source: 'number not supplied' },
  whatsapp: { status: 'unknown', source: 'not asked yet' },
};
export const isKnown = (key: string): boolean => (facts[key]?.status ?? 'unknown') !== 'unknown';

export type FeedPost = { image: string; alt: string; place: string };
export const feed: FeedPost[] = [
  { image: 'images/storefront-entrance.jpg', alt: 'Heaven Coffee storefront on Burg Street, navy umbrellas and a dog on the steps', place: 'Burg Street' },
  { image: 'images/cup-handover.jpg', alt: 'A barista handing over a to-go cup with the heaven coffee wordmark', place: 'The counter' },
  { image: 'images/stone-arch-interior.jpg', alt: 'Gothic stone arches, pews and stained glass inside Central Methodist Mission', place: 'The nave' },
  { image: 'images/puppy-entrance-door.jpg', alt: 'A couple holding a puppy at the Gothic entrance', place: 'The front door' },
  { image: 'images/tourist-pastry-umbrella.jpg', alt: 'A visitor with a pastry and coffee under a navy Heaven umbrella', place: 'Greenmarket Sq.' },
  { image: 'images/interior-signage.jpg', alt: 'The heaven coffee sign board above framed quotes and macramé', place: 'The wall' },
  { image: 'images/dog-petting-outdoor.jpg', alt: 'Two customers petting a dog at the outdoor tables', place: 'Outside' },
  { image: 'images/interior-counter.jpg', alt: 'The wooden counter with the sign board and people at the bar', place: 'The bar' },
  { image: 'images/three-friends-coffee.jpg', alt: 'Three friends sharing coffee under the umbrellas', place: 'Greenmarket Sq.' },
  { image: 'images/mondli-coco-480.jpg', alt: 'Mondli Mahamba holding his dog, Coco, in the doorway', place: 'The doorway' },
];
