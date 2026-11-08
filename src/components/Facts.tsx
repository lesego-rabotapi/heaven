// Four plain facts, set big. Each is already stated elsewhere on the page; nothing here is a claim.
const facts = [
  { big: '2017', small: 'the year Mondli opened the door' },
  { big: '19th c.', small: 'the working church around the café' },
  { big: 'R42', small: 'an espresso' },
  { big: '7 days', small: 'a week, 07:00 to 18:00' },
];

export function Facts() {
  return (
    <section className="facts" aria-label="Heaven Coffee in four facts">
      <ul className="facts-list" role="list">
        {facts.map((f, i) => (
          <li key={f.big} className="fact reveal" style={{ '--i': i }}>
            <span className="fact-big">{f.big}</span>
            <span className="fact-small">{f.small}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
