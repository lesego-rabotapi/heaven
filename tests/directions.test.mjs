// node --test   (npm test)
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { directionsLinks, prefersAppleMaps } = createRequire(import.meta.url)('../assets/directions.js');
const query = 'Heaven Coffee, 38 Burg Street, Cape Town 8000';
const enc = 'Heaven%20Coffee%2C%2038%20Burg%20Street%2C%20Cape%20Town%208000';

test('builds the three map links from one query, encoded', () => {
  const all = directionsLinks(query, false);
  const byName = Object.fromEntries([all.primary].concat(all.others).map((l) => [l.name, l.url]));
  assert.equal(byName['Google Maps'], 'https://www.google.com/maps/search/?api=1&query=' + enc);
  assert.equal(byName['Apple Maps'], 'https://maps.apple.com/?q=' + enc);
  assert.equal(byName['Waze'], 'https://waze.com/ul?q=' + enc + '&navigate=yes');
});

test('Google first for everyone else, Apple first on Apple devices', () => {
  assert.equal(directionsLinks(query, false).primary.name, 'Google Maps');
  assert.deepEqual(directionsLinks(query, false).others.map((l) => l.name), ['Apple Maps', 'Waze']);
  assert.equal(directionsLinks(query, true).primary.name, 'Apple Maps');
  assert.deepEqual(directionsLinks(query, true).others.map((l) => l.name), ['Google Maps', 'Waze']);
});

test('characters that would break a URL are encoded', () => {
  const links = directionsLinks('A&B Café #1, "Quote"?', false);
  const all = [links.primary].concat(links.others);
  all.forEach((l) => {
    const tail = l.url.split(/[?&]q(?:uery)?=/)[1].replace('&navigate=yes', '');
    assert.doesNotMatch(tail, /[&#"? ]/);
    assert.match(tail, /A%26B%20Caf%C3%A9%20%231/);
  });
});

test('iPhone, iPod and iPad user agents prefer Apple Maps', () => {
  assert.equal(prefersAppleMaps('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 'iPhone', 5), true);
  assert.equal(prefersAppleMaps('Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)', 'iPad', 5), true);
});

test('iPadOS in desktop mode (reports MacIntel with touch) prefers Apple Maps; a real Mac and Android do not', () => {
  assert.equal(prefersAppleMaps('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel', 5), true);
  assert.equal(prefersAppleMaps('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel', 0), false);
  assert.equal(prefersAppleMaps('Mozilla/5.0 (Linux; Android 14; Pixel 8)', 'Linux armv81', 5), false);
  assert.equal(prefersAppleMaps('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32', 0), false);
});

test('missing navigator values do not throw', () => {
  assert.equal(prefersAppleMaps(undefined, undefined, undefined), false);
});
