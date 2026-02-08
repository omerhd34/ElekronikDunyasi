"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categoryInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

import BrandBanner from "@/components/brand/BrandBanner";
import FilterControls from "@/components/brand/FilterControls";
import BrandFilterSidebar from "@/components/brand/BrandFilterSidebar";
import ActiveFilterTags from "@/components/brand/ActiveFilterTags";

export default function MarkaPage() {
 const params = useParams();
 const brandName = params?.slug ? decodeURIComponent(String(params.slug)) : "";

 // State Management
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [showFilters, setShowFilters] = useState(false);
 const [sortBy, setSortBy] = useState("featured");

 // Filter States
 const [priceRange, setPriceRange] = useState(null);
 const [showInStock, setShowInStock] = useState(false);
 const [showDiscounted, setShowDiscounted] = useState(false);
 const [showNew, setShowNew] = useState(false);
 const [selectedCategories, setSelectedCategories] = useState([]);

 // Data Fetching
 useEffect(() => {
  if (!brandName) return;
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setLoading(true);
  fetch(`/api/products?brand=${encodeURIComponent(brandName)}`)
   .then((r) => (r.ok ? r.json() : []))
   .then(setProducts)
   .finally(() => setLoading(false));
 }, [brandName]);

 // Derived Categories
 const categories = useMemo(() => {
  const cats = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return cats.sort((a, b) =>
   (categoryInfo[a]?.title ?? a).localeCompare(categoryInfo[b]?.title ?? b)
  );
 }, [products]);

 // Filtering Logic
 const filteredProducts = useMemo(() => {
  let result = [...products];
  if (priceRange) {
   result = result.filter(
    (p) => p.price >= priceRange.min && p.price < priceRange.max
   );
  }
  if (selectedCategories.length > 0) {
   result = result.filter(
    (p) => p.category && selectedCategories.includes(p.category)
   );
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
 }, [
  products,
  sortBy,
  priceRange,
  selectedCategories,
  showInStock,
  showDiscounted,
  showNew,
 ]);

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
   <BrandBanner brandName={brandName} />

   <div className="container px-4 py-6 md:py-8">
    <FilterControls
     showFilters={showFilters}
     setShowFilters={setShowFilters}
     activeFiltersCount={activeFiltersCount}
     productCount={filteredProducts.length}
     sortBy={sortBy}
     setSortBy={setSortBy}
    />

    <div className="flex gap-6">
     <BrandFilterSidebar
      showFilters={showFilters}
      categories={categories}
      selectedCategories={selectedCategories}
      priceRange={priceRange}
      showInStock={showInStock}
      showDiscounted={showDiscounted}
      showNew={showNew}
      toggleCategory={toggleCategory}
      setPriceRange={setPriceRange}
      setShowInStock={setShowInStock}
      setShowDiscounted={setShowDiscounted}
      setShowNew={setShowNew}
      clearAllFilters={clearAllFilters}
      activeFiltersCount={activeFiltersCount}
     />

     <div className="flex-1">
      <ActiveFilterTags
       selectedCategories={selectedCategories}
       priceRange={priceRange}
       showInStock={showInStock}
       showDiscounted={showDiscounted}
       showNew={showNew}
       toggleCategory={toggleCategory}
       setPriceRange={setPriceRange}
       setShowInStock={setShowInStock}
       setShowDiscounted={setShowDiscounted}
       setShowNew={setShowNew}
       activeFiltersCount={activeFiltersCount}
      />

      {loading ? (
       <div className="flex justify-center py-16">
        <p className="text-gray-500">Yükleniyor…</p>
       </div>
      ) : filteredProducts.length === 0 ? (
       <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm">
        <SearchX className="mb-4 size-16 text-gray-300" />
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
         Ürün Bulunamadı
        </h3>
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
         showFilters
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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