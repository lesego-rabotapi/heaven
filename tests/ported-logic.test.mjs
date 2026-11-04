// node --test tests/ported-logic.test.mjs
// The TypeScript port in src/lib must behave exactly like the legacy script in assets/ until that is
// retired with index.html (the open-now chip is gone from the React page, so only directions is ported). Node strips the types, so the .ts files are imported directly.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const legacyDirections = require('../assets/directions.js');
const { directionsLinks, prefersAppleMaps } = await import('../src/lib/directions.ts');

test('directions: links and Apple detection agree with the legacy script', () => {
  for (const apple of [true, false]) {
    assert.deepEqual(directionsLinks('Heaven Coffee, 38 Burg Street, Cape Town 8000', apple), legacyDirections.directionsLinks('Heaven Coffee, 38 Burg Street, Cape Town 8000', apple));
  }
  const cases = [['iPhone', 'iPhone', 5], ['Mozilla', 'MacIntel', 5], ['Mozilla', 'MacIntel', 0], ['Android', 'Linux armv8l', 5], ['', '', 0]];
  for (const [ua, platform, touch] of cases) {
    assert.equal(prefersAppleMaps(ua, platform, touch), legacyDirections.prefersAppleMaps(ua, platform, touch), ua + platform);
  }
});
