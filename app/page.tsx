import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import StatsBar from "@/components/StatsBar";
import IssueList from "@/components/IssueList";
import Footer from "@/components/Footer";
import { opportunities } from "@/lib/data";
import { listIssues } from "@/lib/issues";

export default function Home() {
  const issues = listIssues();
  return (
    <main>
      <Nav />
      <Masthead />
      <div className='py-6 sm:py-8'>
        <StatsBar items={opportunities} />
      </div>
      <IssueList issues={issues} />
      <Footer />
    </main>
  );
}
