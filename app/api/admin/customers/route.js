import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// GET - Admin: Müşteri sayısını getir
export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
   return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const count = await prisma.customer.count();
  return NextResponse.json({ count });
 } catch (error) {
  return NextResponse.json(
   { error: "Müşteri sayısı alınamadı." },
   { status: 500 }
  );
 }
}
