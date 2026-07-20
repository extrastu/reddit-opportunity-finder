import Nav from "@/components/Nav";
import IssueHeader from "@/components/IssueHeader";
import IssueFeed from "@/components/IssueFeed";
import Recommendation from "@/components/Recommendation";
import Footer from "@/components/Footer";
import { ISSUE_DATES, getIssue } from "@/lib/issues";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ISSUE_DATES.map((date) => ({ date }));
}

export default function IssuePage({ params }: { params: { date: string } }) {
  if (!ISSUE_DATES.includes(params.date as (typeof ISSUE_DATES)[number])) {
    notFound();
  }
  const issue = getIssue(params.date);

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
