// node --test tests/instagram-card.test.mjs
// The Instagram-style card shows no engagement numbers until the Meta API supplies real ones.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const card = read('src/components/InstagramCard.tsx');
const feedSection = read('src/components/Feed.tsx');
const css = read('src/components/instagram-card.css');

test('the engagement row renders only when stats are passed in', () => {
  assert.match(card, /const hasStats = stats && \(/);
  assert.match(card, /\{hasStats && \(/);
  assert.match(card, /stats\.likes !== undefined/);
  assert.match(card, /stats\.comments !== undefined/);
});

test('the page passes no stats and carries no numbers of its own', () => {
  assert.doesNotMatch(feedSection, /stats=/);
  assert.doesNotMatch(card, /\b\d+(\.\d+)?[km]?\s*(likes|comments|followers)\b/i);
  assert.doesNotMatch(card, /likes:\s*\d|comments:\s*\d|followers:\s*\d/);
});

test('the card says where the counts must come from, so nobody fills it by hand', () => {
  assert.match(card, /Graph API/);
  assert.match(card, /Never fill it with numbers that are not real/);
});

test('every link out is to the café profile and opens safely', () => {
  const anchors = card.match(/<a [^>]*>/g) || [];
  assert.ok(anchors.length >= 3);
  for (const a of anchors) {
    assert.match(a, /href=\{PROFILE\}/);
    assert.match(a, /rel="noopener noreferrer"/);
  }
});

test('the card is styled from tokens, with no hard-coded colours', () => {
  assert.doesNotMatch(css, /#[0-9A-Fa-f]{3,8}\b|rgba?\(/);
});

test('the cards are shown under the photo strip', () => {
  assert.match(feedSection, /<FeedStrip \/>\s*<InstagramCards/);
});

test('the handle link in the card header meets the target size (24px, 44px on touch)', () => {
  assert.match(css, /\.igc-head \.igc-handle \{[^}]*min-height: 1\.5rem/);
  assert.match(css, /any-pointer: coarse\) \{ \.igc-head \.igc-handle \{ min-height: 2\.75rem/);
});
