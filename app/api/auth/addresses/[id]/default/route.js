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
    const existing = await prisma.customerAddress.findFirst({
      where: { id, customerId: customer.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Adres bulunamadı." }, { status: 404 });
    }

    await prisma.customerAddress.updateMany({
      where: { customerId: customer.id },
      data: { isDefault: false },
    });
    await prisma.customerAddress.update({
      where: { id },
      data: { isDefault: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/auth/addresses/[id]/default", error);
    return NextResponse.json(
      { error: "Varsayılan adres ayarlanamadı." },
      { status: 500 }
    );
  }
}
