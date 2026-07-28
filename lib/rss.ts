import { listIssues, issueTopPick, type Issue } from "@/lib/issues";
import { SITE_NAME, SITE_TAGLINE, absoluteUrl, getSiteUrl } from "@/lib/site";
import { total } from "@/lib/data";

/** 转义 XML 特殊字符 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** 将 YYYY-MM-DD 转为 RFC 822 发布时间 */
function toRfc822(date: string): string {
  return new Date(`${date}T12:00:00.000Z`).toUTCString();
}

/** 生成单期日报的摘要正文 */
function issueDescription(issue: Issue): string {
  const pick = issueTopPick(issue);
  const lines = [
    `第 ${issue.no.toString().padStart(2, "0")} 期 · ${issue.date}`,
    `今日信号 ${issue.entries.length} 条，机会库累计 ${issue.trackedSoFar} 个。`,
  ];

  if (pick) {
    lines.push(
      `头条：${pick.o.title}（${pick.status === "new" ? "首次发现" : "热度骤增"} · ${total(pick.o.score)}/25）`,
      pick.o.problem,
    );
  } else {
    lines.push("今日无新信号，已自动去重合并进机会库。");
  }

  if (issue.entries.length > 1) {
    lines.push("其余信号：");
    for (const entry of issue.entries.slice(1)) {
      lines.push(`· ${entry.o.title}`);
    }
  }

  return lines.join("\n");
}

/** 构建全站 RSS 2.0 文档（最新日报在前） */
export function buildRssFeed(): string {
  const siteUrl = getSiteUrl();
  const issues = [...listIssues()].reverse();
  const latest = issues[0];
  const lastBuild = latest ? toRfc822(latest.date) : new Date().toUTCString();

  const items = issues
    .map((issue) => {
      const pick = issueTopPick(issue);
      const title = pick
        ? `第 ${issue.no.toString().padStart(2, "0")} 期：${pick.o.title}`
        : `第 ${issue.no.toString().padStart(2, "0")} 期：今日无新信号`;
      const link = absoluteUrl(`/issues/${issue.date}`);
      const description = issueDescription(issue);

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${toRfc822(issue.date)}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} · Reddit 产品机会日报`)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(SITE_TAGLINE)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
