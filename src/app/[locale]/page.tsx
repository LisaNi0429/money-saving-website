export const dynamic = "force-static";

import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, videos, podcasts, books } from "@/data/content";
import { getMessages, t as translate, locales, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale as Locale);

  return {
    title: translate(messages, "metadata.home.title"),
    description: translate(messages, "metadata.home.description"),
    alternates: {
      canonical: `/money-saving-website/${locale}/`,
    },
    openGraph: {
      title: translate(messages, "metadata.home.title"),
      description: translate(messages, "metadata.home.description"),
      url: `https://lisani0429.github.io/money-saving-website/${locale}/`,
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
  };
}

/* SVG icon components */
function ArticleIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function VideoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function PodcastIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function BookIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function PlayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#D4A853" : "none"} stroke={filled ? "#D4A853" : "#E8E8E4"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function YoungIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M12 4V2" />
      <path d="M9 6l-2-1" />
      <path d="M15 6l2-1" />
    </svg>
  );
}

function MomIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="12" r="2.5" />
      <path d="M17 14.5V17" />
    </svg>
  );
}

function MiddleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <rect x="8" y="12" width="8" height="2" rx="1" />
    </svg>
  );
}

const categoryIcons: Record<string, () => React.ReactNode> = {
  young: YoungIcon,
  mom: MomIcon,
  middle: MiddleIcon,
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const messages = getMessages(locale as Locale);

  // Create translation function
  function t(key: string): string {
    return translate(messages, key);
  }

  // Translated categories
  const categories = [
    { id: "young", name: t("categories.young.name"), description: t("categories.young.description") },
    { id: "mom", name: t("categories.mom.name"), description: t("categories.mom.description") },
    { id: "middle", name: t("categories.middle.name"), description: t("categories.middle.description") },
  ];

  // Translated articles
  const translatedArticles = articles.slice(0, 3).map((article, index) => ({
    ...article,
    title: t(`articles.article${index + 1}.title`),
    excerpt: t(`articles.article${index + 1}.excerpt`),
  }));

  // Translated videos
  const translatedVideos = videos.map((video, index) => ({
    ...video,
    title: t(`videos.video${index + 1}.title`),
  }));

  // Translated podcasts
  const translatedPodcasts = podcasts.map((podcast, index) => ({
    ...podcast,
    title: t(`podcasts.podcast${index + 1}.title`),
    description: t(`podcasts.podcast${index + 1}.description`),
  }));

  // Translated books
  const translatedBooks = books.map((book, index) => ({
    ...book,
    title: t(`books.book${index + 1}.title`),
    author: t(`books.book${index + 1}.author`),
  }));

  // JSON-LD structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("nav.home"),
    url: `https://lisani0429.github.io/money-saving-website/${locale}/`,
    description: t("metadata.home.description"),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("nav.home"),
    url: `https://lisani0429.github.io/money-saving-website/${locale}/`,
    description: t("metadata.home.description"),
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Header />

      <main className="flex-grow">
        {/* ===== Hero Section ===== */}
        <section className="relative overflow-hidden gradient-forest text-white">
          {/* Geometric decoration circles */}
          <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full border border-white/10 animate-float" />
          <div className="absolute bottom-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full border border-white/5 animate-float-slow" />
          <div className="absolute top-[40%] right-[20%] w-[120px] h-[120px] rounded-full bg-white/5 animate-float" />
          <div className="absolute top-[20%] left-[10%] w-[60px] h-[60px] rounded-full bg-[#D4A853]/10 animate-float-slow" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl animate-fade-in-up">
              <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-6">
                {t("hero.subtitle")}
              </p>
              <h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
              >
                {t("hero.title1")}
                <span className="text-[#D4A853]">{t("hero.titleHighlight1")}</span>
                <br />
                {t("hero.title2")}
                <span className="text-[#10B981]">{t("hero.titleHighlight2")}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/plan`}
                  className="inline-flex items-center justify-center gap-2 bg-[#D4A853] text-[#0F4C3A] px-8 py-4 rounded-full font-semibold text-base hover:bg-[#E8C97A] transition-all shadow-lg hover:shadow-xl animate-pulse-gold"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRightIcon />
                </Link>
                <Link
                  href={`/${locale}/articles`}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-medium text-base hover:bg-white/10 transition-all"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
              {[
                { value: t("hero.statValues.users"), label: t("hero.stats.users") },
                { value: t("hero.statValues.tips"), label: t("hero.stats.tips") },
                { value: t("hero.statValues.cases"), label: t("hero.stats.cases") },
              ].map((stat, i) => (
                <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 200}ms` }}>
                  <p className="text-2xl md:text-3xl font-bold text-[#D4A853]">{stat.value}</p>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== User Categories ===== */}
        <section className="section-padding bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-3">{t("categories.subtitle")}</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#0F4C3A]"
                style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
              >
                {t("categories.title")}
              </h2>
              <p className="text-[#4A5568] mt-4 max-w-xl mx-auto">
                {t("categories.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, i) => {
                const IconComponent = categoryIcons[category.id];
                return (
                  <Link
                    key={category.id}
                    href={`/${locale}/articles?category=${category.id}`}
                    className="card-hover group bg-white rounded-2xl p-8 text-center border border-[#E8E8E4] hover:border-[#10B981]/30"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center text-[#0F4C3A] group-hover:from-[#0F4C3A] group-hover:to-[#1A6B52] group-hover:text-white transition-all duration-300">
                      {IconComponent && <IconComponent />}
                    </div>
                    <h3 className="text-xl font-bold text-[#0F4C3A] mb-2">{category.name}</h3>
                    <p className="text-[#4A5568] text-sm leading-relaxed">{category.description}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("categories.viewGuide")} <ArrowRightIcon />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Featured Articles ===== */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-3">{t("sections.articles.subtitle")}</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#0F4C3A]"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {t("sections.articles.title")}
                </h2>
              </div>
              <Link
                href={`/${locale}/articles`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C3A] hover:text-[#10B981] transition-colors"
              >
                {t("sections.articles.viewAll")} <ArrowRightIcon />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {translatedArticles.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/${locale}/articles/${article.slug}`}
                  className="card-hover group bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[#E8E8E4] hover:border-[#10B981]/30"
                >
                  <div className="h-52 gradient-article flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="relative text-white/80">
                      <ArticleIcon className="w-12 h-12" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="tag-capsule bg-white/90 text-[#0F4C3A]">
                        {article.categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0F4C3A] mb-2 line-clamp-2 group-hover:text-[#10B981] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[#4A5568] text-sm line-clamp-2 mb-4 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>{article.readTime}{t("articles.readTime")}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="sm:hidden mt-8 text-center">
              <Link
                href={`/${locale}/articles`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C3A]"
              >
                {t("sections.articles.viewAll")} <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Videos Section ===== */}
        <section className="section-padding bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-3">{t("sections.videos.subtitle")}</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#0F4C3A]"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {t("sections.videos.title")}
                </h2>
              </div>
              <Link
                href={`/${locale}/videos`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C3A] hover:text-[#10B981] transition-colors"
              >
                {t("sections.videos.viewAll")} <ArrowRightIcon />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {translatedVideos.map((video) => (
                <Link
                  key={video.id}
                  href={`/${locale}/videos/${video.slug}`}
                  className="card-hover group"
                >
                  <div className="relative aspect-video gradient-video rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center animate-pulse-play shadow-lg">
                        <PlayIcon className="w-6 h-6 text-[#0F4C3A] ml-0.5" />
                      </div>
                    </div>
                    <div className="relative text-white/40">
                      <VideoIcon className="w-10 h-10" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#0F4C3A] line-clamp-2 group-hover:text-[#10B981] transition-colors text-sm leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-2">{video.views.toLocaleString()} {t("videos.views")}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Podcasts Section ===== */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-3">{t("sections.podcasts.subtitle")}</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#0F4C3A]"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {t("sections.podcasts.title")}
                </h2>
              </div>
              <Link
                href={`/${locale}/podcasts`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C3A] hover:text-[#10B981] transition-colors"
              >
                {t("sections.podcasts.viewAll")} <ArrowRightIcon />
              </Link>
            </div>
            <div className="space-y-4 max-w-4xl">
              {translatedPodcasts.map((podcast) => (
                <Link
                  key={podcast.id}
                  href={`/${locale}/podcasts/${podcast.slug}`}
                  className="card-hover group block bg-[#FAFAF8] rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#D4A853]/30"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl gradient-podcast flex items-center justify-center">
                      <PodcastIcon className="w-7 h-7 text-[#B8912E]" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-bold text-[#0F4C3A] mb-1 group-hover:text-[#10B981] transition-colors truncate">
                        {podcast.title}
                      </h3>
                      <p className="text-[#4A5568] text-sm mb-3 line-clamp-1">{podcast.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                        <span className="tag-capsule bg-[#F1F1ED] text-[#4A5568]">{podcast.duration}</span>
                        <span>{podcast.playCount.toLocaleString()} {t("podcasts.playCount")}</span>
                      </div>
                    </div>
                    {/* Waveform decoration */}
                    <div className="hidden sm:flex flex-shrink-0 items-end gap-[3px] h-8 self-center">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="waveform-bar"
                          style={{ height: `${8 + Math.random() * 16}px` }}
                        />
                      ))}
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C3A] flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
                        <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Books Section ===== */}
        <section className="section-padding bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-3">{t("sections.books.subtitle")}</p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#0F4C3A]"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {t("sections.books.title")}
                </h2>
              </div>
              <Link
                href={`/${locale}/books`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C3A] hover:text-[#10B981] transition-colors"
              >
                {t("sections.books.viewAll")} <ArrowRightIcon />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {translatedBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/${locale}/books/${book.id}`}
                  className="card-hover group"
                >
                  <div className="aspect-[3/4] gradient-book rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="relative text-white/50">
                      <BookIcon className="w-12 h-12" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F4C3A] line-clamp-1 group-hover:text-[#10B981] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[#94A3B8] text-xs mt-1">{book.author}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= Math.round(parseFloat(book.rating))} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#D4A853] ml-1">{book.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA Section ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold" />
          <div className="absolute inset-0 bg-[#0F4C3A]/10" />
          {/* Decorative circles */}
          <div className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full border border-white/10" />
          <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full border border-white/10" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0F4C3A] mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("cta.title")}
            </h2>
            <p className="text-lg text-[#0F4C3A]/70 mb-10 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/plan`}
              className="inline-flex items-center gap-2 bg-[#0F4C3A] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#0A3629] transition-all shadow-xl hover:shadow-2xl"
            >
              {t("cta.button")}
              <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
