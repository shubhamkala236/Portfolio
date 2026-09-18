import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/projects/commerce-platform". */
  path?: string;
};

/**
 * Builds page metadata from the site config so titles, canonical URLs and
 * social cards stay consistent across every route.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} · ${siteConfig.role}`;
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}
