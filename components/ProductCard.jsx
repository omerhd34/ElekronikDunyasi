"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";

export function ProductCard({ product, variant }) {
 const {
  id,
  name,
  slug,
  category,
  price,
  oldPrice,
  discount,
  image,
  images: productImages,
  rating,
  reviewCount,
  isNew,
  inStock,
  specs,
 } = product;

 const { isFavorite, toggleFavorite } = useFavorites();
 const { addItem: addToCart, removeItem, items } = useCart();
 const inCart = items.some((i) => i.productId === String(id));
 const [imgIndex, setImgIndex] = useState(0);
 const favorite = isFavorite(id);
 const productUrl = `/kategori/${category}/${slug}`;

 const images = productImages?.length > 0 ? productImages : image ? [image] : [];
 const hasMultiple = images.length > 1;
 const isWide = variant === "wide";

 return (
  <div className={cn(
   "group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 mt-1",
   isWide ? "flex flex-row" : "flex flex-col hover:-translate-y-1"
  )}>
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

   <div className={cn(
    "relative block overflow-hidden bg-gray-50 shrink-0",
    isWide ? "w-72 aspect-4/3 md:w-96 md:aspect-5/3 min-w-0" : "aspect-square"
   )}>
    <Link href={productUrl} className="block h-full w-full">
     <img
      src={images[imgIndex] || ""}
      alt={name}
      className="h-full w-full object-cover transition-opacity duration-200"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
     />
    </Link>
    {hasMultiple && (
     <>
      <button
       type="button"
       onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
       }}
       className="absolute left-1.5 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-600 opacity-0 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 group-hover:opacity-100"
       aria-label="Önceki resim"
      >
       <ChevronLeft className="size-4" />
      </button>
      <button
       type="button"
       onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
       }}
       className="absolute right-1.5 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-600 opacity-0 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 group-hover:opacity-100"
       aria-label="Sonraki resim"
      >
       <ChevronRight className="size-4" />
      </button>
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
       {images.map((_, idx) => (
        <span
         key={idx}
         className={cn(
          "size-1.5 rounded-full transition-all",
          idx === imgIndex ? "bg-emerald-500 scale-125" : "bg-white/70"
         )}
        />
       ))}
      </div>
     </>
    )}
   </div>

   {/* Content */}
   <div className={cn(
    "flex flex-1 flex-col p-4 min-w-0",
    isWide && "justify-center"
   )}>
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
     <h3 className="line-clamp-2 min-h-10 text-sm font-medium text-gray-800 transition-colors hover:text-emerald-600">
      {name}
     </h3>
    </Link>

    {/* Specs */}
    {specs && specs.length > 0 && (
     <div className="flex flex-wrap gap-1">
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

    {/* Price  */}
    <div className="mt-auto flex items-end justify-between">
     <div className="flex h-11 items-end gap-2">
      {oldPrice && (
       <span className="mb-1 text-xs text-gray-400 line-through">
        {formatPrice(oldPrice)}
       </span>
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
       if (inStock) {
        if (inCart) removeItem(id);
        else addToCart(id);
       }
      }}
      className={cn(
       "rounded-full px-4 shadow-lg transition-all disabled:opacity-50",
       inCart
        ? "bg-red-500 text-white shadow-red-200 hover:bg-red-600 hover:shadow-red-300"
        : "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300"
      )}
      aria-label={inCart ? "Sepetten çıkar" : "Sepete ekle"}
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