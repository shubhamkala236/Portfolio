import Link from "next/link";

import { Container } from "@/components/ui/container";
import { notFound } from "@/content/not-found";

/**
 * The 404 message, shared by the site-wide and the case-study not-found
 * pages. The site has no header, so it stands alone: centred in the first
 * screen, the title set as the home page's section titles, and the way back
 * as the home tab bar's raised tab. The footer follows below.
 */
export function NotFoundMessage() {
  return (
    <Container
      data-reveal-group
      className="flex min-h-svh flex-col items-center justify-center gap-6 text-center"
    >
      <h1 className="center-tight-tracking font-brand text-home-title text-fg-strong font-opsz-14">
        {notFound.title}
      </h1>
      <p className="text-body text-muted">{notFound.text}</p>
      <Link
        href={notFound.action.href}
        className="mt-4 rounded-round bg-surface-raised px-6 pt-1.5 pb-2 text-tab font-medium text-fg inset-ring inset-ring-border-strong drop-shadow-tab-active transition-colors hover:bg-surface-lifted"
      >
        {notFound.action.label}
      </Link>
    </Container>
  );
}
