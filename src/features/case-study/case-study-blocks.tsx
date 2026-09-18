import type { CaseStudyBlock } from "@/content/types";
import { FeatureGridBlock } from "@/features/case-study/blocks/feature-grid-block";
import { HeadingBlock } from "@/features/case-study/blocks/heading-block";
import { ImageRowBlock } from "@/features/case-study/blocks/image-row-block";
import { MediaBlock } from "@/features/case-study/blocks/media-block";
import { MetaBlock } from "@/features/case-study/blocks/meta-block";
import { ProseBlock } from "@/features/case-study/blocks/prose-block";
import { QuoteClusterBlock } from "@/features/case-study/blocks/quote-cluster-block";
import { TabBarBlock } from "@/features/case-study/blocks/tab-bar-block";
import { StatementBlock } from "@/features/case-study/blocks/statement-block";

/**
 * Maps a content block onto its renderer.
 *
 * The `never` default is deliberate: add a variant to `CaseStudyBlock` without
 * adding a case here and this file stops compiling, which is exactly when you
 * want to find out.
 */
function renderBlock(block: CaseStudyBlock) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock {...block} />;
    case "feature-grid":
      return <FeatureGridBlock {...block} />;
    case "image-row":
      return <ImageRowBlock {...block} />;
    case "tab-bar":
      return <TabBarBlock {...block} />;
    case "meta":
      return <MetaBlock {...block} />;
    case "prose":
      return <ProseBlock {...block} />;
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

type CaseStudyBlocksProps = {
  blocks: readonly CaseStudyBlock[];
};

export function CaseStudyBlocks({ blocks }: CaseStudyBlocksProps) {
  return (
    <div className="flex flex-col gap-block">
      {blocks.map((block, index) => (
        <div key={`${block.type}-${index}`}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}
