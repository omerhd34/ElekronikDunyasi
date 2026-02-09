import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { normalizeProduct } from "@/lib/product-utils";

function parseFloatOrNull(v) {
 if (v == null || v === "") return null;
 const n = Number(v);
 return Number.isFinite(n) ? n : null;
}

function parseIntOrZero(v) {
 if (v == null || v === "") return 0;
 const n = parseInt(String(v), 10);
 return Number.isFinite(n) ? n : 0;
}

export async function GET(_request, { params }) {
 try {
  const { id } = await params;
  if (!id) {
   return NextResponse.json(
    { error: "Ürün id gerekli" },
    { status: 400 }
   );
  }
  const product = await prisma.product.findUnique({
   where: { id: String(id) },
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

export async function PATCH(request, { params }) {
 try {
  const { id } = await params;
  if (!id) {
   return NextResponse.json(
    { error: "Ürün id gerekli" },
    { status: 400 }
   );
  }
  const body = await request.json();

  const slug = (body.slug || "")
   .trim()
   .toLowerCase()
   .replace(/\s+/g, "-")
   .replace(/[^a-z0-9-]/g, "");
  if (!slug) {
   return NextResponse.json(
    { error: "Geçerli bir slug gerekli" },
    { status: 400 }
   );
  }

  const existing = await prisma.product.findUnique({
   where: { id: String(id) },
  });
  if (!existing) {
   return NextResponse.json(
    { error: "Ürün bulunamadı" },
    { status: 404 }
   );
  }

  const slugConflict = await prisma.product.findFirst({
   where: { slug, id: { not: String(id) } },
  });
  if (slugConflict) {
   return NextResponse.json(
    { error: "Bu slug başka bir ürün tarafından kullanılıyor: " + slug },
    { status: 400 }
   );
  }

  const name = String(body.name || "").trim();
  if (!name) {
   return NextResponse.json(
    { error: "Ürün adı gereklidir" },
    { status: 400 }
   );
  }

  const description = String(body.description ?? "").trim();
  const price = parseFloat(body.price);
  if (!Number.isFinite(price) || price < 0) {
   return NextResponse.json(
    { error: "Geçerli bir fiyat girin" },
    { status: 400 }
   );
  }

  const category = String(body.category ?? "").trim();
  if (!category) {
   return NextResponse.json(
    { error: "Kategori gereklidir" },
    { status: 400 }
   );
  }

  const images = Array.isArray(body.images)
   ? body.images.filter((u) => typeof u === "string" && u.trim())
   : [];
  if (images.length === 0) {
   return NextResponse.json(
    { error: "En az bir görsel gerekli" },
    { status: 400 }
   );
  }

  const discountPrice = parseFloatOrNull(body.discountPrice);
  const stock = parseIntOrZero(body.stock);
  const brand = String(body.brand ?? "").trim() || undefined;
  const isNewProduct = Boolean(body.isNewProduct);
  const isFeatured = Boolean(body.isFeatured);

  const specifications = Array.isArray(body.specifications)
   ? body.specifications
    .filter(
     (s) =>
      s &&
      typeof s.category === "string" &&
      Array.isArray(s.items)
    )
    .map((s) => ({
     category: String(s.category).trim(),
     items: (s.items || [])
      .filter(
       (i) =>
        i &&
        typeof i.key === "string" &&
        typeof i.value === "string"
      )
      .map((i) => ({
       key: String(i.key).trim(),
       value: String(i.value).trim(),
      })),
    }))
    .filter((s) => s.items.length > 0)
   : [];

  const color = String(body.color ?? "").trim() || undefined;

  const product = await prisma.product.update({
   where: { id: String(id) },
   data: {
    name,
    slug,
    description,
    price,
    discountPrice,
    category,
    images,
    color,
    stock,
    brand,
    specifications,
    isNewProduct,
    isFeatured,
   },
  });

  return NextResponse.json(normalizeProduct(product));
 } catch (error) {
  return NextResponse.json(
   { error: error.message || "Ürün güncellenemedi" },
   { status: 500 }
  );
 }
}

export async function DELETE(_request, { params }) {
 try {
  const { id } = await params;
  if (!id) {
   return NextResponse.json(
    { error: "Ürün id gerekli" },
    { status: 400 }
   );
  }
  const existing = await prisma.product.findUnique({
   where: { id: String(id) },
  });
  if (!existing) {
   return NextResponse.json(
    { error: "Ürün bulunamadı" },
    { status: 404 }
   );
  }
  await prisma.product.delete({ where: { id: String(id) } });
  return NextResponse.json({ success: true, name: existing.name });
 } catch (error) {
  return NextResponse.json(
   { error: error.message || "Ürün silinemedi" },
   { status: 500 }
  );
 }
}
