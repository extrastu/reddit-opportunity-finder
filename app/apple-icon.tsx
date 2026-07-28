import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple Touch Icon：圆角墨底 +「线」字 */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B1A17",
        color: "#F7F4EC",
        fontSize: 108,
        fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', serif",
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      线
    </div>,
    { ...size },
  );
}
