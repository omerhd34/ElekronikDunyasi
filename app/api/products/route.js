import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { normalizeProduct } from "@/lib/product-utils";

export async function GET(request) {
 try {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();
  const brand = searchParams.get("brand")?.trim();
  const newOnly = searchParams.get("new") === "1";
  const discountedOnly = searchParams.get("discounted") === "1";
  const featuredOnly = searchParams.get("featured") === "1";

  const where = {};
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (newOnly) where.isNewProduct = true;
  if (discountedOnly) where.discountPrice = { not: null };
  if (featuredOnly) where.isFeatured = true;
  if (q && q.length >= 2) {
   where.OR = [
    { name: { contains: q, mode: "insensitive" } },
    { slug: { contains: q, mode: "insensitive" } },
    { description: { contains: q, mode: "insensitive" } },
   ];
  }

  const list = await prisma.product.findMany({
   where: Object.keys(where).length ? where : undefined,
   orderBy: { createdAt: "desc" },
  });
  const products = list.map(normalizeProduct).filter(Boolean);
  return NextResponse.json(products);
 } catch (error) {
  return NextResponse.json(
   { error: "Ürünler yüklenemedi" },
   { status: 500 }
  );
 }
}

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

export async function POST(request) {
 let body;
 try {
  body = await request.json();
 } catch (parseErr) {
  const msg = parseErr?.message || "";
  const isTooLarge = msg.includes("body") && (msg.includes("limit") || msg.includes("size") || msg.includes("length"));
  return NextResponse.json(
   { error: isTooLarge ? "Görseller çok büyük. Daha küçük görsel ekleyin veya daha az görsel kullanın." : "Geçersiz istek gövdesi (JSON bekleniyor)." },
   { status: isTooLarge ? 413 : 400 }
  );
 }
 try {

  const slug =
   (body.slug || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") || null;
  if (!slug) {
   return NextResponse.json(
    { error: "Geçerli bir slug gerekli (örn: urun-adi)" },
    { status: 400 }
   );
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
   return NextResponse.json(
    { error: "Bu slug zaten kullanılıyor: " + slug },
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
   : typeof body.images === "string" && body.images.trim()
    ? [body.images.trim()]
    : [];
  if (images.length === 0 && body.image) {
   images.push(String(body.image).trim());
  }
  if (images.length === 0) {
   return NextResponse.json(
    { error: "En az bir görsel URL girin" },
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
      s && typeof s.category === "string" && Array.isArray(s.items)
    )
    .map((s) => ({
     category: String(s.category).trim(),
     items: s.items
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

  const product = await prisma.product.create({
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
   { error: error.message || "Ürün eklenemedi" },
   { status: 500 }
  );
 }
}
