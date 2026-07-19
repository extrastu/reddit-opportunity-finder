import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "线报 · Reddit 产品机会周刊",
  description: "从 Reddit 挖掘的、面向 Apple 生态独立开发者的产品机会周刊。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
