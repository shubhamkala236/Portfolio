import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type SectionProps = {
  /** Anchor target for the nav links. */
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Shared section shell: vertical rhythm, heading block and landmark semantics.
 * Sections never set their own page padding — that belongs to Container.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-24 py-section", className)}
    >
      <Container>
        {(eyebrow || title || description) && (
          <header className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && (
              <p className="mb-3 font-mono text-sm tracking-widest text-subtle uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className="text-headline font-semibold text-balance"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
