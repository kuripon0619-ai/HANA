"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-6 border-t border-gray-200 w-full">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 max-w-none">
        {/* 店名とコピーライト */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold">hana美容室</h3>
          <p className="text-sm mt-1">
            © 2025 Beauty Salon hana. All rights reserved.
          </p>
        </div>

        {/* ナビゲーション */}
        <ul className="flex gap-4 text-sm flex-wrap justify-center sm:justify-end">
          <li>
            <a
              href="#"
              className="hover:underline hover:text-pink-500 transition"
            >
              トップ
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:underline hover:text-pink-500 transition"
            >
              サービス
            </a>
          </li>
          <li>
            <a
              href="#stylists"
              className="hover:underline hover:text-pink-500 transition"
            >
              スタイリスト
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              ギャラリー
            </a>
          </li>
          <li>
            <a
              href="#price"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              料金案内
            </a>
          </li>
          <li>
            <a
              href="#access"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              店舗情報
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
