import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { books } from "@/data/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return {
      title: "图书未找到",
    };
  }

  return {
    title: `${book.title} - 无痛省钱攒钱`,
    description: book.summary,
  };
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Book Header */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover */}
              <div className="flex-shrink-0 w-48 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <span className="text-8xl">📚</span>
              </div>

              {/* Book Info */}
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                    {book.category}
                  </span>
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-gray-600 text-lg mb-4">{book.author}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-2xl">★</span>
                  <span className="text-2xl font-bold ml-2">{book.rating}</span>
                  <span className="text-gray-400 ml-2">豆瓣评分</span>
                </div>
                <p className="text-gray-700">{book.summary}</p>
              </div>
            </div>
          </div>

          {/* Reading Notes */}
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">阅读笔记</h2>
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{
                __html: book.notes
                  .replace(/## (.*)/g, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
                  .replace(/\d\. \*\*(.*?)\*\*/g, '<p class="font-semibold mt-4 mb-2">$1</p>')
                  .replace(/- (.*)/g, '<li class="ml-4 mb-2">$1</li>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^/, '<p class="mb-4">')
                  .replace(/$/, '</p>')
              }}
            />
          </div>

          {/* Related Books */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {books
                .filter((b) => b.id !== book.id)
                .slice(0, 4)
                .map((b) => (
                  <Link
                    key={b.id}
                    href={`/books/${b.id}`}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-4xl">📚</span>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-1">{b.title}</h3>
                    <p className="text-gray-500 text-xs">{b.author}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
