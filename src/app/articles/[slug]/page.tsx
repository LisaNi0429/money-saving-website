import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: "无痛省钱攒钱团队" }],
    alternates: {
      canonical: `/money-saving-website/articles/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://lisani0429.github.io/money-saving-website/articles/${article.slug}/`,
      siteName: "无痛省钱攒钱",
      locale: "zh_CN",
      type: "article",
      publishedTime: article.date,
      authors: ["无痛省钱攒钱团队"],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // JSON-LD structured data - Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `https://lisani0429.github.io/money-saving-website/articles/${article.slug}/`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "无痛省钱攒钱团队",
      url: "https://lisani0429.github.io/money-saving-website/",
    },
    publisher: {
      "@type": "Organization",
      name: "无痛省钱攒钱",
      logo: {
        "@type": "ImageObject",
        url: "https://lisani0429.github.io/money-saving-website/logo.png",
      },
    },
    image: article.image
      ? `https://lisani0429.github.io/money-saving-website${article.image}`
      : undefined,
    keywords: article.tags.join(", "),
    articleSection: article.categoryName,
    wordCount: article.content.length,
    timeRequired: article.readTime,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: "https://lisani0429.github.io/money-saving-website/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "图文文章",
        item: "https://lisani0429.github.io/money-saving-website/articles/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://lisani0429.github.io/money-saving-website/articles/${article.slug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
