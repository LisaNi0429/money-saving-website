import { MetadataRoute } from "next";
import { articles, videos, podcasts, books } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://moneysaving.example.com";

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/articles`, priority: 0.9 },
    { url: `${baseUrl}/videos`, priority: 0.9 },
    { url: `${baseUrl}/podcasts`, priority: 0.9 },
    { url: `${baseUrl}/books`, priority: 0.9 },
    { url: `${baseUrl}/plan`, priority: 0.9 },
  ];

  // Article pages
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.date,
    priority: 0.8,
  }));

  // Video pages
  const videoPages = videos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: video.date,
    priority: 0.8,
  }));

  // Podcast pages
  const podcastPages = podcasts.map((podcast) => ({
    url: `${baseUrl}/podcasts/${podcast.slug}`,
    lastModified: podcast.date,
    priority: 0.8,
  }));

  // Book pages
  const bookPages = books.map((book) => ({
    url: `${baseUrl}/books/${book.id}`,
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages, ...videoPages, ...podcastPages, ...bookPages];
}
