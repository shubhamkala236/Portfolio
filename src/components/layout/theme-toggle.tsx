"use client";

import { Button } from "@/components/ui/button";

/**
 * Stateless by design: the current theme already lives on <html data-theme>,
 * so the button reads it on click and CSS swaps the label. No state to
 * synchronise, and nothing to mismatch during hydration.
 */
export function ThemeToggle() {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage: the toggle still works for this visit.
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Toggle colour theme"
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </Button>
  );
}
