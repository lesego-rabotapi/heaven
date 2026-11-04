// Is Heaven open right now? A pure function of an instant and the hours data.
//
// Hours are Cape Town time, Africa/Johannesburg: UTC+2 all year, no daylight saving. The visitor's own
// clock and time zone are deliberately ignored; a tourist in New York at 23:30 must be told "closed",
// because it is 06:30 at the door. `days` (0 = Sunday) is optional; a group without it applies every day.
export type HoursGroup = { label: string; open: string; close: string; days?: number[] };
export type Hours = { groups: HoursGroup[] };
export type OpenState = { open: boolean; label: string };

const UTC_OFFSET_MINUTES = 120;
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (hhmm: string): number => {
  const [h = '0', m = '0'] = hhmm.split(':');
  return parseInt(h, 10) * 60 + parseInt(m, 10);
};

// Cape Town's wall clock for an instant, read through the UTC fields of a shifted date.
function capeTownClock(now: Date) {
  const shifted = new Date(now.getTime() + UTC_OFFSET_MINUTES * 60000);
  return { day: shifted.getUTCDay(), minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes() };
}

const groupsFor = (hours: Hours, day: number) => (hours.groups || []).filter((g) => !g.days || g.days.includes(day));

// A close time that is not after the open time means the group runs past midnight (18:00 to 02:00)
// and belongs to the day it opens on.
const pastMidnight = (g: HoursGroup) => toMinutes(g.close) <= toMinutes(g.open);

export function getOpenState(now: Date, hours: Hours): OpenState {
  const clock = capeTownClock(now);

  const openNow = groupsFor(hours, clock.day).find((g) => {
    const open = toMinutes(g.open), close = toMinutes(g.close);
    return pastMidnight(g) ? clock.minutes >= open : clock.minutes >= open && clock.minutes < close;
  });
  // Still running from yesterday's late group?
  const carried = groupsFor(hours, (clock.day + 6) % 7).find((g) => pastMidnight(g) && clock.minutes < toMinutes(g.close));
  const running = openNow || carried;
  if (running) return { open: true, label: 'Open now · until ' + running.close };

  // Next opening: later today, else the first day with hours. Eight days are looked at (today through
  // today next week) so a one-weekday schedule finds itself after closing.
  for (let ahead = 0; ahead <= 7; ahead++) {
    const day = (clock.day + ahead) % 7;
    const opens = groupsFor(hours, day)
      .filter((g) => ahead > 0 || toMinutes(g.open) > clock.minutes)
      .sort((a, b) => toMinutes(a.open) - toMinutes(b.open))[0];
    if (opens) {
      const name = DAY_NAMES[day];
      const when = ahead === 0 ? '' : ahead === 1 ? ' tomorrow' : ahead === 7 ? ' next ' + name : ' on ' + name;
      return { open: false, label: 'Closed · opens ' + opens.open + when };
    }
  }
  return { open: false, label: '' };
}
