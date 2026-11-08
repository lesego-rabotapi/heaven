// The building's own words, quoted from what the photos show and credited to where they are written.
// The big line rises in a word at a time as it scrolls into view (CSS only, see reveal.css).
const big = 'you are born in love';

export function Words() {
  return (
    <section className="words" aria-labelledby="words-title">
      <h2 id="words-title" className="t-label t-accent words-label">Written on the building</h2>
      <figure className="words-main">
        <blockquote className="words-quote font-quote italic">
          {big.split(' ').map((word, i) => (
            <span key={i}><span className="words-word reveal" style={{ '--i': i }}>{word}</span>{' '}</span>
          ))}
        </blockquote>
        <figcaption className="t-label words-where">on the glass of the door</figcaption>
      </figure>
      <div className="words-pair">
        <figure className="words-small reveal">
          <blockquote className="font-quote italic">Love casts out fear.</blockquote>
          <figcaption className="t-label words-where">framed on the wall inside</figcaption>
        </figure>
        <figure className="words-small reveal" style={{ '--i': 1 }}>
          <blockquote className="font-quote italic">Touch the earth lightly.</blockquote>
          <figcaption className="t-label words-where">framed on the wall inside</figcaption>
        </figure>
      </div>
    </section>
  );
}
