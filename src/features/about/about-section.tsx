import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { skillGroups } from "@/content/experience";

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A little background"
      description="Replace this with two or three sentences on what you do, who you do it for, and what you're looking for next."
    >
      <dl className="grid gap-8 sm:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <dt className="mb-4 text-sm font-semibold">{group.title}</dt>
            <dd>
              <TagList items={group.items} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
