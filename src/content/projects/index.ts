import type { Project } from "@/content/types";

import { elements } from "./elements";

/** Add a case study by writing its file and listing it here. */
export const projects = [elements] satisfies readonly Project[];

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
