import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function PUT(request) {
  try {
    const customer = await getCustomerFromSession();
    if (!customer) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const body = await request.json();
    const emailNotifications = Boolean(body.emailNotifications);

    await prisma.customer.update({
      where: { id: customer.id },
      data: { emailNotifications },
    });

    return NextResponse.json({ success: true, emailNotifications });
  } catch (error) {
    console.error("PUT /api/auth/notifications", error);
    return NextResponse.json(
      { error: "Bildirim tercihleri güncellenemedi." },
      { status: 500 }
    );
  }
}
