import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function PUT(request) {
 try {
  const customer = await getCustomerFromSession();
  if (!customer) {
   return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const body = await request.json();
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const phone = body.phone != null ? String(body.phone).trim() : customer.phone;

  if (!firstName || !lastName) {
   return NextResponse.json(
    { error: "Ad ve soyad zorunludur." },
    { status: 400 }
   );
  }

  const updated = await prisma.customer.update({
   where: { id: customer.id },
   data: { firstName, lastName, phone: phone || null },
  });

  return NextResponse.json({
   customer: {
    id: updated.id,
    email: updated.email,
    firstName: updated.firstName,
    lastName: updated.lastName,
    phone: updated.phone,
    address: updated.address,
    emailNotifications: updated.emailNotifications,
   },
  });
 } catch (error) {
  return NextResponse.json(
   { error: "Profil güncellenemedi." },
   { status: 500 }
  );
 }
}
