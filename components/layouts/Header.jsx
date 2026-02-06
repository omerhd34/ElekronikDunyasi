"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Truck, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryLinks } from "@/lib/site-config";
import { formatPrice } from "@/lib/product-utils";
import { SiteLogo } from "./SiteLogo";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";

const headerActions = [
 { href: "/favoriler", ariaLabel: "Favoriler", Icon: Heart },
 { href: "/sepet", ariaLabel: "Sepet", Icon: ShoppingCart },
 { href: "/hesabim", ariaLabel: "Hesabım", Icon: User },
];

const navLinks = [
 { href: "/yeniler", label: "Yeniler" },
 { href: "/indirimler", label: "İndirimler" },
];

const navLinkBase = "relative block px-3 py-2 text-sm font-medium transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transition-all after:duration-200";

function getNavLinkClass(isActive) {
 const active = "bg-emerald-500/20 text-white after:w-0 rounded-lg";
 const inactive = "text-emerald-200/80 after:w-0 hover:bg-emerald-500/15 hover:text-white rounded-lg";
 return `${navLinkBase} ${isActive ? active : inactive}`;
}

export function SiteHeader() {
 const pathname = usePathname();
 const router = useRouter();
 const [query, setQuery] = useState("");
 const [open, setOpen] = useState(false);
 const [searchResults, setSearchResults] = useState([]);
 const wrapperRef = useRef(null);
 const showDropdown = open && query.trim().length >= 2;

 useEffect(() => {
  function handleClickOutside(event) {
   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    setOpen(false);
   }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 useEffect(() => {
  const q = query.trim();
  if (q.length < 2) {
   setSearchResults([]);
   return;
  }
  const ctrl = new AbortController();
  fetch(`/api/products?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
   .then((r) => r.ok ? r.json() : [])
   .then((list) => setSearchResults((list || []).slice(0, 5)))
   .catch(() => setSearchResults([]));
  return () => ctrl.abort();
 }, [query]);

 const handleSearch = (e) => {
  e.preventDefault();
  const q = query.trim();
  if (q) router.push(`/arama?q=${encodeURIComponent(q)}`);
  setOpen(false);
 };

 const { favoriteIds } = useFavorites();
 const { totalCount: cartCount } = useCart();
 const favoriteBadgeText = favoriteIds.length > 9 ? "9+" : favoriteIds.length > 0 ? String(favoriteIds.length) : null;
 const cartBadgeText = cartCount > 9 ? "9+" : cartCount > 0 ? String(cartCount) : null;

 return (
  <header className="sticky top-0 z-50 w-full border-b border-emerald-900/50 bg-linear-to-b from-emerald-950 to-emerald-900 shadow-xl shadow-black/20 backdrop-blur-md">
   {/* Üst bar */}
   <div className="w-full border-b border-emerald-800/30 bg-emerald-950/80 py-2 text-xs text-white">
    <div className="container flex flex-nowrap items-center justify-between gap-4 overflow-visible px-4">
     <span className="flex items-center gap-1.5">
      <Truck className="size-3.5 shrink-0 text-amber-400" aria-hidden />
      <span className="font-semibold text-emerald-50">Elektronikte güvenilir adres !</span>
     </span>
     <Link
      href="/iletisim"
      className="flex shrink-0 items-center gap-1.5 text-emerald-100 transition-colors hover:text-white"
      aria-label="İletişim"
     >
      <Phone className="size-3.5 shrink-0" aria-hidden />
      <span className="font-semibold">İletişim</span>
     </Link>
    </div>
   </div>

   <div className="container flex h-16 items-center gap-8 px-4">
    <SiteLogo />

    <nav className="hidden flex-1 items-center gap-3 md:flex ml-5" aria-label="Ana menü">
     {navLinks.map((item) => (
      <Link key={item.href} href={item.href} className={getNavLinkClass(pathname === item.href)}>
       {item.label}
      </Link>
     ))}
    </nav>

    <form onSubmit={handleSearch} ref={wrapperRef} className="relative hidden w-full max-w-[280px] md:block lg:max-w-[500px]">
     <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-400/80" aria-hidden />
     <Input
      name="q"
      type="text"
      placeholder="Ara"
      aria-label="Ürün ara"
      autoComplete="off"
      value={query}
      onChange={(e) => {
       setQuery(e.target.value);
       setOpen(true);
      }}
      onFocus={() => query.trim().length >= 2 && setOpen(true)}
      className="h-10 rounded-full border border-emerald-700/50 bg-emerald-900/40 pl-10 pr-10 text-sm text-white placeholder:text-emerald-300/60 transition-all duration-200 focus-visible:border-emerald-500 focus-visible:bg-emerald-900/60 focus-visible:ring-2 focus-visible:ring-emerald-400/20"
     />
     {query && (
      <button
       type="button"
       aria-label="Temizle"
       onClick={() => { setQuery(""); setOpen(false); }}
       className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-emerald-300/80 hover:bg-emerald-800/50 hover:text-white"
      >
       <X className="size-4" />
      </button>
     )}
     {showDropdown && (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[320px] overflow-auto rounded-xl border border-emerald-700/50 bg-emerald-900/95 shadow-xl backdrop-blur-md">
       {searchResults.length > 0 ? (
        <ul className="py-2">
         {searchResults.map((product) => (
          <li key={product.id}>
           <Link
            href={`/kategori/${product.category}/${product.slug}`}
            onClick={() => { setOpen(false); setQuery(""); }}
            className="flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-emerald-800/60"
           >
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/10">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
              src={product.image}
              alt=""
              className="h-full w-full object-contain"
             />
            </span>
            <span className="min-w-0 flex-1">
             <span className="block truncate text-sm font-medium text-white">
              {product.name}
             </span>
             <span className="text-xs text-emerald-200/80">
              {formatPrice(product.price)}
             </span>
            </span>
           </Link>
          </li>
         ))}
        </ul>
       ) : (
        <p className="px-4 py-4 text-sm text-emerald-200/80">
         &quot;{query}&quot; için ürün bulunamadı.
        </p>
       )}
      </div>
     )}
    </form>

    <div className="flex items-center gap-1">
     {headerActions.map(({ href, ariaLabel, Icon }) => {
      const isFavoriler = href === "/favoriler";
      const isSepet = href === "/sepet";
      const badgeText = isFavoriler ? favoriteBadgeText : isSepet ? cartBadgeText : null;
      return (
       <Button
        key={href}
        variant="ghost"
        size="icon"
        asChild
        className="relative size-9 rounded-full text-emerald-200/90 transition-colors duration-200 hover:bg-emerald-800/50 hover:text-white"
       >
        <Link href={href} aria-label={ariaLabel}>
         <Icon className="size-5" />
         {badgeText !== null && (
          <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-red-500 px-1 py-0.5 text-[10px] font-bold leading-none text-white">
           {badgeText}
          </span>
         )}
        </Link>
       </Button>
      );
     })}
    </div>
   </div>

   <nav className="border-t border-emerald-800/40 bg-emerald-900/60" aria-label="Ürün kategorileri">
    <div className="container flex flex-wrap items-center gap-0.5 px-4 py-2.5 md:gap-1">
     {categoryLinks.map((item) => (
      <Link
       key={item.href}
       href={item.href}
       className={`rounded-lg ${getNavLinkClass(pathname === item.href)}`}
      >
       {item.label}
      </Link>
     ))}
    </div>
   </nav>
  </header>
 );
}
