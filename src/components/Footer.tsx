"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const contentLinks = [
  { href: "/articles", label: "articles" },
  { href: "/videos", label: "videos" },
  { href: "/podcasts", label: "podcasts" },
  { href: "/books", label: "books" },
];

const aboutLinks = [
  { href: "#", label: "contact" },
  { href: "#", label: "privacy" },
  { href: "#", label: "terms" },
];

export default function Footer() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();

  return (
    <footer className="bg-[#0F4C3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
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
              <span className="text-lg font-bold">{t("footer.brand")}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
              {t("footer.description")}
            </p>
            <p className="text-white/40 text-xs italic">{t("footer.slogan")}</p>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              {t("footer.contentLinks")}
            </h3>
            <ul className="space-y-3">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {t(`nav.${link.label}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/plan`}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {t("nav.plan")}
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              {t("footer.aboutLinks")}
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {t(`footer.${link.label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {t("footer.brand")}. {t("footer.copyright")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
