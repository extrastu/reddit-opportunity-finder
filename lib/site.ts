/** 站点绝对根地址，供 sitemap / metadata 共用 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  // 未配置时用占位域名，部署前务必设置 NEXT_PUBLIC_SITE_URL
  return "https://tipost.vercel.app";
}
