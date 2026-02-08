"use client";

import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/context/cart-context";
import CartItem from "@/components/basket/CartItem";
import OrderSummary from "@/components/basket/OrderSummary";
import EmptyCart from "@/components/basket/EmptyCart";

export default function SepetPage() {
 const { items, totalCount, updateQuantity, removeItem } = useCart();
 const [productsMap, setProductsMap] = useState({});
 const [loading, setLoading] = useState(true);
 const [shippingCost, setShippingCost] = useState(140);

 // 1. Ürün Verilerini Çekme (Data Fetching Logic)
 useEffect(() => {
  if (items.length === 0) {
   // Sepet boşsa yüklemeyi hemen bitir
   queueMicrotask(() => {
    setProductsMap({});
    setLoading(false);
   });
   return;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  setLoading(true);
  const uniqIds = [...new Set(items.map((i) => i.productId))];

  Promise.all(
   uniqIds.map((id) =>
    fetch(`/api/products/by-id/${id}`)
     .then((r) => (r.ok ? r.json() : null))
     .catch(() => null)
   )
  ).then((results) => {
   const map = {};
   uniqIds.forEach((id, i) => {
    if (results[i]) map[id] = results[i];
   });
   setProductsMap(map);
   setLoading(false);

   // Veritabanında bulunamayan eski ürünleri sepetten temizle
   const staleIds = uniqIds.filter((id) => !map[id]);
   staleIds.forEach((id) => removeItem(id));
  });
 }, [items, removeItem]);

 // 2. Kargo Ücretini Çekme
 useEffect(() => {
  fetch("/api/settings/shipping-cost")
   .then((r) => (r.ok ? r.json() : {}))
   .then((data) => {
    const cost =
     typeof data?.shippingCost === "number" && data.shippingCost >= 0
      ? data.shippingCost
      : 140;
    setShippingCost(cost);
   })
   .catch(() => { });
 }, []);

 // 3. Veriyi Birleştirme (Derived State)
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

 // --- RENDER ---

 return (
  <div className="min-h-screen bg-gray-50/50">
   <div className="container px-4 py-8 md:py-12">
    <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
     Sepetim
    </h1>
    <p className="mb-8 text-gray-500">
     {totalCount > 0 ? `${totalCount} ürün` : "Sepetiniz şu an boş."}
    </p>

    {loading && items.length > 0 ? (
     <div className="rounded-2xl bg-white py-12 text-center text-gray-500">
      Yükleniyor…
     </div>
    ) : cartItems.length === 0 ? (
     <EmptyCart />
    ) : (
     <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

      {/* Sol Taraf: Ürün Listesi */}
      <div className="flex-1 space-y-4">
       {cartItems.map((item) => (
        <CartItem
         key={item.productId}
         item={item}
         onUpdateQuantity={updateQuantity}
         onRemove={removeItem}
        />
       ))}
      </div>

      {/* Sağ Taraf: Özet */}
      <OrderSummary
       totalCount={totalCount}
       totalPrice={totalPrice}
       shippingCost={shippingCost}
      />
     </div>
    )}
   </div>
  </div>
 );
}