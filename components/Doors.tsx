import Link from "next/link";
import type { ImageKey } from "@/content/images";
import { Photo } from "./Photo";
import { Icon } from "./Icon";

const DOORS: { href: string; no: string; title: string; body: string; go: string; image: ImageKey; focus?: string }[] = [
  {
    href: "/story",
    no: "01",
    title: "The story",
    body: "Mondli, a 19th-century church, and a door that stays open.",
    go: "Read it",
    image: "mondli-collie",
    focus: "50% 25%",
  },
  {
    href: "/menu",
    no: "02",
    title: "The menu",
    body: "Read off the letterboard on the counter. Poured daily.",
    go: "See the board",
    image: "latte",
  },
  {
    href: "/visit",
    no: "03",
    title: "Find the door",
    body: "Hours, the corner, and the three things to look for.",
    go: "Plan a visit",
    image: "facade-umbrella",
    focus: "50% 60%",
  },
];

/** Three ways further in. Each card is one link to its page. */
export function Doors() {
  return (
    <section className="doors" aria-labelledby="doors-title">
      <div className="doors__head">
        <p className="eyebrow" data-reveal>
          Come inside
        </p>
        <h2 className="doors__title" id="doors-title" data-split>
          Three doors, <em>all open.</em>
        </h2>
      </div>
      <ul className="doors__list">
        {DOORS.map((door, i) => (
          <li key={door.href} data-reveal data-reveal-delay={i * 0.08}>
            <Link className="door-card" href={door.href}>
              <span className="door-card__media">
                <Photo image={door.image} sizes="(min-width: 900px) 30vw, 90vw" focus={door.focus} alt="" />
              </span>
              <span className="door-card__no">{door.no}</span>
              <span className="door-card__title">{door.title}</span>
              <span className="door-card__body">{door.body}</span>
              <span className="door-card__go">
                {door.go} <Icon name="arrow-right-up-linear" size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
