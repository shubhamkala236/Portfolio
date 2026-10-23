import { FigmaRender } from "@/components/ui/figma-render";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type WalkthroughBlockProps = Extract<CaseStudyBlock, { type: "walkthrough" }>;

/** Gaps in Figma px, scaled with the rest of the page by --gap-scale. */
const gap = (px: number) => `calc(var(--gap-scale, 1) * ${px}px)`;

/**
 * A multi-step screen walkthrough: one or more flows, each a titled run of
 * steps, each step a title over a canvas of annotated wireframes.
 *
 * Canvases are Figma's own renders (hand-placed callouts and connectors no
 * responsive layout would reproduce). Their callout text is repeated as real
 * text below each canvas — visible on small screens where the canvas is too
 * dense to read, and available to assistive tech at every size.
 *
 * Every spacing value comes from the file, and the file is not uniform: the
 * transaction flow spaces its steps 80px apart, the group flow 40px.
 */
export function WalkthroughBlock({
  eyebrow,
  title,
  description,
  descriptionTone,
  headerHeight,
  flows,
  flowGap = 148,
}: WalkthroughBlockProps) {
  return (
    <div className="flex flex-col items-center gap-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        descriptionTone={descriptionTone}
        height={headerHeight}
      />

      <div
        className="flex w-full flex-col items-center"
        style={{ gap: gap(flowGap) }}
      >
        {flows.map((flow, flowIndex) => (
          <section
            key={flow.title ?? flowIndex}
            className="flex w-full flex-col"
            style={{ maxWidth: flow.width, gap: gap(40) }}
          >
            {flow.title && (
              <header className="flex flex-col gap-3">
                <h3
                  className={cn(
                    "font-display text-fg",
                    flow.titleSize === "md" ? "text-flow" : "text-flow-lg",
                  )}
                >
                  {flow.title}
                </h3>
                {flow.description && (
                  <p className="text-muted">{flow.description}</p>
                )}
              </header>
            )}

            <div className="flex flex-col" style={{ gap: gap(flow.stepGap) }}>
              {flow.steps.map((step, stepIndex) => (
                <figure key={step.title} className="flex flex-col gap-8">
                  {flow.numbered === false ? (
                    <h4 className="font-semibold text-fg-strong">
                      {step.title}
                    </h4>
                  ) : (
                    // A real numbered list item, as in the file: the "1."
                    // marker sits in the item's 30px start margin.
                    <ol start={stepIndex + 1} className="list-decimal">
                      <li className="ms-[30px] font-semibold text-fg-strong">
                        <h4>{step.title}</h4>
                      </li>
                    </ol>
                  )}

                  <FigmaRender render={step.figure} className="w-full" />

                  {step.note && (
                    <p className="text-muted">
                      {step.note.lead && (
                        <span className="font-medium text-fg-strong">
                          {step.note.lead}
                        </span>
                      )}
                      {step.note.text}
                    </p>
                  )}

                  {step.annotations.length > 0 && (
                    <figcaption className="lg:sr-only">
                      <ul className="grid gap-6 sm:grid-cols-2">
                        {step.annotations.map((annotation) => (
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
                              <span className="text-muted">
                                {annotation.text}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
