"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/product-utils";

export default function ProductPriceCard({
 product,
 inCart,
 isFavorite,
 onAddToCart,
 onToggleFavorite,
}) {
 const discountPercent = product.discount ?? 0;

 return (
  <div className="mt-8 rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50 ring-1 ring-gray-100">
   <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-6">
    <div className="flex flex-col gap-1">
     {product.oldPrice != null && (
      <div className="flex items-center gap-2">
       <span className="text-base text-gray-400 line-through">
        {formatPrice(product.oldPrice)}
       </span>
       {discountPercent > 0 && (
        <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
         %{discountPercent}
        </span>
       )}
      </div>
     )}
     <span className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
      {formatPrice(product.price)}
     </span>
    </div>
    {product.inStock ? (
     <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
      <span className="size-2 rounded-full bg-emerald-500" />
      Stokta
     </span>
    ) : (
     <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
      <span className="size-2 rounded-full bg-red-500" />
      Tükendi
     </span>
    )}
   </div>

   <div className="flex flex-wrap items-center justify-end gap-3 p-5">
    <Button
     size="lg"
     disabled={!product.inStock}
     onClick={onAddToCart}
     className={`h-12 w-fit min-w-[200px] rounded-xl px-8 font-semibold shadow-lg transition-all disabled:opacity-50 ${inCart
       ? "bg-red-500 shadow-red-500/25 hover:bg-red-600 hover:shadow-red-500/30"
       : "bg-emerald-600 shadow-emerald-500/25 hover:bg-emerald-700 hover:shadow-emerald-500/30"
      }`}
    >
     <ShoppingCart className="mr-2 size-5" />
     {inCart ? "Sepetten Çıkar" : "Sepete Ekle"}
    </Button>
    <Button
     type="button"
     variant="outline"
     size="lg"
     onClick={onToggleFavorite}
     className={`h-12 w-12 shrink-0 rounded-xl border-2 p-0 transition-all ${isFavorite
       ? "border-red-300 bg-red-50 text-red-500 hover:bg-red-100"
       : "border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
      }`}
     aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
     <Heart className={`size-5 ${isFavorite ? "fill-current" : ""}`} />
    </Button>
   </div>
  </div>
 );
}
