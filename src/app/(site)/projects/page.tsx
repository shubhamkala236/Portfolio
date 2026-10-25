import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { projectsByRecency } from "@/content/projects";
import { ProjectCard } from "@/features/projects/project-card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Everything I have shipped, newest first.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Archive"
      title="All projects"
      description="Everything I have shipped, newest first."
    >
      <div data-reveal-group className="grid gap-6 md:grid-cols-2">
        {projectsByRecency.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>
    </Section>
  );
}
