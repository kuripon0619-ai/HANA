"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 50);

      if (currentScrollPos > 50) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "#top", label: "トップ" },
    { href: "#services", label: "サービス" },
    { href: "#stylists", label: "スタイリスト" },
    { href: "#gallery", label: "ギャラリー" },
    { href: "#price", label: "料金案内" },
    { href: "#access", label: "店舗情報" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl px-2 sm:px-4 lg:px-6 mx-auto py-4 flex justify-between items-center">
        {/* ロゴ */}
        <h1
          className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? "text-gray-800" : "text-black text-outline-white"
          }`}
        >
          hana
        </h1>

        {/* ハンバーガーメニューボタン */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 transform transition-all duration-300 ${
                isScrolled ? "bg-gray-600" : "bg-black text-outline-white"
              } ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${
                isScrolled ? "bg-gray-600" : "bg-black text-outline-white"
              } ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-full h-0.5 transform transition-all duration-300 ${
                isScrolled ? "bg-gray-600" : "bg-black text-outline-white"
              } ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>

        {/* デスクトップメニュー */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-pink-500"
                  : "text-black text-outline-white hover:text-pink-200"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* モバイルメニュー */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label="メニューを閉じる"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="flex flex-col items-center justify-center h-full gap-8 px-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-gray-700 hover:text-pink-500 transition text-center w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000786806&ch=1&vos=cphpbprocap0130408002"
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-full text-center hover:bg-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ホットペッパービューティーで予約する
            </a>
            <a
              href="https://beauty.rakuten.co.jp/stf0249888/"
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-full text-center hover:bg-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              楽天ビューティーで予約する
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
