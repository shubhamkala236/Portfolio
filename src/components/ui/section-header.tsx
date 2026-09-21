import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
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
}: SectionHeaderProps) {
  if (!eyebrow && !title && !description) return null;

  return (
    <header className="flex flex-col gap-4">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {(title || description) && (
        <div className="flex flex-col gap-3">
          {title && (
            <h2 className="font-display text-section-title text-fg">{title}</h2>
          )}
          {/* No text-balance/pretty: plain wrapping at the Figma width is
              what reproduces the file's line breaks. */}
          {description && <p className="text-fg-strong">{description}</p>}
        </div>
      )}
    </header>
  );
}
