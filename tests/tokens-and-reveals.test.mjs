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

test('the React app themes itself from tokens: no sky.css, no attribute selectors on inline colours', () => {
  assert.doesNotMatch(read('src/main.tsx'), /sky\.css/);
  assert.doesNotMatch(read('src/styles/legacy.css'), /\[style\*=/);
  assert.doesNotMatch(read('src/styles/tokens.css'), /\[style\*=|data-sky/);
});

test('component styles name tokens, not colours (the few exceptions are listed)', () => {
  // exceptions: the feed tile's placeholder behind its photo, the white label on it, and the printed dot's colour
  const allowed = new Set(['src/components/FeedStrip.tsx:#A9CDF0', 'src/components/FeedStrip.tsx:#fff']);
  for (const f of readdirSync(join(root, 'src/components')).filter((n) => n.endsWith('.tsx'))) {
    const hexes = read('src/components/' + f).match(/(?<!href=")#[0-9A-Fa-f]{3,6}\b/g) || [];
    for (const h of hexes) assert.ok(allowed.has(`src/components/${f}:${h}`), `${f} hard-codes ${h}`);
  }
});

test('light surfaces inside the night page are scoped with .on-light, not special-cased', () => {
  assert.match(read('src/styles/tokens.css'), /\.on-light \{[^}]*--ink: #0F1B2D/);
  for (const f of ['Header', 'Story']) assert.match(read(`src/components/${f}.tsx`), /on-light/, f);
});

test('the feed has no play/pause button, and nothing in it moves by itself', () => {
  assert.doesNotMatch(read('src/components/FeedStrip.tsx'), /feed-pause|aria-pressed|Pause feed|setInterval|requestAnimationFrame/);
});

// The accent is warm (amber, the colour of the crema and the café's lamplight) against the navy sky.
const hue = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  if (!d) return 0;
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
};

test('the accent is warm: buttons, kickers and prices are amber, not blue', () => {
  for (const name of ['action', 'ink-accent', 'find-accent', 'bar-accent']) {
    const h = hue(token(name));
    assert.ok(h >= 20 && h <= 45, name + ' hue ' + h.toFixed(0));
  }
  assert.doesNotMatch(tokens, /#3B6FE8/i, 'the old blue accent is gone');
  assert.match(read('src/styles/legacy.css'), /--menu-accent: var\(--ink-accent\)/);
});

test('inside the light surfaces the accent is a deep amber that still reads at 4.5:1', () => {
  const onLight = tokens.match(/\.on-light \{[^}]*--ink-accent: (#[0-9A-Fa-f]{6})/)[1];
  assert.ok(hue(onLight) >= 15 && hue(onLight) <= 45, 'warm');
  assert.ok(ratio(onLight, '#FBFCFD') >= 4.5, 'accent on the light card');
});

test('every amber button takes its label from --action-ink, never a hard-coded white', () => {
  const css = read('src/styles/legacy.css');
  for (const sel of ['find-cta', 'action-bar-go']) {
    const rule = css.match(new RegExp('\\.' + sel + ' \\{[^}]*\\}'))[0];
    assert.match(rule, /color: var\(--action-ink\)/, sel);
  }
});
