import type { MetadataRoute } from "next";
import { listIssues } from "@/lib/issues";
import { getSiteUrl } from "@/lib/site";

/** 生成 sitemap：首页、机会库、各期日报 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const issues = listIssues();
  const latest = issues[issues.length - 1];
  const latestDate = latest ? new Date(latest.date) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/library`,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const issueRoutes: MetadataRoute.Sitemap = issues.map((issue) => ({
    url: `${siteUrl}/issues/${issue.date}`,
    lastModified: new Date(issue.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...issueRoutes];
}
