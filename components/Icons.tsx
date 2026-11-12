// Interface icons. Simple stroked glyphs, sized by the parent's font-size.
type P = { filled?: boolean; className?: string };

const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const DownIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const HeartIcon = ({ filled, className }: P) => (
  <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.5s-7.5-4.4-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.7-7.5 10.1-7.5 10.1Z" />
  </svg>
);

export const CommentIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" />
  </svg>
);

export const RepostIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M17 3.5 20.5 7 17 10.5M20.5 7H8a4 4 0 0 0-4 4v1M7 20.5 3.5 17 7 13.5M3.5 17H16a4 4 0 0 0 4-4v-1" />
  </svg>
);

export const BookmarkIcon = ({ filled, className }: P) => (
  <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
    <path d="M6.5 4h11v16.5L12 16l-5.5 4.5Z" />
  </svg>
);

export const ReelIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <path d="M3.5 8.5h17M8 3.5l3 5M14 3.5l3 5M10.5 12v5l4.2-2.5Z" />
  </svg>
);

export const PauseIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M8.5 5.5v13M15.5 5.5v13" />
  </svg>
);

export const PlayIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M8 5.5v13l10.5-6.5Z" />
  </svg>
);

export const InstagramIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);
