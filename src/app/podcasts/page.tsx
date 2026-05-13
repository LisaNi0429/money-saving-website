import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { podcasts } from "@/data/content";

export const metadata = {
  title: "播客 - 无痛省钱攒钱",
  description: "省钱故事访谈、消费心理深度解析、理财书籍解读",
};

export default function PodcastsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">省钱播客</h1>
            <p className="text-gray-600 text-lg">
              深度内容，陪伴你的通勤时光
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Subscribe Links */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-8 text-white">
            <h2 className="text-xl font-bold mb-4">订阅我们的播客</h2>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm transition-colors">
                🍎 Apple Podcasts
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm transition-colors">
                🎵 小宇宙
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm transition-colors">
                ☁️ 网易云音乐
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm transition-colors">
                📻 喜马拉雅
              </a>
            </div>
          </div>

          {/* Podcasts List */}
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <Link
                key={podcast.id}
                href={`/podcasts/${podcast.slug}`}
                className="block bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">🎧</span>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">{podcast.title}</h2>
                    <p className="text-gray-600 mb-3">{podcast.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{podcast.duration}</span>
                      <span className="mx-3">·</span>
                      <span>{podcast.playCount.toLocaleString()} 次播放</span>
                      <span className="mx-3">·</span>
                      <span>{podcast.date}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <div className="bg-green-100 rounded-full p-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 5.84a.5.5 0 01.77-.42l7.15 4.16a.5.5 0 010 .84l-7.15 4.16a.5.5 0 01-.77-.42V5.84z" />
                      </svg>
                    </div>
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
