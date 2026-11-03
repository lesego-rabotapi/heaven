// node --test
// Search and share tags (C1). The page stays noindex until launch (npm run check:launch is the
// gate), so these tests guard what the tags SAY: every fact in them must equal the registry
// in HEAVEN_CONTENT, and the share image must exist at the size the tags promise.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const head = html.slice(0, html.indexOf('</head>'));

const start = html.indexOf('var HEAVEN_CONTENT = ');
const ctx = {};
vm.runInNewContext(html.slice(start, html.indexOf('\n};', start) + 3), ctx);
const content = ctx.HEAVEN_CONTENT;
const meta = (attr, name) => (head.match(new RegExp('<meta[^>]*' + attr + '="' + name + '"[^>]*>')) || [''])[0];
const val = (tag) => (tag.match(/content="([^"]*)"/) || [])[1];

test('title and description say the same thing, and the description carries the registry hours and street', () => {
  const title = head.match(/<title>([^<]*)<\/title>/)[1];
  const desc = val(meta('name', 'description'));
  assert.ok(title.length <= 65, 'title too long: ' + title.length);
  assert.ok(desc.length <= 160 && desc.length >= 80, 'description length ' + (desc || '').length);
  const g = content.hours.groups[0];
  assert.match(desc, new RegExp(g.open + ' to ' + g.close));
  assert.match(desc, /38 Burg Street/);
  assert.doesNotMatch(desc + title, /Founded|Mondli|awning|dog/i);
});

test('the page is still noindex until launch', () => {
  assert.match(meta('name', 'robots'), /noindex/);
});

test('Open Graph and Twitter tags are complete and match the title and description', () => {
  const title = head.match(/<title>([^<]*)<\/title>/)[1];
  const desc = val(meta('name', 'description'));
  assert.equal(val(meta('property', 'og:title')), title);
  assert.equal(val(meta('property', 'og:description')), desc);
  assert.equal(val(meta('property', 'og:type')), 'website');
  assert.equal(val(meta('property', 'og:site_name')), content.brand.name);
  assert.equal(val(meta('name', 'twitter:card')), 'summary_large_image');
  assert.equal(val(meta('property', 'og:image:width')), '1200');
  assert.equal(val(meta('property', 'og:image:height')), '630');
  assert.ok(val(meta('property', 'og:image:alt')).length > 20, 'og:image:alt');
});

test('the share image exists, is under 150 KB, and is the file the tags name', () => {
  const src = val(meta('property', 'og:image'));
  assert.equal(src, 'images/og-1200x630.jpg');
  assert.equal(val(meta('name', 'twitter:image')), src);
  assert.ok(existsSync(join(root, src)));
  assert.ok(statSync(join(root, src)).size <= 150 * 1024, 'share image over 150 KB');
});

test('JSON-LD equals the registry: name, address, hours, Instagram, and nothing unknown', () => {
  const raw = (head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  assert.ok(raw, 'no JSON-LD block');
  const ld = JSON.parse(raw);
  assert.equal(ld['@type'], 'CafeOrCoffeeShop');
  assert.equal(ld.name, content.brand.name);
  assert.equal(ld.address['@type'], 'PostalAddress');
  assert.equal(ld.address.addressCountry, 'ZA');
  assert.equal(ld.address.addressLocality, 'Cape Town');
  assert.equal(ld.address.postalCode, '8000');
  assert.ok(content.address.startsWith(ld.address.streetAddress), 'streetAddress must start the registry address');
  assert.ok(content.address.includes(ld.address.postalCode) && content.address.includes(ld.address.addressLocality));
  const g = content.hours.groups[0];
  assert.equal(g.label, 'Every day');
  const spec = ld.openingHoursSpecification;
  assert.equal(spec.opens, g.open);
  assert.equal(spec.closes, g.close);
  assert.deepEqual(spec.dayOfWeek, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  assert.deepEqual(ld.sameAs, ['https://instagram.com/' + content.brand.instagram]);
  ['telephone', 'geo', 'priceRange', 'servesCuisine', 'paymentAccepted', 'amenityFeature', 'aggregateRating'].forEach((k) => {
    assert.equal(ld[k], undefined, k + ' is not a confirmed fact');
  });
});
