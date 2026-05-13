import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { books } from "@/data/content";

export const metadata = {
  title: "图书笔记 - 无痛省钱攒钱",
  description: "精选理财图书推荐和深度阅读笔记",
};

export default function BooksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">理财图书推荐</h1>
            <p className="text-gray-600 text-lg">
              精选优质理财书籍，提供深度阅读笔记和核心观点提炼
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="group"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                  <span className="text-8xl">📚</span>
                </div>
                <h2 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm ml-1 font-medium">{book.rating}</span>
                  <span className="text-gray-400 text-sm ml-2">豆瓣</span>
                </div>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {book.category}
                </span>
              </Link>
            ))}
          </div>

          {/* Reading Guide */}
          <div className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">阅读建议</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🌱 理财小白</h3>
                <p className="text-blue-100">从《小狗钱钱》开始，建立基础理财认知</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📈 进阶学习</h3>
                <p className="text-blue-100">阅读《富爸爸穷爸爸》，建立财商思维</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 实战规划</h3>
                <p className="text-blue-100">学习《财务自由之路》，制定行动计划</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
