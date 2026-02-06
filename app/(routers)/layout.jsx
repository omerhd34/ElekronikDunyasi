"use client";

import { usePathname } from "next/navigation";
import { SiteLayout } from "@/components/layouts/site-layout";
import { FavoritesProvider } from "@/context/favorites-context";
import { CartProvider } from "@/context/cart-context";

export default function RoutersLayout({ children }) {
 const pathname = usePathname();
 const isAdminArea = pathname === "/admin-giris" || pathname?.startsWith("/admin");

 if (isAdminArea) {
  return <>{children}</>;
 }

 return (
  <FavoritesProvider>
   <CartProvider>
    <div className="flex min-h-svh flex-col">
     <SiteLayout>{children}</SiteLayout>
    </div>
   </CartProvider>
  </FavoritesProvider>
 );
}
