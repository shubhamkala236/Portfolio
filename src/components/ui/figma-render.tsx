import type { FigmaRender as FigmaRenderSpec } from "@/content/types";
import { cn } from "@/lib/cn";

type FigmaRenderProps = {
  render: FigmaRenderSpec;
  className?: string;
};

/**
 * Figma's own 1x and 2x renders of a frame, served untouched as a density
 * srcset. Next's optimiser would resample them to a stock width and
 * recompress them, softening the small text baked into these figures; served
 * this way a 1x screen shows Figma's pixels exactly.
 *
 * The box takes the frame's true size (`width`/`height`), not the render's.
 * Frames are often fractionally tall and Figma rounds the render up a pixel;
 * sizing to the render would drift the layout a pixel per figure. So the box
 * is set by an explicit aspect ratio and the render is drawn top-anchored
 * with `object-fit: cover` — at full size that is a 1:1 draw cropping the
 * extra background row, with no resampling.
 */
export function FigmaRender({ render, className }: FigmaRenderProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- deliberate: pixel-exact density pair
    <img
      src={render.src1x}
      srcSet={`${render.src1x} 1x, ${render.src2x} 2x`}
      alt={render.alt}
      width={render.width}
      height={render.height}
      loading="lazy"
      decoding="async"
      style={{ aspectRatio: `${render.width} / ${render.height}` }}
      className={cn("h-auto max-w-full object-cover object-top", className)}
    />
  );
}
