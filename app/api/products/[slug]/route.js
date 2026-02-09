import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { normalizeProduct } from "@/lib/product-utils";

export async function GET(_request, { params }) {
 try {
  const { slug } = await params;
  if (!slug) {
   return NextResponse.json(
    { error: "Slug gerekli" },
    { status: 400 }
   );
  }
  const product = await prisma.product.findUnique({
   where: { slug: String(slug) },
  });
  if (!product) {
   return NextResponse.json(null, { status: 404 });
  }
  return NextResponse.json(normalizeProduct(product));
 } catch (error) {
  return NextResponse.json(
   { error: "Ürün bulunamadı" },
   { status: 500 }
  );
 }
}
