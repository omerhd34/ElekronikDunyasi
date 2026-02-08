import { categoryInfo } from "@/lib/product-utils";

export const CATEGORY_OPTIONS = Object.keys(categoryInfo);
export const MAX_IMAGES = 15;

export const emptyForm = (category = CATEGORY_OPTIONS[0] ?? "") => ({
  name: "",
  slug: "",
  description: "",
  price: "",
  discountPrice: "",
  category,
  images: [],
  stock: "0",
  brand: "",
  color: "",
  isNewProduct: false,
  isFeatured: false,
  specifications: [],
});

export function generateSlug(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
