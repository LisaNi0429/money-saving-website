import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "@/data/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${article.title} - 无痛省钱攒钱`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-[#FAFAF8] border-b border-[#E8E8E4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <Link href="/" className="hover:text-[#0F4C3A] transition-colors">首页</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <Link href="/articles" className="hover:text-[#0F4C3A] transition-colors">图文文章</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-[#4A5568] truncate max-w-[200px]">{article.title}</span>
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
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#E8E8E4]" />
              <span>{article.readTime}阅读</span>
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
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F4C3A] hover:text-[#10B981] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              返回文章列表
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
