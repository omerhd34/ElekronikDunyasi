"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, SearchX, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categoryInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const sortOptions = [
 { value: "featured", label: "Öne Çıkanlar" },
 { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
 { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
 { value: "rating", label: "En Yüksek Puan" },
 { value: "newest", label: "En Yeniler" },
 { value: "discount", label: "İndirimli" },
];

const priceRanges = [
 { min: 0, max: 300, label: "₺0 - ₺300" },
 { min: 300, max: 600, label: "₺300 - ₺600" },
 { min: 600, max: 1000, label: "₺600 - ₺1.000" },
 { min: 1000, max: 5000, label: "₺1.000 - ₺5.000" },
 { min: 5000, max: 15000, label: "₺5.000 - ₺15.000" },
 { min: 15000, max: 50000, label: "₺15.000 - ₺50.000" },
 { min: 50000, max: Infinity, label: "₺50.000+" },
];

export default function MarkaPage() {
 const params = useParams();
 const brandName = params?.slug ? decodeURIComponent(String(params.slug)) : "";
 const [sortBy, setSortBy] = useState("featured");
 const [showFilters, setShowFilters] = useState(false);
 const [priceRange, setPriceRange] = useState(null);
 const [showInStock, setShowInStock] = useState(false);
 const [showDiscounted, setShowDiscounted] = useState(false);
 const [showNew, setShowNew] = useState(false);
 const [isSortOpen, setIsSortOpen] = useState(false);
 const [priceSectionOpen, setPriceSectionOpen] = useState(true);
 const [categorySectionOpen, setCategorySectionOpen] = useState(true);
 const [selectedCategories, setSelectedCategories] = useState([]);
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!brandName) return;
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setLoading(true);
  fetch(`/api/products?brand=${encodeURIComponent(brandName)}`)
   .then((r) => (r.ok ? r.json() : []))
   .then(setProducts)
   .finally(() => setLoading(false));
 }, [brandName]);

 const categories = useMemo(() => {
  const cats = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return cats.sort((a, b) => (categoryInfo[a]?.title ?? a).localeCompare(categoryInfo[b]?.title ?? b));
 }, [products]);

 const filteredProducts = useMemo(() => {
  let result = [...products];
  if (priceRange) {
   result = result.filter(
    (p) => p.price >= priceRange.min && p.price < priceRange.max
   );
  }
  if (selectedCategories.length > 0) {
   result = result.filter((p) => p.category && selectedCategories.includes(p.category));
  }
  if (showInStock) {
   result = result.filter((p) => p.inStock);
  }
  if (showDiscounted) {
   result = result.filter((p) => p.discount > 0);
  }
  if (showNew) {
   result = result.filter((p) => p.isNew);
  }
  switch (sortBy) {
   case "price-asc":
    result.sort((a, b) => a.price - b.price);
    break;
   case "price-desc":
    result.sort((a, b) => b.price - a.price);
    break;
   case "rating":
    result.sort((a, b) => b.rating - a.rating);
    break;
   case "newest":
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    break;
   case "discount":
    result.sort((a, b) => b.discount - a.discount);
    break;
   default:
    break;
  }
  return result;
 }, [products, sortBy, priceRange, selectedCategories, showInStock, showDiscounted, showNew]);

 const activeFiltersCount =
  [priceRange, showInStock, showDiscounted, showNew].filter(Boolean).length +
  selectedCategories.length;

 const clearAllFilters = () => {
  setPriceRange(null);
  setSelectedCategories([]);
  setShowInStock(false);
  setShowDiscounted(false);
  setShowNew(false);
 };

 const toggleCategory = (slug) => {
  setSelectedCategories((prev) =>
   prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
  );
 };

 return (
  <div className="min-h-screen bg-gray-50/50">
   {/* Banner */}
   <div className="relative h-48 overflow-hidden bg-linear-to-r from-emerald-600 to-emerald-800 md:h-64">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
    <div className="container relative z-10 flex h-full flex-col justify-center px-4">
     <Link href="/" className="text-sm text-emerald-200 hover:text-white mb-2">
      ← Ana Sayfa
     </Link>
     <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
      {brandName}
     </h1>
     <p className="mt-2 max-w-xl text-emerald-100 md:text-lg">
      {brandName} markasına ait tüm ürünler
     </p>
    </div>
   </div>

   <div className="container px-4 py-6 md:py-8">
    {/* Controls Bar */}
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
       <span className="font-semibold text-gray-800">{filteredProducts.length}</span> ürün
      </span>
     </div>
     <div className="relative">
      <Button
       variant="outline"
       size="sm"
       onClick={() => setIsSortOpen(!isSortOpen)}
       className="gap-2 rounded-full border-gray-200"
      >
       {sortOptions.find((s) => s.value === sortBy)?.label}
       <ChevronDown className={cn("size-4 transition-transform", isSortOpen && "rotate-180")} />
      </Button>
      {isSortOpen && (
       <>
        <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
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
            sortBy === option.value ? "bg-emerald-50 text-emerald-600 font-medium" : "text-gray-700"
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

    <div className="flex gap-6">
     {/* Filters Sidebar */}
     <aside
      className={cn(
       "w-72 shrink-0 transition-all duration-300",
       showFilters ? "block" : "hidden lg:hidden"
      )}
     >
      <div className="sticky top-24 space-y-6 rounded-xl bg-white p-5 shadow-sm">
       <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Filtreler</h3>
        {activeFiltersCount > 0 && (
         <button
          onClick={clearAllFilters}
          className="text-sm text-emerald-600 hover:text-emerald-700"
         >
          Tümünü Temizle
         </button>
        )}
       </div>

       <div>
        <button
         type="button"
         onClick={() => setPriceSectionOpen((v) => !v)}
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
             onChange={() => setPriceRange(priceRange?.min === range.min ? null : range)}
             className="size-4 accent-emerald-500"
            />
            <span className="text-sm text-gray-600">{range.label}</span>
           </label>
          ))}
         </div>
        )}
       </div>

       {categories.length > 0 && (
        <div>
         <button
          type="button"
          onClick={() => setCategorySectionOpen((v) => !v)}
          className="mb-3 flex w-full cursor-pointer items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900"
         >
          Kategori
          <ChevronDown className={cn("size-4 shrink-0 transition-transform", !categorySectionOpen && "-rotate-90")} />
         </button>
         {categorySectionOpen && (
          <div className="space-y-2">
           {categories.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
             <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="size-4 rounded accent-emerald-500"
             />
             <span className="text-sm text-gray-600">
              {categoryInfo[cat]?.title ?? cat}
             </span>
            </label>
           ))}
          </div>
         )}
        </div>
       )}

       <div>
        <h4 className="mb-3 text-sm font-medium text-gray-700">Hızlı Filtreler</h4>
        <div className="space-y-2">
         <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
          <input
           type="checkbox"
           checked={showInStock}
           onChange={(e) => setShowInStock(e.target.checked)}
           className="size-4 rounded accent-emerald-500"
          />
          <span className="text-sm text-gray-600">Sadece Stokta Olanlar</span>
         </label>
         <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
          <input
           type="checkbox"
           checked={showDiscounted}
           onChange={(e) => setShowDiscounted(e.target.checked)}
           className="size-4 rounded accent-emerald-500"
          />
          <span className="text-sm text-gray-600">İndirimli Ürünler</span>
         </label>
         <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
          <input
           type="checkbox"
           checked={showNew}
           onChange={(e) => setShowNew(e.target.checked)}
           className="size-4 rounded accent-emerald-500"
          />
          <span className="text-sm text-gray-600">Yeni Ürünler</span>
         </label>
        </div>
       </div>
      </div>
     </aside>

     {/* Products Grid */}
     <div className="flex-1">
      {activeFiltersCount > 0 && (
       <div className="mb-4 flex flex-wrap items-center gap-2">
        {selectedCategories.map((cat) => (
         <span key={cat} className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
          {categoryInfo[cat]?.title ?? cat}
          <button onClick={() => toggleCategory(cat)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        ))}
        {priceRange && (
         <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
          {priceRange.label}
          <button onClick={() => setPriceRange(null)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
        {showInStock && (
         <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
          Stokta
          <button onClick={() => setShowInStock(false)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
        {showDiscounted && (
         <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
          İndirimli
          <button onClick={() => setShowDiscounted(false)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
        {showNew && (
         <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
          Yeni
          <button onClick={() => setShowNew(false)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
       </div>
      )}

      {loading ? (
       <div className="flex justify-center py-16">
        <p className="text-gray-500">Yükleniyor…</p>
       </div>
      ) : filteredProducts.length === 0 ? (
       <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm">
        <SearchX className="mb-4 size-16 text-gray-300" />
        <h3 className="mb-2 text-lg font-semibold text-gray-800">Ürün Bulunamadı</h3>
        <p className="mb-6 text-gray-500">
         {activeFiltersCount > 0
          ? "Filtre kriterlerinize uygun ürün bulunamadı."
          : `${brandName} markasına ait henüz ürün bulunmuyor.`}
        </p>
        {activeFiltersCount > 0 ? (
         <Button variant="outline" onClick={clearAllFilters}>
          Filtreleri Temizle
         </Button>
        ) : (
         <Button asChild variant="outline">
          <Link href="/">Ana Sayfaya Dön</Link>
         </Button>
        )}
       </div>
      ) : (
       <div
        className={cn(
         "grid gap-4",
         showFilters ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        )}
       >
        {filteredProducts.map((product) => (
         <ProductCard key={product.id} product={product} />
        ))}
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
}
