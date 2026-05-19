import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "无痛省钱攒钱 - 让省钱变得简单",
    template: "%s | 无痛省钱攒钱",
  },
  description: "提供个性化省钱计划、实用省钱技巧和情绪价值，帮助年轻人、宝妈和中年人建立健康的消费习惯，实现财务自由。",
  keywords: ["省钱", "攒钱", "理财", "消费观念", "家庭财务", "省钱技巧", "月光族", "存钱", "预算管理"],
  authors: [{ name: "无痛省钱攒钱团队" }],
  creator: "无痛省钱攒钱",
  publisher: "无痛省钱攒钱",
  metadataBase: new URL("https://lisani0429.github.io"),
  alternates: {
    canonical: "/money-saving-website",
  },
  openGraph: {
    title: "无痛省钱攒钱 - 让省钱变得简单",
    description: "提供个性化省钱计划、实用省钱技巧和情绪价值",
    url: "https://lisani0429.github.io/money-saving-website",
    siteName: "无痛省钱攒钱",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "无痛省钱攒钱 - 让省钱变得简单",
    description: "提供个性化省钱计划、实用省钱技巧和情绪价值",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
