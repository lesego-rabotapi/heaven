import { MotionProvider } from "@/components/MotionProvider";
import { Preloader } from "@/components/Preloader";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { DoorScene } from "@/components/DoorScene";
import { Nave } from "@/components/Nave";
import { TruthStack } from "@/components/TruthStack";
import { HymnBoard } from "@/components/HymnBoard";
import { Feed } from "@/components/Feed";
import { Visit, Footer } from "@/components/Visit";

// One continuous visit: the square, the door, the nave, the board, the feed,
// and back out onto the square.
export default function Page() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader />
      <SiteHeader />
      <main id="main">
        <Hero />
        <DoorScene />
        <Nave />
        <TruthStack />
        <HymnBoard />
        <Feed />
        <Visit />
      </main>
      <Footer />
    </MotionProvider>
  );
}
