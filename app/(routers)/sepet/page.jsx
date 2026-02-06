"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/product-utils";

export default function SepetPage() {
 const { items, totalCount, updateQuantity, removeItem } = useCart();
 const [productsMap, setProductsMap] = useState({});
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (items.length === 0) {
   queueMicrotask(() => {
    setProductsMap({});
    setLoading(false);
   });
   return;
  }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setLoading(true);
  const uniq = [...new Set(items.map((i) => i.productId))];
  Promise.all(
   uniq.map((id) =>
    fetch(`/api/products/by-id/${id}`)
     .then((r) => (r.ok ? r.json() : null))
     .catch(() => null)
   )
  ).then((results) => {
   const map = {};
   uniq.forEach((id, i) => {
    if (results[i]) map[id] = results[i];
   });
   setProductsMap(map);
   setLoading(false);

   // API'den bulunamayan ürünleri sepetten temizle
   const staleIds = uniq.filter((id) => !map[id]);
   staleIds.forEach((id) => removeItem(id));
  });
 }, [items, removeItem]);

 const cartItems = useMemo(
  () =>
   items
    .map(({ productId, quantity }) => ({
     product: productsMap[productId],
     productId,
     quantity,
    }))
    .filter((i) => i.product),
  [items, productsMap]
 );

 const totalPrice = useMemo(
  () =>
   cartItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
   ),
  [cartItems]
 );

 const [shippingCost, setShippingCost] = useState(140);
 useEffect(() => {
  fetch("/api/settings/shipping-cost")
   .then((r) => (r.ok ? r.json() : {}))
   .then((data) => {
    const cost = typeof data?.shippingCost === "number" && data.shippingCost >= 0
     ? data.shippingCost
     : 140;
    setShippingCost(cost);
   })
   .catch(() => { });
 }, []);
 const grandTotal = totalPrice + shippingCost;

 return (
  <div className="min-h-screen bg-gray-50/50">
   <div className="container px-4 py-8 md:py-12">
    <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
     Sepetim
    </h1>
    <p className="mb-8 text-gray-500">
     {totalCount > 0
      ? `${totalCount} ürün`
      : "Sepetiniz şu an boş."}
    </p>

    {loading && items.length > 0 ? (
     <div className="rounded-2xl bg-white py-12 text-center text-gray-500">
      Yükleniyor…
     </div>
    ) : cartItems.length === 0 ? (
     <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 shadow-sm">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
       <ShoppingCart className="size-12 text-gray-300" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">
       Sepetiniz boş
      </h2>
      <p className="mb-8 max-w-sm text-center text-gray-500">
       Ürün kartlarındaki sepet ikonuna tıklayarak ürünleri sepete ekleyebilirsiniz.
      </p>
      <Button asChild className="gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700">
       <Link href="/">
        Alışverişe Başla
        <ArrowRight className="size-4" />
       </Link>
      </Button>
     </div>
    ) : (
     <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex-1 space-y-4">
       {cartItems.map(({ product, productId, quantity }) => (
        <div
         key={product.id}
         className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
        >
         <Link
          href={`/kategori/${product.category}/${product.slug}`}
          className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-20 sm:w-20"
         >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
           src={product.image}
           alt={product.name}
           className="h-full w-full object-cover"
          />
         </Link>
         <div className="min-w-0 flex-1">
          <Link
           href={`/kategori/${product.category}/${product.slug}`}
           className="font-medium text-gray-800 hover:text-emerald-600 line-clamp-2"
          >
           {product.name}
          </Link>
          <p className="mt-1 text-lg font-bold text-emerald-600">
           {formatPrice(product.price)}
          </p>
         </div>
         <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50">
           <button
            type="button"
            onClick={() => updateQuantity(productId, quantity - 1)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-l-full text-gray-600 hover:bg-gray-100"
            aria-label="Azalt"
           >
            <Minus className="size-4" />
           </button>
           <span className="min-w-8 text-center text-sm font-medium tabular-nums">
            {quantity}
           </span>
           <button
            type="button"
            onClick={() => updateQuantity(productId, quantity + 1)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-r-full text-gray-600 hover:bg-gray-100"
            aria-label="Artır"
           >
            <Plus className="size-4" />
           </button>
          </div>
          <span className="w-20 text-right text-sm font-semibold text-gray-800">
           {formatPrice(product.price * quantity)}
          </span>
          <button
           type="button"
           onClick={() => removeItem(productId)}
           className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 cursor-pointer"
           aria-label="Ürünü kaldır"
          >
           <Trash2 className="size-5" />
          </button>
         </div>
        </div>
       ))}
      </div>
      <div className="w-full shrink-0 lg:w-80">
       <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Sipariş Özeti</h2>
        <div className="space-y-2 text-sm">
         <div className="flex justify-between text-gray-600">
          <span>Ara Toplam ({totalCount} ürün)</span>
          <span className="font-medium text-gray-800">{formatPrice(totalPrice)}</span>
         </div>
         <div className="flex justify-between text-gray-600">
          <span>Kargo Ücreti</span>
          <span className="font-medium text-gray-800">{formatPrice(shippingCost)}</span>
         </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
         <span className="font-semibold text-gray-800">Toplam</span>
         <span className="text-xl font-bold text-emerald-600">{formatPrice(grandTotal)}</span>
        </div>
        <Button
         asChild
         className="mt-6 w-full gap-2 rounded-full bg-emerald-600 py-6 text-base hover:bg-emerald-700"
        >
         <Link href="#">
          Ödemeye Geç
          <ArrowRight className="size-4" />
         </Link>
        </Button>
       </div>
      </div>
     </div>
    )}
   </div>
  </div>
 );
}
