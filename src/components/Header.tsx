"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useTranslation } from "@/lib/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/articles", label: "articles" },
  { href: "/videos", label: "videos" },
  { href: "/podcasts", label: "podcasts" },
  { href: "/books", label: "books" },
];

export default function Header() {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E8E4]"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#0F4C3A] flex items-center justify-center group-hover:bg-[#1A6B52] transition-colors">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#0F4C3A] hidden sm:block group-hover:text-[#1A6B52] transition-colors">
              {t("nav.home")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="px-4 py-2 text-sm font-medium text-[#4A5568] hover:text-[#0F4C3A] rounded-lg hover:bg-[#FAFAF8] transition-all"
              >
                {t(`nav.${link.label}`)}
              </Link>
            ))}
          </nav>

          {/* Right Side: Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/plan`}
              className="inline-flex items-center gap-2 bg-[#0F4C3A] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#1A6B52] transition-all shadow-md hover:shadow-lg"
            >
              {t("nav.startSaving")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-[#4A5568] hover:bg-[#FAFAF8] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#E8E8E4] py-4 animate-fade-in-down">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="px-4 py-3 text-[#4A5568] hover:text-[#0F4C3A] hover:bg-[#FAFAF8] rounded-lg font-medium transition-all"
                >
                  {t(`nav.${link.label}`)}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-[#E8E8E4]">
                <Link
                  href={`/${locale}/plan`}
                  className="flex items-center justify-center gap-2 bg-[#0F4C3A] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#1A6B52] transition-all"
                >
                  {t("nav.startSaving")}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
