import { Fragment } from "react";

import { cn } from "@/lib/cn";

type DotListProps = {
  items: readonly string[];
  /** Gap between items in px, with the "•" centred in it. */
  gap: number;
  className?: string;
};

/**
 * Items in a row separated by "•" — Figma's bullet-list construction, where
 * each separator is an empty list item whose marker sits in a fixed gap.
 * Chrome's own disc marker is a larger geometric dot than Figma draws, so the
 * font's "•" glyph is set directly, centred in the same gap.
 */
export function DotList({ items, gap, className }: DotListProps) {
  return (
    <ul className={cn("flex flex-wrap items-center", className)}>
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <li aria-hidden className="text-center" style={{ width: gap }}>
              •
            </li>
          )}
          <li>{item}</li>
        </Fragment>
      ))}
    </ul>
  );
}
