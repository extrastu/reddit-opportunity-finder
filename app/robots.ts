import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** 允许全站抓取，并指向 sitemap */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
