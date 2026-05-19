import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "生成你的省钱计划 - 个性化省钱方案",
  description: "只需几分钟，获得专属于你的个性化省钱方案。根据你的收入、支出和目标，生成定制化的省钱计划和建议。",
  keywords: ["省钱计划", "个性化方案", "理财规划", "预算管理", "存钱计划"],
  alternates: {
    canonical: "/money-saving-website/plan/",
  },
  openGraph: {
    title: "生成你的省钱计划 - 个性化省钱方案",
    description: "只需几分钟，获得专属于你的个性化省钱方案",
    url: "https://lisani0429.github.io/money-saving-website/plan/",
    siteName: "无痛省钱攒钱",
    locale: "zh_CN",
    type: "website",
  },
};

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
