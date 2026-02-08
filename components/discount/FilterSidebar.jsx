"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const priceRanges = [
 { min: 0, max: 300, label: "₺0 - ₺300" },
 { min: 300, max: 600, label: "₺300 - ₺600" },
 { min: 600, max: 1000, label: "₺600 - ₺1.000" },
 { min: 1000, max: 5000, label: "₺1.000 - ₺5.000" },
 { min: 5000, max: 15000, label: "₺5.000 - ₺15.000" },
 { min: 15000, max: 50000, label: "₺15.000 - ₺50.000" },
 { min: 50000, max: Infinity, label: "₺50.000+" },
];

export default function FilterSidebar({
 showFilters,
 categories,
 brands,
 selectedCategories,
 selectedBrands,
 priceRange,
 showInStock,
 showNew,
 toggleCategory,
 toggleBrand,
 setPriceRange,
 setShowInStock,
 setShowNew,
 clearAllFilters,
 activeFiltersCount,
}) {

 const [categorySectionOpen, setCategorySectionOpen] = useState(true);
 const [priceSectionOpen, setPriceSectionOpen] = useState(false);
 const [brandSectionOpen, setBrandSectionOpen] = useState(false);

 return (
  <aside
   className={cn(
    "w-72 shrink-0 transition-all duration-300",
    showFilters ? "block" : "hidden"
   )}
  >
   <div className="sticky top-24 space-y-6 rounded-xl bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
     <h3 className="font-semibold text-gray-800">Filtreler</h3>
     {activeFiltersCount > 0 && (
      <button
       onClick={clearAllFilters}
       className="cursor-pointer text-sm text-red-600 hover:text-red-700"
      >
       Tümünü Temizle
      </button>
     )}
    </div>

    {/* Kategori Bölümü */}
    <div>
     <button
      type="button"
      onClick={() => setCategorySectionOpen((v) => !v)}
      className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900"
     >
      Kategori
      <ChevronDown
       className={cn(
        "size-4 shrink-0 transition-transform",
        !categorySectionOpen && "-rotate-90"
       )}
      />
     </button>
     {categorySectionOpen && (
      <div className="space-y-2">
       {categories.map((cat) => (
        <label
         key={cat.slug}
         className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
         <input
          type="checkbox"
          checked={selectedCategories.includes(cat.slug)}
          onChange={() => toggleCategory(cat.slug)}
          className="size-4 rounded accent-red-500"
         />
         <span className="text-sm text-gray-600">{cat.label}</span>
        </label>
       ))}
      </div>
     )}
    </div>

    {/* Marka Bölümü */}
    <div>
     <button
      type="button"
      onClick={() => setBrandSectionOpen((v) => !v)}
      className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
     >
      Marka
      <ChevronDown
       className={cn(
        "size-4 shrink-0 transition-transform",
        !brandSectionOpen && "-rotate-90"
       )}
      />
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
          onChange={() => toggleBrand(brand)}
          className="size-4 rounded accent-red-500"
         />
         <span className="text-sm text-gray-600">{brand}</span>
        </label>
       ))}
      </div>
     )}
    </div>

    {/* Fiyat Aralığı Bölümü */}
    <div>
     <button
      type="button"
      onClick={() => setPriceSectionOpen((v) => !v)}
      className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
     >
      Fiyat Aralığı
      <ChevronDown
       className={cn(
        "size-4 shrink-0 transition-transform",
        !priceSectionOpen && "-rotate-90"
       )}
      />
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
          onChange={() =>
           setPriceRange(
            priceRange?.min === range.min ? null : range
           )
          }
          className="size-4 accent-red-500"
         />
         <span className="text-sm text-gray-600">{range.label}</span>
        </label>
       ))}
      </div>
     )}
    </div>

    {/* Hızlı Filtreler */}
    <div>
     <h4 className="mb-3 text-sm font-medium text-gray-700">
      Hızlı Filtreler
     </h4>
     <div className="space-y-2">
      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
       <input
        type="checkbox"
        checked={showInStock}
        onChange={(e) => setShowInStock(e.target.checked)}
        className="size-4 rounded accent-red-500"
       />
       <span className="text-sm text-gray-600">
        Sadece Stokta Olanlar
       </span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
       <input
        type="checkbox"
        checked={showNew}
        onChange={(e) => setShowNew(e.target.checked)}
        className="size-4 rounded accent-red-500"
       />
       <span className="text-sm text-gray-600">Yeni Ürünler</span>
      </label>
     </div>
    </div>
   </div>
  </aside>
 );
}