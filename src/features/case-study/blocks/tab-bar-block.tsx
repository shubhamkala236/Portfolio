import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type TabBarBlockProps = Extract<CaseStudyBlock, { type: "tab-bar" }>;

/**
 * A still of the app's own tab bar, naming the sections the walkthrough below
 * steps through.
 *
 * It is a picture of an interface rather than site navigation, so it renders
 * as a plain list: nothing here is clickable or focusable.
 */
export function TabBarBlock({ items, activeIndex = 0 }: TabBarBlockProps) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:overflow-visible lg:px-0">
      <ul className="mx-auto flex w-max items-center gap-1 rounded-round bg-surface p-2 shadow-[0_0_5px_rgba(0,0,0,0.2)]">
        {items.map((item, index) => (
          <li
            key={item}
            className={cn(
              "rounded-round px-4 pt-1.5 pb-2 text-xl font-medium whitespace-nowrap",
              index === activeIndex
                ? "border border-border-strong bg-surface-raised text-fg"
                : "text-subtle",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
