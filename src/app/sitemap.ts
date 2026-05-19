import { MetadataRoute } from "next";
import { articles, videos, podcasts, books } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lisani0429.github.io";
  const basePath = "/money-saving-website";
  const locales = ["zh", "en"];

  const pages: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Static pages
    pages.push(
      {
        url: `${baseUrl}${basePath}/${locale}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}${basePath}/${locale}/articles/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}${basePath}/${locale}/videos/`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}${basePath}/${locale}/podcasts/`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}${basePath}/${locale}/books/`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}${basePath}/${locale}/plan/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      }
    );

    // Dynamic pages
    articles.forEach((article) => {
      pages.push({
        url: `${baseUrl}${basePath}/${locale}/articles/${article.slug}/`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    videos.forEach((video) => {
      pages.push({
        url: `${baseUrl}${basePath}/${locale}/videos/${video.slug}/`,
        lastModified: new Date(video.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    podcasts.forEach((podcast) => {
      pages.push({
        url: `${baseUrl}${basePath}/${locale}/podcasts/${podcast.slug}/`,
        lastModified: new Date(podcast.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    books.forEach((book) => {
      pages.push({
        url: `${baseUrl}${basePath}/${locale}/books/${book.id}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  return pages;
}
