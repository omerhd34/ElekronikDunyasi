import { X } from "lucide-react";

export default function ActiveFilterTags({
 discountRange,
 selectedCategories,
 selectedBrands,
 priceRange,
 showInStock,
 showNew,
 setDiscountRange,
 toggleCategory,
 toggleBrand,
 setPriceRange,
 setShowInStock,
 setShowNew,
 categories,
}) {
 const hasFilters =
  discountRange ||
  selectedCategories.length > 0 ||
  selectedBrands.length > 0 ||
  priceRange ||
  showInStock ||
  showNew;

 if (!hasFilters) return null;

 return (
  <div className="mb-4 flex flex-wrap items-center gap-2">
   {discountRange && (
    <Badge
     label={discountRange.label}
     onRemove={() => setDiscountRange(null)}
    />
   )}
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
   {showNew && <Badge label="Yeni" onRemove={() => setShowNew(false)} />}
  </div>
 );
}

// Küçük bir yardımcı bileşen (Local)
function Badge({ label, onRemove }) {
 return (
  <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
   {label}
   <button onClick={onRemove} className="cursor-pointer">
    <X className="size-3.5" />
   </button>
  </span>
 );
}