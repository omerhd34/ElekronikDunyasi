"use client";
import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sortOptions = [
 { value: "featured", label: "Öne Çıkanlar" },
 { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
 { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
 { value: "rating", label: "En Yüksek Puan" },
 { value: "discount", label: "İndirimli" },
];

export default function FilterControls({
 showFilters,
 setShowFilters,
 activeFiltersCount,
 productCount,
 sortBy,
 setSortBy,
}) {
 const [isSortOpen, setIsSortOpen] = useState(false);

 return (
  <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
   <div className="flex items-center gap-4">
    <Button
     variant="outline"
     size="sm"
     onClick={() => setShowFilters(!showFilters)}
     className={cn(
      "gap-2 rounded-full border-gray-200",
      showFilters && "border-emerald-500 bg-emerald-50 text-emerald-600"
     )}
    >
     <SlidersHorizontal className="size-4" />
     Filtreler
     {activeFiltersCount > 0 && (
      <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
       {activeFiltersCount}
      </span>
     )}
    </Button>
    <span className="text-sm text-gray-500">
     <span className="font-semibold text-gray-800">{productCount}</span>{" "}
     yeni ürün
    </span>
   </div>

   {/* Sort Dropdown */}
   <div className="relative">
    <Button
     variant="outline"
     size="sm"
     onClick={() => setIsSortOpen(!isSortOpen)}
     className="gap-2 rounded-full border-gray-200"
    >
     {sortOptions.find((s) => s.value === sortBy)?.label}
     <ChevronDown
      className={cn(
       "size-4 transition-transform",
       isSortOpen && "rotate-180"
      )}
     />
    </Button>
    {isSortOpen && (
     <>
      <div
       className="fixed inset-0 z-10"
       onClick={() => setIsSortOpen(false)}
      />
      <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
       {sortOptions.map((option) => (
        <button
         key={option.value}
         onClick={() => {
          setSortBy(option.value);
          setIsSortOpen(false);
         }}
         className={cn(
          "flex w-full cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-gray-50",
          sortBy === option.value
           ? "bg-emerald-50 text-emerald-600 font-medium"
           : "text-gray-700"
         )}
        >
         {option.label}
        </button>
       ))}
      </div>
     </>
    )}
   </div>
  </div>
 );
}