// node --test tests/night-theme.test.mjs
// The night theme (assets/sky.css) is the only theme and is set in the markup, not by a script.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'assets', 'sky.css'), 'utf8');

test('the page links sky.css and is night in the markup, so it is dark with JavaScript off', () => {
  assert.match(html, /<link rel="stylesheet" href="assets\/sky\.css"\/>/);
  assert.match(html, /<html[^>]*data-sky="night"/);
});

test('no script switches the theme, and nothing follows prefers-color-scheme', () => {
  assert.doesNotMatch(html, /setAttribute\('data-sky'/);
  assert.doesNotMatch(html, /prefers-color-scheme/);
});

test('the browser is told the page is dark (scrollbars, form controls, phone status bar)', () => {
  assert.match(html, /<meta name="color-scheme" content="dark"\/>/);
  assert.match(html, /<meta name="theme-color" content="#0A1220"\/>/);
  assert.match(css, /color-scheme: dark;/);
});

test('sky.css holds the night sky only', () => {
  assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, ''), /black|dusk/);
});

test('night re-points the tokens of Find us, Good to know and the action bar', () => {
  for (const token of ['--find-bg', '--find-ink', '--find-muted', '--good-chip-bg', '--good-ink', '--bar-bg', '--bar-ink']) {
    assert.ok(css.includes(token + ':'), token + ' is set for night');
  }
  for (const token of ['--find-bg', '--good-chip-bg', '--bar-bg']) assert.ok(html.includes(token + ':'), token);
});

test('the sections that have their own light background are covered', () => {
  assert.match(css, /\.truths-section \{ background: var\(--g\) !important; \}/);
  assert.match(css, /\.other-maps a \{ color: #A9CDF0; \}/);
});

test('index.html has no stray control characters', () => {
  assert.doesNotMatch(html, /[\x00-\x08\x0B\x0C\x0E-\x1F]/);
});
