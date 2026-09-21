import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type TabBarBlockProps = Extract<CaseStudyBlock, { type: "tab-bar" }>;

/**
 * A still of the app's own tab bar (Figma 4127:17571), naming the sections the
 * walkthrough below steps through.
 *
 * It is a picture of an interface rather than site navigation, so it renders
 * as a plain list: nothing here is clickable or focusable.
 *
 * Tabs sit flush against each other, as in the file. The active tab's outline
 * is an inset ring rather than a border because Figma's stroke is *inside*:
 * it must not add to the tab's size.
 */
export function TabBarBlock({ items, activeIndex = 0 }: TabBarBlockProps) {
  return (
    // Padding only while it scrolls, so the scroller doesn't clip the shadow.
    <div className="-mx-6 overflow-x-auto px-6 py-2 lg:mx-0 lg:overflow-visible lg:p-0">
      <ul className="mx-auto flex w-max items-center rounded-round bg-surface p-2 drop-shadow-tab-bar">
        {items.map((item, index) => (
          <li
            key={item}
            className={cn(
              "flex min-w-18 justify-center rounded-round px-4 pt-1.5 pb-2 text-tab font-medium whitespace-nowrap",
              index === activeIndex
                ? "bg-surface-raised text-fg inset-ring inset-ring-border-strong drop-shadow-tab-active"
                : "text-subtle drop-shadow-tab",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
