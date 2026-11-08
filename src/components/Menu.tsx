export function Menu() {
  return (
    <section id="menu" className="menu-section scallop">
      <div className="menu-head reveal">
        <h2 className="t-title menu-h2">
          The Menu
        </h2>
        <div className="menu-aside">
          <picture className="menu-photo">
            <source type="image/webp" srcSet="images/ig-latte-circle.webp" />
            <img src="images/ig-latte-circle.jpg" alt="A cappuccino with a leaf of latte art" width="600" height="600" loading="lazy" decoding="async" />
          </picture>
          <span className="menu-tag font-quote italic">
            poured daily
          </span>
        </div>
      </div>
      <div className="menu-ruler" />
      <div id="menu-cards" className="menu-grid">
        <div className="menu-group reveal" style={{ '--i': 0 }}>
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              I
            </span>
            <h3 className="t-title menu-cat-h3">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
                  R42
                </span>
              </div>
              <span className="menu-item-note">
                Espresso with steamed milk.
              </span>
            </li>
          </ul>
        </div>
        <div className="menu-group reveal" style={{ '--i': 1 }}>
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              II
            </span>
            <h3 className="t-title menu-cat-h3">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
                  R50
                </span>
              </div>
              <span className="menu-item-note">
                Rich, creamy &amp; indulgent.
              </span>
            </li>
          </ul>
        </div>
        <div className="menu-group reveal" style={{ '--i': 2 }}>
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              III
            </span>
            <h3 className="t-title menu-cat-h3">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
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
                <span className="menu-item-price">
                  R8
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="menu-group reveal" style={{ '--i': 3 }}>
          <div className="menu-group-head">
            <span className="menu-cat-no font-quote italic">
              IV
            </span>
            <h3 className="t-title menu-cat-h3">
              From the counter
            </h3>
          </div>
          <p className="menu-counter font-quote italic m-0">
            Fresh bakes at the counter. Ask what's out today.
          </p>
        </div>
      </div>
      <p className="menu-note">
        Prices in rand (R)
      </p>
    </section>
  );
}
