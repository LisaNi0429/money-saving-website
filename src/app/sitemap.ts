import { MetadataRoute } from "next";
import { articles, videos, podcasts, books } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lisani0429.github.io";
  const basePath = "/money-saving-website";

  // Static pages with priority and changeFrequency
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${basePath}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}${basePath}/articles/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${basePath}/videos/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${basePath}/podcasts/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${basePath}/books/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${basePath}/plan/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}${basePath}/articles/${article.slug}/`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Video pages
  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${baseUrl}${basePath}/videos/${video.slug}/`,
    lastModified: new Date(video.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Podcast pages
  const podcastPages: MetadataRoute.Sitemap = podcasts.map((podcast) => ({
    url: `${baseUrl}${basePath}/podcasts/${podcast.slug}/`,
    lastModified: new Date(podcast.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Book pages
  const bookPages: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}${basePath}/books/${book.id}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages, ...videoPages, ...podcastPages, ...bookPages];
}
