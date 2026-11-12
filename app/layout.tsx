import type { Metadata, Viewport } from "next";
import { Archivo, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

// Used only for the redrawn wordmark.
const mark = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heaven Coffee · Coffee inside a working church, Cape Town",
  description:
    "Heaven Coffee is a café inside Central Methodist Mission at 38 Burg Street, Greenmarket Square, Cape Town. Open daily 07:00 to 18:00. Founded 2017 by Mondli Mahamba.",
  // Pitch preview: keep it out of search until Heaven signs it off.
  robots: { index: false, follow: false },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230b1730'/><path d='M9 26V15c0-5 3-8.5 7-11 4 2.500 7 6 7 11v11Z' fill='%23fff'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint. Motion styles only apply when the visitor allows motion,
// and are withdrawn if the page's script never arrives, so content can't be
// left hidden behind an animation that will not run.
const motionGate = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');setTimeout(function(){if(!window.__heavenReady){d.classList.remove('js-motion','is-loading')}},6000)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mark.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>
        {/* The pointed arch, in bounding-box units so any element can wear it. */}
        <svg width="0" height="0" className="defs" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="arch" clipPathUnits="objectBoundingBox">
              <path d="M0,1 L0,0.4 C0,0.2 0.25,0.045 0.5,0 C0.75,0.045 1,0.2 1,0.4 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
