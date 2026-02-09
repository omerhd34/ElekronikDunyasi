import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_COOKIE = "admin_session";

export async function POST(request) {
 try {
  const { username, password } = await request.json();

  if (!username || !password) {
   return NextResponse.json(
    { error: "Kullanıcı adı ve şifre gereklidir." },
    { status: 400 }
   );
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
   return NextResponse.json(
    { error: "Kullanıcı adı veya şifre hatalı." },
    { status: 401 }
   );
  }

  const token = crypto.randomBytes(32).toString("hex");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   sameSite: "lax",
   path: "/",
   maxAge: 60 * 60 * 24, // 1 gün
  });

  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json(
   { error: "Giriş yapılamadı." },
   { status: 500 }
  );
 }
}
