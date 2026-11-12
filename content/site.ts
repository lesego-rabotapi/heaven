import type { ImageKey } from "./images";

export const SITE = {
  name: "Heaven Coffee",
  address: "38 Burg Street, corner of Burg & Longmarket, Cape Town 8000",
  addressShort: "38 Burg Street, Cape Town",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Heaven%20Coffee%2C%2038%20Burg%20Street%2C%20Cape%20Town",
  phoneDisplay: "072 884 2057",
  phoneHref: "tel:+27728842057",
  instagramHandle: "heavencoffeect",
  instagramUrl: "https://www.instagram.com/heavencoffeect/",
  // TODO(content): confirm public-holiday hours with Heaven before launch.
  hours: { open: "07:00", close: "18:00", label: "Every day" },
  timeZone: "Africa/Johannesburg",
} as const;

export const NAV = [
  { href: "#door", label: "The door" },
  { href: "#story", label: "Story" },
  { href: "#menu", label: "Menu" },
  { href: "#feed", label: "As posted" },
  { href: "#visit", label: "Visit" },
] as const;

// The sayings framed on the wall behind the counter, as they hang there.
export const WALL: { text: string; style: "caps" | "script" | "type" }[] = [
  { text: "Love casts out fear", style: "caps" },
  { text: "You are born in love, by love and for love", style: "type" },
  { text: "Difference is divine", style: "caps" },
  { text: "Seek silence", style: "script" },
  { text: "Forgive. Forgive again. Forgive yourself.", style: "script" },
  { text: "Start over often", style: "script" },
  { text: "God enjoys you", style: "script" },
];

export const TRUTHS: {
  no: string;
  title: string;
  body: string;
  image: ImageKey;
  tone: "paper" | "royal" | "mist";
}[] = [
  {
    no: "01",
    title: "Sacred",
    body: "The tables stand between the pews of Central Methodist Mission. The organ is real, the Sunday service is real, and on a weekday morning the loudest sound is milk being steamed.",
    image: "doorway-sip",
    tone: "paper",
  },
  {
    no: "02",
    title: "Open door",
    body: "Commuters, backpackers, wedding parties, people who only came in to look at the ceiling. Nobody is asked what they believe. Everyone who finds the door is welcome.",
    image: "arch-three-friends",
    tone: "royal",
  },
  {
    no: "03",
    title: "On the square",
    body: "Navy umbrellas on the corner of Burg and Longmarket, one step off the Greenmarket Square market. Take a pavement chair and let Cape Town walk past.",
    image: "pavement-reading",
    tone: "mist",
  },
  {
    no: "04",
    title: "Coco",
    body: "The border collie who grew up on these steps. She greets the regulars by name, more or less, and has a cappuccino named after her. Dogs on leads are always welcome.",
    image: "coco-pavement",
    tone: "paper",
  },
];

// Items read off the letterboard on the counter. Prices render only once
// Heaven confirms them (price: null hides the price slot).
// TODO(content): confirm the full list, the house special and all prices.
export const MENU: {
  numeral: string;
  title: string;
  note: string;
  items: { name: string; desc: string; price: number | null }[];
}[] = [
  {
    numeral: "I",
    title: "Coffee",
    note: "Pulled to order",
    items: [
      { name: "Espresso", desc: "Short, in a red cup", price: null },
      { name: "Americano", desc: "Espresso, lengthened", price: null },
      { name: "Cortado", desc: "Cut with a little milk", price: null },
      { name: "Flat White", desc: "Steamed milk, thin foam", price: null },
      { name: "Cappuccino", desc: "Deeper foam", price: null },
      { name: "Latte", desc: "The long, soft one", price: null },
    ],
  },
  {
    numeral: "II",
    title: "Not coffee",
    note: "For everyone else",
    items: [
      { name: "Hot Chocolate", desc: "Rich, and slow to cool", price: null },
      { name: "Pot of Tea", desc: "Loose leaf, glass pot", price: null },
      { name: "Something Iced", desc: "Ask what is cold today", price: null },
    ],
  },
  {
    numeral: "III",
    title: "From the counter",
    note: "Baked for the morning",
    items: [
      { name: "Croissant", desc: "Plain or chocolate", price: null },
      { name: "Banana Loaf", desc: "By the slice", price: null },
      { name: "Cookies", desc: "Chocolate chip, hazelnut", price: null },
    ],
  },
];
