"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
 ShoppingCart,
 Star,
 Check,
 X,
 Heart,
 ChevronLeft,
 ChevronRight,
 Truck,
 Shield,
 RotateCcw,
 Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryInfo, formatPrice } from "@/lib/product-utils";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";

export default function ProductDetailPage({ params }) {
 const { slug: categorySlug, productSlug } = use(params);
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const { addItem } = useCart();
 const { isFavorite, toggleFavorite } = useFavorites();

 useEffect(() => {
  if (!productSlug) {
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setProduct(null);
   setLoading(false);
   return;
  }
  setLoading(true);
  fetch(`/api/products/${encodeURIComponent(productSlug)}`)
   .then((r) => (r.ok ? r.json() : null))
   .then((p) => {
    setProduct(p);
    setLoading(false);
   })
   .catch(() => {
    setProduct(null);
    setLoading(false);
   });
 }, [productSlug]);

 const category = categoryInfo[categorySlug];

 // Resim listesi
 const images =
  product?.images?.length > 0
   ? product.images
   : product?.image
    ? [product.image]
    : [];

 const prevImage = () => {
  setCurrentImageIndex((prev) =>
   prev === 0 ? images.length - 1 : prev - 1
  );
 };

 const nextImage = () => {
  setCurrentImageIndex((prev) =>
   prev === images.length - 1 ? 0 : prev + 1
  );
 };

 if (loading) {
  return (
   <div className="min-h-screen bg-gray-50">
    <div className="container px-4 py-8">
     {/* Breadcrumb skeleton */}
     <div className="mb-8 flex items-center gap-2">
      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
     </div>
     <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
       <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />
      </div>
      <div className="space-y-4 lg:col-span-3">
       <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
       <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
       <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />
       <div className="h-12 w-48 animate-pulse rounded-full bg-gray-200" />
      </div>
     </div>
    </div>
   </div>
  );
 }

 if (!product) {
  return (
   <div className="container flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
    <h1 className="mb-4 text-2xl font-bold text-gray-800">
     Ürün Bulunamadı
    </h1>
    <p className="mb-8 text-gray-600">
     Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
    </p>
    <Button asChild>
     <Link href="/">Ana Sayfaya Dön</Link>
    </Button>
   </div>
  );
 }

 const categoryTitle =
  category?.title ??
  categoryInfo[product.category]?.title ??
  product.category;

 const discountPercent = product.discount;

 return (
  <div className="min-h-screen bg-gray-50">
   <div className="container px-4 py-6 md:py-8">
    {/* Breadcrumb */}
    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
     <Link href="/" className="transition-colors hover:text-emerald-600">
      Ana Sayfa
     </Link>
     <span>/</span>
     <Link
      href={`/kategori/${product.category}`}
      className="transition-colors hover:text-emerald-600"
     >
      {categoryTitle}
     </Link>
     <span>/</span>
     <span className="font-medium text-gray-800">{product.name}</span>
    </nav>

    {/* Üst Kısım: Resim + Bilgiler */}
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
     {/* Sol: Resim Galerisi - Daha küçük */}
     <div className="lg:col-span-2">
      <div className="sticky top-24">
       <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
         {discountPercent > 0 && (
          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
           %{discountPercent}
          </span>
         )}
         {product.isNew && (
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-md">
           Yeni
          </span>
         )}
        </div>

        {/* Ana Resim */}
        <div className="relative aspect-[4/3] p-4">
         {images.length > 0 ? (
          <img
           src={images[currentImageIndex]}
           alt={product.name}
           className="h-full w-full object-contain transition-opacity duration-300"
          />
         ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
           Resim yok
          </div>
         )}

         {/* Ok işaretleri */}
         {images.length > 1 && (
          <>
           <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 hover:shadow-xl"
            aria-label="Önceki resim"
           >
            <ChevronLeft className="size-5" />
           </button>
           <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 hover:shadow-xl"
            aria-label="Sonraki resim"
           >
            <ChevronRight className="size-5" />
           </button>
          </>
         )}
        </div>

        {/* Resim göstergeleri (noktalar) */}
        {images.length > 1 && (
         <div className="flex items-center justify-center gap-2 pb-4">
          {images.map((_, idx) => (
           <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`size-2.5 rounded-full transition-all ${idx === currentImageIndex
             ? "scale-125 bg-emerald-500"
             : "bg-gray-300 hover:bg-gray-400"
             }`}
            aria-label={`Resim ${idx + 1}`}
           />
          ))}
         </div>
        )}

        {/* Küçük resimler (thumbnail) */}
        {images.length > 1 && (
         <div className="flex gap-2 overflow-x-auto border-t border-gray-100 p-3">
          {images.map((img, idx) => (
           <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${idx === currentImageIndex
             ? "border-emerald-500 shadow-md"
             : "border-transparent opacity-60 hover:opacity-100"
             }`}
           >
            <img
             src={img}
             alt={`${product.name} - ${idx + 1}`}
             className="h-full w-full object-cover"
            />
           </button>
          ))}
         </div>
        )}
       </div>
      </div>
     </div>

     {/* Sağ: Ürün Bilgileri */}
     <div className="lg:col-span-3">
      {/* Ürün adı */}
      <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
       {product.name}
      </h1>

      {/* Marka */}
      {product.brand && (
       <p className="mt-2 text-sm text-gray-500">
        Marka:{" "}
        <span className="font-medium text-gray-700">
         {product.brand}
        </span>
       </p>
      )}

      {/* Rating */}
      <div className="mt-4 flex items-center gap-3">
       <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
         <Star
          key={i}
          className={`size-5 ${i < Math.floor(product.rating)
           ? "fill-amber-400 text-amber-400"
           : "fill-gray-200 text-gray-200"
           }`}
         />
        ))}
       </div>
       <span className="text-sm font-medium text-gray-600">
        {product.rating}
       </span>
       <span className="text-sm text-gray-400">|</span>
       <span className="text-sm text-gray-500">
        {product.reviewCount} değerlendirme
       </span>
      </div>

      {/* Fiyat */}
      <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
       <div className="flex flex-wrap items-end gap-3">
        {product.oldPrice != null && (
         <span className="text-lg text-gray-400 line-through">
          {formatPrice(product.oldPrice)}
         </span>
        )}
        <span className="text-3xl font-extrabold text-emerald-600 md:text-4xl">
         {formatPrice(product.price)}
        </span>
        {discountPercent > 0 && (
         <span className="rounded-lg bg-red-50 px-2.5 py-1 text-sm font-bold text-red-600">
          %{discountPercent} indirim
         </span>
        )}
       </div>

       {/* Stok durumu */}
       <div className="mt-4 flex items-center gap-2">
        {product.inStock ? (
         <>
          <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100">
           <Check className="size-3 text-emerald-600" />
          </span>
          <span className="text-sm font-medium text-emerald-600">
           Stokta mevcut
          </span>
         </>
        ) : (
         <>
          <span className="flex size-5 items-center justify-center rounded-full bg-red-100">
           <X className="size-3 text-red-600" />
          </span>
          <span className="text-sm font-medium text-red-600">
           Stokta yok
          </span>
         </>
        )}
       </div>

       {/* Sepete ekle ve Favori butonları */}
       <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
         size="lg"
         disabled={!product.inStock}
         onClick={() => addItem(product.id, 1)}
         className="flex-1 rounded-full bg-emerald-600 px-8 py-6 text-base font-semibold shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 disabled:opacity-50 sm:flex-initial"
        >
         <ShoppingCart className="mr-2 size-5" />
         Sepete Ekle
        </Button>
        <Button
         type="button"
         variant="outline"
         size="lg"
         onClick={() => toggleFavorite(product.id)}
         className={`rounded-full border-2 px-6 py-6 transition-all ${isFavorite(product.id)
          ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
          }`}
         aria-label={
          isFavorite(product.id)
           ? "Favorilerden çıkar"
           : "Favorilere ekle"
         }
        >
         <Heart
          className={`mr-2 size-5 ${isFavorite(product.id) ? "fill-current" : ""}`}
         />
         {isFavorite(product.id) ? "Favorilerde" : "Favorilere Ekle"}
        </Button>
       </div>
      </div>

      {/* Hizmet Bilgileri */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
       <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
        <Truck className="size-6 text-emerald-500" />
        <span className="text-xs font-medium text-gray-600">
         Ücretsiz Kargo
        </span>
       </div>
       <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
        <Shield className="size-6 text-emerald-500" />
        <span className="text-xs font-medium text-gray-600">
         2 Yıl Garanti
        </span>
       </div>
       <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
        <RotateCcw className="size-6 text-emerald-500" />
        <span className="text-xs font-medium text-gray-600">
         14 Gün İade
        </span>
       </div>
       <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
        <Package className="size-6 text-emerald-500" />
        <span className="text-xs font-medium text-gray-600">
         Hızlı Teslimat
        </span>
       </div>
      </div>

      {/* Açıklama */}
      {product.description && (
       <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">
         Ürün Açıklaması
        </h3>
        <p className="leading-relaxed text-gray-600">
         {product.description}
        </p>
       </div>
      )}
     </div>
    </div>

    {/* Alt Kısım: Özellikler - Tam genişlik */}
    {(product.specifications?.length > 0 || product.specs?.length > 0) && (
     <div className="mt-10 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-5">
       <h2 className="text-xl font-bold text-gray-900">
        Teknik Özellikler
       </h2>
      </div>
      <div className="p-6">
       {product.specifications?.length > 0 ? (
        <div className="space-y-6">
         {product.specifications.map((group, gi) => (
          <div key={gi}>
           {group.category && (
            <h4 className="mb-3 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
             {group.category}
            </h4>
           )}
           <dl className="divide-y divide-gray-100">
            {(group.items ?? []).map((item, ii) => (
             <div
              key={ii}
              className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4"
             >
              <dt className="text-sm text-gray-500">
               {item.key}
              </dt>
              <dd className="text-sm font-medium text-gray-900 sm:col-span-2">
               {item.value}
              </dd>
             </div>
            ))}
           </dl>
          </div>
         ))}
        </div>
       ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
         {product.specs.map((spec, i) => (
          <li
           key={i}
           className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700"
          >
           <Check className="size-4 shrink-0 text-emerald-500" />
           {spec}
          </li>
         ))}
        </ul>
       )}
      </div>
     </div>
    )}
   </div>
  </div>
 );
}
