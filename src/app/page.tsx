"use client";
import { useEffect, useState } from "react";
import ServiceSection from "./ServiceSection";
import StylistSection from "./StylistSection";
import GallerySection from "./GallerySection";
import PriceSection from "./PriceSection";

import AccessSection from "./AccessSection";
import Footer from "./Footer";
import Header from "./Header";

const backgroundImages = [
  "/images/IMG_5221.jpeg",
  "/images/IMG_5228.jpeg",
  "/images/IMG_5230.jpeg",
  "/images/IMG_5225.jpeg",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 初期ロード時に最初の画像を表示
    setIsLoaded(true);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-full overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section
        id="top"
        className="relative w-full min-h-[90vh] md:h-[75vh] overflow-hidden bg-white"
      >
        {backgroundImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`背景画像${index + 1}`}
            className={`
            absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-1000 ease-in-out
        ${currentIndex === index ? "opacity-100" : "opacity-0"}
      `}
          />
        ))}
      </section>

      {/* 以下セクションはそのまま縦並びで表示 */}
      <section id="services" className="relative w-full">
        <h1
          className="absolute -top-6 md:-top-14 left-1/2 transform -translate-x-1/2 
          text-6xl sm:text-7xl md:text-8xl font-bold text-black z-10 
          drop-shadow-lg tracking-wide italic 
          [font-family:var(--font-playfair)]
          px-4 text-center w-full"
        >
          hana
        </h1>

        <ServiceSection />
      </section>
      <section id="stylists" className="w-full">
        <StylistSection />
      </section>
      <section id="gallery" className="w-full">
        <GallerySection />
      </section>
      <section id="price" className="w-full">
        <PriceSection />
      </section>
      <section id="access" className="w-full">
        <AccessSection />
      </section>
      <Footer />
    </div>
  );
}
