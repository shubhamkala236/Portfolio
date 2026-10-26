import { cn } from "@/lib/cn";

/** The glyph's four dots, Figma px in its 24px box (e.g. 4506:82932–82953). */
const DOTS = [
  { x: 0, y: 19.2 },
  { x: 4.8, y: 14.4 },
  { x: 9.6, y: 9.6 },
  { x: 14.4, y: 4.8 },
] as const;
const DOT_SIZE = 4.8;
export const ARROW_GLYPH = 24;
/** Figma staggers each part of the pulse by 140ms. */
const STEP_MS = 140;

type DottedArrowProps = {
  /**
   * "hover": pulse tail to head every 2s while an ancestor `group/play` is
   * hovered or keyboard-focused (the home Connect rows, the case-study
   * pager). Off by default.
   */
  pulse?: false | "hover";
  /**
   * Its size comes from `--arrow-size` (24px if unset), so a class can set
   * it per breakpoint (`connect-arrow`); the dots and head scale with it.
   */
  className?: string;
};

const pulses = {
  hover:
    "motion-safe:group-hover/play:animate-arrow-dot-quick motion-safe:group-focus-visible/play:animate-arrow-dot-quick",
} as const;

/**
 * The portfolio's pixel arrow ↗: four dots running into a corner-shaped
 * head, on a 24px grid (drawn at any size). Its parts can pulse in turn,
 * 140ms apart; reduced motion drops the pulse. Decorative — the link it sits
 * in carries the name.
 */
export function DottedArrow({ pulse = false, className }: DottedArrowProps) {
  const motion = pulse && pulses[pulse];
  /** A length on the 24px grid, at the arrow's size. */
  const at = (px: number) =>
    `calc(var(--arrow-size, ${ARROW_GLYPH}px) * ${px / ARROW_GLYPH})`;

  return (
    <span
      aria-hidden
      className={cn("relative block shrink-0", className)}
      style={{ width: at(ARROW_GLYPH), height: at(ARROW_GLYPH) }}
    >
      {DOTS.map((dot, index) => (
        <span
          key={index}
          className={cn("absolute bg-fg-strong", motion)}
          style={{
            left: at(dot.x),
            top: at(dot.y),
            width: at(DOT_SIZE),
            height: at(DOT_SIZE),
            animationDelay: pulse ? `${index * STEP_MS}ms` : undefined,
          }}
        />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element -- a 24px SVG glyph */}
      <img
        src="/ui/arrow-head.svg"
        alt=""
        width={ARROW_GLYPH}
        height={ARROW_GLYPH}
        className={cn("absolute inset-0 size-full", motion)}
        style={{
          animationDelay: pulse ? `${DOTS.length * STEP_MS}ms` : undefined,
        }}
      />
    </span>
  );
}
