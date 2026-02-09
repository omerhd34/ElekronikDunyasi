import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
 try {
  const list = await prisma.product.findMany({
   where: { brand: { not: null } },
   select: { brand: true },
  });
  const set = new Set(list.map((p) => p.brand).filter(Boolean));
  const brands = Array.from(set).sort((a, b) => a.localeCompare(b));
  return NextResponse.json(brands);
 } catch (error) {
  return NextResponse.json(
   { error: "Markalar yüklenemedi" },
   { status: 500 }
  );
 }
}
