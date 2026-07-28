import Nav from "@/components/Nav";
import IssueHeader from "@/components/IssueHeader";
import IssueFeed from "@/components/IssueFeed";
import Recommendation from "@/components/Recommendation";
import Footer from "@/components/Footer";
import { ISSUE_DATES, getIssue } from "@/lib/issues";
import { notFound } from "next/navigation";

/** 预生成各期日报静态路径 */
export function generateStaticParams() {
  return ISSUE_DATES.map((date) => ({ date }));
}

/** 单期日报页（Next 15 params 为 Promise） */
export default async function IssuePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  if (!ISSUE_DATES.includes(date as (typeof ISSUE_DATES)[number])) {
    notFound();
  }
  const issue = getIssue(date);

  return (
    <main>
      <Nav />
      <IssueHeader issue={issue} />
      <div className='h-6 sm:h-8' />
      <IssueFeed entries={issue.entries} />
      <Recommendation issue={issue} />
      <Footer />
    </main>
  );
}
