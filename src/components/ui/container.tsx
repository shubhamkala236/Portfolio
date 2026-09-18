import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * The one place the page gutter and max width are defined. Match the content
 * width from the Figma frames here rather than per section.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}
      {...props}
    />
  );
}
