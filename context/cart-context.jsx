"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

const STORAGE_KEY = "electronic-world-cart";

const CartContext = createContext(null);

function parseStored(raw) {
 try {
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed
   .filter(
    (item) =>
     item &&
     (typeof item.productId === "string" || typeof item.productId === "number") &&
     typeof item.quantity === "number" &&
     item.quantity >= 1
   )
   .map((item) => ({ productId: String(item.productId), quantity: item.quantity }));
 } catch {
  return [];
 }
}

export function CartProvider({ children }) {
 const [items, setItems] = useState([]);
 const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const initial = raw ? parseStored(raw) : [];
    queueMicrotask(() => {
      setItems(initial);
      setMounted(true);
    });
  }, []);

 useEffect(() => {
  if (!mounted) return;
  try {
   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (_) { }
 }, [mounted, items]);

 const addItem = useCallback((productId, quantity = 1) => {
  const id = String(productId);
  setItems((prev) => {
   const existing = prev.find((i) => i.productId === id);
   if (existing) {
    return prev.map((i) =>
     i.productId === id ? { ...i, quantity: existing.quantity + quantity } : i
    );
   }
   return [...prev, { productId: id, quantity }];
  });
 }, []);

 const removeItem = useCallback((productId) => {
  setItems((prev) => prev.filter((i) => i.productId !== String(productId)));
 }, []);

 const updateQuantity = useCallback((productId, quantity) => {
  const id = String(productId);
  if (quantity < 1) {
   setItems((prev) => prev.filter((i) => i.productId !== id));
   return;
  }
  setItems((prev) =>
   prev.map((i) => (i.productId === id ? { ...i, quantity } : i))
  );
 }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalCount,
      addItem,
      removeItem,
      updateQuantity,
    }),
    [items, totalCount, addItem, removeItem, updateQuantity]
  );

 return (
  <CartContext.Provider value={value}>
   {children}
  </CartContext.Provider>
 );
}

export function useCart() {
 const ctx = useContext(CartContext);
 if (!ctx) throw new Error("useCart must be used within CartProvider");
 return ctx;
}
