// node --test   (npm test)
// Wording the client has not confirmed, or that the photos contradict, must not come back.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');
// What a visitor can read: no comments, no style or script blocks.
const page = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '');
const text = page.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

test('the door is marked by navy umbrellas and a chalkboard sign, not an awning', () => {
  assert.doesNotMatch(text, /awning/i);
  assert.match(text, /navy umbrellas and the chalkboard sign/);
});

test('the chalkboard line closes the how-to-find-us sentence in both visit cards', () => {
  assert.equal((text.match(/Stairway to heaven in a cup/g) || []).length, 2); // desktop card + phone card
});

test('the picture strip is titled as pictures, with no claim that these are posts', () => {
  assert.match(text, /A look around/);
  assert.match(text, /Heaven, in pictures/);
  assert.doesNotMatch(text, /From the feed|as posted/i);
  assert.doesNotMatch(html, /heavencoffeect<\/span><span style="font-size:12px; opacity/); // no handle on each tile
});

test('no unconfirmed press mention', () => {
  assert.doesNotMatch(text, /As seen on|CCID/);
});

test('the footer signs off with the café\'s own line, on desktop and phone', () => {
  assert.equal((text.match(/born in love, by love, for love/g) || []).length, 2);
});

test('the site does not announce that it is dog friendly', () => {
  assert.doesNotMatch(text, /dog[- ]friendly|dogs? welcome|dogs on leads/i);
  assert.doesNotMatch(html, /dog-seal/);
});

test('navigation says the same thing everywhere', () => {
  const links = [...page.matchAll(/href="#feed"[^>]*>(?:<span[^>]*>[^<]*<\/span>)?([^<]*)</g)].map((m) => m[1].trim());
  assert.ok(links.length >= 4);
  links.forEach((l) => assert.equal(l, 'In pictures'));
});
