import Image from "next/image";
import type { CSSProperties } from "react";

import { FigmaRender } from "@/components/ui/figma-render";
import { SectionHeader } from "@/components/ui/section-header";
import type { CaseStudyBlock } from "@/content/types";
import { cn } from "@/lib/cn";

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
 *
 * A frame narrower than the page (`width`) is centred, subtitle included,
 * as Figma lays it out.
 */
export function AnnotatedFigureBlock({
  phoneGap,
  phoneHeaderGap,
  eyebrow,
  title,
  description,
  descriptionEmphasis,
  descriptionTone,
  headerHeight,
  subtitle,
  subtitleSize = "md",
  width,
  image,
  image1x,
  frame,
  bleed,
  annotations,
}: AnnotatedFigureBlockProps) {
  return (
    <div
      data-reveal-group
      className={cn(
        "flex flex-col gap-20",
        phoneHeaderGap !== undefined && "max-md:gap-(--header-phone-gap)",
      )}
      style={
        {
          "--header-phone-gap":
            phoneHeaderGap === undefined ? undefined : `${phoneHeaderGap}px`,
        } as CSSProperties
      }
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        descriptionEmphasis={descriptionEmphasis}
        descriptionTone={descriptionTone}
        height={headerHeight}
      />

      <figure
        className={cn(
          "mx-auto flex w-full flex-col gap-10",
          phoneGap !== undefined && "max-md:gap-(--figure-phone-gap)",
        )}
        style={
          {
            maxWidth: width,
            "--figure-phone-gap":
              phoneGap === undefined ? undefined : `${phoneGap}px`,
          } as CSSProperties
        }
      >
        {subtitle && (
          <h3
            className={cn(
              "font-display text-fg",
              subtitleSize === "lg" ? "text-flow" : "text-figure-title",
            )}
          >
            {subtitle}
          </h3>
        )}

        {image1x ? (
          // Figma's own 1x and 2x renders, served untouched (see FigmaRender).
          // `image` is the 2x export, so the frame is half its pixel size
          // unless the frame is given exactly.
          <FigmaRender
            render={{
              src1x: image1x,
              src2x: image.src,
              alt: image.alt,
              width: frame?.width ?? image.width / 2,
              height: frame?.height ?? image.height / 2,
              bleed,
            }}
            className="w-full"
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1258px) 1258px, 100vw"
            className="h-auto w-full"
          />
        )}

        {annotations.length > 0 && (
          // Read out at every size; seen only from md to lg. On a phone, as
          // on desktop, the image already shows them.
          <figcaption className="max-md:sr-only lg:sr-only">
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
