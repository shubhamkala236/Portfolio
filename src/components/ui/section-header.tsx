import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

/**
 * The eyebrow / display title / supporting paragraph stack that opens most
 * sections of a case study.
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
      {title && (
        <h2 className="font-display text-statement text-balance text-fg">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-pretty text-fg-strong">{description}</p>
      )}
    </header>
  );
}
