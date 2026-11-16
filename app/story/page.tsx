import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Statement } from "@/components/story/Statement";
import { Walk } from "@/components/story/Walk";
import { Collie, Founder, Wall } from "@/components/story/Founder";

export const metadata: Metadata = {
  title: "The story",
  description:
    "Mondli Mahamba opened Heaven Coffee in April 2017 inside Central Methodist Mission on Greenmarket Square. How to find the door, and what is behind it.",
};

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        long
        title={
          <>
            Open to everyone
            <br />
            who finds the door
          </>
        }
        aside="since April 2017"
      />
      <Statement />
      <Walk />
      <Founder />
      <Collie />
      <Wall />
    </>
  );
}
