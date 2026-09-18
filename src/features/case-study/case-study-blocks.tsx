import type { CaseStudyBlock } from "@/content/types";
import { MediaBlock } from "@/features/case-study/blocks/media-block";
import { MetaBlock } from "@/features/case-study/blocks/meta-block";
import { ProseBlock } from "@/features/case-study/blocks/prose-block";
import { QuoteClusterBlock } from "@/features/case-study/blocks/quote-cluster-block";
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
