"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { SiteHeader } from "./Header";
import { SiteFooter } from "./Footer";

function ScrollToTop() {
 const [visible, setVisible] = useState(false);

 useEffect(() => {
  const onScroll = () => setVisible(window.scrollY > 300);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
 }, []);

 const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

 if (!visible) return null;

 return (
  <button
   type="button"
   onClick={scrollToTop}
   aria-label="Yukarı çık"
   className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-800 text-white shadow-lg transition-all hover:bg-green-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
  >
   <ChevronUp className="size-6" />
  </button>
 );
}

export function SiteLayout({ children }) {
 return (
  <div className="relative flex min-h-full flex-1 flex-col">
   <SiteHeader />
   <main className="flex-1">{children}</main>
   <SiteFooter />
   <ScrollToTop />
  </div>
 );
}
