import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, t as translate, locales, type Locale } from "@/lib/i18n";
import LocaleLayoutClient from "./LocaleLayoutClient";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale as Locale);
  const title = translate(messages, "metadata.home.title");

  return {
    title: {
      default: title,
      template: "%s | " + title.split(" - ")[0],
    },
    description: translate(messages, "metadata.home.description"),
    keywords: ["saving", "money", "finance", "budget", "frugal"],
    metadataBase: new URL("https://lisani0429.github.io"),
    alternates: {
      canonical: "/money-saving-website",
    },
    openGraph: {
      title: title,
      description: translate(messages, "metadata.home.description"),
      url: "https://lisani0429.github.io/money-saving-website",
      siteName: title.split(" - ")[0],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: translate(messages, "metadata.home.description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const messages = getMessages(validLocale);

  return (
    <LocaleLayoutClient locale={validLocale} messages={messages}>
      {children}
    </LocaleLayoutClient>
  );
}
