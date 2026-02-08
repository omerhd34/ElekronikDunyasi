"use client";

import { use } from "react";
import ProductDetail from "@/components/category/ProductDetail";

export default function ProductDetailPage({ params }) {
 const { slug: categorySlug, productSlug } = use(params);
 return (
  <ProductDetail
   categorySlug={categorySlug}
   productSlug={productSlug}
  />
 );
}
