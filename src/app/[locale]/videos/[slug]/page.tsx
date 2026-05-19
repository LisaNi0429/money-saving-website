export const dynamic = "force-static";

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos } from "@/data/content";
import { locales } from "@/i18n/config";

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    videos.forEach((video) => {
      params.push({ locale, slug: video.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const t = await getTranslations({ locale });
  const video = videos.find((v) => v.slug === slug);

  if (!video) {
    return {
      title: "Video Not Found",
    };
  }

  const videoIndex = videos.findIndex((v) => v.slug === slug);
  const translatedTitle = t(`videos.video${videoIndex + 1}.title`);

  return {
    title: translatedTitle,
    description: `Watch video: ${translatedTitle}`,
  };
}

export default async function VideoPage({ params }: Props) {
  const { locale, slug } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale });
  const video = videos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  const videoIndex = videos.findIndex((v) => v.slug === slug);
  const translatedTitle = t(`videos.video${videoIndex + 1}.title`);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-[#FAFAF8] border-b border-[#E8E8E4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <Link href={`/${locale}`} className="hover:text-[#0F4C3A] transition-colors">{t("nav.home")}</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <Link href={`/${locale}/videos`} className="hover:text-[#0F4C3A] transition-colors">{t("nav.videos")}</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-[#4A5568] truncate max-w-[200px]">{translatedTitle}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Video Player Placeholder */}
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0F4C3A] rounded-2xl aspect-video flex items-center justify-center mb-8 relative overflow-hidden">
            <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/5" />
            <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full border border-white/5" />
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <svg className="w-10 h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
              <p className="text-white text-xl font-semibold">{translatedTitle}</p>
              <p className="text-white/40 text-sm mt-2">Video Player (Embed Bilibili/YouTube)</p>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E8E4]">
            <h1
              className="text-2xl md:text-3xl font-bold text-[#0F4C3A] mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {translatedTitle}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#94A3B8] mb-8">
              <span>{video.views.toLocaleString()} {t("videos.views")}</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E8E4]" />
              <span>{t("podcasts.duration")} {video.duration}</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E8E4]" />
              <span>{video.date}</span>
            </div>

            {/* Related Videos */}
            <div className="mt-8 pt-8 border-t border-[#E8E8E4]">
              <h2 className="text-xl font-bold text-[#0F4C3A] mb-6">{t("sections.videos.title")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {videos
                  .filter((v) => v.id !== video.id)
                  .slice(0, 3)
                  .map((v) => {
                    const relatedVideoIndex = videos.findIndex((video) => video.slug === v.slug);
                    const relatedTitle = t(`videos.video${relatedVideoIndex + 1}.title`);
                    return (
                      <Link
                        key={v.id}
                        href={`/${locale}/videos/${v.slug}`}
                        className="card-hover group"
                      >
                        <div className="relative aspect-video gradient-video rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                          <svg className="w-8 h-8 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {v.duration}
                          </div>
                        </div>
                        <h3 className="text-sm font-medium text-[#0F4C3A] line-clamp-2 group-hover:text-[#10B981] transition-colors">
                          {relatedTitle}
                        </h3>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
