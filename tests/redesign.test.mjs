// node --test tests/redesign.test.mjs
// The night redesign: the current colours, one type voice taken from the Heaven Coffee logo, one hero that
// answers "when and where" on the first screen, and one Visit and one Footer instead of a copy per device.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => existsSync(join(root, f));
const read = (p) => (has(p) ? readFileSync(join(root, p), 'utf8') : '');
const tokens = read('src/styles/tokens.css');
const css = read('src/styles/legacy.css');
const reveal = read('src/styles/reveal.css');
const app = read('src/App.tsx');
const appHtml = read('app.html');

test('the colourway is the one on main, value for value', () => {
  const pinned = {
    ground: '#0A1220', 'ground-raised': '#0F1B2D', card: '#16253D', 'menu-board': '#13213A', ink: '#EEF4FA', 'ink-soft': '#C9D6E8',
    'ink-muted': '#9FB0C8', 'ink-accent': '#A9CDF0', action: '#3B6FE8', 'action-ink': '#FFFFFF', 'ink-bright': '#FBFCFD', 'accent-deep': '#1E3A8A',
  };
  for (const [name, value] of Object.entries(pinned)) assert.match(tokens, new RegExp(`--${name}: ${value}`), name);
  assert.doesNotMatch(tokens + css, /#F2A65A|#E5F36D|#FFF9EC/i, 'no amber, lime or cream');
});

test('type follows the logo: light, tracked Poppins from tokens, and the serif only for quotes', () => {
  assert.match(tokens, /--font-brand:\s*'Poppins'/);
  assert.match(tokens, /--font-quote:\s*'Instrument Serif'/);
  assert.match(tokens, /--brand-weight:\s*300/);
  assert.match(tokens, /--brand-letter-spacing:\s*[\d.]+em/);
});

test('one font request, with Archivo and Bricolage gone, and no font named outside the tokens', () => {
  const links = appHtml.match(/fonts\.googleapis\.com\/css2\?[^"]+/g) || [];
  assert.equal(links.length, 1);
  assert.match(links[0], /family=Poppins/);
  assert.match(links[0], /family=Instrument\+Serif/);
  assert.doesNotMatch(links[0], /Archivo|Bricolage/);
  const walk = (dir) => readdirSync(join(root, dir), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
  for (const f of walk('src').filter((n) => /\.(tsx?|css)$/.test(n) && n !== 'src/styles/tokens.css')) {
    assert.doesNotMatch(read(f), /Poppins|Bricolage|Archivo|Instrument Serif/, f);
  }
  assert.doesNotMatch(read('tailwind.config.js'), /Bricolage|Archivo/);
});

test('the lockup is the logo: "heaven", a swoosh, then a small "coffee", used in header, hero and footer', () => {
  const lockup = read('src/components/HeavenLockup.tsx');
  assert.match(lockup, />heaven</);
  assert.match(lockup, /lockup-swoosh/);
  assert.match(lockup, />coffee</);
  for (const f of ['Header', 'Hero', 'Footer']) assert.match(read(`src/components/${f}.tsx`), /<HeavenLockup/, f);
});

test('the landing text is lower case, in the h1', () => {
  assert.match(read('src/components/Hero.tsx'), /<HeavenLockup as="h1"/);
  assert.doesNotMatch(read('src/components/Hero.tsx'), /uppercase/);
});

test('the hero carries the door, the hours and the way there, and fits the screen instead of a fixed height', () => {
  const hero = read('src/components/Hero.tsx');
  assert.match(hero, /door-arch-1600/);
  assert.match(hero, /<HoursCard/);
  assert.match(hero, /<Sticker/);
  const card = read('src/components/HoursCard.tsx');
  assert.match(card, /<DirectionsLink/);
  assert.match(card, /38 Burg Street/);
  assert.match(css, /\.hero-section \{[^}]*min-height: 100svh/);
  assert.doesNotMatch(css, /\.hero-section \{[^}]*[^-]height: \d+px/);
});

test('the sticker says only what is known, and there is no dog-friendly seal', () => {
  const sticker = read('src/components/Sticker.tsx');
  assert.match(sticker, /est\. 2017 · burg street/);
  assert.doesNotMatch(sticker, /dog/i);
});

test('one Visit and one Footer: no copy per device, and every link goes to #visit', () => {
  for (const f of ['Truths', 'VisitDesktop', 'FooterDesktop', 'FooterMobile']) assert.equal(has(`src/components/${f}.tsx`), false, f);
  for (const f of ['Visit', 'Footer', 'HoursCard', 'Sticker', 'HeavenLockup']) assert.equal(has(`src/components/${f}.tsx`), true, f);
  const order = ['<Hero />', '<Story />', '<Menu />', '<Feed />', '<Visit />', '<Footer />'].map((s) => app.indexOf(s));
  assert.ok(order.every((n) => n >= 0));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  for (const f of ['Header', 'NavDrawer', 'Footer']) {
    const src = read(`src/components/${f}.tsx`);
    assert.match(src, /href="#visit"/, f);
    assert.doesNotMatch(src, /#visit-desktop/, f);
  }
});

test('the three truths live on in the story, in their own words', () => {
  const story = read('src/components/Story.tsx');
  for (const line of ['Sacred', 'Open door', 'On the square', 'most recognisable facades', 'Everyone who finds the door is welcome', 'a step off the Greenmarket Square market']) {
    assert.ok(story.includes(line), line);
  }
});

test('facts stay: real menu, corrected copy, placeholder phone, no invented claims', () => {
  const menu = read('src/components/Menu.tsx');
  assert.match(menu, /R42/);
  assert.match(menu, /Prices in rand/);
  const visit = read('src/components/Visit.tsx');
  assert.match(visit, /navy umbrellas and the chalkboard sign/);
  assert.match(visit, /data-phone-placeholder/);
  assert.doesNotMatch(visit + read('src/components/Footer.tsx'), /href="tel:|As seen on|awning/);
  assert.match(read('src/components/Feed.tsx'), /as posted/);
});

test('motion: the swoosh draws on load, sections reveal, the story card settles, labels roll', () => {
  assert.match(read('src/lib/useHeroIntro.ts'), /scaleX/);
  assert.match(appHtml, /html\.js-motion \[data-swoosh\]/);
  assert.match(reveal, /\.settle/);
  assert.match(read('src/components/Story.tsx'), /settle/);
  for (const f of ['Story', 'Menu', 'Visit', 'Feed']) assert.match(read(`src/components/${f}.tsx`), /reveal/, f);
  assert.match(read('src/components/Roll.tsx'), /data-label/);
  assert.match(css, /\.roll::after/);
});

test('the sticker turns and the labels roll only for people who have not asked for less motion', () => {
  const block = css.match(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n {2}\}\n/g) || [];
  const moving = block.join('\n');
  assert.match(moving, /\.sticker-ring \{ animation:/);
  assert.match(moving, /\.roll/);
  const outside = block.reduce((s, b) => s.replace(b, ''), css);
  assert.doesNotMatch(outside, /\.sticker-ring \{[^}]*animation:/);
});

test('sections do not trap the scroll timelines: no overflow-hidden on a section that holds a reveal', () => {
  for (const f of ['Feed', 'Visit', 'Story', 'Footer']) assert.doesNotMatch(read(`src/components/${f}.tsx`), /<(section|footer)[^>]*overflow-hidden/, f);
});

test('the door photo has a large export, stripped by the same script', () => {
  assert.match(read('scripts/optimise-images.mjs'), /name: 'door-arch', widths: \[480, 800, 1600\]/);
  for (const f of ['images/door-arch-1600.webp', 'images/door-arch-1600.jpg']) assert.ok(has(f), f);
});
