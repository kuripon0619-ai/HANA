"use client";

import Image from "next/image";

const AccessSection = () => {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        {/* 左側: 地図 */}
        <div className="lg:w-2/3 md:w-1/2 bg-orange-100 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="地図"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.0488521724874!2d139.810747!3d35.79873399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601891b45b09ef99%3A0x3ebd973aa48c3cc4!2z77yo77yh77yu77yh576O5a655a6k!5e0!3m2!1sja!2sjp!4v1762147798861!5m2!1sja!2sjp"
            style={{ filter: "sepia(0.5) saturate(1.5) hue-rotate(-10deg)" }}
          />
          <div className="bg-white relative flex flex-wrap py-6 pl-8 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                住所
              </h2>
              <p className="mt-1">東京都足立区花畑1-7-3</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                メール
              </h2>
              <a className="text-pink-500 leading-relaxed">
                natura0706@gmail.com
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                電話
              </h2>
              <p className="leading-relaxed">03-1234-5678</p>
            </div>
          </div>
        </div>

        {/* 右側: 店舗情報 */}
        <div className="lg:w-1/3 md:w-1/2 bg-gray-100 flex flex-col w-full md:py-8 mt-8 md:mt-0 md:ml-20 text-center rounded-lg p-8">
          <h2 className="text-gray-900 text-2xl mb-4 font-medium title-font">
            アクセス情報
          </h2>

          <div className="relative mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              営業時間
            </h3>
            <p className="text-gray-600">
              店休日:毎週月火 平日: 9:00 - 18:00 時間外対応あり
            </p>
          </div>

          <div className="relative mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              アクセス
            </h3>
            <p className="text-gray-600">
              東部バスセントラル「第五都営住宅」より徒歩2分
            </p>
          </div>

          <div className="relative mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">駐車場</h3>
            <p className="text-gray-600">
              近隣にコインパーキングあり
              <br />
              （最初の1時間無料）
            </p>
          </div>

          <div className="relative mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">定休日</h3>
            <p className="text-gray-600">
              毎週月火
              <br />
              （祝日は営業）
            </p>
          </div>

          {/* --- ホットペッパービューティー連携 --- */}
          <div className="mt-auto border-t border-gray-300 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ご予約はこちらから
              <br />
              楽天beauty
            </h3>

            <div className="flex flex-col items-center justify-center gap-4">
              <a
                href="https://beauty.rakuten.co.jp/s4000055936/?lsid=o_yho_lis-dsa_1tk_20231201_all_999nn9&sa_p=YSA&sa_cc=1000305438&sa_t=1761819569836&sa_ra=D9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <Image
                  src="/images/IMG_0757.png"
                  alt="Hot Pepper Beauty"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </a>

              <a
                href="https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000786806&ch=1&vos=cphpbprocap0130408002"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                ホットペッパービューティーで予約
              </a>
              <a>ホットペッパー用QR</a>
              <Image
                src="/images/unnamed.jpg"
                alt="Hot Pepper QRコード"
                width={120}
                height={120}
                className="rounded-lg border border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessSection;
