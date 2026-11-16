import type { ImageKey } from "./images";

// SAMPLE FEED. The photos are Heaven's own, from @heavencoffeect. Everything
// else here is mock, written for the design: the captions, the like, comment
// and repost counts, the comments and the commenter handles. Nobody pictured
// is named or quoted. To go live, replace this file with real posts.
export type Post = {
  id: string;
  image: ImageKey;
  kind: "post" | "reel";
  place: string;
  caption: string;
  likes: number;
  reposts: number;
  commentCount: number;
  comments: { user: string; text: string }[];
  age: string;
};

export const POSTS: Post[] = [
  {
    id: "door-collie",
    image: "mondli-collie",
    kind: "post",
    place: "The front door",
    caption: "Management, and head of security. See you at the door ☕️🐶",
    likes: 2416,
    reposts: 96,
    commentCount: 132,
    comments: [
      { user: "lena.unterwegs", text: "Der schönste Empfang in ganz Kapstadt 🥹" },
      { user: "thabo_in_town", text: "Head of security takes the job very seriously" },
      { user: "marguerite.voyage", text: "On revient en mars, gardez-nous une table ☕️" },
    ],
    age: "2d",
  },
  {
    id: "nave-croissants",
    image: "nave-croissants",
    kind: "post",
    place: "The nave",
    caption: "Take me to church, but make it croissants. Table for four between the pews ⛪️",
    likes: 1873,
    reposts: 61,
    commentCount: 88,
    comments: [
      { user: "pieter.opreis", text: "Koffie in een kerk. Hoe hebben we dit gemist vorige keer?" },
      { user: "sofi.viaja", text: "El techo. El órgano. El cortado. Todo." },
      { user: "kaapstad_kat", text: "Lekker koffie, mooi plek 💙" },
    ],
    age: "4d",
  },
  {
    id: "stairway",
    image: "chalkboard",
    kind: "post",
    place: "Burg Street",
    caption: "Stairway to heaven, in a cup. The chalkboard does not lie.",
    likes: 942,
    reposts: 38,
    commentCount: 41,
    comments: [
      { user: "notes.from.cpt", text: "Best pavement sign in the CBD, no contest" },
      { user: "yuki_tabi", text: "ケープタウンで一番好きなカフェ ☕️" },
    ],
    age: "5d",
  },
  {
    id: "espresso-cheers",
    image: "espresso-cheers",
    kind: "post",
    place: "Greenmarket Square",
    caption: "Red cups up. First espresso of the trip, and somehow already regulars.",
    likes: 1532,
    reposts: 54,
    commentCount: 67,
    comments: [
      { user: "giulia.in.giro", text: "Un espresso vero, a diecimila chilometri da casa 👏" },
      { user: "sipho.dlamini", text: "Those red cups hit different in the sun" },
    ],
    age: "1w",
  },
  {
    id: "puppy",
    image: "collie-puppy",
    kind: "post",
    place: "The front door",
    caption: "New staff member. No experience, excellent attitude 🐾",
    likes: 3108,
    reposts: 143,
    commentCount: 204,
    comments: [
      { user: "anna.reist", text: "Ich komme nur für den Hund. Okay, und den Flat White." },
      { user: "capetown.dogs", text: "Hired on the spot 🐶" },
      { user: "jo_explores", text: "This is the content I flew 11 hours for" },
    ],
    age: "1w",
  },
  {
    id: "latte",
    image: "latte",
    kind: "post",
    place: "A pavement table",
    caption: "Nine in the morning, table in the sun. Poured, not rushed.",
    likes: 811,
    reposts: 19,
    commentCount: 23,
    comments: [
      { user: "milk.and.maps", text: "That rosetta though" },
      { user: "camille.cafe", text: "Le meilleur flat white du Cap, je confirme" },
    ],
    age: "2w",
  },
  {
    id: "in-love",
    image: "railings-trio",
    kind: "post",
    place: "Burg Street",
    caption: "In love, by love, for love. It is on the wall, and on the door, and in the cup.",
    likes: 1264,
    reposts: 72,
    commentCount: 58,
    comments: [
      { user: "nomsa.creates", text: "This corner of town just feels different 💙" },
      { user: "henrik.pa.tur", text: "Fant dette stedet ved en tilfeldighet. Kom tilbake tre ganger." },
    ],
    age: "2w",
  },
  {
    id: "wall",
    image: "counter-wall",
    kind: "post",
    place: "The counter",
    caption: "Read the wall while you wait. Start over often. Seek silence. Order the cortado.",
    likes: 1097,
    reposts: 44,
    commentCount: 36,
    comments: [
      { user: "the.slow.traveller", text: "Difference is divine. Screenshotted for later." },
      { user: "lwazi_m", text: "The Holy Cow on the board has me curious" },
    ],
    age: "3w",
  },
  {
    id: "arch",
    image: "arch-trio",
    kind: "post",
    place: "The arch",
    caption: "Everyone who finds the door is welcome. These three found it twice in one day.",
    likes: 1420,
    reposts: 49,
    commentCount: 52,
    comments: [
      { user: "maria.pelomundo", text: "A porta mais bonita da Cidade do Cabo 😍" },
      { user: "ben.walks.cities", text: "Walked past it twice before I realised it was a café" },
    ],
    age: "3w",
  },
  {
    id: "pastry",
    image: "pastry-sun",
    kind: "post",
    place: "Greenmarket Square",
    caption: "Eyes closed, pastry in hand, market behind you. This is the whole brief.",
    likes: 1688,
    reposts: 57,
    commentCount: 61,
    comments: [
      { user: "elodie.en.route", text: "Exactement mon programme pour demain matin" },
      { user: "za.weekender", text: "Sunday mood, any day of the week" },
    ],
    age: "1mo",
  },
  {
    id: "steps",
    image: "steps-style",
    kind: "reel",
    place: "The steps",
    caption: "Outfit check on the church steps. The door did most of the work.",
    likes: 2054,
    reposts: 118,
    commentCount: 93,
    comments: [
      { user: "thandi.styles", text: "The steps, the arch, the fit. Ten out of ten." },
      { user: "kofi.on.film", text: "Best backdrop in the city bowl" },
    ],
    age: "1mo",
  },
  {
    id: "sanctuary",
    image: "sanctuary",
    kind: "reel",
    place: "The sanctuary",
    caption: "Before the first cup. The pews have cushions in every colour, like everything else here.",
    likes: 1345,
    reposts: 81,
    commentCount: 47,
    comments: [
      { user: "kirchen.und.kaffee", text: "Eine Kirche mit Kaffeebar. Warum gibt es das nicht überall?" },
      { user: "ayesha.k", text: "Those cushions 😭 so much colour" },
    ],
    age: "1mo",
  },
  {
    id: "market",
    image: "market-smile",
    kind: "reel",
    place: "Greenmarket Square",
    caption: "One step off the market. Come for the beads, stay for the flat white.",
    likes: 976,
    reposts: 33,
    commentCount: 29,
    comments: [
      { user: "lucas.fora.de.casa", text: "Café primeiro, mercado depois. Sempre." },
      { user: "zinhle_n", text: "That smile is the whole vibe of the place" },
    ],
    age: "2mo",
  },
  {
    id: "crew",
    image: "steps-crew",
    kind: "reel",
    place: "Burg Street",
    caption: "Came as strangers at ten. Left as a group chat by eleven.",
    likes: 1811,
    reposts: 77,
    commentCount: 84,
    comments: [
      { user: "hostel.stories", text: "This is exactly how our Cape Town week started" },
      { user: "mats.reser", text: "Bästa kaffet på hela resan ☕️" },
    ],
    age: "2mo",
  },
];
