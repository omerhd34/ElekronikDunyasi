"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({
 productName,
 images,
 currentIndex,
 onPrev,
 onNext,
 onSelectIndex,
 discountPercent,
 isNew,
}) {
 return (
  <div className="sticky top-24">
   <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50 ring-1 ring-gray-100">
    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
     {discountPercent > 0 && (
      <span className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/30">
       %{discountPercent} İndirim
      </span>
     )}
     {isNew && (
      <span className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30">
       Yeni
      </span>
     )}
    </div>

    <div className="relative aspect-square overflow-hidden bg-gray-100">
     {images.length > 0 ? (
      <img
       src={images[currentIndex]}
       alt={productName}
       className="h-full w-full object-cover transition-opacity duration-300"
       sizes="(max-width: 1024px) 100vw, 40vw"
      />
     ) : (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100 text-gray-400">
       Resim yok
      </div>
     )}

     {images.length > 1 && (
      <>
       <button
        onClick={onPrev}
        className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Önceki resim"
       >
        <ChevronLeft className="size-5" />
       </button>
       <button
        onClick={onNext}
        className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Sonraki resim"
       >
        <ChevronRight className="size-5" />
       </button>
      </>
     )}
    </div>

    {images.length > 1 && (
     <div className="flex gap-2 border-t border-gray-100 bg-gray-50/50 p-3">
      {images.map((img, idx) => (
       <button
        key={idx}
        onClick={() => onSelectIndex(idx)}
        className={`size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${idx === currentIndex
         ? "border-emerald-500 ring-2 ring-emerald-200"
         : "border-gray-200 opacity-70 hover:border-gray-300 hover:opacity-100"
         }`}
       >
        <img
         src={img}
         alt={`${productName} - ${idx + 1}`}
         className="h-full w-full object-cover"
        />
       </button>
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
