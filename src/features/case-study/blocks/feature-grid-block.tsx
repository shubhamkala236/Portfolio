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

/**
 * Feature cards on a three-column grid, laid out in pairs that alternate
 * across the grid: the first pair sits in columns 1–2 with its caption above
 * the art, the next in columns 2–3 with the caption below, and so on. Below
 * `lg` it collapses to a single column with every caption above its art.
 */
export function FeatureGridBlock({
  eyebrow,
  title,
  description,
  items,
}: FeatureGridBlockProps) {
  return (
    <div className="flex flex-col gap-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="grid gap-9 lg:grid-cols-3">
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
                <h3 className="font-display text-xl text-fg">{item.title}</h3>
                <p className="text-pretty text-muted">{item.description}</p>
              </div>

              <div className="relative aspect-[395/381] overflow-hidden rounded-chip bg-surface">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
