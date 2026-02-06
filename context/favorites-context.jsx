"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "electronic-world-favorites";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
 const [favoriteIds, setFavoriteIds] = useState([]);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  try {
   const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
   if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) setFavoriteIds(parsed.map((id) => String(id)).filter(Boolean));
   }
  } catch (_) { }
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!mounted) return;
  try {
   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  } catch (_) { }
 }, [mounted, favoriteIds]);

 const isFavorite = useCallback(
  (id) => favoriteIds.includes(String(id)),
  [favoriteIds]
 );

 const toggleFavorite = useCallback((id) => {
  const sid = String(id);
  setFavoriteIds((prev) =>
   prev.includes(sid) ? prev.filter((f) => f !== sid) : [...prev, sid]
  );
 }, []);

 const removeFavorites = useCallback((ids) => {
  const toRemove = new Set(ids.map(String));
  setFavoriteIds((prev) => prev.filter((f) => !toRemove.has(f)));
 }, []);

 const value = {
  favoriteIds,
  isFavorite,
  toggleFavorite,
  removeFavorites,
 };

 return (
  <FavoritesContext.Provider value={value}>
   {children}
  </FavoritesContext.Provider>
 );
}

export function useFavorites() {
 const ctx = useContext(FavoritesContext);
 if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
 return ctx;
}
