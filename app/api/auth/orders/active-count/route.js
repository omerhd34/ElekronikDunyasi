import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

const ACTIVE_STATUSES = ["pending", "processing", "shipped"];

export async function GET() {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const count = await prisma.order.count({
   where: {
    customerId: customer.id,
    status: { in: ACTIVE_STATUSES },
   },
  });

  return NextResponse.json({ count });
 } catch (error) {
  return NextResponse.json(
   { error: "Aktif sipariş sayısı alınamadı." },
   { status: 500 }
  );
 }
}
