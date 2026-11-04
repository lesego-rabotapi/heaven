import { hours } from '../lib/content';

// One row per group of days that share the same open/close time, not one row per calendar day, so a
// week that is open the same hours every day renders as a single "Every day" row.
const hourOf = (hhmm: string) => {
  const [h = '0', m = '0'] = hhmm.split(':');
  return parseInt(h, 10) + parseInt(m, 10) / 60;
};

export function HoursRows({ compact }: { compact: boolean }) {
  return (
    <>
      {hours.groups.map((g) => {
        const left = ((hourOf(g.open) / 24) * 100).toFixed(3);
        const width = (((hourOf(g.close) - hourOf(g.open)) / 24) * 100).toFixed(3);
        return (
          <div
            key={g.label}
            className="grid items-center"
            style={{
              gridTemplateColumns: `auto minmax(0,1fr) ${compact ? '118px' : '150px'}`,
              columnGap: compact ? '12px' : '20px',
              padding: `${compact ? '14px' : '16px'} 0`,
              borderBottom: '1px solid rgba(15,27,45,.16)',
            }}
          >
            <span className="font-display uppercase" style={{ fontStretch: '80%', fontWeight: 800, fontSize: compact ? '20px' : '22px', whiteSpace: 'nowrap' }}>
              {g.label}
            </span>
            <div className="hours-track"><div className="hours-bar" style={{ left: left + '%', width: width + '%' }} /></div>
            <span className="font-display text-right" style={{ fontStretch: '80%', fontWeight: 700, fontSize: compact ? '17px' : '20px', fontVariantNumeric: 'tabular-nums' }}>
              {g.open} — {g.close}
            </span>
          </div>
        );
      })}
    </>
  );
}
