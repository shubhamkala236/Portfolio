import type { CSSProperties } from "react";

import { EYE, eyeStrokes } from "@/features/home/eye-strokes";
import { u } from "@/features/home/stage";
import { cn } from "@/lib/cn";

/** The pair (4506:84317): two eyes 41.348px apart, the right one mirrored. */
const PAIR = { left: 165.98, top: 458, width: 1189, gap: 41.348 };
/** Each iris's box in its eye (4506:84375, 4506:84438) and SVG bleed. */
const IRIS = {
  left: { left: 180.89, bleed: [0, -1.6, -1.89, 0] },
  right: { left: 304.93, bleed: [0, -1.61, -1.89, 0] },
  top: 93.79,
  width: 147.367,
  height: 127.565,
} as const;
/** One step of the gaze: the irises move 62.022px per step. */
const IRIS_STEP = 62.022;

const bleedInset = ([top, right, bottom, left]: readonly number[]) => ({
  top: `${top}%`,
  right: `${right}%`,
  bottom: `${bottom}%`,
  left: `${left}%`,
});

/**
 * One eye, rebuilt from its 48 strokes as Figma places them, with its iris
 * on top. (The file sets the eye frames to `overlay`, but Figma renders
 * them solid black, so they are drawn normally here, as rendered.)
 *
 * The iris steps left → centre → right in 0.6s steps and rests at centre
 * for the rest of the 12s loop. The right eye is the left one mirrored, so
 * its iris moves the opposite way in its own coordinates — the two still
 * look the same way.
 */
function Eye({ side }: { side: "left" | "right" }) {
  const iris = IRIS[side];

  return (
    <div
      className={cn("relative shrink-0", side === "right" && "-scale-x-100")}
      style={{ width: u(EYE.width), height: u(EYE.height) }}
    >
      {eyeStrokes.map((stroke) => (
        <span
          key={stroke.n}
          className="absolute"
          style={{
            left: u(stroke.left),
            top: u(stroke.top),
            width: u(stroke.width),
            height: u(stroke.height),
          }}
        >
          {/* Sized by its bleed box, not its own width, so it scales. */}
          <span className="absolute" style={bleedInset(stroke.bleed)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Figma's stroke SVGs, placed as drawn */}
            <img
              src={`/home/hero/eye/stroke-${String(stroke.n).padStart(2, "0")}.svg`}
              alt=""
              className="block size-full max-w-none"
            />
          </span>
        </span>
      ))}
      <span
        className="absolute animate-iris motion-reduce:animate-none"
        style={
          {
            left: u(iris.left),
            top: u(IRIS.top),
            width: u(IRIS.width),
            height: u(IRIS.height),
            "--iris-step": u(side === "left" ? IRIS_STEP : -IRIS_STEP),
          } as CSSProperties
        }
      >
        <span className="absolute" style={bleedInset(iris.bleed)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's iris SVG */}
          <img
            src={`/home/hero/eye/iris-${side}.svg`}
            alt=""
            className="block size-full max-w-none"
          />
        </span>
      </span>
    </div>
  );
}

/** The inked eyes across the hero (Figma 4506:84317). */
export function HeroEyes() {
  return (
    <div
      aria-hidden
      className="absolute flex items-center"
      style={{
        left: u(PAIR.left),
        top: u(PAIR.top),
        width: u(PAIR.width),
        gap: u(PAIR.gap),
      }}
    >
      <Eye side="left" />
      <Eye side="right" />
    </div>
  );
}
