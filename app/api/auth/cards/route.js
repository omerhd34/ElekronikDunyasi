import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const customer = await getCustomerFromSession();
    if (!customer) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const cards = await prisma.customerCard.findMany({
      where: { customerId: customer.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error("GET /api/auth/cards", error);
    return NextResponse.json(
      { error: "Kartlar alınamadı." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const customer = await getCustomerFromSession();
    if (!customer) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const body = await request.json();
    const title = String(body.title || "").trim();
    const cardNumber = String(body.cardNumber || "").replace(/\s/g, "");
    const cardHolder = String(body.cardHolder || "").trim();
    const expiryMonth = String(body.expiryMonth || "").trim().padStart(2, "0");
    const expiryYear = String(body.expiryYear || "").trim();
    const isDefault = Boolean(body.isDefault);

    if (!title || !cardHolder || !expiryMonth || !expiryYear) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    if (cardNumber.length < 4) {
      return NextResponse.json(
        { error: "Kart numarası geçersiz." },
        { status: 400 }
      );
    }

    const last4 = cardNumber.slice(-4);

    if (isDefault) {
      await prisma.customerCard.updateMany({
        where: { customerId: customer.id },
        data: { isDefault: false },
      });
    }

    const card = await prisma.customerCard.create({
      data: {
        customerId: customer.id,
        title,
        last4,
        cardHolder,
        expiryMonth,
        expiryYear,
        isDefault,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error("POST /api/auth/cards", error);
    return NextResponse.json(
      { error: "Kart eklenemedi." },
      { status: 500 }
    );
  }
}
