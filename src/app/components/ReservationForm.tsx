import { useState } from "react";
import { ServiceSection } from "./ServiceSection";

interface ReservationFormProps {
  services: ServiceSection[];
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  menu?: string;
}

interface ReservationDetails {
  date: string;
  time: string;
}

interface ApiError {
  success: false;
  error: string;
  validationErrors?: FormErrors;
  code?: string;
  details?: string | ReservationDetails;
}

export default function ReservationForm({ services }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    menu: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 名前のバリデーション
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }

    // 電話番号のバリデーション
    const phoneRegex = /^[0-9-]+$/;
    if (!formData.phone) {
      newErrors.phone = "電話番号を入力してください";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "電話番号は数字とハイフンのみ使用できます";
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "メールアドレスの形式が正しくありません";
    }

    // 日付のバリデーション
    if (!formData.preferredDate) {
      newErrors.preferredDate = "希望日を選択してください";
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferredDate = "過去の日付は選択できません";
      }
    }

    // 時間のバリデーション
    if (!formData.preferredTime) {
      newErrors.preferredTime = "希望時間を選択してください";
    } else {
      const [hours] = formData.preferredTime.split(":").map(Number);
      if (hours < 10 || hours >= 19) {
        newErrors.preferredTime =
          "営業時間（10:00〜19:00）内で選択してください";
      }
    }

    // メニューのバリデーション
    if (!formData.menu) {
      newErrors.menu = "メニューを選択してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    setErrors({});

    if (!validateForm()) {
      setStatus({
        type: "error",
        message: "入力内容に誤りがあります。各項目をご確認ください。",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;

        // バリデーションエラーの場合
        if (errorData.validationErrors) {
          setErrors(errorData.validationErrors);
          setStatus({
            type: "error",
            message: errorData.error,
          });
          return;
        }

        // 予約時間の重複エラーの場合
        if (response.status === 409 && typeof errorData.details === "object") {
          const details = errorData.details as ReservationDetails;
          setStatus({
            type: "error",
            message: `${errorData.error}（${details.date} ${details.time}）`,
          });
          return;
        }

        // その他のエラー
        throw new Error(errorData.error);
      }

      setStatus({
        type: "success",
        message:
          "予約が完了しました。確認メールをお送りしますので、ご確認ください。",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        preferredDate: "",
        preferredTime: "",
        menu: "",
        notes: "",
      });
      setErrors({});
    } catch (error) {
      console.error("予約エラー:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "予約の作成に失敗しました",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    // エラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status.type && (
        <div
          className={`p-4 rounded-md ${
            status.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      <div>
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
          value={formData.name}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.name ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
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
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="例: 090-1234-5678"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.phone ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
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
          value={formData.email}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.email ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="preferredDate"
          className="block text-sm font-medium text-gray-700"
        >
          希望日 <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.preferredDate ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.preferredDate && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="preferredTime"
          className="block text-sm font-medium text-gray-700"
        >
          希望時間 <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          required
          min="10:00"
          max="19:00"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.preferredTime ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.preferredTime && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredTime}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="menu"
          className="block text-sm font-medium text-gray-700"
        >
          メニュー <span className="text-red-500">*</span>
        </label>
        <select
          id="menu"
          name="menu"
          value={formData.menu}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.menu ? "border-red-300" : "border-gray-300"
          }`}
        >
          <option value="">メニューを選択してください</option>
          {services.map((service) => (
            <optgroup key={service.title} label={service.title}>
              {service.items.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} - ¥{item.price.toLocaleString()}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.menu && (
          <p className="mt-1 text-sm text-red-600">{errors.menu}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          備考
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isSubmitting ? "送信中..." : "予約する"}
        </button>
      </div>
    </form>
  );
}
