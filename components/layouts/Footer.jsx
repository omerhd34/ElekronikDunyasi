"use client";

import Link from "next/link";
import { SiteLogo } from "./SiteLogo";

const footerLinks = {
 kurumsal: [
  { href: "/biz-kimiz", label: "Biz Kimiz" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/sik-sorulan-sorular", label: "Sıkça Sorulan Sorular" },
  { href: "/iade-degisim", label: "İade & Değişim" },
 ],
 yasal: [
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
 ],
 hesap: [
  { href: "/hesabim", label: "Hesabım" },
  { href: "/siparislerim", label: "Siparişlerim" },
  { href: "/favoriler", label: "Favoriler" },
  { href: "/sepet", label: "Sepet" },
 ],
};

export function SiteFooter() {
 const currentYear = new Date().getFullYear();

 return (
  <footer className="border-t border-emerald-800/40 bg-linear-to-b from-emerald-900 to-emerald-950 text-white">
   <div className="container px-4 py-12">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
     <div>
      <SiteLogo />
      <p className="text-sm text-emerald-200/80 mt-5">
       Elektronik dünyanızın güvenilir adresi.
      </p>
     </div>
     <div>
      <h4 className="mb-4 text-sm font-semibold text-white">
       Kurumsal
      </h4>
      <ul className="space-y-2">
       {footerLinks.kurumsal.map((item) => (
        <li key={item.href}>
         <Link
          href={item.href}
          className="text-sm text-emerald-200/80 transition-colors hover:text-white"
         >
          {item.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>
     <div>
      <h4 className="mb-4 text-sm font-semibold text-white">
       Yasal
      </h4>
      <ul className="space-y-2">
       {footerLinks.yasal.map((item) => (
        <li key={item.href}>
         <Link
          href={item.href}
          className="text-sm text-emerald-200/80 transition-colors hover:text-white"
         >
          {item.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>
     <div>
      <h4 className="mb-4 text-sm font-semibold text-white">
       Hesabım
      </h4>
      <ul className="space-y-2">
       {footerLinks.hesap.map((item) => (
        <li key={item.href}>
         <Link
          href={item.href}
          className="text-sm text-emerald-200/80 transition-colors hover:text-white"
         >
          {item.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className="mt-10 border-t border-emerald-800/40 pt-8 text-center text-sm text-emerald-300/70">
     © {currentYear} Elektronik Dünyası. Tüm hakları saklıdır.
    </div>
   </div>
  </footer>
 );
}
