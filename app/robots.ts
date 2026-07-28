import type { MetadataRoute } from "next";
import { SITE_HOST, getSiteUrl } from "@/lib/site";

/** robots.txt：允许抓取并声明 sitemap / host */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: SITE_HOST,
  };
}
