import type { MetadataRoute } from "next";
import { opportunities, lastSeen } from "@/lib/data";
import { listIssues } from "@/lib/issues";
import { getSiteUrl, opportunityPath } from "@/lib/site";

/** 生成 sitemap：首页、机会库、关于、RSS、日报与全部机会详情 */
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
    {
      url: `${siteUrl}/about`,
      lastModified: latestDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/feed.xml`,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  const issueRoutes: MetadataRoute.Sitemap = issues.map((issue) => ({
    url: `${siteUrl}/issues/${issue.date}`,
    lastModified: new Date(issue.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const opportunityRoutes: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${siteUrl}${opportunityPath(o.id)}`,
    lastModified: new Date(lastSeen(o)),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...issueRoutes, ...opportunityRoutes];
}
