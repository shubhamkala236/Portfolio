import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Your Name",
  role: "Full-stack Developer",
  url: "https://example.com",
  description:
    "Portfolio of Your Name — a full-stack developer building fast, accessible web products.",
  email: "hello@example.com",
  location: "Kuala Lumpur, Malaysia",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/yourhandle" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
    { label: "Email", href: "mailto:hello@example.com" },
  ],
} satisfies SiteConfig;
