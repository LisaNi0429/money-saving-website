export const dynamic = "force-static";

import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { books } from "@/data/content";
import { locales } from "@/i18n/config";

interface Props {
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata.books" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/money-saving-website/${locale}/books/`,
    },
  };
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#D4A853" : "none"} stroke={filled ? "#D4A853" : "#E8E8E4"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default async function BooksPage({ params }: Props) {
  const { locale } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale });

  // Translated books
  const translatedBooks = books.map((book, index) => ({
    ...book,
    title: t(`books.book${index + 1}.title`),
    author: t(`books.book${index + 1}.author`),
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
            <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-3">Books</p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("sections.books.title")}
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              {t("metadata.books.description")}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {translatedBooks.map((book) => (
              <Link
                key={book.id}
                href={`/${locale}/books/${book.id}`}
                className="card-hover group"
              >
                <div className="aspect-[3/4] gradient-book rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <svg className="relative w-12 h-12 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h2 className="font-bold text-base text-[#0F4C3A] mb-1 line-clamp-1 group-hover:text-[#10B981] transition-colors">
                  {book.title}
                </h2>
                <p className="text-[#94A3B8] text-sm mb-2">{book.author}</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= Math.round(parseFloat(book.rating))} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#D4A853] ml-1">{book.rating}</span>
                  <span className="text-xs text-[#94A3B8] ml-1">{t("books.rating")}</span>
                </div>
                <span className="tag-capsule bg-[#E3F2FD] text-[#1565C0]">
                  {book.category}
                </span>
              </Link>
            ))}
          </div>

          {/* Reading Guide */}
          <div className="mt-16 bg-gradient-to-r from-[#0F4C3A] to-[#1A6B52] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10" />
            <div className="absolute bottom-[-40px] left-[-20px] w-[100px] h-[100px] rounded-full border border-white/5" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}>{t("books.readingGuide.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A853]/20 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20V10" />
                      <path d="M18 20V4" />
                      <path d="M6 20v-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2 text-[#D4A853]">{t("books.readingGuide.beginner.title")}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t("books.readingGuide.beginner.description")}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/20 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2 text-[#10B981]">{t("books.readingGuide.advanced.title")}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t("books.readingGuide.advanced.description")}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A853]/20 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2 text-[#D4A853]">{t("books.readingGuide.practical.title")}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t("books.readingGuide.practical.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
