import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import JsonLd from "@/components/JsonLd";
import { AUTHOR_BLOG, SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/site";

const aboutDescription = `${SITE_NAME} 是什么、如何运作，以及作者博客入口。`;

export const metadata: Metadata = {
  title: "关于",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    url: absoluteUrl("/about"),
    title: "关于",
    description: aboutDescription,
  },
};

/** 关于页：项目说明与作者信息 */
export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `关于 · ${SITE_NAME}`,
          description: aboutDescription,
          url: absoluteUrl("/about"),
          isPartOf: { "@type": "WebSite", url: getSiteUrl() },
          author: {
            "@type": "Person",
            name: "Extrastu",
            url: AUTHOR_BLOG,
          },
        }}
      />
      <Nav />
      <header className='border-b-2 border-ink pb-5 pt-8 sm:pb-6 sm:pt-10'>
        <div className='shell'>
          <div className='font-mono text-[11px] uppercase tracking-widest text-ink2'>关于本站</div>
          <h1 className='mt-2 font-display text-3xl font-bold sm:mt-3 sm:text-4xl md:text-5xl'>关于</h1>
          <p className='mt-3 max-w-xl text-sm leading-relaxed text-ink2 sm:text-[13px]'>
            为什么做 {SITE_NAME}，以及你可以在哪里找到作者。
          </p>
        </div>
      </header>
      <AboutContent />
      <Footer />
    </main>
  );
}
