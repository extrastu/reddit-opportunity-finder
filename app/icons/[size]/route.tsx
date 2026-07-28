import { ImageResponse } from "next/og";

/** PWA 允许的图标边长 */
const ALLOWED = new Set([192, 512]);

/** 预生成 192 / 512 安装图标 */
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

/** 按尺寸输出墨底「线」字 PNG，供 manifest 使用 */
export async function GET(_request: Request, context: { params: Promise<{ size: string }> }) {
  const { size: raw } = await context.params;
  const size = Number(raw);

  if (!ALLOWED.has(size)) {
    return new Response("Not Found", { status: 404 });
  }

  // maskable 安全区约 80%，字形略缩小
  const fontSize = Math.round(size * 0.48);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1A17",
          color: "#F7F4EC",
          fontSize,
          fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', serif",
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        线
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
