import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos } from "@/data/content";

export const metadata = {
  title: "短视频 - 无痛省钱攒钱",
  description: "精选省钱短视频，快速掌握实用省钱技巧",
};

export default function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">省钱短视频</h1>
            <p className="text-gray-600 text-lg">
              快速掌握实用省钱技巧，1分钟学会一个妙招
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.slug}`}
                className="group"
              >
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                  <span className="text-5xl">🎬</span>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20">
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
                <p className="text-sm text-gray-500 mt-1">
                  {video.views.toLocaleString()} 次观看 · {video.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
