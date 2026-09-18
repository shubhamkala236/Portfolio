import type { ExperienceItem, SkillGroup } from "./types";

export const experience = [
  {
    company: "Acme Corp",
    role: "Senior Frontend Engineer",
    start: "2024",
    summary: "Own the customer-facing web app and its design system.",
    highlights: [
      "Cut largest-contentful-paint from 4.1s to 1.3s across the funnel.",
      "Introduced a typed content layer that removed a class of runtime bugs.",
    ],
  },
  {
    company: "Studio Beta",
    role: "Frontend Developer",
    start: "2022",
    end: "2024",
    summary: "Built marketing sites and internal tools for agency clients.",
    highlights: [
      "Shipped 12 client projects with a shared component foundation.",
      "Set up the CI pipeline the team still uses today.",
    ],
  },
] satisfies readonly ExperienceItem[];

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "Python"],
  },
  {
    title: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "Tooling",
    items: ["Git", "Docker", "Vercel", "Figma", "Playwright"],
  },
] satisfies readonly SkillGroup[];
