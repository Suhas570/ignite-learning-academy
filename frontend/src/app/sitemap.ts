import type { MetadataRoute } from "next";
import { getAllCourseSlugs } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ignitelearningacademy.com";

  // Production release / content audit baseline date (avoids misleading current-time stamps)
  const lastModDate = new Date("2026-10-27T00:00:00.000Z");

  // Core canonical static routes that return HTTP 200 OK.
  // Note: /contact redirects to /#enquire via next.config.ts and is excluded to prevent GSC redirect errors.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic public course detail pages (9 courses)
  const courseRoutes: MetadataRoute.Sitemap = getAllCourseSlugs().map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: lastModDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...courseRoutes];
}
