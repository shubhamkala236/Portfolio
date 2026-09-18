import Image from "next/image";

import type { CaseStudyBlock } from "@/content/types";

type MediaBlockProps = Extract<CaseStudyBlock, { type: "media" }>;

/**
 * A full-width visual. With no image yet, it renders the grey placeholder box
 * from the Figma file so an unfinished slot stays visible.
 */
export function MediaBlock({
  image,
  ratio = 1512 / 1000,
  caption,
}: MediaBlockProps) {
  return (
    <figure className="flex flex-col gap-4">
      <div
        className="relative w-full overflow-hidden bg-media"
        style={{ aspectRatio: ratio }}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="text-label text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
