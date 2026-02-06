import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "customer_session";

export async function getCustomerFromSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return null;

  const customerSession = await prisma.customerSession.findUnique({
    where: { token: session.value },
    include: { customer: true },
  });

  if (!customerSession || customerSession.expiresAt < new Date()) {
    if (customerSession) {
      await prisma.customerSession.delete({ where: { id: customerSession.id } });
    }
    return null;
  }

  return customerSession.customer;
}
