/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers 通过 OpenNext 适配，不再使用静态 export
  images: { unoptimized: true },
  /** PWA：Service Worker 不长期缓存，保证更新及时 */
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
