import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function PUT(_request, { params }) {
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

    await prisma.customerCard.updateMany({
      where: { customerId: customer.id },
      data: { isDefault: false },
    });
    await prisma.customerCard.update({
      where: { id },
      data: { isDefault: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/auth/cards/[id]/default", error);
    return NextResponse.json(
      { error: "Varsayılan kart ayarlanamadı." },
      { status: 500 }
    );
  }
}
