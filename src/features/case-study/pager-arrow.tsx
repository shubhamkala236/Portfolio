import Link from "next/link";

import { DottedArrow } from "@/components/ui/dotted-arrow";
import { cn } from "@/lib/cn";

type PagerArrowProps = {
  href: string;
  label: string;
  direction: "previous" | "next";
};

/** The rotated glyph's bounding box (4506:82925). */
const GLYPH_BOX = 33.941;

/**
 * A round arrow link to a neighbouring case study (Figma 4506:82922 and
 * 4506:82966): a dark 112px circle holding the dotted arrow turned 45°, so
 * it points along the row. It pulses tail to head every 12s, as in the
 * file; the previous arrow is the same glyph mirrored.
 */
export function PagerArrow({ href, label, direction }: PagerArrowProps) {
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
        <DottedArrow pulse className="rotate-45" />
      </span>
    </Link>
  );
}
