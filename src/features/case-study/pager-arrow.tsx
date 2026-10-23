import Link from "next/link";

import { cn } from "@/lib/cn";

type PagerArrowProps = {
  href: string;
  label: string;
  direction: "previous" | "next";
};

/** The glyph's four dots, Figma px in its 24px box (4506:82932–82953). */
const DOTS = [
  { x: 0, y: 19.2 },
  { x: 4.8, y: 14.4 },
  { x: 9.6, y: 9.6 },
  { x: 14.4, y: 4.8 },
] as const;
const DOT_SIZE = 4.8;
const GLYPH = 24;
/** The rotated glyph's bounding box (4506:82925). */
const GLYPH_BOX = 33.941;
/** Figma staggers each part of the arrow's pulse by 140ms. */
const STEP_MS = 140;

/**
 * A round arrow link to a neighbouring case study (Figma 4506:82922 and
 * 4506:82966): a dark 112px circle holding a dotted arrow — four dots and a
 * corner-shaped head, drawn on a 24px grid and turned 45°.
 *
 * The parts pulse tail to head once every 12s (`animate-arrow-dot`, delays
 * 140ms apart), as in the file's motion. The previous arrow is the same
 * glyph mirrored, so its pulse also runs towards its head. Reduced motion
 * drops the pulse.
 */
export function PagerArrow({ href, label, direction }: PagerArrowProps) {
  const pulse = "animate-arrow-dot motion-reduce:animate-none";

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex size-28 shrink-0 items-center justify-center rounded-full bg-surface"
    >
      <span
        aria-hidden
        className={cn(
          "flex items-center justify-center",
          direction === "previous" && "-scale-x-100",
        )}
        style={{ width: GLYPH_BOX, height: GLYPH_BOX }}
      >
        <span
          className="relative rotate-45"
          style={{ width: GLYPH, height: GLYPH }}
        >
          {DOTS.map((dot, index) => (
            <span
              key={index}
              className={cn("absolute bg-fg-strong", pulse)}
              style={{
                left: dot.x,
                top: dot.y,
                width: DOT_SIZE,
                height: DOT_SIZE,
                animationDelay: `${index * STEP_MS}ms`,
              }}
            />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element -- a 24px SVG glyph */}
          <img
            src="/ui/arrow-head.svg"
            alt=""
            width={GLYPH}
            height={GLYPH}
            className={cn("absolute inset-0", pulse)}
            style={{ animationDelay: `${DOTS.length * STEP_MS}ms` }}
          />
        </span>
      </span>
    </Link>
  );
}
