import type { ExperienceItem } from "@/content/types";

/** "2022 — 2024" for past roles, "2024 — Present" for the current one. */
export function formatDateRange({ start, end }: ExperienceItem): string {
  return `${start} — ${end ?? "Present"}`;
}
