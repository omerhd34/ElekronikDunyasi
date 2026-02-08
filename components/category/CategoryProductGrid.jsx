"use client";

import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export default function CategoryProductGrid({ products, sidebarVisible }) {
 return (
  <div
   className={cn(
    "grid gap-4",
    sidebarVisible
     ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
     : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
   )}
  >
   {products.map((product) => (
    <ProductCard key={product.id} product={product} />
   ))}
  </div>
 );
}
