"use client";

import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";

export default function SimilarProducts({ products, loading }) {
 if (!loading && products.length === 0) return null;

 return (
  <section className="mt-14" aria-labelledby="similar-heading">
   <h2 id="similar-heading" className="mb-6 text-2xl font-bold text-gray-900">
    Benzer Ürünler
   </h2>
   {loading ? (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
     {[...Array(4)].map((_, i) => (
      <ProductCardSkeleton key={i} />
     ))}
    </div>
   ) : (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
     {products.map((p) => (
      <ProductCard key={p.id} product={p} />
     ))}
    </div>
   )}
  </section>
 );
}
