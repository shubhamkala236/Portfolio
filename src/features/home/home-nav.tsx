import type { CSSProperties } from "react";
import Link from "next/link";

import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";

type HomeNavProps = HomeContent["nav"];

/**
 * The home page's pill tab bar (Figma 4506:84854): 12px between tabs, the
 * current page raised, drawn as liquid glass in the file's own colours.
 *
 * It sticks to the top of the page while it scrolls. The bar is a
 * zero-height sticky strip at the top of the page, so it takes no room:
 * from md up its pill hangs at Figma's 45px over the hero, below md over
 * the hero's red band. Only the pill takes clicks. It keeps its real size at
 * every width and scrolls sideways if it doesn't fit.
 */
export function HomeNav({ label, items, current }: HomeNavProps) {
  return (
    <div className="pointer-events-none sticky top-0 z-10 h-0 @container">
      <div
        className="flex justify-center md:home-nav-drop"
        style={{ "--u": "calc(100cqw / 1512)" } as CSSProperties}
      >
        <nav
          aria-label={label}
          className="pointer-events-auto max-w-full overflow-x-auto px-6 py-2"
        >
          <ul className="flex w-max items-center gap-3 rounded-round bg-glass p-2 shadow-glass backdrop-blur-xl backdrop-saturate-150">
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
                        ? "bg-glass-raised text-fg inset-ring inset-ring-border-strong drop-shadow-tab-active"
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
      </div>
    </div>
  );
}
