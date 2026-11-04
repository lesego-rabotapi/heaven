import { useEffect, useRef, useState } from 'react';
import { feed, type FeedPost } from '../lib/content';

// The pointer, a keyboard user and the page itself can each want the marquee stopped: a tile is a link,
// so it can be tabbed to. The second set is a visual copy (aria-hidden, out of the tab order) that
// makes the loop seamless; CSS hides it on phones, where the row scrolls by hand instead.
function FeedTile({ post, hidden }: { post: FeedPost; hidden?: boolean }) {
  return (
    <a
      className="feed-tile tile"
      href={'https://instagram.com/heavencoffeect'}
      target="_blank"
      rel="noopener noreferrer"
      {...(hidden ? { 'aria-hidden': true, tabIndex: -1 } : { title: 'View on Instagram' })}
      style={{ position: 'relative', display: 'block', flexShrink: 0, overflow: 'hidden', background: '#A9CDF0', color: '#fff' }}
    >
      <picture className="block w-full h-full">
        <source type="image/webp" srcSet={post.image.replace(/\.jpg$/, '.webp')} />
        <img src={post.image} alt={hidden ? '' : post.alt} className="w-full h-full object-cover block" loading="lazy" decoding="async" />
      </picture>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,27,45,.72) 0%, rgba(15,27,45,0) 34%)' }} />
      <div className="absolute flex flex-col" style={{ top: '12px', left: '14px', lineHeight: 1.2 }}>
        <span style={{ fontSize: '12px', fontWeight: 700 }}>{post.place}</span>
      </div>
    </a>
  );
}

export function FeedMarquee() {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [offScreen, setOffScreen] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  // Constant scroll speed, not a constant loop time: the tiles are 280px on phones, 320px on tablets and
  // 360px on desktop, so a fixed duration would run the wider tracks faster. The pace (--px-per-s) and the
  // tile size both come from the CSS. One set is tile count x (tile width + gap); it is recomputed when the
  // width changes, and the animation restarts only if the loop time really changed.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let last = 0, lastWidth = window.innerWidth, timer: ReturnType<typeof setTimeout>;
    const setSpeed = () => {
      const first = track.querySelector<HTMLElement>('.feed-tile');
      if (!first) return;
      const tileWidth = first.getBoundingClientRect().width;
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.columnGap) || 12;
      const pxPerSecond = parseFloat(cs.getPropertyValue('--px-per-s')) || 22.4;
      const duration = Math.round((feed.length * (tileWidth + gap)) / pxPerSecond * 10) / 10;
      if (Math.abs(duration - last) < 1) return;
      track.style.setProperty('--speed', duration + 's');
      if (last) { track.style.animationName = 'none'; void track.offsetWidth; track.style.animationName = ''; }
      last = duration;
    };
    setSpeed();
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(setSpeed, 150);
    };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => setOffScreen(!e.isIntersecting)), { threshold: 0 });
    io.observe(row);
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const paused = hovered || focused || offScreen || tabHidden;
  useEffect(() => {
    if (trackRef.current) trackRef.current.style.animationPlayState = paused ? 'paused' : 'running';
  }, [paused]);

  return (
    <>
      <div
        id="feed-row"
        ref={rowRef}
        className="feed-row mt-9 lg:mt-16"
        style={{ overflow: "hidden" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (rowRef.current?.contains(e.relatedTarget as Node | null)) return;
          setFocused(false);
          // focusing an off-screen tile scrolls the clipped row; undo it before the loop resumes
          if (rowRef.current) rowRef.current.scrollLeft = 0;
        }}
      >
        <div id="feed-track" ref={trackRef} className="feed-track l flex" style={{ gap: "12px", width: "max-content" }}>
          {feed.map((p) => <FeedTile key={p.image} post={p} />)}
          {feed.map((p) => <FeedTile key={"copy-" + p.image} post={p} hidden />)}
        </div>
      </div>
    </>
  );
}
