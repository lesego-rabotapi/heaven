// node --test tests/react-build.test.mjs
// The React + TypeScript rebuild is pre-rendered: dist/index.html has its content and theme with no JavaScript.
import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let html = '';

before(() => {
  execSync('npm run build', { cwd: root, stdio: 'pipe' });
  html = readFileSync(join(root, 'dist', 'index.html'), 'utf8');
}, { timeout: 180000 });

test('the built page is night and has its content in the HTML itself', () => {
  assert.match(html, /<html[^>]*data-sky="night"/);
  assert.match(html, /<h1[^>]*>heaven <br\/>Coffee<\/h1>/);
  assert.match(html, /Open daily 07:00 to 18:00/);
  assert.doesNotMatch(html, /<!--app-html-->/);
});

test('hero intro items are hidden only by a class that script adds, never by markup', () => {
  assert.match(html, /html\.js-motion \[data-intro\]\s*\{\s*opacity:\s*0/);
  assert.doesNotMatch(html, /data-intro[^>]*style="[^"]*opacity/);
  assert.match(html, /prefers-reduced-motion: reduce/);
  assert.match(html, /__motionFailsafe/);
});

test('the bundle loads as a module, and its stylesheet carries Tailwind, the dark tokens and the reveals', () => {
  assert.match(html, /<script type="module"[^>]*src="\/assets\/app-[\w-]+\.js"/);
  const css = readFileSync(join(root, 'dist', html.match(/href="(\/assets\/app-[\w-]+\.css)"/)[1]), 'utf8');
  assert.match(css, /--ground:\s*#0a1220/i);
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /\.hero-title/);
  assert.match(css, /animation-timeline:\s*view\(\)/);
});

test('typed sources compile', () => {
  execSync('npm run typecheck', { cwd: root, stdio: 'pipe' });
});
