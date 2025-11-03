"use client";

export default function PriceSection() {
  const grandMenu = [
    { category: "カット（ブロー付）", details: "¥3,600〜" },
    { category: "キッズカット", details: "¥2,000〜" },
    { category: "パーマ（カット別）", details: "¥3,600〜" },
    { category: "ヘアカラー", details: "¥4,500〜" },
    { category: "ハーブカラー", details: "¥7,500〜" },
    { category: "縮毛矯正", details: "¥18,000〜" },
    { category: "セット", details: "¥4,500〜" },
    { category: "ヘッドスパ", details: "¥3,000〜" },
  ];

  const kimonoMenu = [
    { category: "訪問着・留袖", details: "¥7,000" },
    { category: "振袖", details: "¥10,000" },
    { category: "七五三（七歳）", details: "¥7,000" },
    { category: "七五三（五歳）", details: "¥5,000" },
    { category: "七五三（三歳）", details: "¥3,000" },
    { category: "日本髪", details: "¥8,000" },
    { category: "浴衣", details: "¥3,000" },
  ];

  return (
    <section id="price" className="w-full bg-gray-50 py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center font-playfair">
          料金案内
        </h2>

        {/* Grand Menu */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-20">
          <h3 className="text-2xl font-semibold text-gray-800 bg-pink-50 py-6 px-8 border-b">
            グランドメニュー
          </h3>
          <table className="w-full">
            <tbody>
              {grandMenu.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-200`}
                >
                  <th className="px-6 md:px-12 py-6 text-left text-gray-700 font-semibold w-2/3 border-b text-xl">
                    {item.category}
                  </th>
                  <td className="px-6 md:px-12 py-6 text-gray-800 border-b text-right text-2xl font-bold">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kimono Menu */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <h3 className="text-2xl font-semibold text-gray-800 bg-pink-50 py-6 px-8 border-b">
            着付けメニュー
          </h3>
          <table className="w-full">
            <tbody>
              {kimonoMenu.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-200`}
                >
                  <th className="px-6 md:px-12 py-6 text-left text-gray-700 font-semibold w-2/3 border-b text-xl">
                    {item.category}
                  </th>
                  <td className="px-6 md:px-12 py-6 text-gray-800 border-b text-right text-2xl font-bold">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-8 py-6 text-gray-600 text-center border-t">
            （メイクサービスあり）
          </div>
        </div>

        {/* Notes */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            ※価格は全て税抜表示です。詳細はお気軽にお問い合わせください。
          </p>
          <p className="text-gray-600 text-lg mt-2">
            （現金・PayPay・d払い対応）／駐車場１台あり
          </p>
          <p className="text-gray-600 text-lg mt-2">
            営業時間：9:00〜18:00 ／ 定休日：毎週火曜日・他2回月曜
          </p>
          <p className="text-gray-600 text-lg mt-2">
            ご予約優先　TEL：03-3859-7687
          </p>
        </div>
      </div>
    </section>
  );
}
