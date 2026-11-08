// node --test tests/words-and-door.test.mjs
// The words written on the building, and the door again as the last thing on the page.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => existsSync(join(root, f));
const read = (p) => (has(p) ? readFileSync(join(root, p), 'utf8') : '');
const app = read('src/App.tsx');
const css = read('src/styles/legacy.css');

test('the sections sit in order: hero, story, words, menu, feed, visit, the door', () => {
  const order = ['<Hero />', '<Story />', '<Words />', '<Menu />', '<Feed />', '<Visit />', '<ComeIn />'].map((s) => app.indexOf(s));
  assert.ok(order.every((n) => n >= 0), String(order));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});

test('the words are the building\'s own, credited to where they are written', () => {
  const words = read('src/components/Words.tsx');
  assert.match(words, /you are born in love/);
  assert.match(words, /Love casts out fear/);
  assert.match(words, /Touch the earth lightly/);
  assert.match(words, /on the glass of the door/);
  assert.match(words, /framed on the wall inside/);
});

test('the page ends on the door, with the way there in the accent', () => {
  const come = read('src/components/ComeIn.tsx');
  assert.match(come, /door-arch-1600/);
  assert.match(come, /<DirectionsLink className="[^"]*btn-accent/);
  assert.match(come, /find the door/i);
});

test('the walk through the door and the facts strip are gone, with the dog photo and the door notes', () => {
  assert.equal(has('src/components/StepInside.tsx'), false);
  assert.equal(has('src/components/Facts.tsx'), false);
  assert.doesNotMatch(app, /StepInside|Facts/);
  assert.doesNotMatch(css, /\.step-|\.fact|--step/);
});
