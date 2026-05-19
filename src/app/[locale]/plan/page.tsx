export const dynamic = "force-static";

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanForm from "./PlanForm";
import { locales } from "@/i18n/config";

interface Props {
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata.plan" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/money-saving-website/${locale}/plan/`,
    },
  };
}

export default async function PlanPage({ params }: Props) {
  const { locale } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Page Banner */}
        <div className="relative overflow-hidden gradient-forest text-white">
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/10" />
          <div className="absolute bottom-[-60px] left-[-30px] w-[160px] h-[160px] rounded-full border border-white/5" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
            <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-3">Plan</p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("plan.pageTitle")}
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              {t("plan.pageDescription")}
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PlanForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
