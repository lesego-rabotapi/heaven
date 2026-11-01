// Is Heaven open right now? A pure function of an instant and the hours data, so it
// runs the same in the page and in Node (tests/open-state.test.mjs).
//
// Hours are Cape Town time, Africa/Johannesburg: UTC+2 all year, no daylight saving.
// The visitor's own clock and time zone are deliberately ignored; a tourist in New
// York at 23:30 must be told "closed", because it is 06:30 at the door.
//
// hours = { groups: [{ label, open: 'HH:MM', close: 'HH:MM', days?: [0..6] }] }
// `days` (0 = Sunday) is optional; a group without it applies every day.
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
  else { root.HeavenOpenState = api; }
}(typeof self !== 'undefined' ? self : this, function () {
  var UTC_OFFSET_MINUTES = 120;
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function toMinutes(hhmm) {
    var parts = hhmm.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  // Cape Town's wall clock for an instant, read through the UTC fields of a shifted date.
  function capeTownClock(now) {
    var shifted = new Date(now.getTime() + UTC_OFFSET_MINUTES * 60000);
    return { day: shifted.getUTCDay(), minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes() };
  }

  function groupsFor(hours, day) {
    return (hours.groups || []).filter(function (g) { return !g.days || g.days.indexOf(day) !== -1; });
  }

  function getOpenState(now, hours) {
    var clock = capeTownClock(now);

    var openNow = groupsFor(hours, clock.day).filter(function (g) {
      return clock.minutes >= toMinutes(g.open) && clock.minutes < toMinutes(g.close);
    })[0];
    if (openNow) {
      return { open: true, label: 'Open now · until ' + openNow.close };
    }

    // Next opening: later today, else the first day within a week that has hours.
    for (var ahead = 0; ahead < 7; ahead++) {
      var day = (clock.day + ahead) % 7;
      var opens = groupsFor(hours, day)
        .filter(function (g) { return ahead > 0 || toMinutes(g.open) > clock.minutes; })
        .sort(function (a, b) { return toMinutes(a.open) - toMinutes(b.open); })[0];
      if (opens) {
        var when = ahead === 0 ? '' : ahead === 1 ? ' tomorrow' : ' on ' + DAY_NAMES[day];
        return { open: false, label: 'Closed · opens ' + opens.open + when };
      }
    }
    return { open: false, label: '' };
  }

  return { getOpenState: getOpenState };
}));
