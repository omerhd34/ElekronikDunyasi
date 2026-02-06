"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";

export function ProductCard({ product }) {
 const {
  id,
  name,
  slug,
  category,
  price,
  oldPrice,
  discount,
  image,
  rating,
  reviewCount,
  isNew,
  inStock,
  specs,
 } = product;

 const { isFavorite, toggleFavorite } = useFavorites();
 const { addItem: addToCart } = useCart();
 const favorite = isFavorite(id);
 const productUrl = `/kategori/${category}/${slug}`;

 return (
  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1">
   {/* Badges */}
   <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
    {discount > 0 && (
     <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
      %{discount}
     </span>
    )}
    {isNew && (
     <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
      Yeni
     </span>
    )}
   </div>

   {/* Favorite Button */}
   <button
    type="button"
    onClick={(e) => {
     e.preventDefault();
     e.stopPropagation();
     toggleFavorite(id);
    }}
    className={cn(
     "absolute right-3 top-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110",
     favorite ? "text-red-500 hover:bg-red-50" : "text-gray-400 hover:bg-red-50 hover:text-red-500"
    )}
    aria-label={favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
   >
    <Heart className={cn("size-5", favorite && "fill-current")} />
   </button>

   <Link href={productUrl} className="relative block aspect-square overflow-hidden bg-gray-50">
    <img
     src={image}
     alt={name}
     className="h-full w-full object-cover"
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
    {!inStock && (
     <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800">
       Stokta Yok
      </span>
     </div>
    )}
   </Link>

   {/* Content */}
   <div className="flex flex-1 flex-col p-4">
    {/* Rating */}
    <div className="mb-2 flex items-center gap-1.5">
     <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
       <Star
        key={i}
        className={cn(
         "size-3.5",
         i < Math.floor(rating)
          ? "fill-amber-400 text-amber-400"
          : "fill-gray-200 text-gray-200"
        )}
       />
      ))}
     </div>
     <span className="text-xs text-gray-500">
      {rating} ({reviewCount})
     </span>
    </div>

    {/* Title */}
    <Link href={productUrl}>
     <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-medium text-gray-800 transition-colors hover:text-emerald-600">
      {name}
     </h3>
    </Link>

    {/* Specs */}
    {specs && specs.length > 0 && (
     <div className="mb-3 flex flex-wrap gap-1">
      {specs.slice(0, 3).map((spec, i) => (
       <span
        key={i}
        className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
       >
        {spec}
       </span>
      ))}
     </div>
    )}

    {/* Stock Status */}
    <div className="mb-3 flex items-center gap-1.5">
     {inStock ? (
      <>
       <Check className="size-4 text-emerald-500" />
       <span className="text-xs font-medium text-emerald-600">Stokta</span>
      </>
     ) : (
      <>
       <X className="size-4 text-red-500" />
       <span className="text-xs font-medium text-red-600">Stokta Yok</span>
      </>
     )}
    </div>

    {/* Price - sabit yükseklik: indirimli/indirimsiz hep aynı kart boyu */}
    <div className="mt-auto flex items-end justify-between">
     <div className="flex min-h-11 flex-col justify-end">
      {oldPrice ? (
       <span className="text-xs text-gray-400 line-through">
        {formatPrice(oldPrice)}
       </span>
      ) : (
       <span className="invisible text-xs">0</span>
      )}
      <span className="text-lg font-bold text-emerald-600">
       {formatPrice(price)}
      </span>
     </div>

     <Button
      size="sm"
      disabled={!inStock}
      onClick={(e) => {
       e.preventDefault();
       e.stopPropagation();
       if (inStock) addToCart(id);
      }}
      className="rounded-full bg-emerald-600 px-4 text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 disabled:opacity-50"
     >
      <ShoppingCart className="size-5" />
     </Button>
    </div>
   </div>
  </div>
 );
}

export function ProductCardSkeleton() {
 return (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
   <div className="aspect-square animate-pulse bg-gray-200" />
   <div className="flex flex-1 flex-col p-4">
    <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
    <div className="mb-2 h-10 animate-pulse rounded bg-gray-200" />
    <div className="mb-3 flex gap-1">
     <div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
     <div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
    </div>
    <div className="mt-auto flex items-end justify-between">
     <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
     <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200" />
    </div>
   </div>
  </div>
 );
}