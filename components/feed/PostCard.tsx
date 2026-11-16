"use client";

import { useRef, useState } from "react";
import type { Post } from "@/content/posts";
import { SITE } from "@/content/site";
import { Photo } from "../Photo";
import { Icon } from "../Icon";

export type CardProps = {
  post: Post;
  liked: boolean;
  saved: boolean;
  reposted: boolean;
  extraComments: number;
  onToggle: (kind: "liked" | "saved" | "reposted", id: string) => void;
  onOpen: (id: string) => void;
};

export const fmt = (n: number) => n.toLocaleString("en-ZA").replace(/ /g, " ");

/**
 * One Instagram post, and on its other side a postcard. Double-tap the photo
 * (or use the heart) to like it; the counts move with you.
 */
export function PostCard({ post, liked, saved, reposted, extraComments, onToggle, onOpen }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const [burst, setBurst] = useState(0);
  const lastTap = useRef({ t: 0, x: 0, y: 0 });

  const like = () => {
    if (!liked) onToggle("liked", post.id);
    setBurst((n) => n + 1);
  };
  // A double tap, measured by hand: dblclick is unreliable on touch screens.
  const onTap = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const now = performance.now();
    const prev = lastTap.current;
    if (now - prev.t < 320 && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 28) {
      lastTap.current = { t: 0, x: 0, y: 0 };
      like();
    } else {
      lastTap.current = { t: now, x: e.clientX, y: e.clientY };
    }
  };

  const likes = post.likes + (liked ? 1 : 0);
  const reposts = post.reposts + (reposted ? 1 : 0);
  const comments = post.commentCount + extraComments;
  const first = post.comments[0];

  return (
    <article className="post" data-flipped={flipped} aria-label={`Sample post: ${post.place}`}>
      <div className="post__inner">
        <div className="post__face post__face--front" inert={flipped}>
          <header className="post__head">
            <span className="post__avatar">
              <Photo image="door-sign" sizes="44px" alt="" focus="50% 18%" />
            </span>
            <span className="post__who">
              <span className="post__user">{SITE.instagramHandle}</span>
              <span className="post__place">{post.place}</span>
            </span>
            <button
              type="button"
              className="post__flip"
              aria-label="Turn over to the postcard"
              onClick={() => setFlipped(true)}
            >
              <Icon name="restart-linear" size={20} />
            </button>
          </header>

          <div className="post__media" onPointerUp={onTap}>
            <Photo image={post.image} sizes="(min-width: 900px) 340px, 80vw" />
            {post.kind === "reel" && <span className="post__reel">Reel</span>}
            {burst > 0 && (
              <span className="post__burst" key={burst} aria-hidden="true">
                <Icon name="heart-bold" size={104} />
              </span>
            )}
          </div>

          <div className="post__actions">
            <button
              type="button"
              className="post__btn post__btn--like"
              aria-pressed={liked}
              aria-label="Like"
              onClick={() => (liked ? onToggle("liked", post.id) : like())}
            >
              <Icon name={liked ? "heart-bold" : "heart-linear"} size={25} />
            </button>
            <button
              type="button"
              className="post__btn"
              aria-label={`Comments, ${comments}`}
              onClick={() => onOpen(post.id)}
            >
              <Icon name="chat-round-linear" size={25} />
            </button>
            <button
              type="button"
              className="post__btn post__btn--repost"
              aria-pressed={reposted}
              aria-label="Repost"
              onClick={() => onToggle("reposted", post.id)}
            >
              <Icon name="repeat-linear" size={25} />
              <span className="post__count">{fmt(reposts)}</span>
            </button>
            <button
              type="button"
              className="post__btn post__btn--save"
              aria-pressed={saved}
              aria-label="Save"
              onClick={() => onToggle("saved", post.id)}
            >
              <Icon name={saved ? "bookmark-bold" : "bookmark-linear"} size={25} />
            </button>
          </div>

          <p className="post__likes">
            <span className="post__tick" key={likes}>
              {fmt(likes)}
            </span>{" "}
            likes
          </p>
          <p className="post__caption">
            <strong>{SITE.instagramHandle}</strong> {post.caption}
          </p>
          <button type="button" className="post__more" onClick={() => onOpen(post.id)}>
            View all {fmt(comments)} comments
          </button>
          {first && (
            <p className="post__comment">
              <strong>{first.user}</strong> {first.text}
            </p>
          )}
          <p className="post__age">{post.age} ago · sample post</p>
        </div>

        <div className="post__face post__face--back" inert={!flipped}>
          <div className="pc">
            <div className="pc__top">
              <p className="pc__greet">Greetings from heaven,</p>
              <div className="pc__stamp" aria-hidden="true">
                <span className="pc__stamp-arch" />
                <span className="pc__stamp-text">38 Burg St</span>
              </div>
            </div>
            <svg className="pc__postmark" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id={`pm-${post.id}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <circle cx="60" cy="60" r="56" />
              <circle cx="60" cy="60" r="32" />
              <text>
                <textPath href={`#pm-${post.id}`}>Greenmarket Square · Cape Town · </textPath>
              </text>
              <text className="pc__postmark-mid" x="60" y="65" textAnchor="middle">
                8000
              </text>
            </svg>
            <p className="pc__msg">{post.caption}</p>
            <p className="pc__sign">heaven coffee</p>
            <div className="pc__address">
              <span>To you, wherever you are</span>
              <span>{post.place}</span>
              <span>38 Burg Street, Cape Town</span>
            </div>
            <button type="button" className="pc__turn" onClick={() => setFlipped(false)}>
              <Icon name="restart-linear" size={18} /> Turn it back over
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
