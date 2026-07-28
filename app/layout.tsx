import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_TAGLINE, getSiteUrl } from "@/lib/site";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} · Reddit 产品机会日报`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  keywords: [
    "Reddit",
    "独立开发",
    "产品机会",
    "机会发现",
    "macOS",
    "iOS",
    "Indie Hackers",
    "线报",
    "opp.wiki",
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · Reddit 产品机会日报`,
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Reddit 产品机会日报`,
    description: SITE_TAGLINE,
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/icons/192", type: "image/png", sizes: "192x192" },
      { url: "/icons/512", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B1A17" },
    { media: "(prefers-color-scheme: dark)", color: "#1B1A17" },
  ],
  colorScheme: "light",
};

/** 根布局：全站 SEO + PWA 基础元信息 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN'>
      <body className='font-body antialiased'>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
