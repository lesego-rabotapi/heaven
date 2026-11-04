// node --test tests/night-theme.test.mjs
// The night theme (assets/sky.css) is switched by html[data-sky]; light is the default.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'assets', 'sky.css'), 'utf8');

test('the page links sky.css and the light page carries no data-sky of its own', () => {
  assert.match(html, /<link rel="stylesheet" href="assets\/sky\.css"\/>/);
  assert.doesNotMatch(html, /<html[^>]*data-sky/);
});

test('the sky follows the visitor\'s dark mode, and ?sky= can force one', () => {
  assert.match(html, /prefers-color-scheme: dark/);
  assert.match(html, /sky=\(night\|black\|dusk\|now\)/);
});

test('night and black re-point the tokens of Find us, Good to know and the action bar', () => {
  for (const token of ['--find-bg', '--find-ink', '--find-muted', '--good-chip-bg', '--good-ink', '--bar-bg', '--bar-ink']) {
    assert.ok(css.includes(token + ':'), token + ' is set for the dark skies');
  }
  // every token that sky.css re-points is one the page really defines
  for (const token of ['--find-bg', '--good-chip-bg', '--bar-bg']) assert.ok(html.includes(token + ':'), token);
});

test('the sections that have their own light background are covered', () => {
  assert.match(css, /\.truths-section \{ background: var\(--g\) !important; \}/);
  assert.match(css, /\.other-maps a \{ color: #A9CDF0; \}/);
});

test('the activation script picks the right sky (run against stubbed browsers)', async () => {
  const vm = await import('node:vm');
  const src = html.match(/<script>\s*\/\/ Night theme[\s\S]*?<\/script>/)[0].replace(/<\/?script>/g, '');
  const run = (search, dark) => {
    let attr = null;
    const ctx = { location: { search }, matchMedia: () => ({ matches: dark }), document: { documentElement: { setAttribute: (k, v) => { attr = v; } } } };
    ctx.window = ctx;
    vm.runInNewContext(src, ctx);
    return attr;
  };
  assert.equal(run('', false), null, 'light phone stays light');
  assert.equal(run('', true), 'night', 'dark phone gets night');
  assert.equal(run('?sky=now', true), null, '?sky=now forces light');
  assert.equal(run('?sky=black', false), 'black');
  assert.equal(run('?a=1&sky=dusk', false), 'dusk');
  assert.equal(run('?sky=evil', false), null, 'unknown values are ignored');
});

test('index.html has no stray control characters', () => {
  assert.doesNotMatch(html, /[\x00-\x08\x0B\x0C\x0E-\x1F]/);
});
