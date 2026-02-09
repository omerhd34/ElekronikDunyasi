import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) {
   return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
 } catch (error) {
  return NextResponse.json({ authenticated: false }, { status: 500 });
 }
}
