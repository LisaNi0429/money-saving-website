"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "首页" },
    { href: "/articles", label: "图文文章" },
    { href: "/videos", label: "短视频" },
    { href: "/podcasts", label: "播客" },
    { href: "/books", label: "图书笔记" },
    { href: "/plan", label: "省钱计划" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#0F4C3A] flex items-center justify-center group-hover:bg-[#1A6B52] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-[#0F4C3A] tracking-tight">
              无痛省钱攒钱
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-sm font-medium text-[#4A5568] hover:text-[#0F4C3A] px-4 py-2 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/plan"
              className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F4C3A] text-white text-sm font-medium rounded-full hover:bg-[#1A6B52] transition-all hover:shadow-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
              开始省钱
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl text-[#4A5568] hover:text-[#0F4C3A] hover:bg-[#F1F1ED] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-down">
            <div className="bg-white rounded-2xl shadow-lg border border-[#E8E8E4] p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-[#4A5568] hover:text-[#0F4C3A] hover:bg-[#FAFAF8] px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#E8E8E4]">
                <Link
                  href="/plan"
                  className="block text-center bg-[#0F4C3A] text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#1A6B52] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  开始省钱
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
