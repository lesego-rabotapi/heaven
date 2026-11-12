import { MENU } from "@/content/site";
import { ArchPhoto } from "./Photo";

/** 04 · The hymn board. The menu, set out the way a church sets out its hymns. */
export function HymnBoard() {
  return (
    <section className="board" id="menu" data-tone="dark" aria-labelledby="menu-title">
      <div className="board__head">
        <div>
          <p className="eyebrow eyebrow--onDark" data-reveal>
            The menu
          </p>
          <h2 className="board__title" id="menu-title" data-split>
            Today&rsquo;s <em>board.</em>
          </h2>
        </div>
        <p className="board__intro" data-reveal>
          Set out the way the church sets out its hymns: numbered, in order, and short enough to
          know by heart. The chalkboard outside puts it more simply. Stairway to heaven, in a cup.
        </p>
      </div>

      <div className="board__body">
        <div className="board__cols">
          {MENU.map((section) => (
            <section className="hymn" key={section.title} data-reveal aria-label={section.title}>
              <header className="hymn__head">
                <span className="hymn__plate" aria-hidden="true">
                  {section.numeral}
                </span>
                <div>
                  <h3 className="hymn__title">{section.title}</h3>
                  <p className="hymn__note">{section.note}</p>
                </div>
              </header>
              <ul className="hymn__list">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className="hymn__row">
                      <span className="hymn__name">{item.name}</span>
                      {item.price !== null && (
                        <>
                          <span className="hymn__dots" aria-hidden="true" />
                          <span className="hymn__price">R{item.price}</span>
                        </>
                      )}
                    </div>
                    <span className="hymn__desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <figure className="board__figure" data-reveal>
          <ArchPhoto image="latte-art" sizes="(min-width: 900px) 22vw, 60vw" />
          <figcaption>Poured at a pavement table, about nine in the morning.</figcaption>
        </figure>
      </div>

      <p className="board__foot">
        Sample board, read off the letterboard on the counter. Full list and prices to be confirmed
        with Heaven. Ask at the counter for today&rsquo;s bakes.
      </p>
    </section>
  );
}
