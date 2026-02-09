import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function GET() {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const addresses = await prisma.customerAddress.findMany({
   where: { customerId: customer.id },
   orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(addresses);
 } catch (error) {
  return NextResponse.json(
   { error: "Adresler alınamadı." },
   { status: 500 }
  );
 }
}

export async function POST(request) {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const body = await request.json();
  const title = String(body.title || "").trim();
  const recipientName = String(body.recipientName || "").trim();
  const address = String(body.address || "").trim();
  const city = String(body.city || "").trim();
  const district = String(body.district || "").trim();
  const phone = String(body.phone || "").trim();
  const isDefault = Boolean(body.isDefault);

  if (!title || !recipientName || !address || !city || !district || !phone) {
   return NextResponse.json(
    { error: "Tüm alanlar zorunludur." },
    { status: 400 }
   );
  }

  if (isDefault) {
   await prisma.customerAddress.updateMany({
    where: { customerId: customer.id },
    data: { isDefault: false },
   });
  }

  const addr = await prisma.customerAddress.create({
   data: {
    customerId: customer.id,
    title,
    recipientName,
    address,
    city,
    district,
    phone,
    isDefault,
   },
  });

  return NextResponse.json(addr);
 } catch (error) {
  const isDev = process.env.NODE_ENV === "development";
  const msg =
   isDev && error?.message
    ? `Adres eklenemedi: ${error.message}`
    : "Adres eklenemedi.";
  return NextResponse.json({ error: msg }, { status: 500 });
 }
}
