import Image from "next/image";
import Link from "next/link";

import { TagList } from "@/components/ui/tag";
import type { Project } from "@/content/types";

type ProjectCardProps = {
  project: Project;
  /** The first card on a page can carry the LCP image. */
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-current">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-bg-subtle">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-subtle">
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
          <p className="mt-2 leading-relaxed text-pretty text-muted">
            {project.summary}
          </p>
          <TagList items={project.stack} className="mt-5" />
        </div>
      </Link>
    </article>
  );
}
