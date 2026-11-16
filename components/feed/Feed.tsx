"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { POSTS } from "@/content/posts";
import { SITE } from "@/content/site";
import { gsap, useGSAP, motionOK, scroller } from "@/lib/motion";
import { project, velocityTracker } from "@/lib/gesture";
import { Photo } from "../Photo";
import { InstagramIcon } from "../Icon";
import { FlowButton } from "../ui/flow-button";
import { PostCard } from "./PostCard";
import { CommentSheet } from "./CommentSheet";

type Marks = { liked: string[]; saved: string[]; reposted: string[] };
const EMPTY: Marks = { liked: [], saved: [], reposted: [] };
const STORE = "heaven:marks:v1";

const PILE = 5;
const PILE_ROT = [-9, 6, -4, 10, -6];
const TILT = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.4];

/**
 * Heaven, as posted. A stack of Instagram posts that behave like postcards.
 *
 * Wide screens with a mouse: the section pins, the first five cards are
 * tossed onto a pile one by one, the pile fans out into a row, and the row
 * travels sideways as you keep scrolling (or drag it).
 * Touch and small screens: a rail you swipe, with the platform's own momentum.
 * No motion or no script: the same rail, scrolled by hand.
 */
export function Feed() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [marks, setMarks] = useState<Marks>(EMPTY);
  const [mine, setMine] = useState<Record<string, string[]>>({});
  const [openId, setOpenId] = useState<string | null>(null);

  // Likes, saves and reposts are remembered on this device only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE);
      if (raw) setMarks({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* storage unavailable: marks last for this visit */
    }
  }, []);
  const toggle = useCallback((kind: keyof Marks, id: string) => {
    setMarks((prev) => {
      const has = prev[kind].includes(id);
      const next = { ...prev, [kind]: has ? prev[kind].filter((x) => x !== id) : [...prev[kind], id] };
      try {
        window.localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);
  const addComment = useCallback((id: string, text: string) => {
    setMine((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), text] }));
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      const stageEl = stage.current;
      const trackEl = track.current;
      if (!el || !stageEl || !trackEl || !motionOK()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (hover: hover) and (pointer: fine)", () => {
        el.dataset.mode = "pinned";
        const slots = gsap.utils.toArray<HTMLElement>(".post-slot", trackEl);
        const pile = slots.slice(0, PILE);
        const travel = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
        const pileX = (i: number) => {
          const slot = slots[i];
          return window.innerWidth / 2 - (slot.offsetLeft + slot.offsetWidth / 2) + (i - 2) * 22;
        };
        gsap.set(slots.slice(PILE), { rotation: (i) => TILT[(i + PILE) % TILT.length] });

        const LAND = 0.5;
        const GAP = 0.24;
        const FAN = 1;
        const TRAVEL = 4.2;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stageEl,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.5 + travel())}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        pile.forEach((slot, i) => {
          tl.fromTo(
            slot,
            { x: () => pileX(i), y: () => window.innerHeight, rotation: PILE_ROT[i] * 2.4 },
            {
              x: () => pileX(i),
              y: i % 2 ? 12 : -10,
              rotation: PILE_ROT[i],
              duration: LAND,
              ease: "power2.out",
            },
            i * GAP,
          );
        });
        const landed = (PILE - 1) * GAP + LAND;
        tl.fromTo(".feed__hint", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, landed)
          .to(
            pile,
            {
              x: 0,
              y: 0,
              rotation: (i) => TILT[i % TILT.length],
              duration: FAN,
              ease: "power2.inOut",
              stagger: 0.04,
            },
            landed + 0.15,
          )
          .to(trackEl, { x: () => -travel(), duration: TRAVEL }, ">-0.25");

        // Drag the row: it moves the page scroll, so the two never disagree.
        const tracker = velocityTracker();
        let startX = 0;
        let startScroll = 0;
        let dragging = false;
        let moved = false;
        const ratio = () => {
          const st = tl.scrollTrigger;
          if (!st || travel() === 0) return 1;
          return ((st.end - st.start) * (TRAVEL / tl.duration())) / travel();
        };
        const down = (e: PointerEvent) => {
          if (e.button !== 0 || (e.target as HTMLElement).closest("button, a, input")) return;
          dragging = true;
          moved = false;
          startX = e.clientX;
          startScroll = window.scrollY;
          tracker.reset();
        };
        const move = (e: PointerEvent) => {
          if (!dragging) return;
          const dx = e.clientX - startX;
          if (!moved && Math.abs(dx) < 10) return;
          moved = true;
          stageEl.dataset.dragging = "true";
          tracker.add(e.clientX);
          const to = startScroll - dx * ratio();
          if (scroller.lenis) scroller.lenis.scrollTo(to, { immediate: true });
          else window.scrollTo(0, to);
        };
        const up = () => {
          if (!dragging) return;
          dragging = false;
          delete stageEl.dataset.dragging;
          if (!moved) return;
          // Throw: carry on to where the flick was heading.
          const throwPx = -project(tracker.get(), 0.995) * ratio();
          if (scroller.lenis && Math.abs(throwPx) > 30) {
            scroller.lenis.scrollTo(window.scrollY + throwPx, {
              duration: 1.1,
              easing: (t: number) => 1 - Math.pow(1 - t, 4),
            });
          }
        };
        const swallowClick = (e: MouseEvent) => {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
          }
        };
        stageEl.addEventListener("pointerdown", down);
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", up);
        stageEl.addEventListener("click", swallowClick, true);

        return () => {
          delete el.dataset.mode;
          stageEl.removeEventListener("pointerdown", down);
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", up);
          stageEl.removeEventListener("click", swallowClick, true);
        };
      });

      mm.add("(max-width: 899px), (hover: none), (pointer: coarse)", () => {
        const slots = gsap.utils.toArray<HTMLElement>(".post-slot", trackEl);
        gsap.fromTo(
          slots.slice(0, 6),
          { y: 90, rotation: (i) => PILE_ROT[i % PILE] * 1.4, autoAlpha: 0 },
          {
            y: 0,
            rotation: (i) => TILT[i % TILT.length] * 0.6,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: trackEl, start: "top 82%", once: true },
          },
        );
        gsap.set(slots.slice(6), { rotation: (i) => TILT[(i + 6) % TILT.length] * 0.6 });
      });
    },
    { scope: root },
  );

  const open = POSTS.find((p) => p.id === openId) ?? null;

  return (
    <section className="feed" id="feed" ref={root} aria-labelledby="feed-title">
      {/* Outside the stage on purpose: the stage clips its children and is pinned, and a skip link has to stay reachable. */}
      <a className="skip-link" href="#after-feed">
        Skip the posts
      </a>
      <div className="feed__stage" ref={stage}>
        <div className="feed__head">
          <div>
            <p className="eyebrow" data-reveal>
              From the feed
            </p>
            <h2 className="feed__title" id="feed-title" data-split>
              Heaven, <em>as posted</em>
            </h2>
          </div>
          <div className="feed__aside" data-reveal>
            <a
              className="feed__profile"
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@${SITE.instagramHandle} on Instagram`}
            >
              <span className="feed__avatar">
                <Photo image="door-sign" sizes="56px" alt="" focus="50% 18%" />
              </span>
              <span>
                <strong>@{SITE.instagramHandle}</strong>
                <span>Heaven Coffee Shop</span>
              </span>
              <InstagramIcon size={20} />
            </a>
            <FlowButton href={SITE.instagramUrl} size="sm">
              Follow
            </FlowButton>
          </div>
        </div>

        <ol className="feed__track" ref={track} aria-label="Posts">
          {POSTS.map((post) => (
            <li className="post-slot" key={post.id}>
              <PostCard
                post={post}
                liked={marks.liked.includes(post.id)}
                saved={marks.saved.includes(post.id)}
                reposted={marks.reposted.includes(post.id)}
                extraComments={mine[post.id]?.length ?? 0}
                onToggle={toggle}
                onOpen={setOpenId}
              />
            </li>
          ))}
        </ol>

        <p className="feed__note">
          <span className="feed__hint" aria-hidden="true">
            Keep scrolling: the pile deals itself out.
          </span>
          <span>
            Photos are Heaven&rsquo;s own. Captions, counts and comments are samples for this preview.
            Double-tap a photo to like it, or turn a card over.
          </span>
        </p>
      </div>
      <div id="after-feed" tabIndex={-1} />

      <CommentSheet
        post={open}
        mine={openId ? (mine[openId] ?? []) : []}
        onAdd={addComment}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
