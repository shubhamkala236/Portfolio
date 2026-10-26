import type { CSSProperties } from "react";

import type { HomeContent } from "@/content/types";
import { PhotoFan } from "@/features/home/photo-fan";

type AboutSectionProps = HomeContent["about"];

/** The copy column (4506:83629) and the cat (4506:83663), Figma px. */
const COPY_WIDTH = 960;
const CAT = { width: 90.969, height: 91, bleed: [0, -0.21, 0, -0.35] };

/**
 * About me (Figma 4506:83536): the title, the photo fan, then the copy with
 * the cat doodle at the far right — 120px apart (on a phone, the cat at
 * 48px centred above the copy). The short lines each sit
 * on their own line, 2px apart, and a blank line comes before the bio, as in
 * the file. The cat rocks ±12° every 0.4s.
 */
export function AboutSection({ title, lines, bio, photos }: AboutSectionProps) {
  return (
    <section
      data-reveal-group
      id="about"
      aria-labelledby="about-title"
      className="flex scroll-mt-home-anchor flex-col items-center gap-16 max-md:scroll-mt-6 max-md:gap-11 lg:gap-30"
    >
      <h2
        id="about-title"
        className="center-tight-tracking text-center font-brand text-home-title text-fg-strong font-opsz-14 max-md:text-home-title-sm"
      >
        {title}
      </h2>

      <PhotoFan photos={photos} />

      {/* On a phone the cat sits centred above the copy, at 48px. */}
      <div className="flex w-full items-start justify-between gap-8 max-md:flex-col-reverse max-md:gap-6">
        <div
          className="flex flex-col gap-0.5 font-brand text-home-about text-fg-strong font-opsz-14"
          style={{ maxWidth: COPY_WIDTH }}
        >
          <p className="flex flex-col gap-0.5">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          {/* The file's empty line between the two paragraphs. */}
          <span aria-hidden>{" "}</span>
          <p>{bio}</p>
        </div>
        <span
          aria-hidden
          className="relative h-(--cat-h) w-(--cat-w) shrink-0 animate-cat-wobble motion-reduce:animate-none max-md:size-12 max-md:self-center"
          style={
            {
              "--cat-w": `${CAT.width}px`,
              "--cat-h": `${CAT.height}px`,
            } as CSSProperties
          }
        >
          <span
            className="absolute"
            style={{
              top: `${CAT.bleed[0]}%`,
              right: `${CAT.bleed[1]}%`,
              bottom: `${CAT.bleed[2]}%`,
              left: `${CAT.bleed[3]}%`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Figma's cat SVG */}
            <img
              src="/home/about/cat.svg"
              alt=""
              className="block size-full max-w-none"
            />
          </span>
        </span>
      </div>
    </section>
  );
}
