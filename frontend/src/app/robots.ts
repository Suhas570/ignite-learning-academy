import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ignitelearningacademy.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_not-found"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
