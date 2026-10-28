import { Fragment } from "react";

import { cn } from "@/lib/cn";

type DotListProps = {
  items: readonly string[];
  /** Gap between items in px, with the "•" centred in it. */
  gap: number;
  /** On a phone, separate the items with commas instead of "•". */
  phoneCommas?: boolean;
  className?: string;
};

/**
 * Items in a row separated by "•" — Figma's bullet-list construction, where
 * each separator is an empty list item whose marker sits in a fixed gap.
 * Chrome's own disc marker is a larger geometric dot than Figma draws, so the
 * font's "•" glyph is set directly, centred in the same gap.
 */
export function DotList({
  items,
  gap,
  phoneCommas = false,
  className,
}: DotListProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center",
        phoneCommas && "max-md:gap-x-1",
        className,
      )}
    >
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <li
              aria-hidden
              className={cn("text-center", phoneCommas && "max-md:hidden")}
              style={{ width: gap }}
            >
              •
            </li>
          )}
          <li>
            {item}
            {phoneCommas && index < items.length - 1 && (
              <span className="md:hidden">,</span>
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
