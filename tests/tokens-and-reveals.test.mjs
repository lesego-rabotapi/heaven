// node --test tests/tokens-and-reveals.test.mjs
// Dark is the base of the React rebuild's tokens, and scroll reveals are CSS only.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const tokens = read('src/styles/tokens.css');
const reveal = read('src/styles/reveal.css');

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const token = (name) => tokens.match(new RegExp('--' + name + ':\\s*(#[0-9A-Fa-f]{6})'))[1];

test('dark is the base: tokens sit on :root with no theme attribute and no !important', () => {
  assert.match(tokens, /:root \{\s*color-scheme: dark;/);
  assert.doesNotMatch(tokens, /data-sky|!important|prefers-color-scheme/);
});

test('every ink token reads at 4.5:1 on the ground, and the action label on the action', () => {
  for (const name of ['ink', 'ink-soft', 'ink-muted', 'ink-accent']) {
    assert.ok(ratio(token(name), token('ground')) >= 4.5, name);
  }
  assert.ok(ratio(token('action-ink'), token('action')) >= 4.5, 'action label');
  assert.ok(ratio(token('action'), token('ground')) >= 3, 'action against the ground');
});

test('components take colours from tokens, not hard-coded hex', () => {
  for (const f of readdirSync(join(root, 'src/components')).filter((n) => n.endsWith('.css'))) {
    assert.doesNotMatch(read('src/components/' + f), /#[0-9A-Fa-f]{3,8}\b/, f);
  }
});

test('scroll reveals are CSS only and cannot leave content hidden', () => {
  assert.match(reveal, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(reveal, /@supports \(animation-timeline: view\(\)\)/);
  assert.match(reveal, /animation-timeline: view\(\)/);
  // opacity 0 appears only inside the keyframes, never as a resting state
  const outside = reveal.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@keyframes[\s\S]*?\n\}\n/, '');
  assert.doesNotMatch(outside, /opacity:\s*0/);
  assert.equal(readdirSync(join(root, 'src/lib')).some((n) => /reveal/i.test(n)), false, 'no reveal script');
});
