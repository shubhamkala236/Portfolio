import { DotList } from "@/components/ui/dot-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FigmaRender } from "@/components/ui/figma-render";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type ChapterBlockProps = Extract<CaseStudyBlock, { type: "chapter" }>;

/** Gap between keywords, with the "•" centred in it (Figma 4253:22861). */
const KEYWORD_GAP = 24;

/** Figma px, scaled with the rest of the page by --gap-scale. */
const gap = (px: number) => `calc(var(--gap-scale, 1) * ${px}px)`;

/**
 * A numbered chapter (Hotstuff 4253:22854 and siblings): eyebrow number, then
 * a column 12px apart of title, keyword row and paragraphs, then its visuals.
 *
 * Gaps come from the file and genuinely vary — most chapters put their first
 * visual 80px under the header, Expeditions and Points 120px — so each is
 * data rather than a constant here.
 */
export function ChapterBlock({
  eyebrow,
  title,
  uppercase = false,
  keywords,
  paragraphs,
  size = "body",
  paragraphGap = 12,
  visuals = [],
  headerGap = 80,
  visualGap = 80,
}: ChapterBlockProps) {
  return (
    <section className="flex flex-col" style={{ gap: gap(headerGap) }}>
      <header className="flex flex-col gap-4">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div className="flex flex-col gap-3">
          <h2
            className={cn(
              "font-display text-section-title text-fg",
              uppercase && "uppercase",
            )}
          >
            {title}
          </h2>
          {keywords && keywords.length > 0 && (
            <DotList
              items={keywords}
              gap={KEYWORD_GAP}
              className="text-chip text-muted"
            />
          )}
          <div
            className={cn(
              "flex flex-col text-fg-strong",
              size === "lg" ? "text-body-lg" : "text-body",
            )}
            style={{ gap: paragraphGap }}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </header>

      {visuals.length > 0 && (
        <div className="flex flex-col" style={{ gap: gap(visualGap) }}>
          {visuals.map((visual) => (
            <div key={visual.render.src1x} className="relative">
              <FigmaRender render={visual.render} className="w-full" />
              {visual.overlays?.map((overlay) => (
                <FigmaRender
                  key={overlay.render.src1x}
                  render={overlay.render}
                  className="absolute"
                  style={{
                    left: `${(overlay.x / visual.render.width) * 100}%`,
                    top: `${(overlay.y / visual.render.height) * 100}%`,
                    width: `${(overlay.render.width / visual.render.width) * 100}%`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
