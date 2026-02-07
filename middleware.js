import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const ADMIN_LOGIN = "/admin-giris";
const ADMIN_HOME = "/admin";

export function middleware(request) {
 const { pathname } = request.nextUrl;

 const isAdminLogin = pathname === ADMIN_LOGIN;
 const isAdminRoute = pathname === ADMIN_HOME || pathname.startsWith(ADMIN_HOME + "/");
 const hasAdminSession = request.cookies.get(SESSION_COOKIE)?.value;

 if (isAdminLogin) {
  if (hasAdminSession) {
   return NextResponse.redirect(new URL(ADMIN_HOME, request.url));
  }
  return NextResponse.next();
 }

 if (isAdminRoute && !hasAdminSession) {
  return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/admin-giris", "/admin", "/admin/:path*"],
};
