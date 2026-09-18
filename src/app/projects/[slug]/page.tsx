import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { TagList } from "@/components/ui/tag";
import { getProjectBySlug, getProjectSlugs } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

/** Every project is known at build time, so all detail pages are static. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return buildMetadata({ title: "Project not found" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = Object.entries(project.links).filter(([, href]) =>
    Boolean(href),
  );

  return (
    <article className="py-section">
      <Container className="max-w-3xl">
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          &larr; All projects
        </Link>

        <h1 className="mt-8 text-headline font-semibold text-balance">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">
          {project.summary}
        </p>

        <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs tracking-widest text-subtle uppercase">
              Year
            </dt>
            <dd className="mt-2 text-sm">{project.year}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-subtle uppercase">
              Role
            </dt>
            <dd className="mt-2 text-sm">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-subtle uppercase">
              Stack
            </dt>
            <dd className="mt-2">
              <TagList items={project.stack} />
            </dd>
          </div>
        </dl>

        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          priority
          sizes="(min-width: 768px) 48rem, 100vw"
          className="mt-10 w-full rounded-card bg-bg-subtle"
        />

        <div className="mt-10 space-y-6">
          {project.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        {links.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-6">
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-accent underline underline-offset-4"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </article>
  );
}
