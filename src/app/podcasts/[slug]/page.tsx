import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { podcasts } from "@/data/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return podcasts.map((podcast) => ({
    slug: podcast.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const podcast = podcasts.find((p) => p.slug === slug);

  if (!podcast) {
    return {
      title: "播客未找到",
    };
  }

  return {
    title: `${podcast.title} - 无痛省钱攒钱`,
    description: podcast.description,
  };
}

export default async function PodcastPage({ params }: Props) {
  const { slug } = await params;
  const podcast = podcasts.find((p) => p.slug === slug);

  if (!podcast) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
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
              <Link href="/podcasts" className="hover:text-[#0F4C3A] transition-colors">播客</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-[#4A5568] truncate max-w-[200px]">{podcast.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Podcast Player */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E8E4] mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0 w-32 h-32 rounded-2xl gradient-podcast flex items-center justify-center">
                <svg className="w-14 h-14 text-[#B8912E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <div className="flex-grow">
                <h1
                  className="text-2xl md:text-3xl font-bold text-[#0F4C3A] mb-3"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {podcast.title}
                </h1>
                <p className="text-[#4A5568] mb-4 leading-relaxed">{podcast.description}</p>
                <div className="flex items-center gap-4 text-sm text-[#94A3B8] mb-6">
                  <span className="tag-capsule bg-[#FAFAF8] text-[#4A5568] border border-[#E8E8E4]">{podcast.duration}</span>
                  <span>{podcast.playCount.toLocaleString()} 次播放</span>
                  <span>{podcast.date}</span>
                </div>

                {/* Audio Player Placeholder */}
                <div className="bg-[#FAFAF8] rounded-xl p-5 border border-[#E8E8E4]">
                  <div className="flex items-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center hover:bg-[#1A6B52] transition-colors flex-shrink-0">
                      <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </button>
                    <div className="flex-grow">
                      <div className="bg-[#E8E8E4] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#0F4C3A] h-1.5 rounded-full w-1/3 transition-all" />
                      </div>
                      <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
                        <span>08:30</span>
                        <span>{podcast.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Show Notes */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E8E4] mb-6">
            <h2 className="text-xl font-bold text-[#0F4C3A] mb-4">节目笔记</h2>
            <div className="space-y-3 text-[#4A5568]">
              <p className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                本期要点整理中...
              </p>
              <p>我们会在节目上线后24小时内更新详细的节目笔记和时间轴。</p>
            </div>

            {/* Download */}
            <div className="mt-6 pt-6 border-t border-[#E8E8E4]">
              <h3 className="font-semibold text-[#0F4C3A] mb-3">下载</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-[#0F4C3A] hover:text-[#10B981] transition-colors font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  下载音频文件
                </a>
                <span className="text-[#E8E8E4]">|</span>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-[#0F4C3A] hover:text-[#10B981] transition-colors font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  下载节目文稿
                </a>
              </div>
            </div>
          </div>

          {/* More Episodes */}
          <div>
            <h2 className="text-xl font-bold text-[#0F4C3A] mb-6">更多节目</h2>
            <div className="space-y-3">
              {podcasts
                .filter((p) => p.id !== podcast.id)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/podcasts/${p.slug}`}
                    className="card-hover group block bg-white rounded-xl p-5 border border-[#E8E8E4] hover:border-[#D4A853]/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-podcast flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#B8912E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-[#0F4C3A] group-hover:text-[#10B981] transition-colors truncate">{p.title}</h3>
                        <p className="text-sm text-[#94A3B8]">{p.duration} &middot; {p.date}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
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
