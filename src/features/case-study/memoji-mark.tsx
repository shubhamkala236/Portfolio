import Image from "next/image";

import type { MemojiMark as MemojiMarkSpec } from "@/content/types";

type MemojiMarkProps = {
  mark: MemojiMarkSpec;
};

/**
 * The "circ kriti" badge: a memoji cropped out of a sprite sheet inside a
 * dark circle, optionally with a glowing sparkle beside it.
 *
 * Rebuilt from its parts rather than exported whole, because the sparkle's
 * glow extends ~210px beyond the group and a flat export is opaque — it would
 * paint over the content above and below. Here the glow is the SVG's own
 * filter on a transparent canvas.
 *
 * The group keeps its Figma layout size; circle and sparkle are positioned
 * inside it exactly as in the file. Figma's 20px #191919 ring is an *outside*
 * stroke in the page colour (verified against the export's pixels), so it is
 * invisible and not drawn.
 */
export function MemojiMark({ mark }: MemojiMarkProps) {
  const { box, circle, sprite, sparkle } = mark;

  return (
    <div
      className="relative shrink-0"
      style={{ width: box.width, height: box.height }}
    >
      <div
        // rounded-full, not the 99px `round` token: that only closes a
        // circle up to 198px, and this badge is also used at 320px.
        className="absolute overflow-hidden rounded-full bg-surface"
        style={{
          left: circle.x,
          top: circle.y,
          width: circle.size,
          height: circle.size,
        }}
      >
        <div
          className="absolute overflow-hidden"
          style={{
            top: sprite.crop.insetTop,
            right: sprite.crop.insetRight,
            bottom: sprite.crop.insetBottom,
            left: sprite.crop.insetLeft,
          }}
        >
          <div
            className="absolute"
            style={{
              left: sprite.crop.imageLeft,
              top: sprite.crop.imageTop,
              width: sprite.crop.imageWidth,
              height: sprite.crop.imageHeight,
            }}
          >
            {/* unoptimized: the sprites are small originals, and Figma renders
                from the original — recompressing them only loses detail. */}
            <Image src={sprite.src} alt={sprite.alt} fill unoptimized />
          </div>
        </div>
      </div>

      {sparkle && (
        // eslint-disable-next-line @next/next/no-img-element -- static SVG with a filter; next/image would rasterise nothing useful
        <img
          src={sparkle.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute max-w-none select-none"
          style={{
            left: sparkle.x - (sparkle.canvas - sparkle.size) / 2,
            top: sparkle.y - (sparkle.canvas - sparkle.size) / 2,
            width: sparkle.canvas,
            height: sparkle.canvas,
          }}
        />
      )}
    </div>
  );
}
