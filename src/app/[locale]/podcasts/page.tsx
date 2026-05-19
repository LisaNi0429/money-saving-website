export const dynamic = "force-static";

import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { podcasts } from "@/data/content";
import { locales } from "@/i18n/config";

interface Props {
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata.podcasts" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/money-saving-website/${locale}/podcasts/`,
    },
  };
}

export default async function PodcastsPage({ params }: Props) {
  const { locale } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale });

  // Translated podcasts
  const translatedPodcasts = podcasts.map((podcast, index) => ({
    ...podcast,
    title: t(`podcasts.podcast${index + 1}.title`),
    description: t(`podcasts.podcast${index + 1}.description`),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Page Banner */}
        <div className="relative overflow-hidden gradient-forest text-white">
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/10" />
          <div className="absolute bottom-[-60px] left-[-30px] w-[160px] h-[160px] rounded-full border border-white/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-3">Podcast</p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("sections.podcasts.title")}
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              {t("metadata.podcasts.description")}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Subscribe Links */}
          <div className="bg-gradient-to-r from-[#0F4C3A] to-[#1A6B52] rounded-2xl p-6 md:p-8 mb-10 text-white relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10" />
            <div className="relative">
              <h2 className="text-xl font-bold mb-5">Subscribe to Our Podcast</h2>
              <div className="flex flex-wrap gap-3">
                {["Apple Podcasts", "Xiaoyuzhou", "NetEase Cloud", "Ximalaya"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full text-sm transition-colors backdrop-blur-sm"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Podcasts List */}
          <div className="space-y-4">
            {translatedPodcasts.map((podcast) => (
              <Link
                key={podcast.id}
                href={`/${locale}/podcasts/${podcast.slug}`}
                className="card-hover group block bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#D4A853]/30"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl gradient-podcast flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#B8912E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h2 className="text-xl font-bold text-[#0F4C3A] mb-2 group-hover:text-[#10B981] transition-colors">
                      {podcast.title}
                    </h2>
                    <p className="text-[#4A5568] text-sm mb-3 leading-relaxed">{podcast.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                      <span className="tag-capsule bg-[#FAFAF8] text-[#4A5568] border border-[#E8E8E4]">{podcast.duration}</span>
                      <span>{podcast.playCount.toLocaleString()} {t("podcasts.playCount")}</span>
                      <span>{podcast.date}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <div className="w-12 h-12 rounded-full bg-[#0F4C3A] flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
                      <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
