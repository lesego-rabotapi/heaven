import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { Preloader } from "@/components/Preloader";
import { SiteHeader } from "@/components/SiteHeader";
import { SignatureFooter } from "@/components/SignatureFooter";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Heaven Coffee · Coffee inside a working church, Cape Town",
    template: "%s · Heaven Coffee, Cape Town",
  },
  description:
    "Heaven Coffee is a café inside Central Methodist Mission at 38 Burg Street, Greenmarket Square, Cape Town. Open daily 07:00 to 18:00. Founded 2017 by Mondli Mahamba.",
  // Pitch preview: kept out of search until Heaven signs it off.
  robots: { index: false, follow: false },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230b1730'/><path d='M9 26V15c0-5 3-8.500 7-11 4 2.500 7 6 7 11v11Z' fill='%23f2a93b'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1730",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint. Motion styles apply only when the visitor allows motion,
// and are withdrawn if the page's script never arrives, so nothing can be left
// hidden behind an animation that will not run.
const motionGate = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion','is-loading');setTimeout(function(){if(!window.__heavenReady){d.classList.remove('js-motion','is-loading')}},6000)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>
        {/* The pointed arch of the church door, in bounding-box units so any element can wear it. */}
        <svg width="0" height="0" className="defs" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="arch" clipPathUnits="objectBoundingBox">
              <path d="M0,1 L0,0.36 C0,0.19 0.22,0.055 0.5,0 C0.78,0.055 1,0.19 1,0.36 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <div id="top" />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Preloader />
          <SiteHeader />
          <main id="main">{children}</main>
          <SignatureFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
