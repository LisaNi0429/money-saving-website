import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, videos, podcasts, books, categories } from "@/data/content";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-500 to-teal-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              让省钱变得<span className="text-yellow-300">简单</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              提供个性化省钱计划、实用技巧和情绪价值<br />
              不做纯说教，帮你无痛攒下第一桶金
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plan"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                生成我的省钱计划
              </Link>
              <Link
                href="/articles"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                浏览省钱攻略
              </Link>
            </div>
          </div>
        </section>

        {/* User Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">找到适合你的省钱方案</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/articles?category=${category.id}`}
                  className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">精选文章</h2>
              <Link href="/articles" className="text-green-600 hover:text-green-700 font-medium">
                查看全部 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article) => (
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
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span>{article.readTime}阅读</span>
                      <span className="mx-2">·</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">省钱短视频</h2>
              <Link href="/videos" className="text-green-600 hover:text-green-700 font-medium">
                查看全部 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-5xl">🎬</span>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 5.84a.5.5 0 01.77-.42l7.15 4.16a.5.5 0 010 .84l-7.15 4.16a.5.5 0 01-.77-.42V5.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium line-clamp-2 group-hover:text-green-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{video.views.toLocaleString()} 次观看</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Podcasts Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">省钱播客</h2>
              <Link href="/podcasts" className="text-green-600 hover:text-green-700 font-medium">
                查看全部 →
              </Link>
            </div>
            <div className="space-y-4">
              {podcasts.map((podcast) => (
                <Link
                  key={podcast.id}
                  href={`/podcasts/${podcast.slug}`}
                  className="block bg-white rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">🎧</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-1">{podcast.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{podcast.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{podcast.duration}</span>
                        <span className="mx-2">·</span>
                        <span>{podcast.playCount.toLocaleString()} 次播放</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="bg-green-100 rounded-full p-3">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 5.84a.5.5 0 01.77-.42l7.15 4.16a.5.5 0 010 .84l-7.15 4.16a.5.5 0 01-.77-.42V5.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">理财图书推荐</h2>
              <Link href="/books" className="text-green-600 hover:text-green-700 font-medium">
                查看全部 →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
                    <span className="text-6xl">📚</span>
                  </div>
                  <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-xs">{book.author}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm ml-1">{book.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              准备好开始你的省钱之旅了吗？
            </h2>
            <p className="text-xl mb-8 opacity-90">
              只需几分钟，生成专属于你的个性化省钱计划
            </p>
            <Link
              href="/plan"
              className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              立即开始
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
