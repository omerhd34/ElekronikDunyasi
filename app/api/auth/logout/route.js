import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "customer_session";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);

    if (session?.value) {
      await prisma.customerSession.deleteMany({
        where: { token: session.value },
      });
    }

    cookieStore.delete(SESSION_COOKIE);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/auth/logout", error);
    return NextResponse.json(
      { error: "Çıkış yapılamadı." },
      { status: 500 }
    );
  }
}
