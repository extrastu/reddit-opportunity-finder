import { buildRssFeed } from "@/lib/rss";

// 数据来自构建时静态内容，强制静态生成
export const dynamic = "force-static";

/** 输出 RSS 2.0 订阅源 */
export async function GET() {
  const body = buildRssFeed();
  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
