export const dynamic = "force-static";

import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, categories } from "@/data/content";
import { locales } from "@/i18n/config";

interface Props {
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata.articles" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/money-saving-website/${locale}/articles/`,
    },
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale });

  // Translated articles
  const translatedArticles = articles.map((article, index) => ({
    ...article,
    title: t(`articles.article${(index % 3) + 1}.title`),
    excerpt: t(`articles.article${(index % 3) + 1}.excerpt`),
  }));

  // Translated categories
  const translatedCategories = categories.map((cat) => ({
    ...cat,
    name: t(`categories.${cat.id}.name`),
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
            <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-3">Articles</p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("sections.articles.title")}
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              {t("categories.description")}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href={`/${locale}/articles`}
              className="tag-capsule px-5 py-2.5 text-sm font-medium transition-all bg-[#0F4C3A] text-white shadow-md"
            >
              {t("sections.articles.viewAll")}
            </Link>
            {translatedCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/articles?category=${cat.id}`}
                className="tag-capsule px-5 py-2.5 text-sm font-medium transition-all bg-white text-[#4A5568] border border-[#E8E8E4] hover:border-[#0F4C3A]/30 hover:text-[#0F4C3A]"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translatedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/articles/${article.slug}`}
                className="card-hover group bg-white rounded-2xl overflow-hidden border border-[#E8E8E4] hover:border-[#10B981]/30"
              >
                <div className="h-52 gradient-article flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <svg className="relative w-12 h-12 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <div className="absolute top-4 left-4">
                    <span className="tag-capsule bg-white/90 text-[#0F4C3A]">
                      {article.categoryName}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-[#0F4C3A] mb-2 line-clamp-2 group-hover:text-[#10B981] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-[#4A5568] text-sm line-clamp-2 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-4">
                    <span>{article.readTime}{t("articles.readTime")}</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag-capsule bg-[#FAFAF8] text-[#4A5568] border border-[#E8E8E4]"
                      >
                        {tag}
                      </span>
                    ))}
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
