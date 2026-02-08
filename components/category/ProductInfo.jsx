"use client";

import Link from "next/link";
import { Star } from "lucide-react";

export default function ProductInfo({ name, brand, rating, reviewCount }) {
 const stars = Math.floor(rating ?? 0);
 return (
  <>
   <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl lg:leading-tight">
    {name}
   </h1>

   {brand && (
    <p className="mt-3 text-sm text-gray-500">
     Marka:{" "}
     <Link
      href={`/marka/${encodeURIComponent(brand)}`}
      className="font-medium text-emerald-600 underline-offset-2 hover:underline hover:text-emerald-700"
     >
      {brand}
     </Link>
    </p>
   )}

   <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
    <div
     className="flex items-center gap-0.5"
     aria-label={`${rating} üzerinden 5 yıldız`}
    >
     {[...Array(5)].map((_, i) => (
      <Star
       key={i}
       className={`size-5 ${i < stars
         ? "fill-amber-400 text-amber-400"
         : "fill-gray-200 text-gray-200"
        }`}
      />
     ))}
    </div>
    <span className="text-sm font-semibold text-gray-700">{rating ?? 0}</span>
    <span className="text-sm text-gray-400">·</span>
    <span className="text-sm text-gray-500">
     {reviewCount ?? 0} değerlendirme
    </span>
   </div>
  </>
 );
}
