import type { ImageKey } from "./images";

export const SITE = {
  name: "Heaven Coffee",
  address: "38 Burg Street, corner of Burg & Longmarket, Cape Town 8000",
  addressShort: "38 Burg Street, Cape Town",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=38%20Burg%20Street%2C%20Cape%20Town",
  phoneDisplay: "072 884 2057",
  phoneHref: "tel:+27728842057",
  instagramHandle: "heavencoffeect",
  instagramUrl: "https://www.instagram.com/heavencoffeect/",
  // TODO(content): confirm public-holiday hours with Heaven before launch.
  hours: { open: "07:00", close: "18:00", label: "Every day" },
  timeZone: "Africa/Johannesburg",
} as const;

export const NAV = [
  { href: "/story", label: "Story" },
  { href: "/menu", label: "Menu" },
  { href: "/#feed", label: "As posted" },
  { href: "/visit", label: "Hours & visit" },
] as const;

// "Welcome", the way the square says it.
export const WELCOME: { text: string; lang: string }[] = [
  { text: "Welcome", lang: "en" },
  { text: "Welkom", lang: "af" },
  { text: "Wamkelekile", lang: "xh" },
  { text: "Siyakwamukela", lang: "zu" },
  { text: "Willkommen", lang: "de" },
  { text: "Bienvenue", lang: "fr" },
  { text: "Bem-vindo", lang: "pt" },
  { text: "Bienvenidos", lang: "es" },
  { text: "Benvenuti", lang: "it" },
  { text: "Karibu", lang: "sw" },
  { text: "欢迎", lang: "zh" },
  { text: "ようこそ", lang: "ja" },
];

export const FOR_WHOM: { word: string; image: ImageKey; note: string }[] = [
  { word: "the locals", image: "pavement-reader", note: "A paperback and a pavement chair on Burg Street." },
  { word: "travellers", image: "nave-travellers", note: "Backpacks down, a table among the pews." },
  { word: "dogs", image: "collie-pavement", note: "On leads, and usually the centre of attention." },
  { word: "old friends", image: "nave-table", note: "Four coffees under the organ loft." },
  { word: "the curious", image: "nave-solo", note: "Came in to look at the ceiling. Stayed for a cup." },
  { word: "everyone", image: "steps-crew", note: "Everyone who finds the door is welcome." },
];

// The way in, in the order you meet it.
export const WALK: { no: string; title: string; lines: string[]; image: ImageKey }[] = [
  {
    no: "01",
    title: "The square",
    lines: [
      "Start at Greenmarket Square.",
      "On the corner of Burg and Longmarket,",
      "look for a row of navy umbrellas.",
    ],
    image: "pavement-row",
  },
  {
    no: "02",
    title: "The steps",
    lines: ["A chalkboard on the pavement,", "then stone steps", "under a Gothic arch."],
    image: "facade-umbrella",
  },
  {
    no: "03",
    title: "The door",
    lines: ["From the street it reads as a church,", "because it is.", "The glass says heaven coffee."],
    image: "door-sign",
  },
  {
    no: "04",
    title: "The nave",
    lines: [
      "Pale blue arches, a pipe organ,",
      "tables between the pews,",
      "and the counter just inside the door.",
    ],
    image: "nave-table",
  },
];

// Framed on the wall behind the counter, as they hang there.
export const WALL: { text: string; style: "caps" | "script" }[] = [
  { text: "Love casts out fear", style: "caps" },
  { text: "Seek silence", style: "script" },
  { text: "Difference is divine", style: "caps" },
  { text: "Forgive. Forgive again. Forgive yourself.", style: "script" },
  { text: "Start over often", style: "script" },
];

// Sample menu. The espresso board and "Also on the board" are read off the
// letterboard on the counter; the rest is carried over from the pitch mockup.
// Prices render only once Heaven confirms them (price: null hides the price).
// TODO(content): confirm the full list and every price with Heaven.
export const MENU: {
  no: string;
  title: string;
  image: ImageKey;
  items: { name: string; note: string; price: number | null }[];
}[] = [
  {
    no: "I",
    title: "Espresso",
    image: "espresso-cheers",
    items: [
      { name: "Espresso", note: "A single concentrated shot", price: null },
      { name: "Americano", note: "Espresso lengthened with hot water", price: null },
      { name: "Cortado", note: "Cut with a little steamed milk", price: null },
      { name: "Flat White", note: "Steamed milk, thin microfoam", price: null },
      { name: "Cappuccino", note: "Steamed milk, deep foam", price: null },
      { name: "Latte", note: "Steamed milk, light foam", price: null },
    ],
  },
  {
    no: "II",
    title: "Also on the board",
    image: "latte",
    items: [
      { name: "Hot Chocolate", note: "For the non-coffee people", price: null },
      { name: "Holy Cow", note: "It is on the letterboard. Ask at the counter.", price: null },
      { name: "Filter Coffee", note: "Brewed through the grounds", price: null },
    ],
  },
  {
    no: "III",
    title: "Cold",
    image: "pastry-sun",
    items: [
      { name: "Iced Coffee", note: "Brewed, served over ice", price: null },
      { name: "Cold Brew", note: "Steeped cold for hours", price: null },
    ],
  },
  {
    no: "IV",
    title: "From the counter",
    image: "bakes",
    items: [
      { name: "Banana Bread", note: "Loaf cake, ripe bananas", price: null },
      { name: "Choc Chip Cookie", note: "Baked, chocolate-studded", price: null },
      { name: "Croissant", note: "From the pastry case", price: null },
      { name: "Toasted Sandwich", note: "Filling varies", price: null },
    ],
  },
];

export const CUES: { icon: string; title: string; body: string; image: ImageKey }[] = [
  {
    icon: "umbrella-linear",
    title: "Navy umbrellas",
    body: "A row of them along the railings on Burg Street, each one lettered heaven coffee.",
    image: "umbrellas-street",
  },
  {
    icon: "signpost-linear",
    title: "The chalkboard",
    body: "On the pavement by the steps. Stairway to heaven, in a cup.",
    image: "chalkboard",
  },
  {
    icon: "alt-arrow-right-linear",
    title: "Up the steps",
    body: "Through the Gothic arch and the glass door, and you are standing in the nave.",
    image: "steps-style",
  },
];
