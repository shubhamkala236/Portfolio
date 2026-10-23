import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

export type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Figma varies this per section: white on some, #b9b9b9 on others. */
  descriptionTone?: "strong" | "muted";
  descriptionWeight?: "regular" | "medium";
  /**
   * A fixed height in px, where Figma fixes the header frame — content may
   * then overhang it, and what follows keeps Figma's position.
   */
  height?: number;
};

/**
 * The eyebrow / display title / supporting paragraph stack that opens most
 * sections. Figma sets 16px below the eyebrow and 12px between title and
 * paragraph, so the two are nested rather than evenly spaced.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  descriptionTone = "strong",
  descriptionWeight = "regular",
  height,
}: SectionHeaderProps) {
  if (!eyebrow && !title && !description) return null;

  return (
    <header className="flex w-full flex-col gap-4" style={{ height }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {(title || description) && (
        <div className="flex flex-col gap-3">
          {title && (
            <h2 className="font-display text-section-title text-fg">{title}</h2>
          )}
          {/* No text-balance/pretty: plain wrapping at the Figma width is
              what reproduces the file's line breaks. */}
          {description && (
            <p
              className={cn(
                descriptionTone === "strong" ? "text-fg-strong" : "text-muted",
                descriptionWeight === "medium" && "font-medium",
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
