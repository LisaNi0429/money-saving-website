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

      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Podcast Player */}
          <div className="bg-white rounded-2xl p-8 mb-6">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                <span className="text-6xl">🎧</span>
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{podcast.title}</h1>
                <p className="text-gray-600 mb-4">{podcast.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{podcast.duration}</span>
                  <span className="mx-3">·</span>
                  <span>{podcast.playCount.toLocaleString()} 次播放</span>
                  <span className="mx-3">·</span>
                  <span>{podcast.date}</span>
                </div>

                {/* Audio Player Placeholder */}
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <button className="bg-green-600 text-white rounded-full p-3 hover:bg-green-700 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 5.84a.5.5 0 01.77-.42l7.15 4.16a.5.5 0 010 .84l-7.15 4.16a.5.5 0 01-.77-.42V5.84z" />
                      </svg>
                    </button>
                    <div className="flex-grow">
                      <div className="bg-gray-300 h-2 rounded-full">
                        <div className="bg-green-600 h-2 rounded-full w-1/3"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
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
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">节目笔记</h2>
            <div className="space-y-3 text-gray-700">
              <p>📝 本期要点整理中...</p>
              <p>我们会在节目上线后24小时内更新详细的节目笔记和时间轴。</p>
            </div>

            {/* Download */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">下载</h3>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="text-green-600 hover:text-green-700 text-sm">
                  下载音频文件
                </a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-green-600 hover:text-green-700 text-sm">
                  下载节目文稿
                </a>
              </div>
            </div>
          </div>

          {/* More Episodes */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">更多节目</h2>
            <div className="space-y-3">
              {podcasts
                .filter((p) => p.id !== podcast.id)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/podcasts/${p.slug}`}
                    className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎧</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{p.title}</h3>
                        <p className="text-sm text-gray-500">{p.duration} · {p.date}</p>
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
