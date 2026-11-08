const truths = [
  { title: 'Sacred', text: "Coffee under the Gothic arches of Central Methodist Mission, one of the city's most recognisable facades." },
  { title: 'Open door', text: 'Locals on the commute, visitors off the square. Everyone who finds the door is welcome.' },
  { title: 'On the square', text: 'Navy umbrellas on the corner of Burg and Longmarket, a step off the Greenmarket Square market.' },
];

export function Story() {
  return (
    <section id="story" className="story-section">
      <div className="story-photo settle">
        <div className="story-img">
          <picture className="block w-full h-full">
            <source type="image/webp" sizes="(min-width: 1024px) 40vw, 100vw" srcSet="images/ig-mondli-coco-600.webp 600w, images/ig-mondli-coco-1200.webp 1200w" />
            <img src="images/ig-mondli-coco-600.jpg" srcSet="images/ig-mondli-coco-600.jpg 600w, images/ig-mondli-coco-1200.jpg 1200w" sizes="(min-width: 1024px) 40vw, 100vw" alt="Mondli Mahamba, smiling, holding his brown and white collie, Coco, in the café" width="1200" height="1600" className="w-full h-full object-cover block" style={{ objectPosition: "50% 35%" }} loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="story-caption on-light">
          <div className="story-caption-name">Mondli and his dog, Coco.</div>
          <div className="story-caption-role">Mondli Mahamba, founder since April 2017</div>
        </div>
      </div>
      <div className="story-text">
        <span className="t-label t-accent reveal">Our story</span>
        <h2 className="t-title story-h2 reveal">Open to everyone who finds the door</h2>
        <p className="story-p reveal">
          Mondli Mahamba opened Heaven Coffee in April 2017 inside the Central Methodist Mission on Greenmarket Square, one of Cape Town's most storied buildings.
        </p>
        <p className="story-p reveal">
          Inside Gothic stone arches, next to wooden pews, Heaven became a place of welcome for everyone who steps off the square: locals on a morning commute, tourists looking for somewhere quiet, and everyone in between.
        </p>
        <blockquote className="story-quote font-quote italic reveal">"Community and coffee belong together here."</blockquote>
      </div>
      <ul className="truths" role="list">
        {truths.map((t, i) => (
          <li key={t.title} className="truth reveal" style={{ '--i': i }}>
            <h3 className="t-title truth-h3">{t.title}</h3>
            <p className="truth-p">{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
