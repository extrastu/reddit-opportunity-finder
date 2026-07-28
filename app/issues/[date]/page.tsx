import type { Metadata } from "next";
import Nav from "@/components/Nav";
import IssueHeader from "@/components/IssueHeader";
import IssueFeed from "@/components/IssueFeed";
import Recommendation from "@/components/Recommendation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ISSUE_DATES, getIssue, issueTopPick } from "@/lib/issues";
import { absoluteUrl, getSiteUrl, SITE_NAME } from "@/lib/site";
import { notFound } from "next/navigation";

/** 预生成各期日报静态路径 */
export function generateStaticParams() {
  return ISSUE_DATES.map((date) => ({ date }));
}

/** 按期次生成标题、描述与 canonical */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  if (!ISSUE_DATES.includes(date as (typeof ISSUE_DATES)[number])) {
    return { title: "未找到日报" };
  }

  const issue = getIssue(date);
  const pick = issueTopPick(issue);
  const title = `第 ${issue.no.toString().padStart(2, "0")} 期 · ${date}`;
  const description = pick
    ? `${date} 发现 ${issue.entries.length} 个信号。头条：${pick.o.title}`
    : `${date} 今日无新信号；机会库持续去重追踪中。`;
  const path = `/issues/${date}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: `${title} · ${SITE_NAME}`,
      description,
      publishedTime: `${date}T00:00:00.000Z`,
    },
  };
}

/** 单期日报页（Next 15 params 为 Promise） */
export default async function IssuePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  if (!ISSUE_DATES.includes(date as (typeof ISSUE_DATES)[number])) {
    notFound();
  }
  const issue = getIssue(date);
  const pick = issueTopPick(issue);
  const path = `/issues/${date}`;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: pick ? pick.o.title : `线报 ${date}`,
          description: pick
            ? `${date} 发现 ${issue.entries.length} 个信号。头条：${pick.o.title}`
            : `${date} 今日无新信号`,
          datePublished: date,
          dateModified: date,
          mainEntityOfPage: absoluteUrl(path),
          author: { "@type": "Organization", name: SITE_NAME, url: getSiteUrl() },
          publisher: { "@type": "Organization", name: SITE_NAME, url: getSiteUrl() },
          inLanguage: "zh-CN",
        }}
      />
      <Nav />
      <IssueHeader issue={issue} />
      <div className='h-6 sm:h-8' />
      <IssueFeed entries={issue.entries} />
      <Recommendation issue={issue} />
      <Footer />
    </main>
  );
}
