import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type ImageRowBlockProps = Extract<CaseStudyBlock, { type: "image-row" }>;

/**
 * A bottom-aligned row of visuals at their Figma proportions — a wide board
 * beside narrow phone screens, say.
 *
 * Each item keeps its share of the design frame width, so the row matches the
 * file at desktop size. Narrow viewports would shrink a phone screen to an
 * unreadable sliver, so below `lg` the row scales up and scrolls sideways
 * instead.
 */
export function ImageRowBlock({
  eyebrow,
  title,
  description,
  items,
  frameWidth = 1258,
}: ImageRowBlockProps) {
  return (
    <div className="flex flex-col gap-16">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="-mx-6 flex items-end gap-6 overflow-x-auto px-6 pb-4 [--row-scale:2.2] md:[--row-scale:1.4] lg:mx-0 lg:justify-between lg:overflow-visible lg:px-0 lg:pb-0 lg:[--row-scale:1]">
        {items.map((item) => (
          <div
            key={item.image.src}
            className="shrink-0"
            style={{
              width: `calc(var(--row-scale) * ${(item.image.width / frameWidth) * 100}%)`,
            }}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className={cn(
                "h-auto w-full rounded-[0.9rem]",
                item.bordered && "border border-border",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
