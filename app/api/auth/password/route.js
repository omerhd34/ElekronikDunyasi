import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

function validatePassword(password) {
  if (password.length < 10) return { valid: false, msg: "En az 10 karakter olmalıdır." };
  if (!/[A-Z]/.test(password)) return { valid: false, msg: "En az bir büyük harf olmalıdır." };
  if (!/\d/.test(password)) return { valid: false, msg: "En az bir rakam olmalıdır." };
  return { valid: true };
}

export async function PUT(request) {
  try {
    const customer = await getCustomerFromSession();
    if (!customer) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Mevcut şifre ve yeni şifre gereklidir." },
        { status: 400 }
      );
    }

    const valid = await bcrypt.compare(currentPassword, customer.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Mevcut şifre hatalı." },
        { status: 401 }
      );
    }

    const check = validatePassword(newPassword);
    if (!check.valid) {
      return NextResponse.json({ error: check.msg }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.customer.update({
      where: { id: customer.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/auth/password", error);
    return NextResponse.json(
      { error: "Şifre güncellenemedi." },
      { status: 500 }
    );
  }
}
