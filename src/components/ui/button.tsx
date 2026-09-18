import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  secondary: "border border-border bg-surface text-fg hover:bg-surface-hover",
  ghost: "text-muted hover:bg-surface-hover hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** Shared styles so buttons and links stay visually identical. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & StyleProps;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props} />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & StyleProps;

/** Use for anything that navigates — internal routes or external URLs. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}
