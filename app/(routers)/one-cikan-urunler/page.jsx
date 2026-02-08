"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categoryInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

import FeaturedBanner from "@/components/featured/FeaturedBanner";
import FilterControls from "@/components/featured/FilterControls";
import FeaturedSidebar from "@/components/featured/FeaturedSidebar";
import ActiveFilterTags from "@/components/featured/ActiveFilterTags";

const categoriesList = Object.entries(categoryInfo).map(([slug, info]) => ({
 slug,
 label: info.title,
}));

export default function OneCikanUrunlerPage() {
 const [allProducts, setAllProducts] = useState([]);
 const [brands, setBrands] = useState([]);
 const [showFilters, setShowFilters] = useState(false);
 const [sortBy, setSortBy] = useState("featured");

 const [priceRange, setPriceRange] = useState(null);
 const [selectedCategories, setSelectedCategories] = useState([]);
 const [selectedBrands, setSelectedBrands] = useState([]);
 const [showInStock, setShowInStock] = useState(false);
 const [showDiscounted, setShowDiscounted] = useState(false);

 useEffect(() => {
  Promise.all([
   fetch("/api/products?featured=1").then((r) => (r.ok ? r.json() : [])),
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
  if (selectedCategories.length > 0) {
   result = result.filter((p) => selectedCategories.includes(p.category));
  }
  if (selectedBrands.length > 0) {
   result = result.filter(
    (p) => p.brand && selectedBrands.includes(p.brand)
   );
  }
  if (showInStock) {
   result = result.filter((p) => p.inStock);
  }
  if (showDiscounted) {
   result = result.filter((p) => p.discount > 0);
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
   case "discount":
    result.sort((a, b) => b.discount - a.discount);
    break;
   default:
    break;
  }

  return result;
 }, [
  allProducts,
  sortBy,
  priceRange,
  selectedCategories,
  selectedBrands,
  showInStock,
  showDiscounted,
 ]);

 const activeFiltersCount =
  [priceRange, showInStock, showDiscounted].filter(Boolean).length +
  selectedCategories.length +
  selectedBrands.length;

 const clearAllFilters = () => {
  setPriceRange(null);
  setSelectedCategories([]);
  setSelectedBrands([]);
  setShowInStock(false);
  setShowDiscounted(false);
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
   <FeaturedBanner />

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
     <FeaturedSidebar
      showFilters={showFilters}
      categories={categoriesList}
      brands={brands}
      selectedCategories={selectedCategories}
      selectedBrands={selectedBrands}
      priceRange={priceRange}
      showInStock={showInStock}
      showDiscounted={showDiscounted}
      toggleCategory={toggleCategory}
      toggleBrand={toggleBrand}
      setPriceRange={setPriceRange}
      setShowInStock={setShowInStock}
      setShowDiscounted={setShowDiscounted}
      clearAllFilters={clearAllFilters}
      activeFiltersCount={activeFiltersCount}
     />

     <div className="flex-1">
      <ActiveFilterTags
       selectedCategories={selectedCategories}
       selectedBrands={selectedBrands}
       priceRange={priceRange}
       showInStock={showInStock}
       showDiscounted={showDiscounted}
       toggleCategory={toggleCategory}
       toggleBrand={toggleBrand}
       setPriceRange={setPriceRange}
       setShowInStock={setShowInStock}
       setShowDiscounted={setShowDiscounted}
       categories={categoriesList}
       activeFiltersCount={activeFiltersCount}
      />

      {filteredProducts.length === 0 ? (
       <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm">
        <SearchX className="mb-4 size-16 text-gray-300" />
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
         Ürün Bulunamadı
        </h3>
        <p className="mb-6 text-gray-500">
         Filtre kriterlerinize uygun öne çıkan ürün bulunamadı.
        </p>
        <Button onClick={clearAllFilters} variant="outline">
         Filtreleri Temizle
        </Button>
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