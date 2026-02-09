import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const customer = await getCustomerFromSession();
    if (!customer) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.customerCard.findFirst({
      where: { id, customerId: customer.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Kart bulunamadı." }, { status: 404 });
    }

    const body = await request.json();
    const title = body.title != null ? String(body.title).trim() : existing.title;
    const cardHolder = body.cardHolder != null ? String(body.cardHolder).trim() : existing.cardHolder;
    const expiryMonth = body.expiryMonth != null ? String(body.expiryMonth).trim().padStart(2, "0") : existing.expiryMonth;
    const expiryYear = body.expiryYear != null ? String(body.expiryYear).trim() : existing.expiryYear;
    const isDefault = body.isDefault ?? existing.isDefault;

    if (!title || !cardHolder || !expiryMonth || !expiryYear) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    if (isDefault) {
      await prisma.customerCard.updateMany({
        where: { customerId: customer.id },
        data: { isDefault: false },
      });
    }

    const updated = await prisma.customerCard.update({
      where: { id },
      data: { title, cardHolder, expiryMonth, expiryYear, isDefault },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Kart güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const customer = await getCustomerFromSession();
    if (!customer) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.customerCard.findFirst({
      where: { id, customerId: customer.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Kart bulunamadı." }, { status: 404 });
    }

    await prisma.customerCard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Kart silinemedi." },
      { status: 500 }
    );
  }
}
