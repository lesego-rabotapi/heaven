// Single source for what the page says. Moved from HEAVEN_CONTENT in the legacy index.html.
// TODO(content): the phone number is not confirmed. The two phone placeholders are plain text, never
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

export type FeedPost = { image: string; alt: string; place: string; width: number; height: number };
// From Heaven's own Instagram posts (@heavencoffeect), square crops made by scripts/optimise-instagram.mjs.
export const feed: FeedPost[] = [
  { image: 'images/ig-latte.jpg', alt: 'A cappuccino with a leaf of latte art', place: 'The cup', width: 800, height: 800 },
  { image: 'images/ig-church-front.jpg', alt: 'The stone front of Central Methodist Mission with its pointed-arch doorway', place: 'Burg Street', width: 800, height: 800 },
  { image: 'images/ig-nave-table.jpg', alt: 'Friends at a round table in the nave, with pews and Gothic arches behind', place: 'The nave', width: 800, height: 800 },
  { image: 'images/ig-bakes.jpg', alt: 'A loaf and a pile of biscuits, fresh from the oven', place: 'The counter', width: 800, height: 800 },
  { image: 'images/ig-doorway.jpg', alt: 'The open door under the heaven coffee sign, with a visitor stepping inside', place: 'The front door', width: 800, height: 800 },
  { image: 'images/ig-pavement-tables.jpg', alt: 'Tables along the pavement under navy umbrellas', place: 'Burg Street', width: 800, height: 800 },
  { image: 'images/ig-nave-group.jpg', alt: 'A group around a table in the nave, under the organ and the arches', place: 'The nave', width: 800, height: 800 },
  { image: 'images/ig-counter.jpg', alt: 'Two people at the counter under framed prints, one of them reading LOVE', place: 'The counter', width: 800, height: 800 },
  { image: 'images/ig-reading-outside.jpg', alt: 'A man reading a book at an outside table under a heaven coffee umbrella', place: 'Outside', width: 800, height: 800 },
  { image: 'images/ig-doorway-cup.jpg', alt: 'A visitor sipping coffee beside the carved wooden doors', place: 'The front door', width: 800, height: 800 },
  { image: 'images/ig-outside-friends.jpg', alt: 'Friends with coffee at the outside tables under the umbrellas', place: 'Outside', width: 800, height: 800 },
  { image: 'images/ig-nave-standing.jpg', alt: 'Four friends standing in the nave between the pews', place: 'The nave', width: 800, height: 800 },
];
