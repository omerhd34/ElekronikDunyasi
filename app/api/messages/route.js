import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// POST - İletişim formundan mesaj gönder
export async function POST(request) {
 try {
  const body = await request.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const messageBody = String(body.body || "").trim();

  if (!name || !email || !messageBody) {
   return NextResponse.json(
    { error: "Ad, e-posta ve mesaj alanları zorunludur." },
    { status: 400 }
   );
  }

  const message = await prisma.message.create({
   data: { name, email, subject, body: messageBody },
  });

  return NextResponse.json({ success: true, id: message.id });
 } catch (error) {
  return NextResponse.json(
   { error: "Mesaj gönderilemedi." },
   { status: 500 }
  );
 }
}

// GET - Admin: Mesajları listele
export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
   return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
   orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
 } catch (error) {
  return NextResponse.json(
   { error: "Mesajlar yüklenemedi." },
   { status: 500 }
  );
 }
}
