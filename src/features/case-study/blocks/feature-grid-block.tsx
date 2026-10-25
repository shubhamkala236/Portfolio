import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type FeatureGridBlockProps = Extract<CaseStudyBlock, { type: "feature-grid" }>;

/** Tailwind needs literal class names, so the column starts are looked up. */
const columnStart: Record<number, string> = {
  1: "lg:col-start-1",
  2: "lg:col-start-2",
  3: "lg:col-start-3",
};

/** Figma 4127:16414 — 1258 × 1262. */
const DEFAULT_FRAME = { width: 1258, height: 1262 };

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * Feature cards on a three-column grid (Figma 4127:16414), laid out in pairs
 * that alternate across it: the first pair sits in columns 1–2 with its
 * caption above the art, the next in columns 2–3 with the caption below. The
 * remaining cell of each row is an empty spacer in the file too. Below `lg`
 * it collapses to one column with every caption above its art.
 *
 * The illustrations are exported with their own rounded card background, so
 * they are shown as-is at their natural size — no extra frame.
 */
export function FeatureGridBlock({
  eyebrow,
  title,
  description,
  items,
  decorations = [],
  frame = DEFAULT_FRAME,
}: FeatureGridBlockProps) {
  return (
    <div data-reveal-group className="relative flex flex-col gap-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div data-reveal-group className="grid gap-9 lg:grid-cols-3">
        {items.map((item, index) => {
          const isOffsetPair = Math.floor(index / 2) % 2 === 1;
          const column = (index % 2) + 1 + (isOffsetPair ? 1 : 0);

          return (
            <article
              key={item.title}
              className={cn("flex flex-col gap-9", columnStart[column])}
            >
              <div
                className={cn(
                  "flex flex-col gap-4",
                  isOffsetPair && "lg:order-2",
                )}
              >
                {/* `capitalize` as in Figma: "Try-ons" renders "Try-Ons". */}
                <h3 className="font-display text-card-title text-fg capitalize">
                  {item.title}
                </h3>
                <p className="text-muted">{item.description}</p>
              </div>

              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-auto w-full"
              />
            </article>
          );
        })}
      </div>

      {/* Drawn after the grid, as in the file. The stars only cross the
          grid's empty spacer cells, so they never cover a card. */}
      {decorations.map((decoration) => (
        // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG
        <img
          key={decoration.src}
          src={decoration.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute hidden max-w-none select-none lg:block"
          style={{
            left: percent(decoration.x, frame.width),
            top: percent(decoration.y, frame.height),
            width: percent(decoration.width, frame.width),
            aspectRatio: `${decoration.width} / ${decoration.height}`,
          }}
        />
      ))}
    </div>
  );
}
