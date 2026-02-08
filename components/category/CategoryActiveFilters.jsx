"use client";

import { X } from "lucide-react";

export default function CategoryActiveFilters({
 selectedBrands,
 onRemoveBrand,
 priceRange,
 onRemovePriceRange,
 showInStock,
 onRemoveInStock,
 showDiscounted,
 onRemoveDiscounted,
 showNew,
 onRemoveNew,
}) {
 const hasAny =
  selectedBrands.length > 0 ||
  priceRange ||
  showInStock ||
  showDiscounted ||
  showNew;

 if (!hasAny) return null;

 return (
  <div className="mb-4 flex flex-wrap items-center gap-2">
   {selectedBrands.map((brand) => (
    <span
     key={brand}
     className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
    >
     {brand}
     <button onClick={() => onRemoveBrand(brand)} className="cursor-pointer" type="button">
      <X className="size-3.5" />
     </button>
    </span>
   ))}
   {priceRange && (
    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
     {priceRange.label}
     <button onClick={onRemovePriceRange} className="cursor-pointer" type="button">
      <X className="size-3.5" />
     </button>
    </span>
   )}
   {showInStock && (
    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
     Stokta
     <button onClick={onRemoveInStock} className="cursor-pointer" type="button">
      <X className="size-3.5" />
     </button>
    </span>
   )}
   {showDiscounted && (
    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
     İndirimli
     <button onClick={onRemoveDiscounted} className="cursor-pointer" type="button">
      <X className="size-3.5" />
     </button>
    </span>
   )}
   {showNew && (
    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
     Yeni
     <button onClick={onRemoveNew} className="cursor-pointer" type="button">
      <X className="size-3.5" />
     </button>
    </span>
   )}
  </div>
 );
}
