// @ts-expect-error - express types will be installed later
import express, { Request, Response } from "express";
// @ts-expect-error - zod types will be installed later
import { z } from "zod";

const router = express.Router();

// 予約データのバリデーションスキーマ
const reservationSchema = z.object({
  name: z.string().min(1, "お名前は必須です"),
  phone: z.string().regex(/^[0-9-]+$/, "電話番号の形式が正しくありません"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付の形式が正しくありません"),
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "時間の形式が正しくありません"),
  menu: z.enum(["cut", "color", "perm", "treatment", "other"], {
    errorMap: () => ({ message: "メニューを選択してください" }),
  }),
  notes: z.string().optional(),
});

// 予約データの型定義
type Reservation = z.infer<typeof reservationSchema> & {
  id: number;
  createdAt: Date;
};

// 仮のデータストア（実際の実装ではデータベースを使用）
const reservations: Reservation[] = [];
let nextId = 1;

// POST: 新規予約
router.post("/", async (req: Request, res: Response) => {
  try {
    // リクエストボディのバリデーション
    const validatedData = reservationSchema.parse(req.body);

    // 予約可能時間のチェック
    const reservationTime = new Date(
      `${validatedData.date}T${validatedData.time}`
    );
    const now = new Date();

    if (reservationTime < now) {
      return res.status(400).json({
        error: "過去の日時は予約できません",
      });
    }

    // 予約の重複チェック
    const isDuplicate = reservations.some(
      (r) => r.date === validatedData.date && r.time === validatedData.time
    );

    if (isDuplicate) {
      return res.status(400).json({
        error: "この時間枠は既に予約されています",
      });
    }

    // 予約データの作成
    const newReservation: Reservation = {
      id: nextId++,
      ...validatedData,
      createdAt: new Date(),
    };

    // 予約の保存（実際の実装ではデータベースに保存）
    reservations.push(newReservation);

    res.status(201).json({
      message: "予約が登録されました",
      reservation: newReservation,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "入力データが正しくありません",
        details: (error as z.ZodError).errors,
      });
    }

    console.error("予約登録エラー:", error);
    res.status(500).json({
      error: "予約の登録中にエラーが発生しました",
    });
  }
});

// GET: 予約一覧
router.get("/", (req: Request, res: Response) => {
  try {
    // 日付でフィルタリング
    const { date } = req.query;
    let filteredReservations = [...reservations];

    if (date && typeof date === "string") {
      filteredReservations = filteredReservations.filter(
        (r) => r.date === date
      );
    }

    // 日付と時間でソート
    filteredReservations.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    res.json({
      reservations: filteredReservations,
      total: filteredReservations.length,
    });
  } catch (error: unknown) {
    console.error("予約一覧取得エラー:", error);
    res.status(500).json({
      error: "予約一覧の取得中にエラーが発生しました",
    });
  }
});

// GET: 特定の予約の取得
router.get("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const reservation = reservations.find((r) => r.id === id);

    if (!reservation) {
      return res.status(404).json({
        error: "指定された予約が見つかりません",
      });
    }

    res.json(reservation);
  } catch (error: unknown) {
    console.error("予約取得エラー:", error);
    res.status(500).json({
      error: "予約の取得中にエラーが発生しました",
    });
  }
});

// DELETE: 予約のキャンセル
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = reservations.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: "指定された予約が見つかりません",
      });
    }

    reservations.splice(index, 1);
    res.json({
      message: "予約がキャンセルされました",
    });
  } catch (error: unknown) {
    console.error("予約キャンセルエラー:", error);
    res.status(500).json({
      error: "予約のキャンセル中にエラーが発生しました",
    });
  }
});

export default router;
