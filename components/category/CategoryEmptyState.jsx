"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryEmptyState({ onClearFilters }) {
 return (
  <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm">
   <SearchX className="mb-4 size-16 text-gray-300" />
   <h3 className="mb-2 text-lg font-semibold text-gray-800">
    Ürün Bulunamadı
   </h3>
   <p className="mb-6 text-gray-500">
    Filtre kriterlerinize uygun ürün bulunamadı.
   </p>
   <Button onClick={onClearFilters} variant="outline">
    Filtreleri Temizle
   </Button>
  </div>
 );
}
