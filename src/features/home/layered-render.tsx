import type { CSSProperties } from "react";

import type { LayeredRender as LayeredRenderSpec } from "@/content/types";
import { cn } from "@/lib/cn";

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * A work card's art as separate layers (Figma's two-variant hover cards,
 * e.g. 4497:68351): at rest it draws the Default variant; hovered — or with
 * its card link focused — each layer eases to its Variant2 scale, about its
 * own centre, as Figma's smart-animate does (0.4s, ease in), and back when
 * the pointer leaves. A layer whose image changes in the hover variant is
 * drawn twice, the hover image fading in over the rest one (`hoverOnly`).
 * Images fill their boxes as Figma's FILL does (`object-cover`).
 *
 * The parent supplies the triggers: a `group/art` the pointer is over and a
 * `group/card` link that can take focus. Every box is in percentages of the
 * frame, so the card scales with the column. Reduced motion skips the ease.
 */
export function LayeredRender({ render }: { render: LayeredRenderSpec }) {
  return (
    <div
      role="img"
      aria-label={render.alt}
      className="relative w-full overflow-clip"
      style={{
        aspectRatio: `${render.width} / ${render.height}`,
        // Elliptical percentages keep Figma's round corner at any width.
        borderRadius: `${percent(render.radius, render.width)} / ${percent(render.radius, render.height)}`,
      }}
    >
      {render.layers.map((layer) => (
        // eslint-disable-next-line @next/next/no-img-element -- deliberate: Figma's own layer renders, as FigmaRender
        <img
          key={layer.src1x}
          src={layer.src1x}
          srcSet={`${layer.src1x} 1x, ${layer.src2x} 2x`}
          alt=""
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute max-w-none object-cover transition duration-400 ease-figma-in group-hover/art:scale-(--hover-scale) group-focus-visible/card:scale-(--hover-scale) motion-reduce:transition-none",
            layer.hoverOnly &&
              "opacity-0 group-hover/art:opacity-100 group-focus-visible/card:opacity-100",
          )}
          style={
            {
              left: percent(layer.x, render.width),
              top: percent(layer.y, render.height),
              width: percent(layer.width, render.width),
              height: percent(layer.height, render.height),
              "--hover-scale": layer.hoverScale,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
