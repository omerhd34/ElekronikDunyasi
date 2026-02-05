"use client";

import { SiteHeader } from "./Header";
import { SiteFooter } from "./Footer";

export function SiteLayout({ children }) {
 return (
  <div className="relative flex min-h-full flex-1 flex-col">
   <SiteHeader />
   <main className="flex-1">{children}</main>
   <SiteFooter />
  </div>
 );
}
