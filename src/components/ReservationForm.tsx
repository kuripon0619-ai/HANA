"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    menu: "",
    notes: "",
  });

  // 当日の日付を取得
  const today = new Date().toISOString().split("T")[0];

  // 15分単位の時間オプションを生成
  const timeOptions = [];
  for (let hour = 10; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push(time);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">予約フォーム</h2>
        <Link
          href="/"
          className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          ホームに戻る
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-1 focus:ring-offset-2 transition-all duration-200 [caret-color:theme(colors.indigo.500)]"
            placeholder="山田 太郎"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-smfocus:ring-1 focus:ring-offset-2 transition-all duration-200 [caret-color:theme(colors.indigo.500)]"
            placeholder="090-1234-5678"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-smfocus:ring-1 focus:ring-offset-2 transition-all duration-200 [caret-color:theme(colors.indigo.500)]"
            placeholder="example@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              希望日 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                required
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-1 focus:ring-offset-2 transition-all duration-200 appearance-none [caret-color:theme(colors.indigo.500)]"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              希望時間 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-1 focus:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">選択してください</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="menu"
            className="block text-sm font-medium text-gray-700"
          >
            希望メニュー <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="menu"
              name="menu"
              required
              value={formData.menu}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-smfocus:ring-1 focus:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">選択してください</option>
              <option value="cut">カット</option>
              <option value="color">カラー</option>
              <option value="perm">パーマ</option>
              <option value="treatment">トリートメント</option>
              <option value="other">その他</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            備考
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-smfocus:ring-1 focus:ring-offset-2 transition-all duration-200 [caret-color:theme(colors.indigo.500)]"
            placeholder="ご要望やご質問などございましたら、こちらにご記入ください。"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-nonefocus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            予約を確定する
          </button>
        </div>
      </form>
    </div>
  );
}
