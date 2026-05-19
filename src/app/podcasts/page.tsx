import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { podcasts } from "@/data/content";

export const metadata: Metadata = {
  title: "省钱播客 - 深度内容陪伴你的通勤时光",
  description: "省钱故事访谈、消费心理深度解析、理财书籍解读，用播客陪伴你的通勤时光，深度内容助你建立正确的消费观念。",
  keywords: ["省钱播客", "理财播客", "消费心理", "理财书籍", "省钱故事"],
  alternates: {
    canonical: "/money-saving-website/podcasts/",
  },
  openGraph: {
    title: "省钱播客 - 深度内容陪伴你的通勤时光",
    description: "省钱故事访谈、消费心理深度解析、理财书籍解读",
    url: "https://lisani0429.github.io/money-saving-website/podcasts/",
    siteName: "无痛省钱攒钱",
    locale: "zh_CN",
    type: "website",
  },
};

export default function PodcastsPage() {
  // JSON-LD structured data - PodcastSeries
  const podcastSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "省钱播客",
    description: "省钱故事访谈、消费心理深度解析、理财书籍解读",
    url: "https://lisani0429.github.io/money-saving-website/podcasts/",
    webFeed: "https://lisani0429.github.io/money-saving-website/podcasts/feed.xml",
    author: {
      "@type": "Organization",
      name: "无痛省钱攒钱",
    },
    episode: podcasts.map((podcast) => ({
      "@type": "PodcastEpisode",
      name: podcast.title,
      description: podcast.description,
      url: `https://lisani0429.github.io/money-saving-website/podcasts/${podcast.slug}/`,
      datePublished: podcast.date,
      duration: podcast.duration,
    })),
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
        name: "省钱播客",
        item: "https://lisani0429.github.io/money-saving-website/podcasts/",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-grow">
        {/* Page Banner */}
        <div className="relative overflow-hidden gradient-forest text-white">
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/10" />
          <div className="absolute bottom-[-60px] left-[-30px] w-[160px] h-[160px] rounded-full border border-white/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <p className="text-[#D4A853] text-sm font-medium tracking-widest uppercase mb-3">Podcast</p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              省钱播客
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              深度内容，陪伴你的通勤时光
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Subscribe Links */}
          <div className="bg-gradient-to-r from-[#0F4C3A] to-[#1A6B52] rounded-2xl p-6 md:p-8 mb-10 text-white relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10" />
            <div className="relative">
              <h2 className="text-xl font-bold mb-5">订阅我们的播客</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Apple Podcasts", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.165a10.16 10.16 0 00-1.564-.073C17.342.038 16.548 0 15.753 0H8.247c-.795 0-1.59.038-2.383.092-.524.03-1.048.1-1.564.21A5.022 5.022 0 002.426.89C1.308 1.624.563 2.624.246 3.934a9.23 9.23 0 00-.24 2.19C.003 6.916 0 7.71 0 8.504v6.992c0 .795.003 1.59.006 2.38a9.23 9.23 0 00.24 2.19c.317 1.31 1.062 2.31 2.18 3.043.525.34 1.09.568 1.7.724.516.11 1.04.18 1.564.21.793.054 1.588.092 2.383.092h7.506c.795 0 1.59-.038 2.383-.092.524-.03 1.048-.1 1.564-.21a5.022 5.022 0 001.7-.724c1.118-.733 1.863-1.733 2.18-3.043.117-.724.2-1.456.24-2.19.003-.79.006-1.585.006-2.38V8.504c0-.795-.003-1.59-.006-2.38zM12 18.578a5.415 5.415 0 01-3.818-1.584 5.415 5.415 0 01-1.584-3.818c0-1.49.598-2.79 1.584-3.818A5.415 5.415 0 0112 7.774a5.415 5.415 0 013.818 1.584A5.415 5.415 0 0117.402 13.176a5.415 5.415 0 01-1.584 3.818A5.415 5.415 0 0112 18.578z"/></svg>
                  )},
                  { label: "小宇宙", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
                  )},
                  { label: "网易云音乐", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  )},
                  { label: "喜马拉雅", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  )},
                ].map((platform) => (
                  <a
                    key={platform.label}
                    href="#"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full text-sm transition-colors backdrop-blur-sm"
                  >
                    {platform.icon}
                    {platform.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Podcasts List */}
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <Link
                key={podcast.id}
                href={`/podcasts/${podcast.slug}`}
                className="card-hover group block bg-white rounded-2xl p-6 border border-[#E8E8E4] hover:border-[#D4A853]/30"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl gradient-podcast flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#B8912E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h2 className="text-xl font-bold text-[#0F4C3A] mb-2 group-hover:text-[#10B981] transition-colors">
                      {podcast.title}
                    </h2>
                    <p className="text-[#4A5568] text-sm mb-3 leading-relaxed">{podcast.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                      <span className="tag-capsule bg-[#FAFAF8] text-[#4A5568] border border-[#E8E8E4]">{podcast.duration}</span>
                      <span>{podcast.playCount.toLocaleString()} 次播放</span>
                      <span>{podcast.date}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <div className="w-12 h-12 rounded-full bg-[#0F4C3A] flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
                      <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
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
