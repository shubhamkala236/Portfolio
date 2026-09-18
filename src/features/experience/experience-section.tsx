import { Section } from "@/components/ui/section";
import { experience } from "@/content/experience";
import { formatDateRange } from "@/lib/format";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      className="bg-bg-subtle"
    >
      <ol className="divide-y divide-border border-t border-border">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.start}`}
            className="grid gap-4 py-8 md:grid-cols-[12rem_1fr] md:gap-10"
          >
            <p className="font-mono text-sm text-subtle">
              {formatDateRange(item)}
            </p>

            <div>
              <h3 className="text-lg font-semibold">
                {item.role}
                <span className="font-normal text-muted">
                  {" "}
                  · {item.company}
                </span>
              </h3>
              <p className="mt-2 leading-relaxed text-pretty text-muted">
                {item.summary}
              </p>
              <ul className="mt-4 space-y-2 text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="text-subtle">
                      —
                    </span>
                    <span className="text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
