import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type TagProps = ComponentPropsWithoutRef<"span">;

/** Small pill used for tech stack and metadata. */
export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "rounded-round border border-border px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
      {...props}
    />
  );
}

type TagListProps = {
  items: readonly string[];
  className?: string;
};

export function TagList({ items, className }: TagListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
