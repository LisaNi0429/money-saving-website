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

      <main className="flex-grow">
        {/* Page Banner */}
        <div className="relative overflow-hidden gradient-forest text-white">
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/10" />
          <div className="absolute bottom-[-60px] left-[-30px] w-[160px] h-[160px] rounded-full border border-white/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-3">Videos</p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              省钱短视频
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
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
                className="card-hover group"
              >
                <div className="relative aspect-video gradient-video rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center animate-pulse-play shadow-lg">
                      <svg className="w-6 h-6 text-[#0F4C3A] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                  <svg className="relative w-10 h-10 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-semibold text-[#0F4C3A] line-clamp-2 group-hover:text-[#10B981] transition-colors text-sm leading-snug">
                  {video.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-2">
                  {video.views.toLocaleString()} 次观看 &middot; {video.date}
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
