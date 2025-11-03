"use client";

import Image from "next/image";

const ServiceSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 見出し */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            hana美容室は
            <br />
            あなたに寄り添う美容室
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            あなたの魅力を引き出す オシャレをとことん楽しもう♪
            理想のヘアスタイルが手に入る。
          </p>
        </div>

        {/* メインイメージ */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            alt="HANA美容室 外観"
            className="w-full h-[1200px] object-cover"
            src="/images/IMG_5223.jpeg"
            width={1600}
            height={1200}
            priority
          />
        </div>

        {/* 本文 */}
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 items-start">
          {/* 左側 */}
          <div className="text-center md:text-left flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              少人数のプライベートサロン
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              心を込めてお客様の「カワイイ＆キレイ」をサポート！
              明るく華やかな空間で、ヘアスタイルを変え気分をリフレッシュ
              それぞれの悩みや好み、ライフスタイルに合わせて
              経験豊富なスタイリストが「なりたい」を叶えます
            </p>
          </div>

          {/* 右側 */}
          <div className="text-center md:text-left flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              理想のスタイルをプロデュース
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              お客様ひとりひとりに合わせたプロデュースで
              「カワイイ」「カッコイイ」を実現します
              年齢を重ねても美しく♪自分らしさを大切にできるサロン☆メンズにもお勧め
              一人ひとりの骨格に合わせたオーダーメイドなヘアスタイルを提案します。
              一緒にあなたの魅力を最大限に引き出しましょう！
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
