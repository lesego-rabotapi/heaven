// node --test   (npm test)
// The menu is static HTML transcribed from the printed board, so it is indexable and
// readable without JavaScript. This compares what the page says with that transcription,
// word for word. If the café changes a price, change it here and in index.html together.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');
const section = (html.match(/<section id="menu"[\s\S]*?<\/section>/) || [''])[0];

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/\s+/g, ' ').trim();
const inner = (block, cls) => {
  const m = block.match(new RegExp('<[a-z]+[^>]*class="[^"]*\\b' + cls + '\\b[^"]*"[^>]*>([\\s\\S]*?)</[a-z]+>'));
  return m ? text(m[1]) : null;
};

const expected = [
  { group: 'Coffee', items: [
    ['Espresso', 'Bold, rich & full of character.', 'R42'],
    ['Americano', 'Espresso topped with hot water.', 'R42'],
    ['Cortado', 'Equal parts espresso & warm milk.', 'R42'],
    ['Flat White', 'Smooth espresso with steamed milk.', 'R42'],
    ['Cappuccino', 'Espresso with steamed milk & a soft layer of foam.', 'R42'],
    ['Latte', 'Espresso with steamed milk.', 'R42'],
  ] },
  { group: 'Something different', items: [
    ['Mocha', 'Espresso with chocolate & steamed milk.', 'R60'],
    ['Matcha Latte', 'Ceremonial matcha with steamed milk.', 'R65'],
    ['Dirty Chai', 'Chai latte with a shot of espresso.', 'R60'],
    ['Hot Chocolate', 'Rich, creamy & indulgent.', 'R50'],
  ] },
  { group: 'Make it yours', items: [
    ['Almond / oat / soy milk', null, 'R8'],
    ['Extra shot', null, 'R8'],
    ['Vanilla / hazelnut', null, 'R8'],
  ] },
];

test('the menu section exists in the HTML itself, not only after script runs', () => {
  assert.ok(section.length > 500, 'no #menu section found');
  assert.doesNotMatch(section, /JS-rendered|needs JavaScript/);
});

test('groups appear in order with their numerals, exactly the printed items, descriptions and prices', () => {
  const groups = section.split('<div class="menu-group">').slice(1);
  assert.equal(groups.length, 4, 'expected four menu groups');
  const head = (g) => [inner(g, 'menu-cat-no'), inner(g, 'menu-cat-h3')];
  assert.deepEqual(groups.map(head), [['I', 'Coffee'], ['II', 'Something different'], ['III', 'Make it yours'], ['IV', 'From the counter']]);
  expected.forEach((e, i) => {
    const items = [...groups[i].matchAll(/<li\b[\s\S]*?<\/li>/g)].map((m) => m[0]);
    const got = items.map((li) => [inner(li, 'menu-item-name'), inner(li, 'menu-item-note'), inner(li, 'menu-item-price')]);
    assert.deepEqual(got, e.items, e.group);
  });
  assert.equal((groups[3].match(/<li\b/g) || []).length, 0, 'the counter group is a sentence, not a list');
  assert.match(text(groups[3]), /Fresh bakes at the counter\. Ask what's out today\./);
});
test('the counter line, the currency note and no invented items', () => {
  const t = text(section);
  assert.match(t, /Fresh bakes at the counter\. Ask what's out today\./);
  assert.match(t, /Prices in rand \(R\)/);
  assert.doesNotMatch(t, /Sample menu|Banana Bread|Cold Brew|Pourover|Filter Coffee|Toasted Sandwich|Muffin|Cookie/);
});

test('the script no longer carries a menu', () => {
  assert.doesNotMatch(html, /HEAVEN_CONTENT\.menu|Menu poster board/);
});
