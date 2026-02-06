import { prisma } from "@/lib/db";
import {
  normalizeProduct,
  formatPrice,
  categoryInfo,
} from "@/lib/product-utils";

export { formatPrice, categoryInfo };

export async function getAllProducts() {
  const list = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return list.map(normalizeProduct).filter(Boolean);
}

export async function getProductsByCategory(categorySlug) {
  const list = await prisma.product.findMany({
    where: { category: categorySlug },
    orderBy: { createdAt: "desc" },
  });
  return list.map(normalizeProduct).filter(Boolean);
}

export async function getBrands() {
  const list = await prisma.product.findMany({
    where: { brand: { not: null } },
    select: { brand: true },
  });
  const set = new Set(list.map((p) => p.brand).filter(Boolean));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function getProductById(id) {
  if (!id) return null;
  const product = await prisma.product.findUnique({
    where: { id: String(id) },
  });
  return normalizeProduct(product);
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  const product = await prisma.product.findUnique({
    where: { slug: String(slug) },
  });
  return normalizeProduct(product);
}

export async function searchProducts(query, limit = 5) {
  if (!query || typeof query !== "string") return [];
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const list = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { slug: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    take: limit,
  });
  return list.map(normalizeProduct).filter(Boolean);
}

export async function getNewProducts() {
  const list = await prisma.product.findMany({
    where: { isNewProduct: true },
    orderBy: { createdAt: "desc" },
  });
  return list.map(normalizeProduct).filter(Boolean);
}

export async function getDiscountedProducts() {
  const list = await prisma.product.findMany({
    where: { discountPrice: { not: null } },
    orderBy: { createdAt: "desc" },
  });
  return list.map(normalizeProduct).filter(Boolean);
}
