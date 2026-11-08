// Step inside: the answer to "what is in the church?". With motion allowed, the page holds still while
// you scroll, the door photo zooms through the doorway and gives way to the nave. Without it, or in a
// browser without scroll timelines, the two photos simply sit side by side.
//
// The notes point at things in the door photo. The frame has the photo's own 3:4 shape, so nothing is
// cropped and the arrows, drawn in the same 100 x 133 grid, land on their targets at every size.
const notes = [
  { n: 1, text: 'find the chalkboard', x: 96, y: 94, align: 'end' },
  { n: 2, text: 'up the steps', x: 96, y: 56, align: 'end' },
  { n: 3, text: 'through the arch', x: 8, y: 20, align: 'start' },
] as const;

export function StepInside() {
  return (
    <section id="step-inside" className="step" aria-labelledby="step-title">
      <div className="step-stage">
        <h2 id="step-title" className="t-label t-accent step-label">Step inside</h2>
        <div className="step-panes">
          <div className="step-pane step-pane-door">
            <p className="t-title step-line">From the street it reads as a church, because it is.</p>
            <div className="step-frame">
              <picture className="step-photo step-door">
                <source type="image/webp" sizes="(min-width: 768px) 30rem, 80vw" srcSet="images/door-arch-480.webp 480w, images/door-arch-800.webp 800w" />
                <img src="images/door-arch-800.jpg" srcSet="images/door-arch-480.jpg 480w, images/door-arch-800.jpg 800w" sizes="(min-width: 768px) 30rem, 80vw" alt="The entrance from the street: a chalkboard on the pavement, steps up to a pointed stone arch, and the glass door with heaven on it" width="800" height="1067" loading="lazy" decoding="async" />
              </picture>
              <div className="step-notes">
                <svg className="step-arrows" viewBox="0 0 100 133.33" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M60 121Q44 124 34 111M34 111l1 4.5M34 111l4.2 1.6" />
                  <path d="M84 79Q78 90 61 91M61 91l4-2.5M61 91l3.5 2.5" />
                  <path d="M18 31Q20 38 35 39M35 39l-4.3 1M35 39l-3.6-2.8" />
                </svg>
                <ol className="step-note-list">
                  {notes.map((note) => (
                    <li key={note.n} className={`step-note step-note-${note.align}`} style={{ '--x': note.x, '--y': note.y }}>
                      <span className="step-note-n" aria-hidden="true">{note.n}</span>
                      {note.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="step-pane step-pane-nave">
            <p className="t-title step-line">Inside: Gothic stone arches, wooden pews and coffee.</p>
            <div className="step-frame">
              <picture className="step-photo step-nave">
                <source type="image/webp" srcSet="images/stone-arch-interior.webp" />
                <img src="images/stone-arch-interior.jpg" alt="Inside the church: pointed arches, stained glass and rows of wooden pews, with a cappuccino on the table and a small dog on a chair" width="662" height="823" style={{ objectPosition: "0% 50%" }} loading="lazy" decoding="async" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
