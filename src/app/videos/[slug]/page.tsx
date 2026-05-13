import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos } from "@/data/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const video = videos.find((v) => v.slug === slug);

  if (!video) {
    return {
      title: "视频未找到",
    };
  }

  return {
    title: `${video.title} - 无痛省钱攒钱`,
    description: `观看视频：${video.title}`,
  };
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = videos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Video Player Placeholder */}
          <div className="bg-black rounded-2xl aspect-video flex items-center justify-center mb-8">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🎬</div>
              <p className="text-xl">{video.title}</p>
              <p className="text-gray-400 mt-2">视频播放区域（可嵌入B站/YouTube等）</p>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-white rounded-2xl p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
            <div className="flex items-center text-gray-500 text-sm mb-6">
              <span>{video.views.toLocaleString()} 次观看</span>
              <span className="mx-2">·</span>
              <span>时长 {video.duration}</span>
              <span className="mx-2">·</span>
              <span>{video.date}</span>
            </div>

            {/* Related Videos */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-bold mb-4">相关视频</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {videos
                  .filter((v) => v.id !== video.id)
                  .slice(0, 3)
                  .map((v) => (
                    <Link
                      key={v.id}
                      href={`/videos/${v.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-3xl">🎬</span>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                          {v.duration}
                        </div>
                      </div>
                      <h3 className="text-sm font-medium line-clamp-2 group-hover:text-green-600">
                        {v.title}
                      </h3>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
