import type { MetadataRoute } from "next";
import { listIssues } from "@/lib/issues";
import { getSiteUrl } from "@/lib/site";

/** 生成静态站点 sitemap：首页、机会库、各期日报 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/library`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 按期次日期生成动态路由条目
  const issueRoutes: MetadataRoute.Sitemap = listIssues().map((issue) => ({
    url: `${siteUrl}/issues/${issue.date}`,
    lastModified: new Date(issue.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...issueRoutes];
}
