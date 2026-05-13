import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, categories } from "@/data/content";

export const metadata = {
  title: "图文文章 - 无痛省钱攒钱",
  description: "精选省钱攻略文章，帮助年轻人、宝妈和中年人建立健康的消费习惯",
};

export default function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryFilter = searchParams.category;
  
  const filteredArticles = categoryFilter
    ? articles.filter((a) => a.category === categoryFilter)
    : articles;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">图文文章</h1>
            <p className="text-gray-600 text-lg">
              精选省钱攻略，帮你建立健康的消费习惯
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/articles"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !categoryFilter
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              全部
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/articles?category=${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === cat.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                  <span className="text-6xl">📄</span>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mb-2">
                    {article.categoryName}
                  </span>
                  <h2 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}阅读</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
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
