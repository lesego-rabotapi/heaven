import dims from "./image-dims.json";

// Every photo is Heaven Coffee's own, from their Instagram accounts
// (@heavencoffeect, @mondli_mahamba), converted by scripts/build-images.mjs.
// Alt text describes what is in the frame; guests are not named.
const ALT = {
  "pavement-reader":
    "A guest reading a paperback in a woven chair under the navy Heaven umbrellas, market stalls down the street",
  chalkboard:
    "A guest holding a cup beside the pavement chalkboard that reads stairway to heaven in a cup",
  "door-sip":
    "A guest in headphones drinking coffee beside the carved wooden church door, pews in the dark behind",
  "mondli-portrait": "Mondli Mahamba smiling, holding a black cup and saucer in both hands",
  latte: "A flat white with a rosetta poured into it, on a white pavement table in the sun",
  "umbrella-pair":
    "Two friends at a round table under a navy Heaven umbrella against the stone church wall",
  "nave-croissants":
    "Four friends with coffee and croissants at a table among the pews, pale blue Gothic arches and the pipe organ behind them",
  "mondli-laugh": "Mondli Mahamba laughing in a woven chair outside the church railings",
  "glass-door": "A guest pausing in the glass doorway under the heaven coffee sign",
  "nave-travellers":
    "Three travellers at a cafe table in the nave, one with an arm raised, pews and the organ behind",
  "nave-table":
    "Four friends around a wooden table in the nave with coffees, pale blue arches overhead",
  "pavement-row":
    "A row of pavement tables under navy Heaven umbrellas along the church railings, guests reading and talking",
  "railings-trio":
    "Three guests relaxing against the church railings beneath a sign reading in love, by love, for love",
  "foyer-pair":
    "Two friends with takeaway cups on the patterned tile floor of the foyer, a pointed arch behind them",
  "counter-chat":
    "A barista talking with three travellers at the counter, framed sayings on the dark wall",
  "arch-trio": "Three friends leaning out of the arched stone doorway, laughing",
  "door-sign":
    "The arched glass door with heaven coffee lettered across it, set between carved stone columns, a guest smiling in the doorway",
  "counter-wall":
    "Two baristas behind the wooden counter under a wall of framed sayings and the heaven coffee sign",
  "steps-espresso": "Mondli stepping out of the Gothic doorway into the sun with a red espresso cup",
  "espresso-cheers": "Two visitors raising red espresso cups with Mondli under the navy umbrellas",
  "collie-puppy": "Two guests holding a border collie puppy in front of the Heaven Coffee door",
  "collie-pavement": "Two guests greeting a grown border collie on the pavement under the umbrellas",
  "pastry-sun":
    "A guest with eyes closed in the sun, pastry in hand, a cappuccino on the table, the square behind",
  bakes: "A loaf, shortbread rounds and chocolate chip cookies on a tray in the sun",
  "umbrellas-street": "Guests at pavement tables under a line of navy umbrellas on Burg Street",
  "railing-aloe":
    "Two guests behind the wrought-iron railing at the arched entrance, an aloe in the foreground",
  "steps-style": "Two guests on the church steps beneath the heaven coffee door sign",
  "counter-above": "Baristas serving at the counter beside the pastry case, seen from above",
  sanctuary:
    "The sanctuary from the gallery: timber pulpit, red carpet and rows of pews with cushions in many colours",
  "foyer-stairs":
    "A guest with a cappuccino on the foyer steps beside Mondli, plants climbing the staircase",
  "pavement-prints": "Three friends in bright prints seated against the church railings",
  "market-smile":
    "A guest laughing under the navy umbrellas with the Greenmarket Square market behind",
  "nave-aisle": "Four visitors standing in the aisle of the nave under the dark timber roof",
  "nave-solo":
    "A guest alone at a small table in the nave with one cup of coffee, the organ behind",
  "doorway-cheer": "A group of friends cheering in the arched wooden doorway",
  "facade-umbrella":
    "The Gothic stone entrance of Central Methodist Mission with a navy Heaven umbrella and two guests at a table by the steps",
  "collie-carried": "A guest carrying a border collie puppy inside the church, stained glass behind",
  facade:
    "The stone facade of Central Methodist Mission on Burg Street with the Heaven Coffee entrance and umbrella",
  "steps-crew": "Six friends posing on the pavement in front of the church entrance",
  "collie-hug": "A barista hugging a border collie behind the counter",
  "mondli-collie":
    "Mondli Mahamba laughing with a border collie in his arms at the church door, pews and a pastry case behind them",
} as const;

export type ImageKey = keyof typeof ALT;

const DIMS = dims as Record<string, { w: number; h: number }>;

export function photo(key: ImageKey) {
  const d = DIMS[key] ?? { w: 1440, h: 1800 };
  return { src: `/images/${key}.webp`, width: d.w, height: d.h, alt: ALT[key] };
}
