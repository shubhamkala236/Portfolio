import type { NotFoundContent } from "@/content/types";

/** The 404 page, for unknown URLs and unknown case studies alike. */
export const notFound = {
  title: "PAGE NOT FOUND.",
  text: "That link does not point anywhere on this site.",
  action: { label: "Back home", href: "/" },
} satisfies NotFoundContent;
