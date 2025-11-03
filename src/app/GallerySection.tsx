"use client";

import { useState, useEffect } from "react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      src: "images/IMG_5234.jpeg",
      title: "モダンなサロン空間",
      description: "明るく開放的な空間で、リラックスした時間をあなたに。",
    },
    {
      src: "images/IMG_0753.jpeg",
      title: "七五三受付中",
      description: "熟練の着付けでご家族に最高の思い出を",
    },
    {
      src: "images/IMG_5230.jpeg",
      title: "落ち着く空間の演出",
      description: "ほっと一息つくような空間",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000); // 5秒ごとに切り替え
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsAutoPlaying(false);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsAutoPlaying(true);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="gallery"
      className="w-full bg-white py-20 px-6 border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          ギャラリー
        </h2>

        {/* スライドショー */}
        <div className="relative mb-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 relative">
              <img
                src={images[currentSlide].src}
                alt={`ギャラリー${currentSlide + 1}`}
                className="w-full h-[500px] object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleImageClick(images[currentSlide].src)}
              />
              {/* ナビゲーションボタン */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              >
                →
              </button>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {images[currentSlide].title}
              </h3>
              <p className="text-gray-700">
                {images[currentSlide].description}
              </p>
            </div>
          </div>

          {/* インジケーター */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* モーダル */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl w-full mx-4">
            <img
              src={selectedImage}
              alt="拡大画像"
              className="w-full h-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={handleCloseModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
