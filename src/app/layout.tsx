import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "无痛省钱攒钱 - 让省钱变得简单",
  description: "提供个性化省钱计划、实用省钱技巧和情绪价值，帮助年轻人、宝妈和中年人建立健康的消费习惯，实现财务自由。",
  keywords: "省钱,攒钱,理财,消费观念,家庭财务,省钱技巧",
  authors: [{ name: "无痛省钱攒钱" }],
  openGraph: {
    title: "无痛省钱攒钱 - 让省钱变得简单",
    description: "提供个性化省钱计划、实用省钱技巧和情绪价值",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Noto Sans SC', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
