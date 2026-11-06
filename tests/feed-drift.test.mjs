// node --test tests/feed-drift.test.mjs
// The feed drifts on its own at the 21 October pace and can be scrolled by hand at any time.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const hook = read('src/lib/useFeedDrift.ts');
const strip = read('src/components/FeedStrip.tsx');
const css = read('src/styles/legacy.css');

const { nextScroll, passSeconds } = await import('../src/lib/feedDriftMath.ts');

test('one pass takes 150s on a desktop and 130s on a phone, as the marquee did', () => {
  assert.equal(passSeconds(1440), 150);
  assert.equal(passSeconds(1024), 150);
  assert.equal(passSeconds(390), 130);
});

test('the position moves by speed times time, and wraps at the end of the first set', () => {
  assert.equal(nextScroll(100, 3000, 20, 1000), 120);
  assert.equal(nextScroll(2995, 3000, 20, 1000), 15);
});

test('a hand scroll into the copies comes back to the same picture, not to the start', () => {
  assert.equal(nextScroll(4000, 3000, 20, 0), 1000);
});

test('the row scrolls by hand: overflow stays on, and snapping is off so it cannot fight the drift', () => {
  assert.match(css, /\.feed-row \{[^}]*overflow-x: auto/);
  assert.doesNotMatch(css, /scroll-snap/);
});

test('it holds still for a hand, a pointer, the keyboard, an off-screen row, a hidden tab and reduced motion', () => {
  for (const event of ['mouseenter', 'mouseleave', 'focusin', 'focusout', 'touchstart', 'touchend', 'scroll']) {
    assert.ok(hook.includes(`'${event}'`), event);
  }
  assert.match(hook, /IntersectionObserver/);
  assert.match(hook, /document\.hidden/);
  assert.match(hook, /prefers-reduced-motion: reduce/);
});

test('the page HTML has ten tiles; the copies arrive with script and are hidden from assistive tech', () => {
  assert.match(strip, /looped && feed\.map/);
  assert.match(strip, /aria-hidden=\{copy \|\| undefined\}/);
  assert.match(strip, /tabIndex=\{copy \? -1 : undefined\}/);
  assert.match(strip, /alt=\{copy \? '' : post\.alt\}/);
});
