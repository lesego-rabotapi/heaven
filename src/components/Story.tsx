export function Story() {
  return (
    <section id="story" className="story-section flex flex-col lg:grid lg:grid-cols-12" style={{ background: "var(--ground)" }}>
      <div className="lg:col-span-5 relative">
        <div className="story-img" style={{ overflow: "hidden" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" sizes="(min-width: 1024px) 40vw, 100vw" srcSet="images/mondli-coco-480.webp 480w, images/mondli-coco-800.webp 800w" />
            <img src="images/mondli-coco-480.jpg" srcSet="images/mondli-coco-480.jpg 480w, images/mondli-coco-800.jpg 800w" sizes="(min-width: 1024px) 40vw, 100vw" alt="Mondli Mahamba, smiling, holding his brown and white collie, Coco, in the doorway of the café with the church nave behind" width="480" height="628" className="w-full h-full object-cover block" style={{ objectPosition: "50% 30%" }} loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="absolute rounded-2xl on-light" style={{ left: "24px", bottom: "24px", padding: "14px 18px", background: "var(--card)", color: "var(--ink)" }}>
          <div style={{ fontWeight: "700", fontSize: "15px" }}>
            Mondli and his dog, Coco.
          </div>
          <div style={{ fontSize: "13px", color: "var(--ink-muted)" }}>
            Mondli Mahamba, founder since April 2017
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col lg:pt-[30px]" style={{ gap: "22px" }}>
        <span style={{ fontSize: "13px", fontFamily: "var(--font-brand)", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-accent)" }}>
          Our story
        </span>
        <h2 className="story-h2 font-display uppercase m-0" style={{ fontStretch: "70%", fontWeight: "900", lineHeight: "0.88", letterSpacing: "-0.02em" }}>
          Open to everyone who finds the door
        </h2>
        <p className="story-p m-0" style={{ lineHeight: "1.65", color: "var(--ink-soft)" }}>
          Mondli Mahamba opened Heaven Coffee in April 2017 inside the Central Methodist Mission on Greenmarket Square, one of Cape Town's most storied buildings.
        </p>
        <p className="story-p m-0" style={{ lineHeight: "1.65", color: "var(--ink-soft)" }}>
          Inside Gothic stone arches, next to wooden pews, Heaven became a place of welcome for everyone who steps off the square: locals on a morning commute, tourists looking for somewhere quiet, and everyone in between.
        </p>
        <blockquote className="story-quote font-quote italic m-0" style={{ borderTop: "1px solid var(--rule-faint)", lineHeight: "1.08", color: "var(--ink-accent)" }}>
          "Community and coffee belong together here."
        </blockquote>
      </div>
    </section>
  );
}
