import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type ImageRowBlockProps = Extract<CaseStudyBlock, { type: "image-row" }>;

/** Tailwind needs literal class names, so border tones are looked up. */
const borderTone = {
  frame: "border-border-frame",
  device: "border-border-device",
} as const;

/**
 * A bottom-aligned row of visuals (Figma 4127:17219) — a wide board beside
 * narrow phone screens.
 *
 * Each item is drawn in its exact Figma box: its share of the frame width, its
 * aspect ratio, corner radius and inside stroke, with the image cropped by
 * `object-fit: cover` exactly as Figma's fill does. On a tablet a phone
 * screen would shrink to a sliver, so there the row scales up and scrolls
 * sideways; on a phone the first visual (the board) runs across the text
 * column, lined up with the copy above, and the rest sit in a row under it.
 */
export function ImageRowBlock({
  eyebrow,
  title,
  description,
  items,
  frameWidth = 1258,
}: ImageRowBlockProps) {
  return (
    <div data-reveal-group className="flex flex-col gap-16 max-md:gap-11">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div
        data-reveal-group
        className="grid grid-cols-3 gap-2 md:-mx-6 md:flex md:items-end md:justify-start md:gap-6 md:overflow-x-auto md:px-6 md:pb-4 md:[--row-scale:1.4] lg:mx-0 lg:justify-between lg:overflow-visible lg:px-0 lg:pb-0 lg:[--row-scale:1]"
      >
        {items.map((item) => (
          <div
            key={item.image.src}
            className={cn(
              "relative shrink-0 overflow-hidden",
              // On a phone: the first (the board) across the column, the
              // rest in a row under it, each filling its cell.
              "max-md:w-full! max-md:first:col-span-3",
              item.border && borderTone[item.border.tone],
            )}
            style={{
              width: `calc(var(--row-scale) * ${(item.box.width / frameWidth) * 100}%)`,
              aspectRatio: `${item.box.width} / ${item.box.height}`,
              borderRadius: item.radius,
              borderWidth: item.border?.width ?? 0,
              borderStyle: item.border ? "solid" : undefined,
            }}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
              style={{ objectPosition: item.position }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
