"use client";

const StylistSection = () => {
  return (
    <section className="text-gray-700 body-font bg-white py-24">
      <div className="container px-5 mx-auto text-center md:text-left max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          スタイリスト紹介
        </h2>

        <div className="border-b border-gray-200 pb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            中山 亜子
          </h3>
          <p className="text-pink-500 font-medium mb-4">スタイリスト</p>

          <p className="leading-relaxed text-lg text-gray-700 whitespace-pre-line">
            ショートカットや着付けが得意で、「あなたらしさ」を引き出すスタイルづくりを大切にしています。
            実はオタク趣味もあり、話すのも聞くのも好き！推し色や推しキャラに合わせたカラー提案なんかも大歓迎です♪
            休みの日は海釣りに出かけたり、漫画を読んだり、犬猫と過ごすのが好き🐟📚🐾
            お客様がリラックスして、自然体でいられる空間を提供します。
          </p>
        </div>
      </div>
    </section>
  );
};

export default StylistSection;
