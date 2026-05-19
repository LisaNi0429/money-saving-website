"use client";

import { I18nContext } from "@/lib/I18nContext";
import { t as translate, type Locale } from "@/lib/i18n";

export default function LocaleLayoutClient({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Record<string, unknown>;
  children: React.ReactNode;
}) {
  // Create translation function
  function t(key: string): string {
    return translate(messages, key);
  }

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Noto Sans SC', system-ui, sans-serif" }}>
        <I18nContext.Provider value={{ locale, t }}>
          {children}
        </I18nContext.Provider>
      </body>
    </html>
  );
}
