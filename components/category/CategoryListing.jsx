"use client";

import { useState, useMemo, useEffect } from "react";
import { categoryInfo } from "@/lib/product-utils";
import CategoryBanner from "./CategoryBanner";
import CategoryControls from "./CategoryControls";
import CategoryFilterSidebar from "./CategoryFilterSidebar";
import CategoryActiveFilters from "./CategoryActiveFilters";
import CategoryEmptyState from "./CategoryEmptyState";
import CategoryProductGrid from "./CategoryProductGrid";
import CategoryNotFound from "./CategoryNotFound";

export default function CategoryListing({ slug }) {
 const [sortBy, setSortBy] = useState("featured");
 const [showFilters, setShowFilters] = useState(false);
 const [priceRange, setPriceRange] = useState(null);
 const [showInStock, setShowInStock] = useState(false);
 const [showDiscounted, setShowDiscounted] = useState(false);
 const [showNew, setShowNew] = useState(false);
 const [isSortOpen, setIsSortOpen] = useState(false);
 const [priceSectionOpen, setPriceSectionOpen] = useState(false);
 const [brandSectionOpen, setBrandSectionOpen] = useState(false);
 const [selectedBrands, setSelectedBrands] = useState([]);
 const [allProducts, setAllProducts] = useState([]);
 const [brands, setBrands] = useState([]);

 const category = categoryInfo[slug];

 useEffect(() => {
  if (!slug) return;
  Promise.all([
   fetch(`/api/products?category=${encodeURIComponent(slug)}`).then((r) => (r.ok ? r.json() : [])),
   fetch("/api/products/brands").then((r) => (r.ok ? r.json() : [])),
  ]).then(([products, brandsList]) => {
   setAllProducts(products || []);
   setBrands(Array.isArray(brandsList) ? brandsList : []);
  });
 }, [slug]);

 const filteredProducts = useMemo(() => {
  let result = [...allProducts];
  if (priceRange) {
   result = result.filter(
    (p) => p.price >= priceRange.min && p.price < priceRange.max
   );
  }
  if (selectedBrands.length > 0) {
   result = result.filter((p) => p.brand && selectedBrands.includes(p.brand));
  }
  if (showInStock) result = result.filter((p) => p.inStock);
  if (showDiscounted) result = result.filter((p) => p.discount > 0);
  if (showNew) result = result.filter((p) => p.isNew);

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
 }, [allProducts, sortBy, priceRange, selectedBrands, showInStock, showDiscounted, showNew]);

 const activeFiltersCount =
  [priceRange, showInStock, showDiscounted, showNew].filter(Boolean).length +
  selectedBrands.length;

 const clearAllFilters = () => {
  setPriceRange(null);
  setSelectedBrands([]);
  setShowInStock(false);
  setShowDiscounted(false);
  setShowNew(false);
 };

 const toggleBrand = (brand) => {
  setSelectedBrands((prev) =>
   prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
  );
 };

 if (!category) {
  return <CategoryNotFound />;
 }

 return (
  <div className="min-h-screen bg-gray-50/50">
   <CategoryBanner title={category.title} description={category.description} />

   <div className="container px-4 py-6 md:py-8">
    <CategoryControls
     showFilters={showFilters}
     onToggleFilters={() => setShowFilters((v) => !v)}
     activeFiltersCount={activeFiltersCount}
     resultCount={filteredProducts.length}
     sortBy={sortBy}
     onSortChange={setSortBy}
     isSortOpen={isSortOpen}
     onSortOpenChange={setIsSortOpen}
    />

    <div className="flex gap-6">
     <CategoryFilterSidebar
      visible={showFilters}
      priceRange={priceRange}
      onPriceRangeChange={setPriceRange}
      priceSectionOpen={priceSectionOpen}
      onPriceSectionToggle={() => setPriceSectionOpen((v) => !v)}
      brands={brands}
      selectedBrands={selectedBrands}
      onToggleBrand={toggleBrand}
      brandSectionOpen={brandSectionOpen}
      onBrandSectionToggle={() => setBrandSectionOpen((v) => !v)}
      showInStock={showInStock}
      onShowInStockChange={setShowInStock}
      showDiscounted={showDiscounted}
      onShowDiscountedChange={setShowDiscounted}
      showNew={showNew}
      onShowNewChange={setShowNew}
      activeFiltersCount={activeFiltersCount}
      onClearAll={clearAllFilters}
     />

     <div className="flex-1">
      <CategoryActiveFilters
       selectedBrands={selectedBrands}
       onRemoveBrand={toggleBrand}
       priceRange={priceRange}
       onRemovePriceRange={() => setPriceRange(null)}
       showInStock={showInStock}
       onRemoveInStock={() => setShowInStock(false)}
       showDiscounted={showDiscounted}
       onRemoveDiscounted={() => setShowDiscounted(false)}
       showNew={showNew}
       onRemoveNew={() => setShowNew(false)}
      />

      {filteredProducts.length === 0 ? (
       <CategoryEmptyState onClearFilters={clearAllFilters} />
      ) : (
       <CategoryProductGrid
        products={filteredProducts}
        sidebarVisible={showFilters}
       />
      )}
     </div>
    </div>
   </div>
  </div>
 );
}
