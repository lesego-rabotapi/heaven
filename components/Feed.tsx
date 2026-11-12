"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { POSTS, type Post } from "@/content/posts";
import { SITE } from "@/content/site";
import { gsap, motionOK } from "@/lib/gsap";
import { Photo } from "./Photo";
import {
  BookmarkIcon,
  CloseIcon,
  CommentIcon,
  HeartIcon,
  InstagramIcon,
  PauseIcon,
  PlayIcon,
  ReelIcon,
  RepostIcon,
} from "./Icons";

const fmt = (n: number) => n.toLocaleString("en-US");
const STORE = "heaven-feed";

type Marks = { liked: string[]; saved: string[]; reposted: string[] };
type Kind = keyof Marks;

/** 05 · The congregation. Heaven's feed as a moving row of posts you can like. */
export function Feed() {
  const [marks, setMarks] = useState<Marks>({ liked: [], saved: [], reposted: [] });
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  // What you liked stays liked for the visit.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE);
      if (raw) setMarks(JSON.parse(raw));
    } catch {
      /* private mode: marks just don't persist */
    }
  }, []);

  const toggle = useCallback((kind: Kind, id: string, force?: boolean) => {
    setMarks((prev) => {
      const has = prev[kind].includes(id);
      const on = force ?? !has;
      if (on === has) return prev;
      const next = { ...prev, [kind]: on ? [...prev[kind], id] : prev[kind].filter((x) => x !== id) };
      try {
        sessionStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Row one carries every post (phones show only this row); on wide screens
  // its odd posts are hidden by CSS and shown in row two instead.
  const odd = useMemo(() => new Set(POSTS.filter((_, i) => i % 2 === 1).map((p) => p.id)), []);
  const rows = useMemo(() => [POSTS, POSTS.filter((p) => odd.has(p.id))], [odd]);
  const openPost = POSTS.find((p) => p.id === openId) ?? null;

  const cardProps = (post: Post) => ({
    post,
    liked: marks.liked.includes(post.id),
    saved: marks.saved.includes(post.id),
    reposted: marks.reposted.includes(post.id),
    onToggle: toggle,
    onOpen: setOpenId,
  });

  return (
    <section className="feed" id="feed" data-tone="dark" aria-labelledby="feed-title">
      <div className="feed__head">
        <div>
          <p className="eyebrow eyebrow--onDark" data-reveal>
            From the feed
          </p>
          <h2 className="feed__title" id="feed-title" data-split>
            Heaven, <em>as posted.</em>
          </h2>
        </div>
        <div className="feed__aside" data-reveal>
          <p>
            Every week somebody from somewhere else finds the door, and the comments fill up in
            six languages. Double-tap what you like.
          </p>
          <a className="btn btn--light" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            Follow @{SITE.instagramHandle}
          </a>
        </div>
      </div>

      <a className="skip-link skip-link--inline" href="#visit">
        Skip the feed
      </a>

      <div className="feed__rows">
        {rows.map((row, i) => (
          <Marquee
            key={i}
            direction={i === 0 ? 1 : -1}
            paused={paused}
            className={i === 0 ? "feed__row--first" : "feed__row--second"}
          >
            {(copy) =>
              row.map((post) => (
                <PostCard
                  key={post.id}
                  {...cardProps(post)}
                  decorative={copy}
                  alt={i === 0 && odd.has(post.id)}
                />
              ))
            }
          </Marquee>
        ))}
      </div>

      <div className="feed__foot">
        <p className="feed__note">
          Preview feed. The photographs are Heaven&rsquo;s own; captions, counts and comments are
          samples.
        </p>
        <button
          type="button"
          className="icon-btn icon-btn--onDark feed__pause"
          aria-pressed={paused}
          aria-label="Pause the moving feed"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>

      <PostModal card={openPost ? cardProps(openPost) : null} onClose={() => setOpenId(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Marquee({
  children,
  direction,
  paused,
  className = "",
}: {
  children: (copy: boolean) => React.ReactNode;
  direction: 1 | -1;
  paused: boolean;
  className?: string;
}) {
  const row = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const rowEl = row.current;
    const trackEl = track.current;
    if (!rowEl || !trackEl || !motionOK()) return;

    let half = trackEl.scrollWidth / 2;
    let x = direction === 1 ? 0 : -half;
    let hover = false;
    let focus = false;
    let visible = false;
    let dragging = false;
    let lastX = 0;
    let travelled = 0;

    const wrap = () => {
      if (!half) return;
      while (x <= -half) x += half;
      while (x > 0) x -= half;
    };
    const paint = () => {
      trackEl.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };

    const tick = (_time: number, delta: number) => {
      if (!visible) return;
      const still = hover || focus || dragging || pausedRef.current || document.hidden;
      if (!still) {
        const speed = window.innerWidth < 700 ? 26 : 38; // px per second
        x -= direction * speed * (Math.min(delta, 64) / 1000);
        wrap();
        paint();
      }
    };
    gsap.ticker.add(tick);

    const ro = new ResizeObserver(() => {
      half = trackEl.scrollWidth / 2;
      wrap();
      paint();
    });
    ro.observe(trackEl);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(rowEl);

    const enter = () => (hover = true);
    const leave = () => (hover = false);
    const focusIn = (e: FocusEvent) => {
      focus = true;
      // Bring a card focused by keyboard fully into the row.
      const card = (e.target as HTMLElement).closest<HTMLElement>(".post");
      rowEl.scrollLeft = 0;
      if (!card) return;
      const c = card.getBoundingClientRect();
      const r = rowEl.getBoundingClientRect();
      if (c.left < r.left + 20) x += r.left + 20 - c.left;
      else if (c.right > r.right - 20) x -= c.right - (r.right - 20);
      paint();
    };
    const focusOut = (e: FocusEvent) => {
      if (rowEl.contains(e.relatedTarget as Node)) return;
      focus = false;
      rowEl.scrollLeft = 0;
    };

    // Drag (or swipe) to scrub the row by hand.
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      travelled = 0;
      lastX = e.clientX;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      travelled += Math.abs(dx);
      if (travelled > 6) {
        rowEl.classList.add("is-dragging");
        x += dx;
        wrap();
        paint();
      }
    };
    const up = () => {
      dragging = false;
      rowEl.classList.remove("is-dragging");
    };
    // A drag must not also count as a tap on a card.
    const click = (e: MouseEvent) => {
      if (travelled > 6) {
        e.preventDefault();
        e.stopPropagation();
        travelled = 0;
      }
    };

    rowEl.addEventListener("mouseenter", enter);
    rowEl.addEventListener("mouseleave", leave);
    rowEl.addEventListener("focusin", focusIn);
    rowEl.addEventListener("focusout", focusOut);
    rowEl.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    rowEl.addEventListener("click", click, true);
    paint();

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      rowEl.removeEventListener("mouseenter", enter);
      rowEl.removeEventListener("mouseleave", leave);
      rowEl.removeEventListener("focusin", focusIn);
      rowEl.removeEventListener("focusout", focusOut);
      rowEl.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      rowEl.removeEventListener("click", click, true);
      trackEl.style.transform = "";
    };
  }, [direction]);

  return (
    <div className={`feed__row ${className}`} ref={row}>
      <div className="feed__track" ref={track}>
        <div className="feed__set">{children(false)}</div>
        {/* Second copy only exists to make the loop seamless. */}
        <div className="feed__set feed__set--copy" aria-hidden="true" inert>
          {children(true)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type CardProps = {
  post: Post;
  liked: boolean;
  saved: boolean;
  reposted: boolean;
  decorative?: boolean;
  /** Shown in row one on phones only (it lives in row two on wide screens). */
  alt?: boolean;
  onToggle: (kind: Kind, id: string, force?: boolean) => void;
  onOpen: (id: string) => void;
};

function PostHeader({ post }: { post: Post }) {
  return (
    <header className="post__head">
      <span className="post__avatar">
        <Photo image="cup-handover" sizes="44px" alt="" focus="50% 35%" />
      </span>
      <span className="post__who">
        <span className="post__user">{SITE.instagramHandle}</span>
        <span className="post__place">{post.place}</span>
      </span>
    </header>
  );
}

function PostActions({ post, liked, saved, reposted, onToggle, onOpen }: CardProps) {
  return (
    <>
      <div className="post__actions">
        <button
          type="button"
          className="post__btn post__btn--like"
          aria-pressed={liked}
          aria-label="Like"
          onClick={() => onToggle("liked", post.id)}
        >
          <HeartIcon filled={liked} />
        </button>
        <button type="button" className="post__btn" aria-label="View comments" onClick={() => onOpen(post.id)}>
          <CommentIcon />
          <span>{fmt(post.commentCount)}</span>
        </button>
        <button
          type="button"
          className="post__btn"
          aria-pressed={reposted}
          aria-label="Repost"
          onClick={() => onToggle("reposted", post.id)}
        >
          <RepostIcon />
          <span>{fmt(post.reposts + (reposted ? 1 : 0))}</span>
        </button>
        <button
          type="button"
          className="post__btn post__btn--save"
          aria-pressed={saved}
          aria-label="Save"
          onClick={() => onToggle("saved", post.id)}
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>
      <p className="post__likes">{fmt(post.likes + (liked ? 1 : 0))} likes</p>
    </>
  );
}

function PostCard(props: CardProps) {
  const { post, liked, decorative, alt, onToggle, onOpen } = props;
  const [burst, setBurst] = useState(false);
  const lastTap = useRef(0);

  const love = () => {
    onToggle("liked", post.id, true);
    setBurst(true);
    window.setTimeout(() => setBurst(false), 750);
  };

  return (
    <article className={alt ? "post post--alt" : "post"} data-liked={liked}>
      <PostHeader post={post} />
      <div
        className="post__media"
        onDoubleClick={love}
        onPointerUp={(e) => {
          if (e.pointerType === "mouse") return;
          const now = e.timeStamp;
          if (now - lastTap.current < 320) love();
          lastTap.current = now;
        }}
      >
        <Photo
          image={post.image}
          sizes="(min-width: 900px) 340px, 280px"
          alt={decorative ? "" : undefined}
        />
        {post.kind === "reel" && (
          <span className="post__reel">
            <ReelIcon />
            <span className="sr-only">Reel</span>
          </span>
        )}
        <span className="post__burst" data-on={burst} aria-hidden="true">
          <HeartIcon filled />
        </span>
      </div>
      <PostActions {...props} />
      <p className="post__caption">
        <b>{SITE.instagramHandle}</b> {post.caption}
      </p>
      <button type="button" className="post__more" onClick={() => onOpen(post.id)}>
        View all {fmt(post.commentCount)} comments
      </button>
      <p className="post__comment">
        <b>{post.comments[0].user}</b> {post.comments[0].text}
      </p>
      <p className="post__age">{post.age} ago</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function PostModal({ card, onClose }: { card: CardProps | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const post = card?.post ?? null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (post && !dialog.open) {
      dialog.showModal();
      window.dispatchEvent(new Event("heaven:lock"));
    } else if (!post && dialog.open) {
      dialog.close();
    }
  }, [post]);

  return (
    <dialog
      className="post-modal"
      ref={ref}
      aria-label={post ? `Post from ${post.place}` : "Post"}
      onClose={() => {
        window.dispatchEvent(new Event("heaven:unlock"));
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      {post && card && (
        <div className="post-modal__body" data-kind={post.kind}>
          <div className="post-modal__media">
            <Photo image={post.image} sizes="(min-width: 900px) 46vw, 100vw" />
          </div>
          <div className="post-modal__side">
            <div className="post-modal__top">
              <PostHeader post={post} />
              <button
                type="button"
                className="icon-btn"
                aria-label="Close post"
                onClick={() => ref.current?.close()}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="post-modal__thread" data-lenis-prevent tabIndex={0} aria-label="Caption and comments">
              <p className="post__caption post__caption--full">
                <b>{SITE.instagramHandle}</b> {post.caption}
              </p>
              <ul>
                {post.comments.map((c) => (
                  <li key={c.user}>
                    <b>{c.user}</b> {c.text}
                  </li>
                ))}
              </ul>
              <p className="post-modal__sample">
                Sample comments for this preview. See the real conversation on Instagram.
              </p>
            </div>
            <div className="post-modal__foot">
              <PostActions {...card} />
              <p className="post__age">{post.age} ago</p>
              <a className="btn btn--primary btn--sm" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                Open on Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
