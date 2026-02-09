import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// PATCH - Mesajı okundu/okunmadı olarak işaretle
export async function PATCH(_request, { params }) {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
   return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { id } = await params;
  const body = await _request.json();

  const message = await prisma.message.update({
   where: { id },
   data: { isRead: Boolean(body.isRead) },
  });

  return NextResponse.json(message);
 } catch (error) {
  return NextResponse.json(
   { error: "Mesaj güncellenemedi." },
   { status: 500 }
  );
 }
}

// DELETE - Mesajı sil
export async function DELETE(_request, { params }) {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
   return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.message.delete({ where: { id } });

  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json(
   { error: "Mesaj silinemedi." },
   { status: 500 }
  );
 }
}
