import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

type ShareImage = { url: string; width: number; height: number; alt: string };

type BuildMetadataInput = {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/projects/commerce-platform". */
  path?: string;
  /**
   * The link preview's image. Without one, the site's own card
   * (`app/opengraph-image.png`) — set here too, since a page that sets its
   * own social tags would otherwise drop the inherited image.
   */
  image?: ShareImage;
};

/** The site's share card (app/opengraph-image.png and its .alt.txt). */
const SITE_IMAGE: ShareImage = {
  url: "/opengraph-image.png",
  // The home hero without its tab bar, at 2× the 1200 × 630 card size.
  width: 2400,
  height: 1260,
  alt: "Kriti Kumari Singh — Product designer with an artist’s eye: inked eyes and crayon doodles on a red dotted field",
};

/**
 * Builds page metadata from the site config so titles, canonical URLs and
 * social cards stay consistent across every route.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = SITE_IMAGE,
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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}
