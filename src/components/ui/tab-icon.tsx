import type { TabIconName } from "@/content/types";
import { cn } from "@/lib/cn";

/** Icons drawn here: their strokes on a 24px grid, and the stroke weight. */
const PATHS: Partial<
  Record<TabIconName, { d: readonly string[]; weight: number }>
> = {
  // A house with a door.
  home: { d: ["M3.5 10.5 12 3.5l8.5 7V20.5h-5.5v-6h-6v6H3.5z"], weight: 1.75 },
  // Three stacked layers.
  work: {
    d: [
      "M12 3.5 3 8.25 12 13l9-4.75z",
      "M3 12.5 12 17.25l9-4.75",
      "M3 16.75 12 21.5l9-4.75",
    ],
    weight: 1.75,
  },
  // A person.
  about: {
    d: [
      "M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5z",
      "M4.5 20.5a7.5 7.5 0 0 1 15 0",
    ],
    weight: 1.75,
  },
  // A speech bubble.
  connect: {
    d: [
      "M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9.5L5 20v-3.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z",
    ],
    weight: 1.75,
  },
  // A page with a folded corner and two lines.
  resume: {
    d: ["M6 3h8.5L19 7.5V21H6z", "M14 3v5h5", "M9 13h7M9 16.5h7"],
    weight: 1.75,
  },
  // ELEMENTS: sparkles for Aura, the AI stylist (in the app icons' 1.5).
  aura: {
    d: [
      "M10 4l1.6 4.4L16 10l-4.4 1.6L10 16l-1.6-4.4L4 10l4.4-1.6z",
      "M18 14.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z",
    ],
    weight: 1.5,
  },
  // ELEMENTS: two cards, one swiped over the other, for Flip.
  flip: {
    d: [
      "M7 8h9a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 16 21H7a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 7 8z",
      "M9 5h9.5A1.5 1.5 0 0 1 20 6.5V17",
    ],
    weight: 1.5,
  },
};

/** The ELEMENTS app's own nav icons, from its Figma nav bar (1:1546). */
const FILES: Partial<Record<TabIconName, string>> = {
  "app-home": "/case-studies/elements/nav/home.svg",
  "app-shopping": "/case-studies/elements/nav/shopping.svg",
  "app-wardrobe": "/case-studies/elements/nav/wardrobe.svg",
  "app-profile": "/case-studies/elements/nav/profile.svg",
};

/**
 * A line icon for a tab, drawn in the tab's own text colour (so it greys
 * and lights up with it). The app's own icons are Figma's files, used as a
 * mask over the text colour, so they take it too. Decorative: the tab's
 * label names it.
 */
export function TabIcon({
  name,
  className,
}: {
  name: TabIconName;
  className?: string;
}) {
  const file = FILES[name];
  if (file) {
    return (
      <span
        aria-hidden
        className={cn("shrink-0 bg-current", className)}
        style={{
          maskImage: `url(${file})`,
          WebkitMaskImage: `url(${file})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    );
  }

  const icon = PATHS[name];
  if (!icon) return null;
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={icon.weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {icon.d.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
