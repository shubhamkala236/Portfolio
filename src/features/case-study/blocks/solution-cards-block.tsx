import { FigmaRender } from "@/components/ui/figma-render";
import { SectionHeader } from "@/components/ui/section-header";
import type { CaseStudyBlock } from "@/content/types";

type SolutionCardsBlockProps = Extract<
  CaseStudyBlock,
  { type: "solution-cards" }
>;

/**
 * A row of equal cards, each an illustration over a title and description
 * (Figma 4106:5327): a centred row of four 245px cards, 40px apart, 64px
 * under the header. Stacks to two, then one column, on narrower screens.
 */
export function SolutionCardsBlock({
  eyebrow,
  title,
  description,
  items,
  width = 1100,
}: SolutionCardsBlockProps) {
  return (
    <div data-reveal-group className="flex flex-col items-center gap-16">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ul
        data-reveal-group
        className="grid w-full gap-10 sm:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: width }}
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="flex flex-col items-center gap-10 max-md:gap-6"
          >
            <FigmaRender render={item.icon} />
            {/* On a phone: 24px under the art, 4px from title to text. */}
            <div className="flex w-full flex-col gap-4 max-md:gap-1 lg:h-card-text">
              {/* `capitalize` as in Figma: "Track everything" renders
                  "Track Everything". */}
              <h3 className="font-display text-card-title text-fg-strong capitalize">
                {item.title}
              </h3>
              {/* pre-wrap keeps the file's deliberate double space. */}
              <p className="whitespace-pre-wrap text-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
