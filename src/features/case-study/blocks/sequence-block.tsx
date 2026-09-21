import { FigmaRender } from "@/components/ui/figma-render";
import type { CaseStudyBlock } from "@/content/types";

type SequenceBlockProps = Extract<CaseStudyBlock, { type: "sequence" }>;

/**
 * Frames that replace one another on a loop, with hard cuts — Figma's
 * "Animated sequence • 8 aligned screens" (4253:22744).
 *
 * The timing is Figma's own keyframes: over a cycle of N × frameMs, each
 * frame holds full opacity for its 1/N slot and cuts to 0 in the final
 * 0.01% of it (for 8 frames the snippet's `times` are 0.1249 → 0.125). One
 * shared keyframe drives every frame; a per-frame negative delay puts each
 * frame's slot in phase from the first paint, so no frame waits to start.
 *
 * Plain CSS rather than a motion library: this is pure opacity stepping, and
 * the project has no motion dependency to match.
 *
 * Reduced motion: the loop is dropped and the first frame is held.
 */
export function SequenceBlock({ frames, frameMs, label }: SequenceBlockProps) {
  const count = frames.length;
  const cycleMs = count * frameMs;
  const slot = 100 / count;
  const name = `sequence-${count}`;
  const first = frames[0];

  // Figma cuts over the last 0.01% of the slot (0.1249 → 0.125 of the cycle).
  const keyframes = `@keyframes ${name} {
  0%, ${(slot - 0.01).toFixed(4)}% { opacity: 1; }
  ${slot.toFixed(4)}%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .${name} > * { animation: none !important; opacity: 0 !important; }
  .${name} > :first-child { opacity: 1 !important; }
}`;

  return (
    <>
      {/* Outside the figure, so `:first-child` below is the first frame. */}
      <style>{keyframes}</style>
      <figure
        role="img"
        aria-label={label}
        className={`${name} relative w-full`}
        style={{ aspectRatio: `${first.width} / ${first.height}` }}
      >
        {frames.map((frame, index) => (
          <div
            key={frame.src1x}
            aria-hidden
            className="absolute inset-0"
            style={{
              // Without CSS animation support, the first frame shows.
              opacity: index === 0 ? 1 : 0,
              animation: `${name} ${cycleMs}ms linear infinite`,
              animationDelay: `${(index - count) * frameMs}ms`,
            }}
          >
            <FigmaRender render={frame} className="w-full" />
          </div>
        ))}
      </figure>
    </>
  );
}
