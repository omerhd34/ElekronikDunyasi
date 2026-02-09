import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(request) {
 try {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const phone = body.phone ? String(body.phone).trim() : null;
  const address = body.address ? String(body.address).trim() : null;

  if (!email || !password || !firstName || !lastName) {
   return NextResponse.json(
    { error: "E-posta, şifre, ad ve soyad zorunludur." },
    { status: 400 }
   );
  }

  if (password.length < 10) {
   return NextResponse.json(
    { error: "Şifre en az 10 karakter olmalıdır." },
    { status: 400 }
   );
  }
  if (!/[A-Z]/.test(password)) {
   return NextResponse.json(
    { error: "Şifrede en az bir büyük harf olmalıdır." },
    { status: 400 }
   );
  }
  if (!/[0-9]/.test(password)) {
   return NextResponse.json(
    { error: "Şifrede en az bir rakam olmalıdır." },
    { status: 400 }
   );
  }

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) {
   return NextResponse.json(
    { error: "Bu e-posta adresi zaten kayıtlı." },
    { status: 409 }
   );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const customer = await prisma.customer.create({
   data: {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phone: phone || undefined,
    address: address || undefined,
   },
  });

  return NextResponse.json({
   success: true,
   customer: {
    id: customer.id,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    address: customer.address,
   },
  });
 } catch (error) {
  return NextResponse.json(
   { error: "Kayıt oluşturulamadı." },
   { status: 500 }
  );
 }
}
