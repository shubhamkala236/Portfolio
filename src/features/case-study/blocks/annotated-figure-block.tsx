import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";
import type { CaseStudyBlock } from "@/content/types";

type AnnotatedFigureBlockProps = Extract<
  CaseStudyBlock,
  { type: "annotated-figure" }
>;

/**
 * An annotated screen walkthrough: app screens with callout labels and
 * connector lines drawn between them.
 *
 * The figure is one exported image — the callouts are hand-placed artwork that
 * no responsive layout would reproduce faithfully. Its labels are therefore
 * baked into pixels, so they are repeated as real text below: readable on a
 * phone where the image is too small to scan, and available to screen readers
 * and search engines at every size.
 */
export function AnnotatedFigureBlock({
  eyebrow,
  title,
  description,
  subtitle,
  image,
  annotations,
}: AnnotatedFigureBlockProps) {
  return (
    <div className="flex flex-col gap-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <figure className="flex flex-col gap-10">
        {subtitle && (
          <h3 className="font-display text-statement text-fg">{subtitle}</h3>
        )}

        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1258px) 1258px, 100vw"
          className="h-auto w-full"
        />

        {annotations.length > 0 && (
          <figcaption className="lg:sr-only">
            <ul className="grid gap-6 sm:grid-cols-2">
              {annotations.map((annotation) => (
                <li
                  key={annotation.title ?? annotation.text}
                  className="flex flex-col gap-1"
                >
                  {annotation.title && (
                    <span className="font-semibold text-fg">
                      {annotation.title}
                    </span>
                  )}
                  {annotation.text && (
                    <span className="text-pretty text-muted">
                      {annotation.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
