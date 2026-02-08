import { X } from "lucide-react";
import { categoryInfo } from "@/lib/product-utils";

export default function ActiveFilterTags({
 selectedCategories,
 priceRange,
 showInStock,
 showDiscounted,
 showNew,
 toggleCategory,
 setPriceRange,
 setShowInStock,
 setShowDiscounted,
 setShowNew,
 activeFiltersCount,
}) {
 if (activeFiltersCount === 0) return null;

 return (
  <div className="mb-4 flex flex-wrap items-center gap-2">
   {selectedCategories.map((cat) => (
    <Badge
     key={cat}
     label={categoryInfo[cat]?.title ?? cat}
     onRemove={() => toggleCategory(cat)}
    />
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
   {showNew && <Badge label="Yeni" onRemove={() => setShowNew(false)} />}
  </div>
 );
}

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