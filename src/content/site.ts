import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Kriti Kumari Singh",
  role: "Product Designer",
  url: "https://kritiportfolio.vercel.app",
  description:
    "Portfolio of Kriti Kumari Singh, a product and visual designer with an artist’s eye: trading, fashion and expense-tracking apps, design systems and visual identity.",
  email: "kriti.singh92@gmail.com",
  emailCopied: "Email copied",
  webNotice: "Better experience on Web",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kritikumarisingh/",
    },
    { label: "Behance", href: "https://www.behance.net/kritisingh13" },
    { label: "Email", href: "mailto:kriti.singh92@gmail.com" },
  ],
  // Copy from Figma 4506:83422; links are Kriti's own. The home page's
  // Resume tab and Connect rows read these too (content/home.ts).
  footer: {
    name: "Kriti Kumari Singh",
    tagline: "OPEN TO PRODUCT DESIGN ROLES.",
    links: [
      { label: "RESUME", href: "/kriti-kumari-singh-resume.pdf" },
      { label: "EMAIL", href: "mailto:kriti.singh92@gmail.com" },
      {
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/kritikumarisingh/",
      },
      { label: "BEHANCE", href: "https://www.behance.net/kritisingh13" },
    ],
  },
} satisfies SiteConfig;
