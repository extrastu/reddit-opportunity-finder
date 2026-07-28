import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import StatsBar from "@/components/StatsBar";
import IssueList from "@/components/IssueList";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { opportunities } from "@/lib/data";
import { listIssues } from "@/lib/issues";
import { SITE_NAME, SITE_TAGLINE, absoluteUrl, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} · Reddit 产品机会日报` },
  description: SITE_TAGLINE,
  alternates: { canonical: "/" },
  openGraph: {
    url: absoluteUrl("/"),
    title: `${SITE_NAME} · Reddit 产品机会日报`,
    description: SITE_TAGLINE,
  },
};

/** 首页：日报归档入口 */
export default function Home() {
  const issues = listIssues();
  const siteUrl = getSiteUrl();

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: SITE_NAME,
              url: siteUrl,
              description: SITE_TAGLINE,
              inLanguage: "zh-CN",
            },
            {
              "@type": "Organization",
              name: SITE_NAME,
              url: siteUrl,
            },
          ],
        }}
      />
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
