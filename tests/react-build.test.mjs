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
  // React marks the text node boundary with a comment, so "heaven" and the line break are separate.
  assert.match(html, /<h1[^>]*>heaven(<!-- -->)? <br\/>Coffee<\/h1>/);
  assert.match(html, /07:00 — 18:00/);
  assert.doesNotMatch(html, /<!--app-html-->/);
});

test('every section is in the prerendered HTML, so it reads with JavaScript off', () => {
  for (const id of ['hero', 'find-the-door', 'story', 'menu', 'feed', 'visit-desktop', 'footer-desktop', 'footer-mobile', 'action-bar', 'nav-drawer']) {
    assert.match(html, new RegExp(`id="${id}"`), id);
  }
  // the marquee tiles and the hours rows are rendered, not filled in by script
  assert.equal((html.match(/class="feed-tile tile"/g) || []).length, 20, '10 photos, shown once and once as the loop copy');
  assert.match(html, /class="hours-bar"/);
  // the menu is plain HTML with real prices
  assert.match(html, /Flat White/);
  assert.match(html, /R42/);
});

test('unknown facts are not rendered, and the phone stays a placeholder, never a link', () => {
  assert.doesNotMatch(html, /Wi-?Fi|Card payments|step-free/i);
  assert.doesNotMatch(html, /href="tel:/);
  assert.equal((html.match(/data-phone-placeholder/g) || []).length, 4);
  assert.match(html, /Tables outside/);
});

test('there is no open/closed tag anywhere on the page', () => {
  assert.doesNotMatch(html, /Open now|Closed ·|opens 07:00|hero-pill|action-bar-open|action-bar-dot/);
});

test('the arch portal markup is in the page, switched on only by ?journey=on', () => {
  assert.equal((html.match(/journey-tile/g) || []).length, 2);
  assert.equal((html.match(/journey-door/g) || []).length, 2);
  assert.equal((html.match(/class="journey-nave"/g) || []).length, 2);
  assert.doesNotMatch(html, /<html[^>]*data-journey/);
});

test('hero intro items are hidden only by a class that script adds, never by markup', () => {
  assert.match(html, /html\.js-motion \[data-intro\]\s*\{\s*opacity:\s*0/);
  assert.doesNotMatch(html, /data-intro[^>]*style="[^"]*opacity/);
  assert.match(html, /prefers-reduced-motion: reduce/);
  assert.match(html, /__motionFailsafe/);
});

test('the bundle loads as a module, and its stylesheet carries Tailwind, the dark tokens and the reveals', () => {
  assert.match(html, /<script type="module"[^>]*src="\.\/assets\/app-[\w-]+\.js"/);
  const css = readFileSync(join(root, 'dist', html.match(/href="\.\/(assets\/app-[\w-]+\.css)"/)[1]), 'utf8');
  assert.match(css, /--ground:\s*#0a1220/i);
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /\.hero-section/);
  assert.match(css, /animation-timeline:\s*view\(\)/);
});

test('typed sources compile', () => {
  execSync('npm run typecheck', { cwd: root, stdio: 'pipe' });
});

test('the Instagram cards are in the prerendered HTML with the handle, photos and no counts', () => {
  assert.equal((html.match(/class="igc reveal"/g) || []).length, 3);
  assert.match(html, /@heavencoffeect/);
  assert.doesNotMatch(html, /igc-actions/);
  assert.doesNotMatch(html, /\d+\s*(likes|comments|followers)/i);
  assert.equal((html.match(/View on Instagram/g) || []).length >= 3, true);
});
