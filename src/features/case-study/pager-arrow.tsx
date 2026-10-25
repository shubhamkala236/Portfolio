import Link from "next/link";

import { DottedArrow } from "@/components/ui/dotted-arrow";
import { cn } from "@/lib/cn";

type PagerArrowProps = {
  href: string;
  label: string;
  direction: "previous" | "next";
  /** Back to the home page, where the visitor left it (PageTransition). */
  returnHome?: boolean;
};

/** The rotated glyph's bounding box (4506:82925). */
const GLYPH_BOX = 33.941;

/**
 * A round arrow link to a neighbouring case study (Figma 4506:82922 and
 * 4506:82966): a dark 112px circle holding the dotted arrow turned 45°, so
 * it points along the row; the previous arrow is the same glyph mirrored.
 *
 * At rest both arrows are the file's previous arrow — #1f1f1f, still. Hovered
 * or keyboard-focused, the circle takes the next arrow's lighter #292929
 * and the arrow pulses tail to head every 2s, as the file animates it.
 */
export function PagerArrow({
  href,
  label,
  direction,
  returnHome = false,
}: PagerArrowProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      // The curtain page transition (PageTransition).
      data-page-transition="curtain"
      data-page-transition-home={returnHome || undefined}
      className="group/play flex size-28 shrink-0 items-center justify-center rounded-full bg-surface transition-colors duration-200 hover:bg-surface-lifted focus-visible:bg-surface-lifted"
    >
      <span
        aria-hidden
        className={cn(
          "flex items-center justify-center",
          direction === "previous" && "-scale-x-100",
        )}
        style={{ width: GLYPH_BOX, height: GLYPH_BOX }}
      >
        <DottedArrow pulse="hover" className="rotate-45" />
      </span>
    </Link>
  );
}
