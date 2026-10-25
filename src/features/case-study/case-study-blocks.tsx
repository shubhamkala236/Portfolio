import { Fragment } from "react";

import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";
import { AnnotatedFigureBlock } from "@/features/case-study/blocks/annotated-figure-block";
import { ChapterBlock } from "@/features/case-study/blocks/chapter-block";
import { PageTitleBlock } from "@/features/case-study/blocks/page-title-block";
import { ProjectPagerBlock } from "@/features/case-study/blocks/project-pager-block";
import { SequenceBlock } from "@/features/case-study/blocks/sequence-block";
import { FeatureGridBlock } from "@/features/case-study/blocks/feature-grid-block";
import { HeadingBlock } from "@/features/case-study/blocks/heading-block";
import { ImageRowBlock } from "@/features/case-study/blocks/image-row-block";
import { MediaBlock } from "@/features/case-study/blocks/media-block";
import { MetaBlock } from "@/features/case-study/blocks/meta-block";
import { NavStructureBlock } from "@/features/case-study/blocks/nav-structure-block";
import { ProseBlock } from "@/features/case-study/blocks/prose-block";
import { QuoteClusterBlock } from "@/features/case-study/blocks/quote-cluster-block";
import { RenderBlock } from "@/features/case-study/blocks/render-block";
import { SectionNavBlock } from "@/features/case-study/blocks/section-nav-block";
import { SolutionCardsBlock } from "@/features/case-study/blocks/solution-cards-block";
import { StatementBlock } from "@/features/case-study/blocks/statement-block";
import { WalkthroughBlock } from "@/features/case-study/blocks/walkthrough-block";

/** Gap between top-level sections in the Figma frame. */
const ROOT_GAP = 200;

/**
 * Maps a content block onto its renderer.
 *
 * The `never` default is deliberate: add a variant to `CaseStudyBlock` without
 * adding a case here and this file stops compiling, which is exactly when you
 * want to find out.
 */
function renderBlock(block: CaseStudyBlock) {
  switch (block.type) {
    case "group":
      return <BlockStack blocks={block.blocks} gap={block.gap} />;
    case "heading":
      return <HeadingBlock {...block} />;
    case "feature-grid":
      return <FeatureGridBlock {...block} />;
    case "image-row":
      return <ImageRowBlock {...block} />;
    case "annotated-figure":
      return <AnnotatedFigureBlock {...block} />;
    case "section-nav":
      return (
        <SectionNavBlock
          label={block.label}
          sections={block.sections}
          gap={ROOT_GAP}
        >
          {block.sections.map((section) => (
            // The anchor margin lands a section just under the floating bar.
            <section
              key={section.id}
              id={section.id}
              data-reveal-group
              className="scroll-mt-section-anchor"
            >
              {renderBlock(section.block)}
            </section>
          ))}
        </SectionNavBlock>
      );
    case "meta":
      return <MetaBlock {...block} />;
    case "prose":
      return <ProseBlock {...block} />;
    case "solution-cards":
      return <SolutionCardsBlock {...block} />;
    case "nav-structure":
      return <NavStructureBlock {...block} />;
    case "walkthrough":
      return <WalkthroughBlock {...block} />;
    case "page-title":
      return <PageTitleBlock {...block} />;
    case "render":
      return <RenderBlock {...block} />;
    case "project-pager":
      return <ProjectPagerBlock {...block} />;
    case "chapter":
      return <ChapterBlock {...block} />;
    case "sequence":
      return <SequenceBlock {...block} />;
    case "quote-cluster":
      return <QuoteClusterBlock {...block} />;
    case "statement":
      return <StatementBlock {...block} />;
    case "media":
      return <MediaBlock {...block} />;
    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

type BlockStackProps = {
  blocks: readonly CaseStudyBlock[];
  /** Gap in Figma pixels. Scaled down on narrower viewports. */
  gap: number;
  className?: string;
};

function BlockStack({ blocks, gap, className }: BlockStackProps) {
  return (
    // Each block scrolls into view on its own (ScrollReveal).
    <div
      data-reveal-group
      className={cn("flex flex-col", className)}
      style={{ gap: `calc(var(--gap-scale) * ${gap}px)` }}
    >
      {blocks.map((block, index) => (
        <Fragment key={`${block.type}-${index}`}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}

type CaseStudyBlocksProps = {
  blocks: readonly CaseStudyBlock[];
};

/**
 * Renders the block tree, preserving the Figma frame's own nesting: blocks sit
 * 200px apart at the top level, and a `group` reproduces a tighter cluster
 * (the meta/introduction stack at 100px, say).
 *
 * Every gap is multiplied by `--gap-scale`, so the whole rhythm compresses
 * proportionally on smaller screens rather than each gap being picked by hand.
 */
export function CaseStudyBlocks({ blocks }: CaseStudyBlocksProps) {
  return (
    <BlockStack
      blocks={blocks}
      gap={ROOT_GAP}
      className="[--gap-scale:0.45] md:[--gap-scale:0.7] lg:[--gap-scale:1]"
    />
  );
}
