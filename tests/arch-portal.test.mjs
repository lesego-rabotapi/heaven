// node --test tests/arch-portal.test.mjs
// The arch portal (restored): off unless ?journey=on, never under reduced motion, and it cleans up after itself.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const hook = read('src/lib/useArchPortal.ts');
const hero = read('src/components/Hero.tsx');
const css = read('src/styles/legacy.css');

test('it runs only with ?journey=on, without reduced motion, and where IntersectionObserver exists', () => {
  assert.match(hook, /journey=on/);
  assert.match(hook, /prefers-reduced-motion: reduce/);
  assert.match(hook, /'IntersectionObserver' in window/);
});

test('it switches off at once if reduced motion is turned on, and on unmount', () => {
  assert.match(hook, /reduce\.addEventListener\('change', onMotion\)/);
  assert.match(hook, /removeAttribute\('data-journey'\)/);
  assert.match(hook, /removeProperty\('--journey'\)/);
  assert.match(hook, /disconnect\(\)/);
});

test('it watches the frame\'s parent, not the scaled frame itself', () => {
  assert.match(hook, /io\.observe\(frame\.parentElement\)/);
});

test('both hero arch frames carry the portal classes and the nave image', () => {
  assert.equal((hero.match(/journey-tile/g) || []).length, 2);
  assert.equal((hero.match(/journey-door/g) || []).length, 2);
  assert.equal((hero.match(/className="journey-nave"/g) || []).length, 2);
  assert.match(hero, /stone-arch-interior/);
});

test('the CSS for the portal exists and is gated on html[data-journey="on"]', () => {
  assert.match(css, /html\[data-journey="on"\] \.journey-tile \{[^}]*scale\(calc\(1 \+ var\(--journey, 0\) \* \.45\)\)/);
  assert.match(css, /\.journey-nave \{ display: none; \}/);
});
