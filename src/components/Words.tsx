// The building's own words, second on the page. The line on the glass of the door, which Heaven also
// posted in full, rises a phrase at a time over the empty interior. Two prints from the wall follow, each
// credited to where it hangs. The reveals are CSS only (see reveal.css).
const lines = ['you are born', 'in love,', 'by love,', 'for love'];

export function Words() {
  return (
    <section className="words" aria-labelledby="words-title">
      <picture className="words-bg" aria-hidden="true">
        <source type="image/webp" srcSet="images/ig-sanctuary.webp" />
        <img src="images/ig-sanctuary.jpg" alt="" width="720" height="1280" loading="lazy" decoding="async" />
      </picture>
      <div className="rays rays-words" aria-hidden="true" />
      <div className="words-inner">
        <h2 id="words-title" className="t-label t-accent words-label">Written on the building</h2>
        <figure className="words-main">
          <blockquote className="words-quote font-quote italic">
            {lines.map((line, i) => (
              <span key={line} className="words-line reveal" style={{ '--i': i }}>{line} </span>
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
      </div>
    </section>
  );
}
