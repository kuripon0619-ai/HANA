import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的出力
  images: {
    unoptimized: true, // ← これを追加！
  },
};

export default nextConfig;
