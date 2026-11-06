// How long one pass of the feed takes, in seconds: the pace the marquee had.
export const passSeconds = (viewportWidth: number) => (viewportWidth >= 1024 ? 150 : 130);

// Where the row should be after `ms` more of drifting. `period` is the width of one set of tiles; past
// it the row is showing the copies, so taking off whole periods lands on the same picture.
export const nextScroll = (pos: number, period: number, pxPerSecond: number, ms: number) =>
  (pos + (pxPerSecond * ms) / 1000) % period;
