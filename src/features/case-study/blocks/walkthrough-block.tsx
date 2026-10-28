import type { CSSProperties } from "react";

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
    // On a phone the header sits 64px over the flows.
    <div
      data-reveal-group
      className="flex flex-col items-center gap-20 max-md:gap-16"
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        descriptionTone={descriptionTone}
        height={headerHeight}
      />

      <div
        data-reveal-group
        className="flex w-full flex-col items-center"
        style={{ gap: gap(flowGap) }}
      >
        {flows.map((flow, flowIndex) => (
          <section
            data-reveal-group
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

            <div
              data-reveal-group
              className={cn(
                "flex flex-col gap-(--step-gap)",
                flow.phoneStepGap !== undefined &&
                  "max-md:gap-(--step-phone-gap)",
              )}
              style={
                {
                  "--step-gap": gap(flow.stepGap),
                  "--step-phone-gap":
                    flow.phoneStepGap === undefined
                      ? undefined
                      : `${flow.phoneStepGap}px`,
                } as CSSProperties
              }
            >
              {flow.steps.map((step, stepIndex) => (
                // On a phone the title sits 20px over its canvas.
                <figure
                  key={step.title}
                  className="flex flex-col gap-8 max-md:gap-5"
                >
                  {flow.numbered === false ? (
                    <h4 className="font-semibold text-fg-strong">
                      {step.title}
                    </h4>
                  ) : (
                    // A real numbered list item, as in the file: the "1."
                    // marker sits in the item's 30px start margin. On a
                    // phone the number runs inline instead, so the title
                    // lines up with the canvas under it.
                    <ol
                      start={stepIndex + 1}
                      className="list-decimal max-md:list-none"
                    >
                      <li className="ms-[30px] font-semibold text-fg-strong max-md:ms-0">
                        <h4>
                          <span className="md:hidden">{stepIndex + 1}. </span>
                          {step.title}
                        </h4>
                      </li>
                    </ol>
                  )}

                  <FigmaRender render={step.figure} className="w-full" />

                  {step.note && (
                    <p
                      className={cn(
                        "text-muted",
                        step.note.phoneSmall && "phone-copy-sm",
                      )}
                    >
                      {step.note.lead && (
                        <span className="font-medium text-fg-strong">
                          {step.note.lead}
                        </span>
                      )}
                      {step.note.text}
                    </p>
                  )}

                  {step.annotations.length > 0 && (
                    // Read out at every size; seen only from md to lg. On a
                    // phone, as on desktop, the canvas already shows them.
                    <figcaption className="max-md:sr-only lg:sr-only">
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
