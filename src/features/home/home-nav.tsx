import Link from "next/link";

import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";

type HomeNavProps = HomeContent["nav"];

/**
 * The pill navigation over the hero (Figma 4506:84854): the case studies'
 * tab bar style, 12px between tabs, the current page raised. It keeps its
 * real size at every width and scrolls sideways if it doesn't fit.
 */
export function HomeNav({ label, items, current }: HomeNavProps) {
  return (
    <nav aria-label={label} className="max-w-full overflow-x-auto px-6 py-2">
      <ul className="flex w-max items-center gap-3 rounded-round bg-surface p-2 drop-shadow-tab-bar">
        {items.map((item) => {
          const active = item.label === current;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-w-18 justify-center rounded-round px-4 pt-1.5 pb-2 text-tab font-medium whitespace-nowrap",
                  active
                    ? "bg-surface-raised text-fg inset-ring inset-ring-border-strong drop-shadow-tab-active"
                    : "text-subtle drop-shadow-tab",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
