export const dynamic = "force-static";

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { books } from "@/data/content";
import { locales } from "@/i18n/config";

function StarIcon({ filled = true, size = 20 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#D4A853" : "none"} stroke={filled ? "#D4A853" : "#E8E8E4"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

interface Props {
  params: { locale: string; id: string };
}

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  locales.forEach((locale) => {
    books.forEach((book) => {
      params.push({ locale, id: book.id.toString() });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = params;
  const t = await getTranslations({ locale });
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  const bookIndex = books.findIndex((b) => b.id === parseInt(id));
  const translatedTitle = t(`books.book${bookIndex + 1}.title`);

  return {
    title: translatedTitle,
    description: book.summary,
  };
}

export default async function BookPage({ params }: Props) {
  const { locale, id } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale });
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    notFound();
  }

  const bookIndex = books.findIndex((b) => b.id === parseInt(id));
  const translatedTitle = t(`books.book${bookIndex + 1}.title`);
  const translatedAuthor = t(`books.book${bookIndex + 1}.author`);

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
              <Link href={`/${locale}/books`} className="hover:text-[#0F4C3A] transition-colors">{t("nav.books")}</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-[#4A5568] truncate max-w-[200px]">{translatedTitle}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Book Header */}
          <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 border border-[#E8E8E4]">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover */}
              <div className="flex-shrink-0 w-48 h-64 rounded-xl gradient-book flex items-center justify-center mx-auto md:mx-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <svg className="relative w-16 h-16 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>

              {/* Book Info */}
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag-capsule bg-[#E3F2FD] text-[#1565C0]">
                    {book.category}
                  </span>
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-capsule bg-[#FAFAF8] text-[#4A5568] border border-[#E8E8E4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1
                  className="text-3xl font-bold text-[#0F4C3A] mb-2"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {translatedTitle}
                </h1>
                <p className="text-[#4A5568] text-lg mb-4">{translatedAuthor}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= Math.round(parseFloat(book.rating))} />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-[#D4A853] ml-1">{book.rating}</span>
                  <span className="text-sm text-[#94A3B8] ml-1">{t("books.rating")}</span>
                </div>
                <p className="text-[#4A5568] leading-relaxed">{book.summary}</p>
              </div>
            </div>
          </div>

          {/* Reading Notes */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E8E8E4] mb-8">
            <h2
              className="text-2xl font-bold text-[#0F4C3A] mb-6"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              Reading Notes
            </h2>
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: book.notes
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/\d\. \*\*(.*?)\*\*/g, '<p class="font-semibold mt-4 mb-2 text-[#0F4C3A]">$1</p>')
                  .replace(/- (.*)/g, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>')
              }}
            />
          </div>

          {/* Related Books */}
          <div>
            <h2 className="text-xl font-bold text-[#0F4C3A] mb-6">{t("sections.books.title")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {books
                .filter((b) => b.id !== book.id)
                .slice(0, 4)
                .map((b) => {
                  const relatedBookIndex = books.findIndex((book) => book.id === b.id);
                  const relatedTitle = t(`books.book${relatedBookIndex + 1}.title`);
                  const relatedAuthor = t(`books.book${relatedBookIndex + 1}.author`);
                  return (
                    <Link
                      key={b.id}
                      href={`/${locale}/books/${b.id}`}
                      className="card-hover group bg-white rounded-xl p-4 border border-[#E8E8E4] hover:border-[#10B981]/30"
                    >
                      <div className="aspect-[3/4] gradient-book rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <svg className="relative w-8 h-8 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-sm text-[#0F4C3A] line-clamp-1 group-hover:text-[#10B981] transition-colors">{relatedTitle}</h3>
                      <p className="text-[#94A3B8] text-xs">{relatedAuthor}</p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
