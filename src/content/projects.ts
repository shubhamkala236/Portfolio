import type { Project } from "./types";

export const projects = [
  {
    slug: "commerce-platform",
    title: "Commerce Platform",
    summary:
      "A headless storefront serving 40k monthly shoppers, rebuilt for speed.",
    body: [
      "Replace this with the problem the project solved and who it was for.",
      "Then describe your approach and the specific decisions you made.",
      "Close with the outcome — numbers if you have them, honest scope if you don't.",
    ],
    year: 2025,
    role: "Lead Frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    featured: true,
    links: {
      live: "https://example.com",
      repo: "https://github.com/yourhandle/commerce-platform",
    },
    cover: {
      src: "/projects/placeholder.svg",
      alt: "Commerce Platform product listing page",
      width: 1200,
      height: 800,
    },
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    summary:
      "Real-time reporting for a logistics team, from raw events to decisions.",
    body: [
      "Replace this with the problem the project solved and who it was for.",
      "Then describe your approach and the specific decisions you made.",
    ],
    year: 2024,
    role: "Full-stack",
    stack: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    featured: true,
    links: { repo: "https://github.com/yourhandle/analytics-dashboard" },
    cover: {
      src: "/projects/placeholder.svg",
      alt: "Analytics dashboard overview screen",
      width: 1200,
      height: 800,
    },
  },
  {
    slug: "design-system",
    title: "Design System",
    summary:
      "A shared component library that cut new-page build time roughly in half.",
    body: [
      "Replace this with the problem the project solved and who it was for.",
    ],
    year: 2024,
    role: "Frontend",
    stack: ["TypeScript", "Storybook", "Tailwind CSS"],
    featured: false,
    links: { live: "https://example.com" },
    cover: {
      src: "/projects/placeholder.svg",
      alt: "Component library documentation site",
      width: 1200,
      height: 800,
    },
  },
] satisfies readonly Project[];

/** Newest first — the order the site displays everywhere. */
export const projectsByRecency = [...projects].sort((a, b) => b.year - a.year);

export const featuredProjects = projectsByRecency.filter(
  (project) => project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
