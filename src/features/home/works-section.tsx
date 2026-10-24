import Link from "next/link";

import { FigmaRender } from "@/components/ui/figma-render";
import type { HomeContent } from "@/content/types";
import { LayeredRender } from "@/features/home/layered-render";

type WorksSectionProps = HomeContent["works"];

/**
 * Selected works (Figma 4506:83470): the title, then each case study as
 * Figma's own 1258 × 800 render of its card art, its name and one line
 * about it — 120px between title and cards and between cards, 40px from art
 * to caption. Each card opens its case study.
 *
 * Each card fits the screen whole, art and caption: on a screen too short
 * for it, the card narrows (centred) until it does (`home-work-fit`).
 *
 * Every card's art is drawn in layers that move on hover — HOTSTUFF's and
 * SISTEM EXPENSE's as in the file, ELEMENTS and MISS BLISS by the same
 * motion; hovering the art, or focusing the card, plays it.
 */
export function WorksSection({ title, items }: WorksSectionProps) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="flex scroll-mt-home-anchor flex-col items-center gap-16 lg:gap-30"
    >
      <h2
        id="work-title"
        className="center-tight-tracking text-center font-brand text-home-title text-fg-strong font-opsz-14"
      >
        {title}
      </h2>
      <ul className="flex w-full flex-col gap-16 lg:gap-30">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/projects/${item.slug}`}
              className="group/card mx-auto flex w-full home-work-fit flex-col gap-10"
            >
              <span className="group/art block">
                {"layers" in item.render ? (
                  <LayeredRender render={item.render} />
                ) : (
                  <FigmaRender render={item.render} className="w-full" />
                )}
              </span>
              <span className="flex flex-col gap-4">
                <span className="font-brand text-home-work text-fg font-opsz-14">
                  {item.title}
                </span>
                <span className="text-body-lg text-muted">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
