import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * The one place the page gutter and content width are defined.
 * Figma: 1258px content inside a 1512px frame.
 *
 * `box-content` makes the max width apply to the content alone, so the gutter
 * padding sits outside the 1258px rather than eating into it.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto box-content max-w-page px-6 md:px-8", className)}
      {...props}
    />
  );
}
