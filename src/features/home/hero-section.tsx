import type { CSSProperties } from "react";

import type { HomeContent } from "@/content/types";
import {
  fieldDoodle,
  HeroDoodle,
  heroDoodles,
} from "@/features/home/hero-doodles";
import { HeroEyes } from "@/features/home/hero-eyes";
import { PathText } from "@/features/home/path-text";
import { u } from "@/features/home/stage";

/** The hero frame (4506:83776), 5px wider than the page on each side. */
const FRAME = { width: 1522.091, height: 1162.452, left: -5 };
/** The red field and its dots (4506:83777, 4506:83779). */
const FIELD = { width: 1522.091, height: 1116.059, dotsDrop: 3 };
/** The greeting and headline (4506:84178). */
const TITLE = { left: 226, top: 176, width: 1071, gap: 20 };

type HeroSectionProps = {
  hero: HomeContent["hero"];
};

/**
 * The home hero (Figma 4506:83776): the red brush-edged field with its dot
 * texture, crayon doodles, the inked eyes, the greeting, and the line that
 * runs along the bottom edge.
 *
 * It is a composition rather than a layout, so it is drawn in Figma px on a
 * stage that scales with the page (`--u` = 1/1512 of the width): every
 * piece keeps its place at any size. The tab bar is drawn by the page (see
 * HomeNav): it hangs over the hero from md up; below that the hero opens on
 * a red band for it (the file has no small-screen design).
 */
export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="home-title"
      className="@container relative overflow-x-clip bg-footer-red md:bg-transparent"
    >
      <div aria-hidden className="h-home-nav md:hidden" />
      <div
        className="relative bg-bg"
        style={
          {
            "--u": "calc(100cqw / 1512)",
            width: u(FRAME.width),
            height: u(FRAME.height),
            marginLeft: u(FRAME.left),
          } as CSSProperties
        }
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 overflow-clip"
          style={{ width: u(FIELD.width), height: u(FIELD.height) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's field SVG */}
          <img
            src="/home/hero/field.svg"
            alt=""
            className="absolute inset-0 size-full max-w-none"
          />
          {/* The dots are black at 17% in overlay mode in the file. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's dots SVG */}
          <img
            src="/home/hero/dots.svg"
            alt=""
            className="absolute left-1/2 max-w-none -translate-1/2 mix-blend-overlay"
            style={{
              top: `calc(50% + ${u(FIELD.dotsDrop)})`,
              width: u(FIELD.width),
              height: u(FIELD.height),
            }}
          />
          <HeroDoodle {...fieldDoodle} />
        </div>

        <div
          className="absolute flex flex-col items-center text-center font-brand font-opsz-14"
          style={{
            left: u(TITLE.left),
            top: u(TITLE.top),
            width: u(TITLE.width),
            gap: u(TITLE.gap),
          }}
        >
          {/* Figma rounds the 52.8px line to 53. */}
          <p
            className="font-semibold text-home-greeting"
            style={{ fontSize: u(44), lineHeight: 53 / 44 }}
          >
            {hero.greeting}
          </p>
          <h1
            id="home-title"
            className="center-tight-tracking font-black text-fg-strong"
            style={{
              fontSize: u(80),
              lineHeight: 1.2,
              letterSpacing: "-0.04em",
            }}
          >
            {hero.headline}
          </h1>
        </div>

        <PathText text={hero.pathText} />
        <HeroEyes />
        {heroDoodles.map((doodle) => (
          <HeroDoodle key={doodle.file} {...doodle} />
        ))}
      </div>
    </section>
  );
}
