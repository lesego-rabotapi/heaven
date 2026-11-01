// node --test   (npm test)
// The "Find us" section may only say what the photos show. These tests keep it that way.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');
const section = (html.match(/<section id="find-the-door"[\s\S]*?<\/section>/) || [''])[0];
const steps = [...section.matchAll(/<li class="find-step"[\s\S]*?<\/li>/g)].map((m) => m[0]);

const start = html.indexOf('var HEAVEN_CONTENT = ');
const ctx = {};
vm.runInNewContext(html.slice(start, html.indexOf('\n};', start) + 3), ctx);
const facts = ctx.HEAVEN_CONTENT.facts;

test('four directions, in the order a visitor walks them', () => {
  assert.equal(steps.length, 4);
  const heads = steps.map((s) => s.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)[1]);
  assert.deepEqual(heads, ['Start at Greenmarket Square', 'Walk to Burg and Longmarket', 'Look for the navy umbrellas', 'Climb the steps to the door']);
});

test('every step has a photo with real alt text and fixed dimensions (no layout shift)', () => {
  steps.forEach((s) => {
    const img = s.match(/<img\b[^>]*>/)[0];
    assert.match(img, /alt="[^"]{20,}"/);
    assert.match(img, /width="\d+"/);
    assert.match(img, /height="\d+"/);
  });
});

test('the steps line depends on the steps fact, which a photo supports', () => {
  assert.match(steps[3], /data-fact="steps"/);
  assert.notEqual(facts.steps.status, 'unknown');
});

test('nothing claims step-free access while that fact is unknown', () => {
  assert.equal(facts.stepFree.status, 'unknown');
  assert.doesNotMatch(section, /step[- ]free|wheelchair|accessib|ramp|lift\b|level access|no stairs|easy (to reach|access)|mobility/i);
});

test('it ends with a Directions link that the maps script can rewrite', () => {
  assert.match(section, /<a [^>]*data-directions[^>]*>[\s\S]*?Get directions/);
});

test('"Find us" is reachable from the header, and the menu drawer', () => {
  assert.match(html, /<nav aria-label="Primary"[\s\S]*?href="#find-the-door"/);
  assert.match(html, /staggered-menu-item[^>]*href="#find-the-door"/);
});
