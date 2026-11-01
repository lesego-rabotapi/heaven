// Map links for one place, in the order a visitor's phone makes most useful.
// Pure functions, usable in the page (window.HeavenDirections) and in Node (tests).
//
// A query string ("Heaven Coffee, 38 Burg Street, Cape Town 8000") rather than
// coordinates: no pin has been confirmed with the client yet (plan question 9), and
// the name plus street finds the place in all three apps. Swap in the Google
// Business Profile link or coordinates when they exist.
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
  else { root.HeavenDirections = api; }
}(typeof self !== 'undefined' ? self : this, function () {
  function directionsLinks(query, appleFirst) {
    var q = encodeURIComponent(query);
    var google = { name: 'Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=' + q };
    var apple = { name: 'Apple Maps', url: 'https://maps.apple.com/?q=' + q };
    var waze = { name: 'Waze', url: 'https://waze.com/ul?q=' + q + '&navigate=yes' };
    return appleFirst
      ? { primary: apple, others: [google, waze] }
      : { primary: google, others: [apple, waze] };
  }

  // iPhone and iPod say so in the user agent; iPadOS 13+ pretends to be a Mac, but a
  // Mac has no touch screen, so "MacIntel with touch points" is an iPad.
  function prefersAppleMaps(userAgent, platform, maxTouchPoints) {
    if (/iPhone|iPad|iPod/.test(userAgent || '')) { return true; }
    return platform === 'MacIntel' && maxTouchPoints > 1;
  }

  return { directionsLinks: directionsLinks, prefersAppleMaps: prefersAppleMaps };
}));
