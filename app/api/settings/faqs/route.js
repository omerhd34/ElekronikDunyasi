import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function parseFaqs(value) {
 if (value == null || value === "") return [];
 try {
  const arr = typeof value === "string" ? JSON.parse(value) : value;
  return Array.isArray(arr) ? arr : [];
 } catch {
  return [];
 }
}

export async function GET() {
 try {
  const setting = await prisma.siteSetting.findUnique({
   where: { key: "faqs" },
  });
  const faqs = parseFaqs(setting?.value);
  return NextResponse.json(faqs);
 } catch (error) {
  console.error("GET /api/settings/faqs", error);
  return NextResponse.json([], { status: 200 });
 }
}
