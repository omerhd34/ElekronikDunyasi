import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "customer_session";

export async function DELETE(request) {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const body = await request.json();
  const password = String(body.password || "");

  if (!password) {
   return NextResponse.json(
    { error: "Hesap silmek için şifrenizi girin." },
    { status: 400 }
   );
  }

  const valid = await bcrypt.compare(password, customer.password);
  if (!valid) {
   return NextResponse.json(
    { error: "Şifre hatalı." },
    { status: 401 }
   );
  }

  await prisma.customer.delete({ where: { id: customer.id } });

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json(
   { error: "Hesap silinemedi." },
   { status: 500 }
  );
 }
}
