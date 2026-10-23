import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChamferProps = {
  tone: "face" | "edge";
  /** Where the layer sits in its parent, Figma px from each side. */
  inset: { top: number; right: number; bottom: number; left: number };
  /**
   * The fraction of a pixel Figma's slices stop short of the right and
   * bottom edges (0.12 or 0.36 in the file), reproduced so every edge lands
   * where it does there.
   */
  trim: number;
  className?: string;
  children?: ReactNode;
};

/** Side of each chamfer triangle (Figma "corner/*", 8.879px). */
const CORNER = 8.879;

const fills = { face: "bg-footer-face", edge: "bg-footer-edge" } as const;

const corners = [
  { name: "tl", place: () => ({ left: 0, top: 0 }) },
  { name: "tr", place: (t: number) => ({ right: t, top: 0 }) },
  { name: "br", place: (t: number) => ({ right: t, bottom: t }) },
  { name: "bl", place: (t: number) => ({ left: 0, bottom: t }) },
] as const;

/**
 * A rectangle with 45° cut corners, built the way the Figma component is
 * ("chrome/*" in 4506:83427): a horizontal and a vertical slice crossing,
 * and the file's own corner triangles filling the four notches.
 */
export function Chamfer({
  tone,
  inset,
  trim,
  className,
  children,
}: ChamferProps) {
  const slice = (style: CSSProperties) => (
    <span className={cn("absolute", fills[tone])} style={style} />
  );

  return (
    <span
      className={cn("absolute", className)}
      style={{
        top: inset.top,
        right: inset.right,
        bottom: inset.bottom,
        left: inset.left,
      }}
    >
      {slice({ top: CORNER, right: trim, bottom: CORNER + trim, left: 0 })}
      {slice({ top: 0, right: CORNER + trim, bottom: trim, left: CORNER })}
      {corners.map((corner) => (
        // eslint-disable-next-line @next/next/no-img-element -- 9px SVG corner pieces
        <img
          key={corner.name}
          src={`/ui/chamfer/${tone}-${corner.name}.svg`}
          alt=""
          width={9}
          height={9}
          className="absolute"
          // The attributes only take whole pixels; the style sets the size.
          style={{ ...corner.place(trim), width: CORNER, height: CORNER }}
        />
      ))}
      {children}
    </span>
  );
}
