// node --test tests/overdrive.test.mjs
// The overdrive pass: clouds that part on the logo, light falling from above, the building's whole line
// second on the page, Heaven's own photos, and a few pointer touches, all in the night colours.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => existsSync(join(root, f));
const read = (p) => (has(p) ? readFileSync(join(root, p), 'utf8') : '');
const app = read('src/App.tsx');
const hero = read('src/components/Hero.tsx');
const css = read('src/styles/legacy.css');
const tokens = read('src/styles/tokens.css');
const blocks = css.match(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n {2}\}\n/g) || [];
const motion = blocks.join('\n');
const still = blocks.reduce((s, b) => s.replace(b, ''), css);

test('the words come straight after the hero: the hook is the second thing you see', () => {
  const order = ['<Hero />', '<Words />', '<Story />', '<Menu />', '<Feed />', '<Visit />', '<ComeIn />'].map((s) => app.indexOf(s));
  assert.ok(order.every((n) => n >= 0), String(order));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});

test('the whole line from the door, phrase by phrase, over the empty interior', () => {
  const words = read('src/components/Words.tsx');
  for (const phrase of ['you are born', 'in love,', 'by love,', 'for love']) assert.ok(words.includes(phrase), phrase);
  assert.match(words, /on the glass of the door/);
  assert.match(words, /images\/ig-sanctuary/);
});

test('clouds part on the logo, in the night cloud colour, and rest apart when motion is reduced', () => {
  assert.match(hero, /className="sky"[^>]*aria-hidden="true"/);
  assert.ok((hero.match(/cloud-puff/g) || []).length >= 6, 'enough puffs to read as a bank');
  assert.match(css, /\.cloud-puff \{[^}]*var\(--cloud\)/);
  assert.match(motion, /\.cloud-bank-l \{[^}]*animation: cloud-part-l/);
  assert.match(motion, /\.cloud-bank-r \{[^}]*animation: cloud-part-r/);
  assert.doesNotMatch(still, /animation: cloud-part/, 'the resting place is the parted one');
});

test('light falls from above as decoration only, and sways only with motion allowed', () => {
  assert.match(hero, /className="rays"[^>]*aria-hidden="true"/);
  assert.match(motion, /\.rays \{[^}]*animation:/);
  assert.doesNotMatch(still, /\.rays \{[^}]*animation:/);
});

test('pointer touches only for a fine pointer that hovers, and never under reduced motion', () => {
  for (const f of ['src/lib/usePointerGlow.ts', 'src/lib/useMagnets.ts']) {
    const src = read(f);
    assert.match(src, /\(hover: hover\) and \(pointer: fine\)/, f);
    assert.match(src, /prefers-reduced-motion: reduce/, f);
  }
  assert.match(hero, /usePointerGlow\(/);
  assert.match(app, /useMagnets\(\)/);
  for (const f of ['Header', 'HoursCard', 'ComeIn']) assert.match(read(`src/components/${f}.tsx`), /data-magnet/, f);
  assert.match(css, /translate: var\(--mgx, 0\) var\(--mgy, 0\)/, 'the pull uses translate, so it never fights the hover lift');
});

test('the feed is twelve of Heaven\'s own photos, each sized and described', () => {
  const content = read('src/lib/content.ts');
  const feed = content.slice(content.indexOf('export const feed'));
  const items = feed.match(/image: 'images\/ig-[\w-]+\.jpg'/g) || [];
  assert.equal(items.length, 12);
  for (const m of items) {
    const file = m.match(/images\/[\w-]+\.jpg/)[0];
    assert.ok(has(file), file);
    assert.ok(has(file.replace(/\.jpg$/, '.webp')), file + ' webp');
  }
  assert.doesNotMatch(feed, /alt: ''/);
});

test('the story and the menu use the sharper photos', () => {
  assert.match(read('src/components/Story.tsx'), /ig-mondli-coco-1200/);
  assert.match(read('src/components/Menu.tsx'), /ig-latte/);
});

test('the giant titles are thinner, like the sign, from one token, and the font request carries the weight', () => {
  assert.match(tokens, /--display-weight:\s*200/);
  assert.match(read('app.html'), /family=Poppins:wght@200;300;400;500/);
  for (const sel of ['.lockup-hero .lockup-heaven', '.menu-h2', '.come-in-h2']) {
    assert.ok(css.includes(sel), sel);
  }
  assert.match(css, /font-weight: var\(--display-weight\)/);
});

test('the colours are unchanged: no new hex in the tokens', () => {
  const hexes = (tokens.match(/#[0-9A-Fa-f]{6}\b/g) || []).map((h) => h.toUpperCase()).sort();
  const allowed = ['#03060C', '#0A1220', '#0F1B2D', '#16253D', '#13213A', '#EEF4FA', '#C9D6E8', '#9FB0C8', '#A9CDF0', '#3B6FE8', '#FFFFFF', '#1E3A8A', '#FBFCFD', '#1D4ED8', '#26344A', '#3E4C63', '#B34E36', '#E07A5F'];
  for (const h of hexes) assert.ok(allowed.includes(h), 'new colour ' + h);
});

test('the Instagram originals stay out of git', () => {
  assert.match(read('.gitignore'), /^incoming\/$/m);
});
