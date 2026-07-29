/** 站点品牌名 */
export const SITE_NAME = "线报";

/** 站点短描述，用于 metadata / OG */
export const SITE_TAGLINE = "从 Reddit 挖掘、面向独立开发者的产品机会日报";

/** 正式域名（无尾斜杠） */
export const SITE_HOST = "opp.wiki";

/** 作者博客 */
export const AUTHOR_BLOG = "https://extrastu.xyz";

/** 站点绝对根地址，供 sitemap / metadata / canonical 共用 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return `https://${SITE_HOST}`;
}

/** 拼出站内绝对 URL */
export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
