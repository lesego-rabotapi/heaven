import { Hero } from "@/components/Hero";
import { WelcomeTicker } from "@/components/WelcomeTicker";
import { ForEveryone } from "@/components/ForEveryone";
import { Doors } from "@/components/Doors";
import { Feed } from "@/components/feed/Feed";
import { VisitStrip } from "@/components/VisitStrip";

// Home: the window, the welcome, who it is for, the feed, and the way here.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeTicker />
      <ForEveryone />
      <Feed />
      <Doors />
      <VisitStrip />
    </>
  );
}
