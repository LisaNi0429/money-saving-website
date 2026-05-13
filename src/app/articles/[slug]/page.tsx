import { notFound } from "next/navigation";
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

      <main className="flex-grow bg-gray-50">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-4">
              {article.categoryName}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{article.date}</span>
              <span className="mx-2">·</span>
              <span>{article.readTime}阅读</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- (.*)/g, '<li class="ml-4 mb-2">$1</li>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^/, '<p class="mb-4">')
                  .replace(/$/, '</p>')
              }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
