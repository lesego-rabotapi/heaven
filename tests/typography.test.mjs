// node --test tests/typography.test.mjs
// One typography system: the fonts and the wordmark's weight and spacing are tokens, the wordmark is one component,
// and nothing else names a font family.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const tokens = read('src/styles/tokens.css');
const appHtml = read('app.html');

test('the font tokens are defined once, in tokens.css', () => {
  assert.match(tokens, /--font-brand:\s*'Josefin Sans'/);
  assert.match(tokens, /--font-body:\s*'Manrope'/);
  assert.match(tokens, /--font-display:\s*'Archivo'/);
  assert.match(tokens, /--font-quote:\s*'Instrument Serif'/);
  assert.match(tokens, /--brand-weight:\s*300/);
  assert.match(tokens, /--brand-letter-spacing:\s*[\d.]+em/);
});

test('no file outside the tokens names a font family (Tailwind and the components read the tokens)', () => {
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(join(root, dir), { withFileTypes: true })) {
      const p = dir + '/' + e.name;
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx?|css)$/.test(e.name)) files.push(p);
    }
  };
  walk('src');
  for (const f of files.filter((n) => n !== 'src/styles/tokens.css')) {
    assert.doesNotMatch(read(f), /Poppins|Bricolage|Josefin|Manrope|Archivo|Instrument Serif/, f);
  }
  const tw = read('tailwind.config.js');
  assert.doesNotMatch(tw, /Poppins|Bricolage|Josefin|Manrope|Archivo|Instrument Serif/);
  assert.match(tw, /var\(--font-body\)/);
  assert.match(tw, /var\(--font-display\)/);
});

test('the page loads Josefin Sans (upright only) and Manrope in one request, and no longer Poppins or Bricolage', () => {
  const links = appHtml.match(/fonts\.googleapis\.com\/css2\?[^"]+/g) || [];
  assert.equal(links.length, 1, 'one stylesheet request for all the fonts');
  assert.match(links[0], /family=Josefin\+Sans:wght@300\.\.700(&|$)/);
  assert.match(links[0], /family=Manrope:wght@/);
  assert.match(links[0], /family=Archivo/);
  assert.match(links[0], /family=Instrument\+Serif/);
  assert.doesNotMatch(links[0], /Poppins|Bricolage/);
});

test('HeavenWordmark is one component, used in the header and both footers', () => {
  assert.ok(existsSync(join(root, 'src/components/HeavenWordmark.tsx')));
  assert.match(read('src/components/HeavenWordmark.tsx'), /export function HeavenWordmark/);
  for (const f of ['Header', 'FooterDesktop', 'FooterMobile']) {
    assert.match(read(`src/components/${f}.tsx`), /<HeavenWordmark/, f);
  }
});

test('the wordmark matches the awning: light, upright, lower case, tracked from the tokens, with a lower-case coffee', () => {
  const css = read('src/components/heaven-wordmark.css');
  const rule = css.match(/\.heaven-wordmark \{[^}]*\}/)[0];
  assert.match(rule, /font-family: var\(--font-brand\)/);
  assert.match(rule, /font-weight: var\(--brand-weight\)/);
  assert.match(rule, /font-style: normal/);
  assert.match(rule, /letter-spacing: var\(--brand-letter-spacing\)/);
  assert.match(rule, /text-transform: none/);
  assert.doesNotMatch(css, /italic|uppercase/, 'the awning has neither italics nor capitals');
});

test('the built page shows the wordmark three times (header, two footers) and keeps Archivo for headings', () => {
  const html = read('dist/index.html');
  assert.equal((html.match(/class="(?:[^"]* )?heaven-wordmark(?: [^"]*)?"/g) || []).length, 3);
  assert.match(html, /<h1[^>]*font-display/);
  const css = read('dist/' + html.match(/href="\.\/(assets\/app-[\w-]+\.css)"/)[1]);
  assert.match(css, /\.font-display\{font-family:var\(--font-display\)\}/);
  assert.match(css, /\.font-body-md\{font-family:var\(--font-body\)\}/);
});
