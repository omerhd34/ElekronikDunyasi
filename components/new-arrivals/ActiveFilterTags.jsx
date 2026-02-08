import { X } from "lucide-react";

export default function ActiveFilterTags({
 selectedCategories,
 selectedBrands,
 priceRange,
 showInStock,
 showDiscounted,
 toggleCategory,
 toggleBrand,
 setPriceRange,
 setShowInStock,
 setShowDiscounted,
 categories,
 activeFiltersCount,
}) {
 if (activeFiltersCount === 0) return null;

 return (
  <div className="mb-4 flex flex-wrap items-center gap-2">
   {selectedCategories.map((slug) => (
    <Badge
     key={slug}
     label={categories.find((c) => c.slug === slug)?.label}
     onRemove={() => toggleCategory(slug)}
    />
   ))}
   {selectedBrands.map((brand) => (
    <Badge key={brand} label={brand} onRemove={() => toggleBrand(brand)} />
   ))}
   {priceRange && (
    <Badge
     label={priceRange.label}
     onRemove={() => setPriceRange(null)}
    />
   )}
   {showInStock && (
    <Badge label="Stokta" onRemove={() => setShowInStock(false)} />
   )}
   {showDiscounted && (
    <Badge label="İndirimli" onRemove={() => setShowDiscounted(false)} />
   )}
  </div>
 );
}

// Yardımcı Badge Bileşeni
function Badge({ label, onRemove }) {
 return (
  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
   {label}
   <button onClick={onRemove} className="cursor-pointer">
    <X className="size-3.5" />
   </button>
  </span>
 );
}