import type { Project } from "@/content/types";

import { elements } from "./elements";
import { hotstuff } from "./hotstuff";
import { missBliss } from "./miss-bliss";
import { sistemExpense } from "./sistem-expense";

/** Add a case study by writing its file and listing it here. */
export const projects = [
  elements,
  sistemExpense,
  hotstuff,
  missBliss,
] satisfies readonly Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
