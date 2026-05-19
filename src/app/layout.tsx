import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "无痛省钱攒钱 - 让省钱变得简单",
  description: "提供个性化省钱计划、实用省钱技巧和情绪价值，帮助年轻人、宝妈和中年人建立健康的消费习惯，实现财务自由。",
  keywords: ["省钱", "攒钱", "理财", "消费观念", "家庭财务", "省钱技巧", "月光族", "存钱", "预算管理"],
  metadataBase: new URL("https://lisani0429.github.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
