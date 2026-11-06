import { hours } from '../lib/content';

// One row per group of days that share the same open/close time, not one row per calendar day, so a
// week that is open the same hours every day renders as a single "Every day" row.
const hourOf = (hhmm: string) => {
  const [h = '0', m = '0'] = hhmm.split(':');
  return parseInt(h, 10) + parseInt(m, 10) / 60;
};

export function HoursRows() {
  return (
    <>
      {hours.groups.map((g) => {
        const left = ((hourOf(g.open) / 24) * 100).toFixed(3);
        const width = (((hourOf(g.close) - hourOf(g.open)) / 24) * 100).toFixed(3);
        return (
          <div key={g.label} className="hours-row">
            <span className="hours-day">{g.label}</span>
            <div className="hours-track"><div className="hours-bar" style={{ left: left + '%', width: width + '%' }} /></div>
            <span className="hours-time">{g.open} — {g.close}</span>
          </div>
        );
      })}
    </>
  );
}
