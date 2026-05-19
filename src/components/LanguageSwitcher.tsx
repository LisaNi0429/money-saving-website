"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { useTranslation } from "@/lib/I18nContext";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useTranslation();

  // Get current locale from context
  const validLocale = locales.includes(locale as Locale) ? locale : "zh";

  // Get the path without locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(zh|en)/, "") || "/";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:text-[#0F4C3A] hover:bg-[#F1F1ED] transition-colors"
        aria-label="Switch language"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span className="hidden sm:inline">{localeLabels[validLocale]}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E8E8E4] py-2 z-50 animate-fade-in-down">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${pathWithoutLocale}`}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  validLocale === l
                    ? "text-[#0F4C3A] bg-[#E8F5E9] font-medium"
                    : "text-[#4A5568] hover:bg-[#FAFAF8] hover:text-[#0F4C3A]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {localeLabels[l]}
                {validLocale === l && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
