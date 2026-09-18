import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

/**
 * The small muted label above almost every section in the design:
 * 16px, uppercase, 0.06em tracking.
 *
 * Exported as a class string too, for the places where the label has to be a
 * specific element (a <dt>, say) rather than a paragraph.
 */
export const eyebrowStyles = "text-label text-muted uppercase";

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return <p className={cn(eyebrowStyles, className)} {...props} />;
}
