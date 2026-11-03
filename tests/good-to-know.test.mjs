// node --test
// "Good to know" chips: only facts the registry knows, no dogs, no emoji, icons hidden from
// screen readers. Unknown facts (card payments, Wi-Fi, step-free) must have no chip at all.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');
const group = (html.match(/<div class="good" data-fact-group>[\s\S]*?<\/ul>\s*<\/div>/) || [''])[0];
const chips = [...group.matchAll(/<li\b[\s\S]*?<\/li>/g)].map((m) => m[0]);

const start = html.indexOf('var HEAVEN_CONTENT = ');
const ctx = {};
vm.runInNewContext(html.slice(start, html.indexOf('\n};', start) + 3), ctx);
const facts = ctx.HEAVEN_CONTENT.facts;

test('the good-to-know group exists, is labelled, and has at least two chips', () => {
  assert.ok(group, 'no data-fact-group wrapper (label and chips together) found');
  assert.match(group, /aria-label="Good to know"/);
  assert.ok(chips.length >= 2);
});

test('every chip is tied to a registered fact that is not unknown', () => {
  chips.forEach((c) => {
    const key = (c.match(/data-fact="([^"]+)"/) || [])[1];
    assert.ok(key, 'chip without data-fact: ' + c.slice(0, 60));
    assert.ok(facts[key], 'no fact "' + key + '"');
    assert.notEqual(facts[key].status, 'unknown', key);
  });
});

test('no chip for dogs or for facts we do not know', () => {
  assert.doesNotMatch(group, /dog|puppy|coco/i);
  ['cardPayments', 'wifi', 'stepFree', 'phone', 'whatsapp'].forEach((k) => {
    assert.doesNotMatch(group, new RegExp('data-fact="' + k + '"'));
  });
  assert.doesNotMatch(group, /wi-?fi|card|wheelchair|step-free|accessible/i);
});

test('icons are inline SVG, decorative, and there is no emoji', () => {
  chips.forEach((c) => {
    assert.match(c, /<svg[^>]*aria-hidden="true"/);
  });
  assert.doesNotMatch(group, /\p{Extended_Pictographic}/u);
});

test('the steps chip says what the photo shows, nothing about access', () => {
  const steps = chips.find((c) => /data-fact="steps"/.test(c));
  assert.match(steps, /flight of steps/i);
});
