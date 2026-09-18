import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { Project } from "@/content/types";
import { ProjectCard } from "@/features/projects/project-card";

type ProjectsSectionProps = {
  projects: readonly Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Things I've built"
      description="A few projects that show how I think about problems, not just what I can wire together."
      className="bg-surface-sunken"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="mt-12">
        <ButtonLink href="/projects" variant="secondary">
          View all projects
        </ButtonLink>
      </div>
    </Section>
  );
}
