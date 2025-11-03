"use client";

import { useState } from "react";

export default function ReservePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    menu: "",
    notes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableTimes = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const menuOptions = [
    "カット",
    "カラー",
    "パーマ",
    "トリートメント",
    "ヘッドスパ",
    "その他（希望を備考欄にお書きください）",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setShowConfirmModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmReservation = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setError(null);
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join("\n"));
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          preferredDate: form.preferredDate,
          preferredTime: `${form.preferredTime}:00`, // SQL Server expects HH:mm:ss
          menu: form.menu,
          notes: form.notes,
        }),
      });

      if (res.ok) {
        alert("予約が完了しました");
      } else {
        const result = await res.json();
        alert(`エラー: ${result.error}`);
      }
    } catch {
      alert("サーバーエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!/^[0-9-]+$/.test(form.phone)) {
      errors.push("電話番号は数字とハイフンのみ使用できます");
    }
    if (new Date(form.preferredDate) < new Date(new Date().toDateString())) {
      errors.push("予約日は今日以降の日付を選択してください");
    }
    return errors;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow-md"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          お名前
        </label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="山田 太郎"
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          電話番号
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="000-0000-0000"
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="example@example.com"
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          予約日
        </label>
        <input
          type="date"
          name="preferredDate"
          className="w-full px-3 py-2 border rounded-md"
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          予約時間
        </label>
        <select
          name="preferredTime"
          className="w-full px-3 py-2 border rounded-md"
          onChange={handleChange}
          required
        >
          <option value="">時間を選択</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          希望メニュー
        </label>
        <select
          name="menu"
          className="w-full px-3 py-2 border rounded-md"
          onChange={handleChange}
          required
        >
          <option value="">メニューを選択</option>
          {menuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">備考</label>
        <textarea
          name="notes"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="例: アレルギーあり"
          onChange={handleChange}
        ></textarea>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? "送信中..." : "予約する"}
      </button>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">予約内容の確認</h3>
            <p>名前: {form.name}</p>
            <p>
              日時: {form.preferredDate} {form.preferredTime}
            </p>
            <p>メニュー: {form.menu}</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={confirmReservation}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                確認
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
