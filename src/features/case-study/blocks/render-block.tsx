import { FigmaRender } from "@/components/ui/figma-render";
import type { CaseStudyBlock } from "@/content/types";

type RenderBlockProps = Extract<CaseStudyBlock, { type: "render" }>;

/**
 * A Figma render with nothing around it — a device mockup, or a strip that
 * bleeds past the content column (its `bleed` places it; the article clips
 * the overflow at the viewport edge).
 */
export function RenderBlock({ render }: RenderBlockProps) {
  return <FigmaRender render={render} className="w-full" />;
}
