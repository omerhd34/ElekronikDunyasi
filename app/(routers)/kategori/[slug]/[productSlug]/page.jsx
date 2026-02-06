"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
 ShoppingCart,
 Star,
 Check,
 Heart,
 ChevronLeft,
 ChevronRight,
 Shield,
 RotateCcw,
 Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryInfo, formatPrice } from "@/lib/product-utils";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";

export default function ProductDetailPage({ params }) {
 const { slug: categorySlug, productSlug } = use(params);
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [similarProducts, setSimilarProducts] = useState([]);
 const [similarLoading, setSimilarLoading] = useState(true);
 const { addItem, removeItem, items } = useCart();
 const inCart = product ? items.some((i) => i.productId === String(product.id)) : false;
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

 // Benzer ürünleri çek (aynı kategori)
 useEffect(() => {
  if (!product?.category || !product?.id) return;
  let cancelled = false;
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setSimilarLoading(true);
  fetch(`/api/products?category=${encodeURIComponent(product.category)}`)
   .then((r) => (r.ok ? r.json() : []))
   .then((list) => {
    if (cancelled) return;
    setSimilarProducts(list.filter((p) => p.id !== product.id).slice(0, 8));
    setSimilarLoading(false);
   })
   .catch(() => {
    if (cancelled) return;
    setSimilarProducts([]);
    setSimilarLoading(false);
   });
  return () => { cancelled = true; };
 }, [product?.category, product?.id]);

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
   <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
    <div className="container px-4 py-10">
     <div className="mb-8 flex items-center gap-2">
      <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
      <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
      <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-4 w-40 animate-pulse rounded-md bg-gray-200" />
     </div>
     <div className="grid gap-8 lg:grid-cols-5 lg:gap-14">
      <div className="lg:col-span-2">
       <div className="aspect-square animate-pulse rounded-2xl bg-gray-200/80" />
      </div>
      <div className="space-y-5 lg:col-span-3">
       <div className="h-9 w-4/5 animate-pulse rounded-lg bg-gray-200/80" />
       <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200/60" />
       <div className="h-6 w-48 animate-pulse rounded-md bg-gray-200/60" />
       <div className="h-16 w-64 animate-pulse rounded-2xl bg-gray-200/80" />
       <div className="flex gap-3 pt-2">
        <div className="h-12 w-44 animate-pulse rounded-xl bg-gray-200/80" />
        <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200/80" />
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 }

 if (!product) {
  return (
   <div className="min-h-screen bg-lanraro-b from-gray-50 to-white">
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
     <h1 className="mb-3 text-2xl font-bold text-gray-900">
      Ürün Bulunamadı
     </h1>
     <p className="mb-8 max-w-md text-gray-600">
      Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
     </p>
     <Button asChild className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
      <Link href="/">Ana Sayfaya Dön</Link>
     </Button>
    </div>
   </div>
  );
 }

 const categoryTitle =
  category?.title ??
  categoryInfo[product.category]?.title ??
  product.category;

 const discountPercent = product.discount;

 return (
  <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
   <div className="container px-4 py-6 md:py-10">
    {/* Breadcrumb */}
    <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
     <Link href="/" className="transition-colors hover:text-emerald-600">
      Ana Sayfa
     </Link>
     <ChevronRight className="size-4 shrink-0 text-gray-300" aria-hidden />
     <Link
      href={`/kategori/${product.category}`}
      className="transition-colors hover:text-emerald-600"
     >
      {categoryTitle}
     </Link>
     <ChevronRight className="size-4 shrink-0 text-gray-300" aria-hidden />
     <span className="max-w-[180px] truncate font-medium text-gray-800 sm:max-w-none">{product.name}</span>
    </nav>

    {/* Üst Kısım: Resim + Bilgiler */}
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-14">
     {/* Sol: Resim Galerisi */}
     <div className="lg:col-span-2">
      <div className="sticky top-24">
       <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50 ring-1 ring-gray-100">
        {/* Badges */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
         {discountPercent > 0 && (
          <span className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/30">
           %{discountPercent} İndirim
          </span>
         )}
         {product.isNew && (
          <span className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30">
           Yeni
          </span>
         )}
        </div>

        {/* Ana Resim */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
         {images.length > 0 ? (
          <img
           src={images[currentImageIndex]}
           alt={product.name}
           className="h-full w-full object-cover transition-opacity duration-300"
           sizes="(max-width: 1024px) 100vw, 40vw"
          />
         ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100 text-gray-400">
           Resim yok
          </div>
         )}

         {/* Ok işaretleri */}
         {images.length > 1 && (
          <>
           <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Önceki resim"
           >
            <ChevronLeft className="size-5" />
           </button>
           <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Sonraki resim"
           >
            <ChevronRight className="size-5" />
           </button>
          </>
         )}
        </div>

        {/* Thumbnail'ler */}
        {images.length > 1 && (
         <div className="flex gap-2 border-t border-gray-100 bg-gray-50/50 p-3">
          {images.map((img, idx) => (
           <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${idx === currentImageIndex
             ? "border-emerald-500 ring-2 ring-emerald-200"
             : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
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
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl lg:leading-tight">
       {product.name}
      </h1>

      {/* Marka */}
      {product.brand && (
       <p className="mt-3 text-sm text-gray-500">
        Marka:{" "}
        <Link
         href={`/marka/${encodeURIComponent(product.brand)}`}
         className="font-medium text-emerald-600 underline-offset-2 hover:underline hover:text-emerald-700"
        >
         {product.brand}
        </Link>
       </p>
      )}

      {/* Rating */}
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
       <div className="flex items-center gap-0.5" aria-label={`${product.rating} üzerinden 5 yıldız`}>
        {[...Array(5)].map((_, i) => (
         <Star
          key={i}
          className={`size-5 ${i < Math.floor(product.rating ?? 0)
           ? "fill-amber-400 text-amber-400"
           : "fill-gray-200 text-gray-200"
           }`}
         />
        ))}
       </div>
       <span className="text-sm font-semibold text-gray-700">
        {product.rating ?? 0}
       </span>
       <span className="text-sm text-gray-400">·</span>
       <span className="text-sm text-gray-500">
        {product.reviewCount ?? 0} değerlendirme
       </span>
      </div>

      {/* Fiyat & Satın Alma */}
      <div className="mt-8 rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50 ring-1 ring-gray-100">
       <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-6">
        <div className="flex flex-col gap-1">
         {product.oldPrice != null && (
          <div className="flex items-center gap-2">
           <span className="text-base text-gray-400 line-through">
            {formatPrice(product.oldPrice)}
           </span>
           {discountPercent > 0 && (
            <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
             %{discountPercent}
            </span>
           )}
          </div>
         )}
         <span className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {formatPrice(product.price)}
         </span>
        </div>
        {product.inStock ? (
         <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <span className="size-2 rounded-full bg-emerald-500" />
          Stokta
         </span>
        ) : (
         <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
          <span className="size-2 rounded-full bg-red-500" />
          Tükendi
         </span>
        )}
       </div>

       <div className="flex flex-wrap items-center justify-end gap-3 p-5">
        <Button
         size="lg"
         disabled={!product.inStock}
         onClick={() => (inCart ? removeItem(product.id) : addItem(product.id, 1))}
         className={`h-12 w-fit min-w-[200px] rounded-xl px-8 font-semibold shadow-lg transition-all disabled:opacity-50 ${inCart
          ? "bg-red-500 shadow-red-500/25 hover:bg-red-600 hover:shadow-red-500/30"
          : "bg-emerald-600 shadow-emerald-500/25 hover:bg-emerald-700 hover:shadow-emerald-500/30"
          }`}
        >
         <ShoppingCart className="mr-2 size-5" />
         {inCart ? "Sepetten Çıkar" : "Sepete Ekle"}
        </Button>
        <Button
         type="button"
         variant="outline"
         size="lg"
         onClick={() => toggleFavorite(product.id)}
         className={`h-12 w-12 shrink-0 rounded-xl border-2 p-0 transition-all ${isFavorite(product.id)
          ? "border-red-300 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          }`}
         aria-label={
          isFavorite(product.id)
           ? "Favorilerden çıkar"
           : "Favorilere ekle"
         }
        >
         <Heart
          className={`size-5 ${isFavorite(product.id) ? "fill-current" : ""}`}
         />
        </Button>
       </div>
      </div>

      {/* Hizmet Bilgileri */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
       <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
         <Shield className="size-5 text-emerald-600" />
        </div>
        <span className="text-xs font-medium text-gray-700">2 Yıl Garanti</span>
       </div>
       <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
         <RotateCcw className="size-5 text-emerald-600" />
        </div>
        <span className="text-xs font-medium text-gray-700">14 Gün İade</span>
       </div>
       <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
         <Package className="size-5 text-emerald-600" />
        </div>
        <span className="text-xs font-medium text-gray-700">Hızlı Teslimat</span>
       </div>
      </div>

      {/* Açıklama */}
      {product.description && (
       <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-gray-900">
         Ürün Açıklaması
        </h3>
        <p className="leading-relaxed text-gray-600">
         {product.description}
        </p>
       </div>
      )}
     </div>
    </div>

    {/* Teknik Özellikler */}
    {(product.specifications?.length > 0 || product.specs?.length > 0) && (
     <section className="mt-12 rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50 ring-1 ring-gray-100" aria-labelledby="specs-heading">
      <div className="border-b border-gray-100 px-6 py-5">
       <h2 id="specs-heading" className="text-lg font-bold text-gray-900">
        Teknik Özellikler
       </h2>
      </div>
      <div className="p-6">
       {product.specifications?.length > 0 ? (
        <div className="space-y-8">
         {product.specifications.map((group, gi) => (
          <div key={gi}>
           {group.category && (
            <h4 className="mb-3 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
             {group.category}
            </h4>
           )}
           <dl className="divide-y divide-gray-100 rounded-lg border border-gray-100">
            {(group.items ?? []).map((item, ii) => (
             <div
              key={ii}
              className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3 sm:gap-4"
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
           className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-gray-700"
          >
           <Check className="size-4 shrink-0 text-emerald-500" />
           {spec}
          </li>
         ))}
        </ul>
       )}
      </div>
     </section>
    )}

    {/* Benzer Ürünler */}
    {(similarLoading || similarProducts.length > 0) && (
     <section className="mt-14" aria-labelledby="similar-heading">
      <h2 id="similar-heading" className="mb-6 text-2xl font-bold text-gray-900">
       Benzer Ürünler
      </h2>
      {similarLoading ? (
       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
         <ProductCardSkeleton key={i} />
        ))}
       </div>
      ) : (
       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {similarProducts.map((p) => (
         <ProductCard key={p.id} product={p} />
        ))}
       </div>
      )}
     </section>
    )}
   </div>
  </div>
 );
}