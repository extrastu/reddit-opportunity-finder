/** 站点绝对根地址，供 sitemap / metadata 共用 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  // Cloudflare Workers / Pages 构建时注入的预览域名
  const cf =
    process.env.CF_PAGES_URL?.trim() ||
    process.env.NEXT_PUBLIC_CF_PAGES_URL?.trim();
  if (cf) return cf.replace(/\/$/, "");
  // 未配置时用占位域名，部署前务必设置 NEXT_PUBLIC_SITE_URL
  return "https://tipost.vercel.app";
}
