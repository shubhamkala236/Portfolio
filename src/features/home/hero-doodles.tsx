import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type Doodle = {
  /** The SVG under /home/hero/. */
  file: string;
  /** Box in % of its frame: top, right, bottom, left (Figma's insets). */
  inset: readonly [number, number, number, number];
  /**
   * For a rotated doodle, the drawing's size inside that box (Figma's
   * hypot() of the box's container units), its turn and mirror.
   */
  turn?: { width: string; height: string; rotate: number; mirror?: boolean };
  /** How far the SVG bleeds past its box, %: top, right, bottom, left. */
  bleed?: readonly [number, number, number, number];
  /** When its wiggle starts in the 12s loop, s. */
  delay: number;
};

/** The swirl sits inside the red field (4506:84177), cropped by it. */
export const fieldDoodle: Doodle = {
  file: "doodle-swirl.svg",
  inset: [52.6, 77.66, 4.71, -8.87],
  turn: {
    width: "hypot(-64.9759cqw, 34.5517cqh)",
    height: "hypot(35.0241cqw, 65.4483cqh)",
    rotate: -28.08,
    mirror: true,
  },
  delay: 2.6,
};

/** The rest float over the hero frame (4506:84799 … 4506:84853). */
export const heroDoodles: readonly Doodle[] = [
  {
    file: "doodle-squiggle.svg",
    inset: [30.8, 0.54, 40.92, 84.11],
    turn: {
      width: "hypot(26.0118cqw, 89.1034cqh)",
      height: "hypot(-73.9882cqw, 10.8966cqh)",
      rotate: 78.29,
    },
    bleed: [-4.89, -2.66, -4.8, -2.66],
    delay: 2.45,
  },
  {
    file: "doodle-star-yellow.svg",
    inset: [7.23, 81.28, 84, 10.71],
    bleed: [-2.44, -2.04, -2.44, -2.04],
    delay: 2,
  },
  {
    file: "doodle-star-small.svg",
    inset: [31.65, 83.05, 62.65, 12.48],
    turn: {
      width: "hypot(61.5685cqw, 46.5762cqh)",
      height: "hypot(-38.4315cqw, 53.4238cqh)",
      rotate: 36.42,
    },
    bleed: [-2.27, -1.92, -2.27, -1.92],
    delay: 2.3,
  },
  {
    file: "doodle-star-pink.svg",
    inset: [67.01, 14.81, 20.04, 74.77],
    turn: {
      width: "hypot(32.1567cqw, 58.711cqh)",
      height: "hypot(-67.8433cqw, 41.289cqh)",
      rotate: 60,
    },
    delay: 2.9,
  },
  {
    file: "doodle-heart-pink.svg",
    inset: [3.18, 12.08, 86.9, 80.28],
    turn: {
      width: "hypot(56.8648cqw, 52.1967cqh)",
      height: "hypot(-43.1352cqw, 47.8033cqh)",
      rotate: 42.31,
    },
    bleed: [-1.34, -1.12, -1.34, -1.12],
    delay: 2.15,
  },
  {
    file: "doodle-heart-small.svg",
    inset: [45.59, 89.6, 49.18, 5.91],
    turn: {
      width: "hypot(85.1037cqw, -20.1252cqh)",
      height: "hypot(14.8963cqw, 79.8748cqh)",
      rotate: -11.86,
    },
    bleed: [-1.34, -1.12, -1.34, -1.12],
    delay: 2.75,
  },
];

const percent = ([top, right, bottom, left]: readonly number[]) => ({
  top: `${top}%`,
  right: `${right}%`,
  bottom: `${bottom}%`,
  left: `${left}%`,
});

/**
 * A crayon doodle (Figma 4506:84177 and siblings), placed and turned
 * exactly as in the file.
 *
 * Figma splits each into a static turn (inner) and an animated one (outer):
 * the outer box wiggles -3° then +3°, 0.8s each, twice a loop, from its own
 * start time. Reduced motion holds it still.
 */
export function HeroDoodle({ file, inset, turn, bleed, delay }: Doodle) {
  const art = (
    <span className="absolute" style={percent(bleed ?? [0, 0, 0, 0])}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Figma's doodle SVG */}
      <img
        src={`/home/hero/${file}`}
        alt=""
        className="block size-full max-w-none"
      />
    </span>
  );

  return (
    <span
      aria-hidden
      className="absolute flex animate-doodle-wiggle items-center justify-center motion-reduce:animate-none"
      style={
        {
          ...percent(inset),
          containerType: turn ? "size" : undefined,
          animationDelay: `${delay}s`,
        } as CSSProperties
      }
    >
      {turn ? (
        <span
          className={cn("relative flex-none", turn.mirror && "-scale-x-100")}
          style={{
            width: turn.width,
            height: turn.height,
            rotate: `${turn.rotate}deg`,
          }}
        >
          {art}
        </span>
      ) : (
        art
      )}
    </span>
  );
}
