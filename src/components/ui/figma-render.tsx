import type { CSSProperties } from "react";

import type { FigmaRender as FigmaRenderSpec } from "@/content/types";
import { cn } from "@/lib/cn";

type FigmaRenderProps = {
  render: FigmaRenderSpec;
  className?: string;
  style?: CSSProperties;
  /** Load immediately — for renders visible on first paint (the hero). */
  eager?: boolean;
};

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

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
 *
 * With `bleed`, the render is larger than the frame (content hangs outside
 * it). The frame box still sets the layout; the render is positioned inside
 * it in percentages of the frame, so it overhangs by exactly Figma's amount
 * and scales with the frame on narrower screens.
 */
export function FigmaRender({
  render,
  className,
  style,
  eager = false,
}: FigmaRenderProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- deliberate: pixel-exact density pair
    <img
      src={render.src1x}
      srcSet={`${render.src1x} 1x, ${render.src2x} 2x`}
      alt={render.alt}
      width={render.bleed?.width ?? render.width}
      height={render.bleed?.height ?? render.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      style={
        render.bleed
          ? {
              position: "absolute",
              left: percent(render.bleed.x, render.width),
              top: percent(render.bleed.y, render.height),
              width: percent(render.bleed.width, render.width),
              height: "auto",
            }
          : { aspectRatio: `${render.width} / ${render.height}`, ...style }
      }
      className={cn(
        "max-w-none",
        !render.bleed && "h-auto max-w-full object-cover object-top",
        !render.bleed && className,
      )}
    />
  );

  if (!render.bleed) return image;

  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: `${render.width} / ${render.height}`, ...style }}
    >
      {image}
    </div>
  );
}
