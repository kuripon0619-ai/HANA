// @ts-expect-error - express types will be installed later
import express, { Request, Response, NextFunction } from "express";
// @ts-expect-error - cors types will be installed later
import cors from "cors";
import reservationRoutes from "./routes/reservations";

const app = express();

// CORSの設定
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://your-domain.com"] // 本番環境のドメイン
      : ["http://localhost:3000"], // 開発環境のドメイン
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ミドルウェアの設定
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// リクエストログ
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ルートの設定
app.use("/api/reservations", reservationRoutes);

// 404エラーハンドリング
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "指定されたエンドポイントは存在しません",
  });
});

// エラーハンドリング
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("エラーが発生しました:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: "サーバーでエラーが発生しました",
  });
});

// サーバーの起動
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
  console.log(`環境: ${process.env.NODE_ENV || "development"}`);
});
