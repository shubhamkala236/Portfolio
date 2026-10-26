import type { TabIconName } from "@/content/types";
import { cn } from "@/lib/cn";

/** Each icon's strokes, on a 24px grid. */
const PATHS: Record<TabIconName, readonly string[]> = {
  // A house with a door.
  home: ["M3.5 10.5 12 3.5l8.5 7V20.5h-5.5v-6h-6v6H3.5z"],
  // Three stacked layers.
  work: [
    "M12 3.5 3 8.25 12 13l9-4.75z",
    "M3 12.5 12 17.25l9-4.75",
    "M3 16.75 12 21.5l9-4.75",
  ],
  // A person.
  about: [
    "M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5z",
    "M4.5 20.5a7.5 7.5 0 0 1 15 0",
  ],
  // A speech bubble.
  connect: [
    "M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9.5L5 20v-3.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z",
  ],
  // A page with a folded corner and two lines.
  resume: ["M6 3h8.5L19 7.5V21H6z", "M14 3v5h5", "M9 13h7M9 16.5h7"],
};

/**
 * A line icon for a tab, drawn in the tab's own text colour (so it greys
 * and lights up with it). Decorative: the tab's label names it.
 */
export function TabIcon({
  name,
  className,
}: {
  name: TabIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
