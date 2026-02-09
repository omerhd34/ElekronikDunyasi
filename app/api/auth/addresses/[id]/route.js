import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function PUT(request, { params }) {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.customerAddress.findFirst({
   where: { id, customerId: customer.id },
  });
  if (!existing) {
   return NextResponse.json({ error: "Adres bulunamadı." }, { status: 404 });
  }

  const body = await request.json();
  const title = body.title != null ? String(body.title).trim() : existing.title;
  const recipientName = body.recipientName != null ? String(body.recipientName).trim() : existing.recipientName;
  const address = body.address != null ? String(body.address).trim() : existing.address;
  const city = body.city != null ? String(body.city).trim() : existing.city;
  const district = body.district != null ? String(body.district).trim() : existing.district;
  const phone = body.phone != null ? String(body.phone).trim() : existing.phone;
  const isDefault = body.isDefault ?? existing.isDefault;

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

  const updated = await prisma.customerAddress.update({
   where: { id },
   data: { title, recipientName, address, city, district, phone, isDefault },
  });

  return NextResponse.json(updated);
 } catch (error) {
  return NextResponse.json(
   { error: "Adres güncellenemedi." },
   { status: 500 }
  );
 }
}

export async function DELETE(_request, { params }) {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.customerAddress.findFirst({
   where: { id, customerId: customer.id },
  });
  if (!existing) {
   return NextResponse.json({ error: "Adres bulunamadı." }, { status: 404 });
  }

  await prisma.customerAddress.delete({ where: { id } });
  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json(
   { error: "Adres silinemedi." },
   { status: 500 }
  );
 }
}
