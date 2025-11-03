// app/api/reservations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // --- 時間の正規化 ---
    let preferredTimeStr = data.preferredTime;
    if (/^\d{2}:\d{2}$/.test(preferredTimeStr)) {
      preferredTimeStr += ":00"; // 例: "15:00" → "15:00:00"
    }

    // 入力値のバリデーション
    const validationErrors: { [key: string]: string } = {};

    if (!data.name?.trim()) {
      validationErrors.name = "お名前を入力してください";
    }

    if (!data.phone?.trim()) {
      validationErrors.phone = "電話番号を入力してください";
    } else {
      const phoneRegex = /^[0-9-]+$/;
      if (!phoneRegex.test(data.phone)) {
        validationErrors.phone = "電話番号は数字とハイフンのみ使用できます";
      }
    }

    if (!data.email?.trim()) {
      validationErrors.email = "メールアドレスを入力してください";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        validationErrors.email = "メールアドレスの形式が正しくありません";
      }
    }

    if (!data.preferredDate) {
      validationErrors.preferredDate = "希望日を選択してください";
    } else {
      const selectedDate = new Date(data.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        validationErrors.preferredDate = "過去の日付は選択できません";
      }
    }

    if (!data.preferredTime) {
      validationErrors.preferredTime = "希望時間を選択してください";
    } else {
      const [hours] = data.preferredTime.split(":").map(Number);
      if (hours < 10 || hours >= 19) {
        validationErrors.preferredTime =
          "営業時間（10:00〜19:00）内で選択してください";
      }
    }

    if (!data.menu?.trim()) {
      validationErrors.menu = "メニューを選択してください";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "入力内容に誤りがあります",
          validationErrors,
        },
        { status: 400 }
      );
    }

    // --- 重複チェック ---
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        PreferredDate: new Date(data.preferredDate),
        PreferredTime: preferredTimeStr,
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        {
          success: false,
          error: "この時間枠は既に予約されています",
          details: {
            date: data.preferredDate,
            time: data.preferredTime,
          },
        },
        { status: 409 }
      );
    }

    // 登録処理
    const newReservation = await prisma.reservation.create({
      data: {
        Name: data.name,
        PhoneNumber: data.phone,
        Email: data.email,
        PreferredDate: new Date(data.preferredDate),
        PreferredTime: preferredTimeStr, // ← ここが文字列として扱われる
        Menu: data.menu,
        Notes: data.notes || "",
      },
    });

    return NextResponse.json(
      { success: true, reservation: newReservation },
      { status: 201 }
    );
  } catch (error) {
    console.error("予約作成エラー:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return NextResponse.json(
            {
              success: false,
              error: "この時間枠は既に予約されています",
              code: error.code,
            },
            { status: 409 }
          );
        case "P2003":
          return NextResponse.json(
            {
              success: false,
              error: "データベースの整合性エラーが発生しました",
              code: error.code,
            },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            {
              success: false,
              error: "データベースエラーが発生しました",
              code: error.code,
              details: error.message,
            },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "予約の作成に失敗しました",
        details:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
