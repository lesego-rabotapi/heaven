// node --test tests/   (npm test)
// Heaven's hours are Cape Town time (Africa/Johannesburg, UTC+2 all year, no DST).
// A visitor's own clock can be anywhere, so every case passes an absolute instant.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { getOpenState } = createRequire(import.meta.url)('../assets/open-state.js');
const hours = { groups: [{ label: 'Every day', open: '07:00', close: '18:00' }] };
// Local Cape Town time -> instant. 2026-11-04 is a Wednesday.
const at = (hhmm, day = '2026-11-04') => new Date(day + 'T' + hhmm + ':00+02:00');

test('06:59 is closed and opens at 07:00 today', () => {
  const s = getOpenState(at('06:59'), hours);
  assert.equal(s.open, false);
  assert.equal(s.label, 'Closed · opens 07:00');
});

test('07:00 is open until 18:00', () => {
  const s = getOpenState(at('07:00'), hours);
  assert.equal(s.open, true);
  assert.equal(s.label, 'Open now · until 18:00');
});

test('17:59 is still open', () => {
  assert.equal(getOpenState(at('17:59'), hours).open, true);
});

test('18:00 is closed and opens tomorrow', () => {
  const s = getOpenState(at('18:00'), hours);
  assert.equal(s.open, false);
  assert.equal(s.label, 'Closed · opens 07:00 tomorrow');
});

test('a visitor clock at UTC-5, 23:30 (= 06:30 in Cape Town), sees closed', () => {
  const instant = new Date('2026-11-03T23:30:00-05:00');
  const s = getOpenState(instant, hours);
  assert.equal(s.open, false);
  assert.equal(s.label, 'Closed · opens 07:00');
});

test('the same instant read from UTC and from UTC-5 gives the same answer', () => {
  const a = getOpenState(new Date('2026-11-04T10:00:00Z'), hours);
  const b = getOpenState(new Date('2026-11-04T05:00:00-05:00'), hours);
  assert.deepEqual(a, b);
  assert.equal(a.open, true); // 12:00 in Cape Town
});

test('hours come from the data, not from constants', () => {
  const late = { groups: [{ label: 'Every day', open: '09:30', close: '14:00' }] };
  assert.equal(getOpenState(at('09:29'), late).open, false);
  assert.equal(getOpenState(at('09:30'), late).label, 'Open now · until 14:00');
  assert.equal(getOpenState(at('14:00'), late).label, 'Closed · opens 09:30 tomorrow');
});

test('days listed in the data are respected, and the next opening names its day', () => {
  const weekdays = { groups: [{ label: 'Mon to Fri', days: [1, 2, 3, 4, 5], open: '07:00', close: '18:00' }] };
  const fridayEvening = getOpenState(at('18:30', '2026-11-06'), weekdays);
  assert.equal(fridayEvening.open, false);
  assert.equal(fridayEvening.label, 'Closed · opens 07:00 on Monday');
  assert.equal(getOpenState(at('12:00', '2026-11-07'), weekdays).open, false); // Saturday
});

test('the near-midnight edge: 23:59 closed, opens tomorrow; 00:00 closed, opens today', () => {
  assert.equal(getOpenState(at('23:59'), hours).label, 'Closed · opens 07:00 tomorrow');
  assert.equal(getOpenState(at('00:00'), hours).label, 'Closed · opens 07:00');
});

test('no hours at all gives a neutral, non-throwing answer', () => {
  const s = getOpenState(at('12:00'), { groups: [] });
  assert.equal(s.open, false);
  assert.equal(s.label, '');
});
