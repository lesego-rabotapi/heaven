import type { Drawer } from '../lib/useDrawer';
export function NavDrawer({ drawer }: { drawer: Drawer }) {
  const cls = ["lg:hidden fixed inset-0 z-40 overflow-hidden", drawer.visible ? "" : "hidden", drawer.shown ? "is-open" : "", drawer.closing ? "is-closing" : ""].filter(Boolean).join(" ");
  return (
    <div id="nav-drawer" ref={drawer.drawerRef} role="dialog" aria-label="Menu" className={cls}>
      <div className="staggered-menu-layer" style={{ background: "var(--accent-deep)" }} />
      <div className="staggered-menu-layer" style={{ background: "var(--ground-raised)", transitionDelay: "80ms" }} />
      <div className="staggered-menu-panel">
        <nav aria-label="Menu" className="flex flex-col px-6 pt-24">
          <a onClick={() => drawer.close(false)} className="staggered-menu-item" style={{ transitionDelay: "160ms" }} href="#find-the-door">
            <span className="staggered-menu-num">
              01
            </span>
            Find us
          </a>
          {' '}
          <a onClick={() => drawer.close(false)} className="staggered-menu-item" style={{ transitionDelay: "220ms" }} href="#story">
            <span className="staggered-menu-num">
              02
            </span>
            Story
          </a>
          {' '}
          <a onClick={() => drawer.close(false)} className="staggered-menu-item" style={{ transitionDelay: "280ms" }} href="#menu">
            <span className="staggered-menu-num">
              03
            </span>
            Menu
          </a>
          {' '}
          <a onClick={() => drawer.close(false)} className="staggered-menu-item" style={{ transitionDelay: "340ms" }} href="#feed">
            <span className="staggered-menu-num">
              04
            </span>
            In pictures
          </a>
          {' '}
          <a onClick={() => drawer.close(false)} className="staggered-menu-item" style={{ transitionDelay: "400ms" }} href="#visit">
            <span className="staggered-menu-num">
              05
            </span>
            Hours &amp; visit
          </a>
        </nav>
        <div className="staggered-menu-socials px-6 pt-8 mt-2" style={{ transitionDelay: "460ms" }}>
          <a href="https://instagram.com/heavencoffeect" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
