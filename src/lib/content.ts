// Single source for the facts the page states. Mirrors HEAVEN_CONTENT in the legacy index.html until
// that file is retired; tests/react-build.test.mjs checks the prerendered page against these.
export const brand = {
  name: 'Heaven Coffee',
  instagram: 'heavencoffeect',
  tagline: 'born in love, by love, for love',
} as const;

export const hours = { open: '07:00', close: '18:00' } as const;
export const address = '38 Burg Street, corner of Burg & Longmarket, Cape Town 8000';
