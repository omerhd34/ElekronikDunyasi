"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useFavorites } from "@/context/favorites-context";

export default function FavorilerPage() {
 const { favoriteIds, removeFavorites } = useFavorites();
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (favoriteIds.length === 0) {
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setProducts([]);
   setLoading(false);
   return;
  }
  setLoading(true);
  Promise.all(
   favoriteIds.map((id) =>
    fetch(`/api/products/by-id/${id}`)
     .then((r) => (r.ok ? r.json() : null))
     .catch(() => null)
   )
  ).then((list) => {
   const found = list.filter(Boolean);
   setProducts(found);
   setLoading(false);

   // API'den bulunamayan ürünleri favorilerden temizle
   const foundIds = new Set(found.map((p) => String(p.id)));
   const staleIds = favoriteIds.filter((id) => !foundIds.has(id));
   if (staleIds.length > 0) removeFavorites(staleIds);
  });
 }, [favoriteIds, removeFavorites]);

 return (
  <div className="min-h-screen bg-gray-50/50">
   <div className="container px-4 py-8 md:py-12">
    <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
     Favorilerim
    </h1>
    <p className="mb-8 text-gray-500">
     Beğendiğiniz ürünler burada listelenir.
    </p>

    {loading && favoriteIds.length > 0 ? (
     <div className="rounded-2xl bg-white py-12 text-center text-gray-500">
      Yükleniyor…
     </div>
    ) : products.length === 0 ? (
     <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 shadow-sm">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
       <Heart className="size-12 text-gray-300" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">
       Henüz favori ürününüz yok
      </h2>
      <p className="mb-8 max-w-sm text-center text-gray-500">
       Ürün kartlarındaki kalp ikonuna tıklayarak beğendiğiniz ürünleri favorilere ekleyebilirsiniz.
      </p>
      <Button asChild className="gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700">
       <Link href="/">
        Ürünlere Göz At
        <ArrowRight className="size-4" />
       </Link>
      </Button>
     </div>
    ) : (
     <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
       <ProductCard key={product.id} product={product} />
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
