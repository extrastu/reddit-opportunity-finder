/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers 通过 OpenNext 适配，不再使用静态 export
  images: { unoptimized: true },
};

export default nextConfig;
