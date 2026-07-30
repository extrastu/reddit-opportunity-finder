import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OpportunityDetail from "@/components/OpportunityDetail";
import JsonLd from "@/components/JsonLd";
import { getOpportunity, listOpportunityIds, firstSeen, lastSeen, total, totalMentions } from "@/lib/data";
import { SITE_NAME, absoluteUrl, getSiteUrl, opportunityPath } from "@/lib/site";

type PageProps = { params: Promise<{ id: string }> };

/** 预生成全部机会详情路径 */
export function generateStaticParams() {
  return listOpportunityIds().map((id) => ({ id }));
}

/** 按机会生成标题、描述与 canonical */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const o = getOpportunity(id);
  if (!o) return { title: "未找到机会" };

  const path = opportunityPath(o.id);
  const description = `${o.problem.slice(0, 120)}${o.problem.length > 120 ? "…" : ""} 分数 ${total(o.score)}/25 · ${o.buildDays} 天可上线。`;

  return {
    title: o.title,
    description,
    keywords: [...o.subreddits, ...o.platforms, "产品机会", "独立开发", SITE_NAME],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: `${o.title} · ${SITE_NAME}`,
      description,
      publishedTime: `${firstSeen(o)}T00:00:00.000Z`,
      modifiedTime: `${lastSeen(o)}T00:00:00.000Z`,
      tags: o.subreddits,
    },
    twitter: {
      card: "summary",
      title: o.title,
      description,
    },
  };
}

/** 单个机会详情页：独立 URL，利于 SEO 收录 */
export default async function OpportunityPage({ params }: PageProps) {
  const { id } = await params;
  const o = getOpportunity(id);
  if (!o) notFound();

  const path = opportunityPath(o.id);
  const url = absoluteUrl(path);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "首页", item: getSiteUrl() },
                { "@type": "ListItem", position: 2, name: "机会库", item: absoluteUrl("/library") },
                { "@type": "ListItem", position: 3, name: o.title, item: url },
              ],
            },
            {
              "@type": "Article",
              headline: o.title,
              description: o.problem,
              datePublished: firstSeen(o),
              dateModified: lastSeen(o),
              mainEntityOfPage: url,
              inLanguage: "zh-CN",
              keywords: o.subreddits.join(", "),
              author: { "@type": "Organization", name: SITE_NAME, url: getSiteUrl() },
              publisher: { "@type": "Organization", name: SITE_NAME, url: getSiteUrl() },
              about: {
                "@type": "Thing",
                name: o.title,
                description: o.gap,
              },
              interactionStatistic: {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/CommentAction",
                userInteractionCount: totalMentions(o),
              },
            },
          ],
        }}
      />
      <Nav />
      <OpportunityDetail o={o} />
      <Footer />
    </main>
  );
}
