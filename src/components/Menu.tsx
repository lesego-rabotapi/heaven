export function Menu() {
  return (
    <section id="menu" className="menu-section on-dark">
      <div className="flex items-end justify-between" style={{ borderBottom: "2px solid var(--ink)", paddingBottom: "8px" }}>
        <h2 className="menu-h2 font-display uppercase m-0" style={{ fontStretch: "62%", fontWeight: "900", letterSpacing: "-0.03em", lineHeight: "0.76" }}>
          The Menu
        </h2>
        <div className="flex flex-col items-end" style={{ gap: "6px", paddingBottom: "18px", textAlign: "right" }}>
          <span className="menu-tag font-quote italic" style={{ color: "var(--ink-accent)" }}>
            poured daily
          </span>
        </div>
      </div>
      <div className="menu-ruler" />
      <div id="menu-cards" className="flex flex-col lg:grid lg:grid-cols-4 mt-12" style={{ gap: "36px", columnGap: "40px" }}>
        <div className="menu-group">
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              I
            </span>
            <h3 className="menu-cat-h3 font-display uppercase m-0">
              Coffee
            </h3>
          </div>
          <ul className="menu-list" role="list">
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Espresso
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Bold, rich &amp; full of character.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Americano
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Espresso topped with hot water.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Cortado
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Equal parts espresso &amp; warm milk.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Flat White
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Smooth espresso with steamed milk.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Cappuccino
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Espresso with steamed milk &amp; a soft layer of foam.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Latte
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Espresso with steamed milk.
              </span>
            </li>
          </ul>
        </div>
        <div className="menu-group">
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              II
            </span>
            <h3 className="menu-cat-h3 font-display uppercase m-0">
              Something different
            </h3>
          </div>
          <ul className="menu-list" role="list">
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Mocha
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R60
                </span>
              </div>
              <span className="menu-item-note">
                Espresso with chocolate &amp; steamed milk.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Matcha Latte
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R65
                </span>
              </div>
              <span className="menu-item-note">
                Ceremonial matcha with steamed milk.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Dirty Chai
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R60
                </span>
              </div>
              <span className="menu-item-note">
                Chai latte with a shot of espresso.
              </span>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Hot Chocolate
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R50
                </span>
              </div>
              <span className="menu-item-note">
                Rich, creamy &amp; indulgent.
              </span>
            </li>
          </ul>
        </div>
        <div className="menu-group">
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              III
            </span>
            <h3 className="menu-cat-h3 font-display uppercase m-0">
              Make it yours
            </h3>
          </div>
          <ul className="menu-list" role="list">
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Almond / oat / soy milk
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R8
                </span>
              </div>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Extra shot
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R8
                </span>
              </div>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">
                  Vanilla / hazelnut
                </span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="menu-item-price font-display">
                  R8
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="menu-group">
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              IV
            </span>
            <h3 className="menu-cat-h3 font-display uppercase m-0">
              From the counter
            </h3>
          </div>
          <p className="menu-counter font-quote italic m-0">
            Fresh bakes at the counter. Ask what's out today.
          </p>
        </div>
      </div>
      <p className="menu-note hidden lg:block mt-14 pt-5 m-0" style={{ borderTop: "2px solid var(--menu-ink)", fontSize: "13px" }}>
        Prices in rand (R)
      </p>
      <p className="menu-note lg:hidden mt-7 pt-3.5 m-0" style={{ borderTop: "1px solid var(--menu-ink)", fontSize: "12px", lineHeight: "1.5" }}>
        Prices in rand (R)
      </p>
    </section>
  );
}
