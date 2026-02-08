"use client";

import { ChevronDown } from "lucide-react";
import { priceRanges } from "./categoryConstants";
import { cn } from "@/lib/utils";

export default function CategoryFilterSidebar({
 priceRange,
 onPriceRangeChange,
 priceSectionOpen,
 onPriceSectionToggle,
 brands,
 selectedBrands,
 onToggleBrand,
 brandSectionOpen,
 onBrandSectionToggle,
 showInStock,
 onShowInStockChange,
 showDiscounted,
 onShowDiscountedChange,
 showNew,
 onShowNewChange,
 activeFiltersCount,
 onClearAll,
 visible,
}) {
 if (!visible) return null;

 return (
  <aside className="w-72 shrink-0 transition-all duration-300">
   <div className="sticky top-24 space-y-6 rounded-xl bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
     <h3 className="font-semibold text-gray-800">Filtreler</h3>
     {activeFiltersCount > 0 && (
      <button
       onClick={onClearAll}
       className="text-sm text-emerald-600 hover:text-emerald-700"
      >
       Tümünü Temizle
      </button>
     )}
    </div>

    <div>
     <button
      type="button"
      onClick={onPriceSectionToggle}
      className="mb-3 flex w-full cursor-pointer items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900"
     >
      Fiyat Aralığı
      <ChevronDown className={cn("size-4 shrink-0 transition-transform", !priceSectionOpen && "-rotate-90")} />
     </button>
     {priceSectionOpen && (
      <div className="space-y-2">
       {priceRanges.map((range, i) => (
        <label
         key={i}
         className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
         <input
          type="radio"
          name="priceRange"
          checked={priceRange?.min === range.min}
          onChange={() => onPriceRangeChange(priceRange?.min === range.min ? null : range)}
          className="size-4 accent-emerald-500"
         />
         <span className="text-sm text-gray-600">{range.label}</span>
        </label>
       ))}
      </div>
     )}
    </div>

    <div>
     <button
      type="button"
      onClick={onBrandSectionToggle}
      className="mb-3 flex w-full cursor-pointer items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900"
     >
      Marka
      <ChevronDown className={cn("size-4 shrink-0 transition-transform", !brandSectionOpen && "-rotate-90")} />
     </button>
     {brandSectionOpen && (
      <div className="space-y-2">
       {brands.map((brand) => (
        <label
         key={brand}
         className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
         <input
          type="checkbox"
          checked={selectedBrands.includes(brand)}
          onChange={() => onToggleBrand(brand)}
          className="size-4 rounded accent-emerald-500"
         />
         <span className="text-sm text-gray-600">{brand}</span>
        </label>
       ))}
      </div>
     )}
    </div>

    <div>
     <h4 className="mb-3 text-sm font-medium text-gray-700">Hızlı Filtreler</h4>
     <div className="space-y-2">
      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
       <input
        type="checkbox"
        checked={showInStock}
        onChange={(e) => onShowInStockChange(e.target.checked)}
        className="size-4 rounded accent-emerald-500"
       />
       <span className="text-sm text-gray-600">Sadece Stokta Olanlar</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
       <input
        type="checkbox"
        checked={showDiscounted}
        onChange={(e) => onShowDiscountedChange(e.target.checked)}
        className="size-4 rounded accent-emerald-500"
       />
       <span className="text-sm text-gray-600">İndirimli Ürünler</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
       <input
        type="checkbox"
        checked={showNew}
        onChange={(e) => onShowNewChange(e.target.checked)}
        className="size-4 rounded accent-emerald-500"
       />
       <span className="text-sm text-gray-600">Yeni Ürünler</span>
      </label>
     </div>
    </div>
   </div>
  </aside>
 );
}
