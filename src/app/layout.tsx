import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Inter（本文用）
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Playfair Display（見出し・ロゴ用）
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "hana",
  description: "美容室hanaの公式サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {/* Playfair Displayをmain全体に適用せず、各セクションで指定できるように */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
