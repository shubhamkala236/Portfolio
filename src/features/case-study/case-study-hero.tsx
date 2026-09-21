import Image from "next/image";

import { FigmaRender } from "@/components/ui/figma-render";
import type {
  FigmaRender as FigmaRenderSpec,
  ImageAsset,
} from "@/content/types";

type CaseStudyHeroProps = {
  title: string;
  subtitle: string;
  media: ImageAsset | null;
  /** A full-bleed Figma render that replaces the title-over-media hero. */
  render?: FigmaRenderSpec;
};

export function CaseStudyHero({
  title,
  subtitle,
  media,
  render,
}: CaseStudyHeroProps) {
  // Render-only hero: the frame is the whole hero, edge to edge, and the
  // page's <h1> moves into the body (a `page-title` block).
  if (render) {
    return (
      <header>
        <FigmaRender render={render} className="w-full" eager />
      </header>
    );
  }

  return (
    <header className="flex flex-col items-center gap-hero pt-24">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="font-display text-display text-fg">{title}</h1>
        <p className="text-lead text-balance text-muted">{subtitle}</p>
      </div>

      {/* Still an empty frame in Figma — render the placeholder until there is
          a real export to drop in. */}
      <div className="relative aspect-1512/1000 w-full bg-media">
        {media && (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
    </header>
  );
}
