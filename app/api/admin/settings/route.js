import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function GET() {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
   return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json(map);
 } catch (error) {
  console.error("GET /api/admin/settings", error);
  return NextResponse.json(
   { error: "Ayarlar alınamadı." },
   { status: 500 }
  );
 }
}

export async function PATCH(req) {
 try {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
   return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await req.json();
  const { shipping_cost: shippingCost, faqs: faqsPayload } = body;

  if (shippingCost !== undefined) {
   const value = String(shippingCost).trim();
   const num = Number(value);
   if (Number.isNaN(num) || num < 0) {
    return NextResponse.json(
     { error: "Kargo ücreti geçerli bir sayı olmalı (0 veya pozitif)." },
     { status: 400 }
    );
   }
   await prisma.siteSetting.upsert({
    where: { key: "shipping_cost" },
    create: { key: "shipping_cost", value: String(Math.round(num)) },
    update: { value: String(Math.round(num)) },
   });
  }

  if (faqsPayload !== undefined) {
   if (!Array.isArray(faqsPayload)) {
    return NextResponse.json(
     { error: "SSS listesi geçerli bir dizi olmalı." },
     { status: 400 }
    );
   }
   const allowedCategories = ["genel", "basvuru", "odemeler", "faturalandirma"];
   const normalized = faqsPayload
    .map((item, index) => {
     if (!item || typeof item !== "object") return null;
     const id = typeof item.id === "string" && item.id.trim() ? item.id.trim() : `item-${index + 1}`;
     const category = allowedCategories.includes(item.category) ? item.category : "genel";
     const question = typeof item.question === "string" ? item.question.trim() : "";
     const answer = typeof item.answer === "string" ? item.answer.trim() : "";
     if (!question) return null;
     return { id, category, question, answer };
    })
    .filter(Boolean);
   await prisma.siteSetting.upsert({
    where: { key: "faqs" },
    create: { key: "faqs", value: JSON.stringify(normalized) },
    update: { value: JSON.stringify(normalized) },
   });
  }

  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json(map);
 } catch (error) {
  console.error("PATCH /api/admin/settings", error);
  return NextResponse.json(
   { error: "Ayarlar güncellenemedi." },
   { status: 500 }
  );
 }
}
