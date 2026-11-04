// node --test tests/ported-logic.test.mjs
// The TypeScript ports in src/lib must behave exactly like the legacy scripts in assets/ until those are
// retired with index.html. Node strips the types, so the .ts files are imported directly.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const legacyOpen = require('../assets/open-state.js');
const legacyDirections = require('../assets/directions.js');
const { getOpenState } = await import('../src/lib/open-state.ts');
const { directionsLinks, prefersAppleMaps } = await import('../src/lib/directions.ts');

const schedules = {
  everyDay: { groups: [{ label: 'Every day', open: '07:00', close: '18:00' }] },
  oneDay: { groups: [{ label: 'Wed', days: [3], open: '07:00', close: '18:00' }] },
  late: { groups: [{ label: 'Late', open: '18:00', close: '02:00' }] },
  split: { groups: [{ label: 'a', open: '07:00', close: '11:00' }, { label: 'b', open: '14:00', close: '18:00' }] },
  none: { groups: [] },
};

test('open-now: the TypeScript port agrees with the legacy script at every 7 minutes for a week', () => {
  const start = Date.parse('2026-11-01T00:00:00+02:00');
  for (const [name, hours] of Object.entries(schedules)) {
    for (let m = 0; m < 7 * 24 * 60; m += 7) {
      const at = new Date(start + m * 60000);
      assert.deepEqual(getOpenState(at, hours), legacyOpen.getOpenState(at, hours), `${name} at +${m} min`);
    }
  }
});

test('directions: links and Apple detection agree with the legacy script', () => {
  for (const apple of [true, false]) {
    assert.deepEqual(directionsLinks('Heaven Coffee, 38 Burg Street, Cape Town 8000', apple), legacyDirections.directionsLinks('Heaven Coffee, 38 Burg Street, Cape Town 8000', apple));
  }
  const cases = [['iPhone', 'iPhone', 5], ['Mozilla', 'MacIntel', 5], ['Mozilla', 'MacIntel', 0], ['Android', 'Linux armv8l', 5], ['', '', 0]];
  for (const [ua, platform, touch] of cases) {
    assert.equal(prefersAppleMaps(ua, platform, touch), legacyDirections.prefersAppleMaps(ua, platform, touch), ua + platform);
  }
});
