import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** 站点 favicon：墨色底 +「线」字 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        color: "#000000",
        fontSize: 16,
        fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', serif",
        fontWeight: 700,
      }}
    >
      LINE
    </div>,
    { ...size },
  );
}
