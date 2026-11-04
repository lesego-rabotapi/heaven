// node --test
// Small accessibility fixes from the final audit (see docs/LAUNCH.md section 5).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');

test('the headline reads as two words, not "heavenCoffee"', () => {
  assert.match(html, /<h1\b[^>]*>heaven <br\/>Coffee<\/h1>/);
});

test('both "Open 7–6" headings say "7 to 6" to a screen reader', () => {
  const heads = html.match(/<h2\b[^>]*>Open 7–6<\/h2>/g) || [];
  assert.equal(heads.length, 2, 'desktop and phone');
  heads.forEach((h) => assert.match(h, /aria-label="Open 7 to 6"/));
});

test('the small "Est." line over the sky has a text shadow on phone and desktop', () => {
  const rules = html.match(/\.hero-est \{ top:[^}]*\}/g) || [];
  assert.equal(rules.length, 2, 'one rule for phone, one for desktop');
  rules.forEach((r) => assert.match(r, /text-shadow:/));
});
