// node --test tests/oct21-design.test.mjs
// The page is the 21 October design (commit 314ee9e) on the night tokens: its hero, its navigation and its
// feed heading are back, and nothing added after that date is left on the page. The door and Coco photos,
// the real menu and the corrected copy stay, because those are facts, not design.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const app = read('src/App.tsx');
const hero = read('src/components/Hero.tsx');
const feed = read('src/components/Feed.tsx');
const css = read('src/styles/legacy.css');
const tokens = read('src/styles/tokens.css');
const parts = ['Header', 'NavDrawer', 'Hero', 'Feed', 'FeedStrip', 'FooterDesktop', 'FooterMobile', 'Menu', 'Story', 'Truths', 'VisitDesktop'];
const all = parts.map((f) => read(`src/components/${f}.tsx`)).join('\n');

test('what was added after 21 October is gone from the code, not just hidden', () => {
  for (const f of ['src/components/FindTheDoor.tsx', 'src/components/InstagramCard.tsx', 'src/components/instagram-card.css', 'src/components/ActionBar.tsx', 'src/lib/useArchPortal.ts']) {
    assert.equal(existsSync(join(root, f)), false, f);
  }
  assert.doesNotMatch(app, /FindTheDoor|ActionBar/);
  assert.doesNotMatch(feed, /InstagramCard|OtherMaps/);
  assert.doesNotMatch(all, /OtherMaps|Stairway to heaven|find-the-door|born in love/);
  assert.doesNotMatch(hero, /arch-frame|arch-edge|arch-clip|journey|useArchPortal/);
  assert.doesNotMatch(css, /\.find-|\.good|\.action-bar|\.other-maps|\.arch-|journey|\.hero-band/);
  assert.doesNotMatch(tokens, /--find-|--good-|--bar-/);
});

test('the sections run in the 21 October order', () => {
  const order = ['<Hero />', '<Truths />', '<Story />', '<Menu />', '<Feed />', '<VisitDesktop />', '<FooterDesktop />', '<FooterMobile />'];
  const at = order.map((s) => app.indexOf(s));
  assert.ok(at.every((n) => n >= 0), 'all present');
  assert.deepEqual(at, [...at].sort((a, b) => a - b));
});

test('the hero has the rounded photo frames, the three-photo band, the hours pill and the phone button', () => {
  assert.match(hero, /borderRadius: "120px 120px 12px 12px"/);
  assert.match(hero, /borderRadius: "180px 180px 14px 14px"/);
  assert.match(hero, /images\/cup-handover\.jpg/);
  assert.match(hero, /images\/storefront-entrance\.jpg/);
  assert.match(hero, /hero-pill[^>]*on-light|on-light[^>]*hero-pill/);
  assert.match(hero, /Open daily 07:00 — 18:00/);
  assert.match(hero, /<DirectionsLink className="[^"]*lg:hidden/);
});

test('the desktop hero stands where it did: headline at 150px, photos at 560px, tagline at 1000px', () => {
  assert.match(hero, /top: "560px"/);
  assert.match(css, /\.hero-section \{ height: 1200px;/);
  assert.match(css, /\.hero-h1 \{ top: 150px; font-size: 250px; \}/);
  assert.match(css, /\.hero-sub \{ top: 1000px; gap: 24px; \}/);
});

test('the hero keeps the door photo and the story keeps Mondli with Coco', () => {
  assert.match(hero, /images\/door-arch-480\.jpg/);
  assert.match(read('src/components/Story.tsx'), /images\/mondli-coco-480\.jpg/);
  assert.doesNotMatch(all, /founder-mondli/);
});

test('navigation is the 21 October four, in every place it appears', () => {
  for (const f of ['Header', 'NavDrawer', 'FooterDesktop', 'FooterMobile']) {
    const src = read(`src/components/${f}.tsx`);
    assert.match(src, /From the feed/, f);
    assert.doesNotMatch(src, /In pictures/, f);
  }
  for (const f of ['Header', 'NavDrawer']) assert.doesNotMatch(read(`src/components/${f}.tsx`), /Find us/, f);
  assert.doesNotMatch(read('src/components/NavDrawer.tsx'), /05/);
});

test('the feed heading is back, and each tile shows the handle and the place', () => {
  assert.match(feed, /From the feed/);
  assert.match(feed, /as posted/);
  assert.doesNotMatch(feed, /A look around|in pictures/);
  assert.match(read('src/components/FeedStrip.tsx'), /heavencoffeect<\/span>/);
});

test('the real menu stays: real prices, no sample items, no sign-off note', () => {
  const menu = read('src/components/Menu.tsx');
  assert.match(menu, /R42/);
  assert.match(menu, /lg:grid-cols-4/);
  assert.doesNotMatch(menu, /MENU TO CONFIRM|Banana Bread|Cold Brew/);
});

test('21 October placeholders and unconfirmed claims stay out', () => {
  assert.doesNotMatch(all, /072 884 2057|href="tel:/);
  assert.doesNotMatch(all, /\[Caption|\[likes\]|\[CONFIRM\]|As seen on|CCID|Press outlet/);
  assert.doesNotMatch(all, /aria-label="Language"/);
  assert.doesNotMatch(all, /dog[- ]friendly|dog-seal|navy awning/i);
  assert.doesNotMatch(all, /Open now|Closed ·/);
});

test('the night theme stays', () => {
  assert.match(tokens, /--ground: #0A1220/);
  assert.match(tokens, /--action: #3B6FE8/);
  assert.doesNotMatch(tokens, /#F2A65A/i);
  assert.match(read('app.html'), /Poppins/);
  assert.doesNotMatch(read('app.html'), /Josefin|Manrope/);
});
