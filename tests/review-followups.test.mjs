// node --test tests/review-followups.test.mjs
// Follow-ups from the retrospective review of the open-now chip and the phone action bar.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');

test('the phone hero has no second Directions button (the action bar carries it)', () => {
  const hero = html.slice(html.indexOf('<section id="hero"'), html.indexOf('</section>', html.indexOf('<section id="hero"')));
  assert.doesNotMatch(hero, /Get directions/);
  assert.match(html, /<div id="action-bar"/);
});

test('every backdrop-filter has a -webkit- twin for Safari before 18', () => {
  const plain = (html.match(/(?<!-webkit-)backdrop-filter:/g) || []).length;
  const prefixed = (html.match(/-webkit-backdrop-filter:/g) || []).length;
  assert.ok(plain > 0);
  assert.equal(prefixed, plain);
});

test('the open-state chip ticks on the minute boundary and skips unchanged text', () => {
  assert.doesNotMatch(html, /setInterval\(renderOpenState/);
  assert.match(html, /60000 - \(Date\.now\(\) % 60000\)/);
  assert.match(html, /if \(el\.textContent !== next\)/);
});
