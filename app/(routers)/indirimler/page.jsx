"use client";

import { useState, useMemo, useEffect } from "react";
import {
 ChevronDown,
 SlidersHorizontal,
 X,
 SearchX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categoryInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const sortOptions = [
 { value: "discount", label: "İndirimli" },
 { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
 { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
 { value: "rating", label: "En Yüksek Puan" },
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


const categories = Object.entries(categoryInfo).map(([slug, info]) => ({
 slug,
 label: info.title,
}));

export default function IndirimlerPage() {
 const [sortBy, setSortBy] = useState("discount");
 const [isSortOpen, setIsSortOpen] = useState(false);
 const [showFilters, setShowFilters] = useState(false);
 const [priceRange, setPriceRange] = useState(null);
 const [discountRange, setDiscountRange] = useState(null);
 const [selectedCategories, setSelectedCategories] = useState([]);
 const [showInStock, setShowInStock] = useState(false);
 const [showNew, setShowNew] = useState(false);
 const [categorySectionOpen, setCategorySectionOpen] = useState(true);
 const [priceSectionOpen, setPriceSectionOpen] = useState(false);
 const [brandSectionOpen, setBrandSectionOpen] = useState(false);
 const [selectedBrands, setSelectedBrands] = useState([]);
 const [allProducts, setAllProducts] = useState([]);
 const [brands, setBrands] = useState([]);

 useEffect(() => {
  Promise.all([
   fetch("/api/products?discounted=1").then((r) => (r.ok ? r.json() : [])),
   fetch("/api/products/brands").then((r) => (r.ok ? r.json() : [])),
  ]).then(([products, brandsList]) => {
   setAllProducts(products || []);
   setBrands(Array.isArray(brandsList) ? brandsList : []);
  });
 }, []);

 const filteredProducts = useMemo(() => {
  let result = [...allProducts];

  if (priceRange) {
   result = result.filter(
    (p) => p.price >= priceRange.min && p.price < priceRange.max
   );
  }
  if (discountRange) {
   result = result.filter(
    (p) => p.discount >= discountRange.min && p.discount < discountRange.max
   );
  }
  if (selectedCategories.length > 0) {
   result = result.filter((p) => selectedCategories.includes(p.category));
  }
  if (selectedBrands.length > 0) {
   result = result.filter((p) => p.brand && selectedBrands.includes(p.brand));
  }
  if (showInStock) {
   result = result.filter((p) => p.inStock);
  }
  if (showNew) {
   result = result.filter((p) => p.isNew);
  }

  switch (sortBy) {
   case "discount":
    result.sort((a, b) => b.discount - a.discount);
    break;
   case "price-asc":
    result.sort((a, b) => a.price - b.price);
    break;
   case "price-desc":
    result.sort((a, b) => b.price - a.price);
    break;
   case "rating":
    result.sort((a, b) => b.rating - a.rating);
    break;
   default:
    break;
  }

  return result;
 }, [allProducts, sortBy, priceRange, discountRange, selectedCategories, selectedBrands, showInStock, showNew]);

 const activeFiltersCount = [priceRange, discountRange, showInStock, showNew].filter(Boolean).length + selectedCategories.length + selectedBrands.length;

 const clearAllFilters = () => {
  setPriceRange(null);
  setDiscountRange(null);
  setSelectedCategories([]);
  setSelectedBrands([]);
  setShowInStock(false);
  setShowNew(false);
 };

 const toggleCategory = (slug) => {
  setSelectedCategories((prev) =>
   prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
  );
 };

 const toggleBrand = (brand) => {
  setSelectedBrands((prev) =>
   prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
  );
 };

 return (
  <div className="min-h-screen bg-gray-50/50">
   {/* Banner */}
   <div className="relative h-48 overflow-hidden bg-linear-to-r from-emerald-600 to-emerald-800 md:h-64">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
    <div className="container relative z-10 flex h-full flex-col justify-center px-4">
     <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
      İndirimli Ürünler
     </h1>
     <p className="mt-2 max-w-xl text-red-100 md:text-lg">
      En iyi fiyatlarla kaliteli ürünler
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
        showFilters && "border-red-500 bg-red-50 text-red-600"
       )}
      >
       <SlidersHorizontal className="size-4" />
       Filtreler
       {activeFiltersCount > 0 && (
        <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
         {activeFiltersCount}
        </span>
       )}
      </Button>
      <span className="text-sm text-gray-500">
       <span className="font-semibold text-gray-800">{filteredProducts.length}</span> indirimli ürün
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
            sortBy === option.value
             ? "bg-red-50 text-red-600 font-medium"
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

    <div className="flex gap-6">
     {/* Filters Sidebar */}
     <aside className={cn("w-72 shrink-0 transition-all duration-300", showFilters ? "block" : "hidden")}>
      <div className="sticky top-24 space-y-6 rounded-xl bg-white p-5 shadow-sm">
       <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Filtreler</h3>
        {activeFiltersCount > 0 && (
         <button onClick={clearAllFilters} className="cursor-pointer text-sm text-red-600 hover:text-red-700">
          Tümünü Temizle
         </button>
        )}
       </div>

       {/* Kategori - başlığa tıklayınca açılır/kapanır, ilk başta açık */}
       <div>
        <button
         type="button"
         onClick={() => setCategorySectionOpen((v) => !v)}
         className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900"
        >
         Kategori
         <ChevronDown className={cn("size-4 shrink-0 transition-transform", !categorySectionOpen && "-rotate-90")} />
        </button>
        {categorySectionOpen && (
         <div className="space-y-2">
          {categories.map((cat) => (
           <label key={cat.slug} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
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

       {/* Marka - başlığa tıklayınca açılır/kapanır, ilk başta açık */}
       <div>
        <button
         type="button"
         onClick={() => setBrandSectionOpen((v) => !v)}
         className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
        >
         Marka
         <ChevronDown className={cn("size-4 shrink-0 transition-transform", !brandSectionOpen && "-rotate-90")} />
        </button>
        {brandSectionOpen && (
         <div className="space-y-2">
          {brands.map((brand) => (
           <label key={brand} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
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

       {/* Fiyat Aralığı - başlığa tıklayınca açılır/kapanır, ilk başta açık */}
       <div>
        <button
         type="button"
         onClick={() => setPriceSectionOpen((v) => !v)}
         className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
        >
         Fiyat Aralığı
         <ChevronDown className={cn("size-4 shrink-0 transition-transform", !priceSectionOpen && "-rotate-90")} />
        </button>
        {priceSectionOpen && (
         <div className="space-y-2">
          {priceRanges.map((range, i) => (
           <label key={i} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <input
             type="radio"
             name="priceRange"
             checked={priceRange?.min === range.min}
             onChange={() => setPriceRange(priceRange?.min === range.min ? null : range)}
             className="size-4 accent-red-500"
            />
            <span className="text-sm text-gray-600">{range.label}</span>
           </label>
          ))}
         </div>
        )}
       </div>

       {/* Quick Filters */}
       <div>
        <h4 className="mb-3 text-sm font-medium text-gray-700">Hızlı Filtreler</h4>
        <div className="space-y-2">
         <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
          <input
           type="checkbox"
           checked={showInStock}
           onChange={(e) => setShowInStock(e.target.checked)}
           className="size-4 rounded accent-red-500"
          />
          <span className="text-sm text-gray-600">Sadece Stokta Olanlar</span>
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

     {/* Products Grid */}
     <div className="flex-1">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
       <div className="mb-4 flex flex-wrap items-center gap-2">
        {discountRange && (
         <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          {discountRange.label}
          <button onClick={() => setDiscountRange(null)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
        {selectedCategories.map((slug) => (
         <span key={slug} className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          {categories.find((c) => c.slug === slug)?.label}
          <button onClick={() => toggleCategory(slug)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        ))}
        {selectedBrands.map((brand) => (
         <span key={brand} className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          {brand}
          <button onClick={() => toggleBrand(brand)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        ))}
        {priceRange && (
         <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          {priceRange.label}
          <button onClick={() => setPriceRange(null)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
        {showInStock && (
         <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          Stokta
          <button onClick={() => setShowInStock(false)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
        {showNew && (
         <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          Yeni
          <button onClick={() => setShowNew(false)} className="cursor-pointer">
           <X className="size-3.5" />
          </button>
         </span>
        )}
       </div>
      )}

      {filteredProducts.length === 0 ? (
       <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm">
        <SearchX className="mb-4 size-16 text-gray-300" />
        <h3 className="mb-2 text-lg font-semibold text-gray-800">Ürün Bulunamadı</h3>
        <p className="mb-6 text-gray-500">Filtre kriterlerinize uygun ürün bulunamadı.</p>
        <Button onClick={clearAllFilters} variant="outline">
         Filtreleri Temizle
        </Button>
       </div>
      ) : (
       <div className={cn("grid gap-4", showFilters ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4")}>
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
