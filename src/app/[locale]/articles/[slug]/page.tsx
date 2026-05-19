export const dynamic = "force-static";

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "@/data/content";
import { getMessages, t as translate, locales, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    articles.forEach((article) => {
      params.push({ locale, slug: article.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = getMessages(locale as Locale);
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  // Get translated article title
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const translatedTitle = translate(messages, `articles.article${(articleIndex % 3) + 1}.title`);

  return {
    title: translatedTitle,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const messages = getMessages(locale as Locale);

  function t(key: string): string {
    return translate(messages, key);
  }

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get translated article content
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const translatedTitle = t(`articles.article${(articleIndex % 3) + 1}.title`);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-[#FAFAF8] border-b border-[#E8E8E4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <Link href={`/${locale}`} className="hover:text-[#0F4C3A] transition-colors">{t("nav.home")}</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <Link href={`/${locale}/articles`} className="hover:text-[#0F4C3A] transition-colors">{t("nav.articles")}</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-[#4A5568] truncate max-w-[200px]">{translatedTitle}</span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Article Header */}
          <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 border border-[#E8E8E4]">
            <span className="tag-capsule bg-[#E8F5E9] text-[#0F4C3A] mb-4">
              {article.categoryName}
            </span>
            <h1
              className="text-2xl md:text-4xl font-bold text-[#0F4C3A] mt-4 mb-4 leading-tight"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {translatedTitle}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E8E4]" />
              <span>{article.readTime}{t("articles.readTime")}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
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

          {/* Article Content */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E8E8E4]">
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- (.*)/g, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>')
              }}
            />
          </div>

          {/* Back to articles */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F4C3A] hover:text-[#10B981] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {t("sections.articles.viewAll")}
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
