"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categoryInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import DiscountBanner from "@/components/discount/DiscountBanner";
import FilterControls from "@/components/discount/FilterControls";
import FilterSidebar from "@/components/discount/FilterSidebar";
import ActiveFilterTags from "@/components/discount/ActiveFilterTags";

const categoriesList = Object.entries(categoryInfo).map(([slug, info]) => ({
 slug,
 label: info.title,
}));

export default function IndirimlerPage() {
 const [allProducts, setAllProducts] = useState([]);
 const [brands, setBrands] = useState([]);

 const [showFilters, setShowFilters] = useState(false);
 const [sortBy, setSortBy] = useState("discount");

 const [priceRange, setPriceRange] = useState(null);
 const [discountRange, setDiscountRange] = useState(null);
 const [selectedCategories, setSelectedCategories] = useState([]);
 const [selectedBrands, setSelectedBrands] = useState([]);
 const [showInStock, setShowInStock] = useState(false);
 const [showNew, setShowNew] = useState(false);

 useEffect(() => {
  Promise.all([
   fetch("/api/products?discounted=1").then((r) => (r.ok ? r.json() : [])),
   fetch("/api/products/brands").then((r) => (r.ok ? r.json() : [])),
  ]).then(([productsData, brandsData]) => {
   setAllProducts(productsData || []);
   setBrands(Array.isArray(brandsData) ? brandsData : []);
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

 const activeFiltersCount =
  [priceRange, discountRange, showInStock, showNew].filter(Boolean).length +
  selectedCategories.length +
  selectedBrands.length;

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
   <DiscountBanner />

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
     <FilterSidebar
      showFilters={showFilters}
      categories={categoriesList}
      brands={brands}
      selectedCategories={selectedCategories}
      selectedBrands={selectedBrands}
      priceRange={priceRange}
      showInStock={showInStock}
      showNew={showNew}
      toggleCategory={toggleCategory}
      toggleBrand={toggleBrand}
      setPriceRange={setPriceRange}
      setShowInStock={setShowInStock}
      setShowNew={setShowNew}
      clearAllFilters={clearAllFilters}
      activeFiltersCount={activeFiltersCount}
     />

     <div className="flex-1">
      <ActiveFilterTags
       discountRange={discountRange}
       selectedCategories={selectedCategories}
       selectedBrands={selectedBrands}
       priceRange={priceRange}
       showInStock={showInStock}
       showNew={showNew}
       setDiscountRange={setDiscountRange}
       toggleCategory={toggleCategory}
       toggleBrand={toggleBrand}
       setPriceRange={setPriceRange}
       setShowInStock={setShowInStock}
       setShowNew={setShowNew}
       categories={categoriesList}
      />

      {filteredProducts.length === 0 ? (
       <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm">
        <SearchX className="mb-4 size-16 text-gray-300" />
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
         Ürün Bulunamadı
        </h3>
        <p className="mb-6 text-gray-500">
         Filtre kriterlerinize uygun ürün bulunamadı.
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