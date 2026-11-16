"use client";

import { useEffect, useRef, useState } from "react";
import type { Post } from "@/content/posts";
import { SITE } from "@/content/site";
import { gsap, motionOK } from "@/lib/motion";
import { project, rubberband, velocityTracker } from "@/lib/gesture";
import { Photo } from "../Photo";
import { Icon } from "../Icon";

type Props = {
  post: Post | null;
  mine: string[];
  onAdd: (id: string, text: string) => void;
  onClose: () => void;
};

/**
 * The comments, as a sheet that rises from the bottom. It is a native modal
 * dialog (focus stays inside, Escape closes, the page behind is inert). On
 * touch you can pull it down by its header: it follows the finger 1:1, and on
 * release the velocity decides whether it closes or settles back.
 */
export function CommentSheet({ post, mine, onAdd, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Post | null>(null);
  const [draft, setDraft] = useState("");
  const closing = useRef(false);

  // Open.
  useEffect(() => {
    if (!post) return;
    setShown(post);
    setDraft("");
  }, [post]);

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg || !shown || dlg.open) return;
    closing.current = false;
    dlg.showModal();
    window.dispatchEvent(new Event("heaven:lock"));
    if (motionOK() && panel.current) {
      gsap.fromTo(panel.current, { yPercent: 100, y: 0 }, { yPercent: 0, duration: 0.5, ease: "power4.out" });
      gsap.fromTo(dlg, { "--scrim": 0 }, { "--scrim": 1, duration: 0.35, ease: "power2.out" });
    }
  }, [shown]);

  const finish = () => {
    dialog.current?.close();
    window.dispatchEvent(new Event("heaven:unlock"));
    setShown(null);
    onClose();
  };
  const close = (velocity = 0) => {
    if (closing.current) return;
    closing.current = true;
    const el = panel.current;
    if (!motionOK() || !el || !dialog.current) return finish();
    const remaining = el.offsetHeight - Number(gsap.getProperty(el, "y"));
    // Faster flicks close faster: carry the release velocity into the exit.
    const duration = Math.max(0.18, Math.min(0.42, remaining / Math.max(velocity, 1400)));
    gsap.to(dialog.current, { "--scrim": 0, duration, ease: "power1.out" });
    gsap.to(el, { y: el.offsetHeight, duration, ease: "power2.in", onComplete: finish });
  };

  // Drag the header to dismiss.
  useEffect(() => {
    const el = panel.current;
    const grip = el?.querySelector<HTMLElement>(".sheet__grip");
    if (!el || !grip || !shown) return;
    const tracker = velocityTracker();
    let startY = 0;
    let dragging = false;

    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragging = true;
      startY = e.clientY - Number(gsap.getProperty(el, "y"));
      grip.setPointerCapture(e.pointerId);
      gsap.killTweensOf(el);
      tracker.reset();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = e.clientY - startY;
      const y = dy >= 0 ? dy : rubberband(dy, el.offsetHeight, 0.2);
      tracker.add(y);
      gsap.set(el, { y });
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      const y = Number(gsap.getProperty(el, "y"));
      const v = tracker.get();
      // Decide from where the gesture is heading, not only where it stopped.
      if (y + project(v) * 0.35 > el.offsetHeight * 0.4 && v >= 0) close(v);
      else gsap.to(el, { y: 0, duration: 0.45, ease: "power3.out" });
    };
    grip.addEventListener("pointerdown", down);
    grip.addEventListener("pointermove", move);
    grip.addEventListener("pointerup", up);
    grip.addEventListener("pointercancel", up);
    return () => {
      grip.removeEventListener("pointerdown", down);
      grip.removeEventListener("pointermove", move);
      grip.removeEventListener("pointerup", up);
      grip.removeEventListener("pointercancel", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !shown) return;
    onAdd(shown.id, text.slice(0, 200));
    setDraft("");
  };

  return (
    <dialog
      ref={dialog}
      className="sheet"
      aria-labelledby="sheet-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      {shown && (
        <div className="sheet__panel" ref={panel}>
          <div className="sheet__grip">
            <span className="sheet__handle" aria-hidden="true" />
            <h3 className="sheet__title" id="sheet-title">
              Comments
            </h3>
            <button type="button" className="sheet__close" aria-label="Close comments" onClick={() => close()}>
              <Icon name="close-circle-linear" size={26} />
            </button>
          </div>

          <div className="sheet__thread" data-lenis-prevent>
            <div className="sheet__post">
              <span className="sheet__thumb">
                <Photo image={shown.image} sizes="72px" alt="" />
              </span>
              <p>
                <strong>{SITE.instagramHandle}</strong> {shown.caption}
                <span className="sheet__meta">
                  {shown.place} · {shown.age} ago
                </span>
              </p>
            </div>
            <ul className="sheet__list">
              {shown.comments.map((c) => (
                <li key={c.user}>
                  <strong>{c.user}</strong> {c.text}
                </li>
              ))}
              {mine.map((text, i) => (
                <li key={`mine-${i}`} className="sheet__mine">
                  <strong>you</strong> {text}
                </li>
              ))}
            </ul>
            <p className="sheet__sample">
              Sample comments, written for this preview. The photo is Heaven&rsquo;s own.
            </p>
          </div>

          <form className="sheet__form" onSubmit={submit}>
            <label className="sr-only" htmlFor="sheet-input">
              Add a comment (only you will see it)
            </label>
            <input
              id="sheet-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Say something nice…"
              maxLength={200}
              autoComplete="off"
            />
            <button type="submit" disabled={!draft.trim()}>
              Post
            </button>
          </form>
          <p className="sheet__hint">
            Nothing here is sent anywhere. To say it for real,{" "}
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              find @{SITE.instagramHandle} on Instagram
            </a>
            .
          </p>
        </div>
      )}
    </dialog>
  );
}
