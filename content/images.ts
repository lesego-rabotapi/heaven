import dims from "./image-dims.json";

// Every photo is Heaven Coffee's own, taken from their Instagram feed
// (@heavencoffeect, @mondli_mahamba, @heavensocial_ct) and converted by
// scripts/build-images.mjs. To drop a photo from the site, remove it here.
const ALT = {
  "mondli-coco-doorway":
    "Mondli Mahamba, founder of Heaven Coffee, laughing with Coco the border collie in his arms at the church door, pews and a pastry case behind them",
  "door-guest-smiling":
    "The arched glass door of Heaven Coffee set into carved stone columns, a guest smiling in the doorway",
  "door-mondli-espresso":
    "Mondli stepping out of the Gothic doorway into the sun with an espresso cup",
  "facade-street":
    "The stone facade of Central Methodist Mission on Burg Street, with the Heaven Coffee door and a navy umbrella",
  "nave-four-friends":
    "Four friends with coffee and croissants at a table among the pews, pale blue arches and the organ rising behind them",
  "nave-backpackers":
    "Three travellers at a cafe table in the nave, backpacks beside them, arms raised",
  "nave-round-table":
    "Four friends around a wooden table in the nave with coffees, the organ loft behind",
  "doorway-sip":
    "A guest in headphones drinking coffee beside the carved wooden church door",
  "arch-three-friends":
    "Three friends leaning out of the arched stone doorway, laughing",
  "foyer-two-friends":
    "Two friends with takeaway cups on the tiled foyer floor, the nave visible through a pointed arch",
  "pavement-reading":
    "Guests reading and talking under a row of navy Heaven umbrellas, Greenmarket Square market stalls beyond",
  "umbrella-espresso":
    "Two visitors raising red espresso cups with Mondli under the navy umbrellas",
  "pavement-book":
    "A guest reading a paperback in a woven chair under the navy umbrellas",
  "coco-puppy-door":
    "Two guests holding Coco as a puppy in front of the Heaven Coffee door",
  "coco-pavement":
    "Two guests greeting Coco, now fully grown, on the pavement under the umbrellas",
  "counter-wall":
    "Two baristas behind the wooden counter, under a wall of framed sayings and the heaven coffee sign",
  "counter-guests":
    "A barista chatting with three travellers at the counter, framed sayings on the dark wall",
  "latte-art": "A flat white with a rosetta poured into it, on a white table in the sun",
  "sign-in-love":
    "Three guests relaxing against the church railings beneath a sign reading in love, by love, for love",
  "umbrella-two-friends":
    "Two friends at a pavement table under a navy Heaven umbrella against the stone church wall",
  "chalkboard-stairway":
    "A guest holding a cup beside a pavement chalkboard that reads stairway to heaven in a cup",
  "mondli-cup-portrait": "Mondli smiling, holding a black cup and saucer in both hands",
  "mondli-laughing": "Mondli laughing in a woven chair outside the church at golden hour",
  "door-takeaway": "A guest with a takeaway cup pausing in the glass doorway",
  "pastry-sun": "A guest with eyes closed in the sun, pastry in hand, coffee on the table",
  "foyer-stairs-mondli":
    "A guest with a cappuccino on the foyer steps beside Mondli, plants climbing the staircase",
  "pavement-trio": "Three friends in bright prints seated against the church railings",
  "nave-students": "Four visitors standing together in the aisle of the nave under the timber roof",
  courtyard: "Guests at tables in a tree-shaded courtyard strung with lights",
  "counter-busy": "Two baristas serving at the counter, seen from above",
  bakes: "A banana loaf, shortbread rounds and chocolate chip cookies on a tray in the sun",
  "umbrellas-row": "A full row of pavement tables under the navy umbrellas on a clear day",
  "door-couple": "A couple in the arched doorway, framed by wrought iron and aloe leaves",
  "steps-style": "Two guests on the church steps beneath the heaven coffee door sign",
  "sanctuary-pews":
    "The sanctuary seen from the gallery: timber pulpit, red carpet and pew cushions in every colour",
  "barista-smile": "A barista laughing under the navy umbrellas, the market behind",
  "nave-solo": "A guest alone at a small table in the nave with one cup of coffee",
  "nave-pomeranian":
    "A small dog on a chair in the nave, eyeing a cappuccino in an orange cup",
  "cup-handover": "A barista holding out a Heaven Coffee takeaway cup",
} as const;

export type ImageKey = keyof typeof ALT;

const DIMS = dims as Record<string, { w: number; h: number }>;

export function photo(key: ImageKey) {
  const d = DIMS[key] ?? { w: 1440, h: 1800 };
  return { src: `/images/${key}.webp`, width: d.w, height: d.h, alt: ALT[key] };
}
