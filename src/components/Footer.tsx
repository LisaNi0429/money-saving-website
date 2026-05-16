import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F4C3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-tight">无痛省钱攒钱</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              提供个性化省钱计划、实用省钱技巧和情绪价值，帮助你在不知不觉中实现财务改善。让每一分钱都花在刀刃上。
            </p>
            <div className="flex gap-3">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-white/60 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-white/60 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* WeChat */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="WeChat"
              >
                <svg className="w-5 h-5 text-white/60 hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.636 4.616c-3.958 0-7.168 2.697-7.168 6.023 0 3.327 3.21 6.023 7.168 6.023.778 0 1.534-.104 2.245-.3a.72.72 0 01.596.082l1.583.926a.272.272 0 00.14.046c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.49.49 0 01.177-.553C21.828 20.2 22.8 18.522 22.8 16.63c0-3.326-3.21-6.023-7.168-6.023h-.398zm-2.795 3.39c.534 0 .967.44.967.982a.975.975 0 01-.967.983.975.975 0 01-.967-.983c0-.542.433-.982.967-.982zm4.837 0c.534 0 .967.44.967.982a.975.975 0 01-.967.983.975.975 0 01-.967-.983c0-.542.433-.982.967-.982z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">内容板块</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/articles" className="text-sm text-white/60 hover:text-white transition-colors">
                  图文文章
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-sm text-white/60 hover:text-white transition-colors">
                  短视频
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="text-sm text-white/60 hover:text-white transition-colors">
                  播客
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-sm text-white/60 hover:text-white transition-colors">
                  图书笔记
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">关于</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/plan" className="text-sm text-white/60 hover:text-white transition-colors">
                  省钱计划
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  使用条款
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; 2026 无痛省钱攒钱. 保留所有权利.
          </p>
          <p className="text-xs text-white/30">
            用心生活，智慧省钱
          </p>
        </div>
      </div>
    </footer>
  );
}
