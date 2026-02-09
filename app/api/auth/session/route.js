import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "customer_session";

export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) {
   return NextResponse.json({ customer: null });
  }

  const customerSession = await prisma.customerSession.findUnique({
   where: { token: session.value },
   include: { customer: true },
  });

  if (
   !customerSession ||
   customerSession.expiresAt < new Date()
  ) {
   if (customerSession) {
    await prisma.customerSession.delete({
     where: { id: customerSession.id },
    });
   }
   return NextResponse.json({ customer: null });
  }

  const c = customerSession.customer;
  return NextResponse.json({
   customer: {
    id: c.id,
    email: c.email,
    firstName: c.firstName,
    lastName: c.lastName,
    phone: c.phone,
    address: c.address,
    emailNotifications: c.emailNotifications ?? true,
   },
  });
 } catch (error) {
  return NextResponse.json(
   { error: "Oturum alınamadı." },
   { status: 500 }
  );
 }
}
