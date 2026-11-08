// node --test tests/step-inside.test.mjs
// The hooks on landing, all from what is really there: a strip of plain facts, a scroll that walks you from
// the street through the door into the nave, notes on the door photo that show the way in, the words
// written on the building, and the door again as the last thing on the page.
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
const motion = (css.match(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n {2}\}\n/g) || []).join('\n');
const still = (css.match(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n {2}\}\n/g) || []).reduce((s, b) => s.replace(b, ''), css);

test('the new sections sit in the story order: facts, step inside, story, words, menu, feed, visit, the door', () => {
  const order = ['<Hero />', '<Facts />', '<StepInside />', '<Story />', '<Words />', '<Menu />', '<Feed />', '<Visit />', '<ComeIn />'].map((s) => app.indexOf(s));
  assert.ok(order.every((n) => n >= 0), String(order));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});

test('facts are plain and already on the page: 2017, the 19th-century church, R42, seven days', () => {
  const facts = read('src/components/Facts.tsx');
  for (const fact of ['2017', '19th', 'R42', '07:00', '18:00']) assert.ok(facts.includes(fact), fact);
  assert.doesNotMatch(facts, /best|award|famous|world/i, 'no claims');
});

test('step inside walks from the door photo to the nave photo', () => {
  const step = read('src/components/StepInside.tsx');
  assert.match(step, /door-arch-800/);
  assert.match(step, /stone-arch-interior/);
  assert.match(step, /reads as a church/);
  assert.match(step, /Gothic stone arches, wooden pews/);
});

test('the walk only moves on scroll for people who allow motion, in browsers that can; otherwise both photos sit side by side', () => {
  assert.match(motion, /@supports \(animation-timeline: view\(\)\)/);
  assert.match(motion, /\.step \{[^}]*view-timeline: --step block/);
  assert.match(motion, /\.step-stage \{[^}]*position: sticky/);
  assert.match(motion, /animation-timeline: --step/);
  assert.doesNotMatch(still, /position: sticky/, 'nothing sticks without the motion block');
  assert.doesNotMatch(still, /animation-timeline: --step/);
});

test('the notes on the door point at what is in the photo, and the arrows are decoration', () => {
  const step = read('src/components/StepInside.tsx');
  for (const note of ['find the chalkboard', 'up the steps', 'through the arch']) assert.ok(step.includes(note), note);
  assert.match(step, /<svg className="step-arrows"[^>]*aria-hidden="true"/);
  assert.match(css, /\.step-frame \{[^}]*aspect-ratio: 3 \/ 4/, 'the frame matches the photo, so the notes stay on their targets');
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

test('the nave photo is cropped from the left, clear of the arrow left on it by Instagram', () => {
  assert.match(read('src/components/StepInside.tsx'), /stone-arch-interior[\s\S]*?objectPosition: "0% 50%"/);
});
