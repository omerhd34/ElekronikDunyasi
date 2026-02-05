"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryLinks } from "@/lib/site-config";
import { SiteLogo } from "./SiteLogo";

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
 const handleSearch = (e) => {
  e.preventDefault();
  const q = new FormData(e.target).get("q");
  if (q?.trim()) router.push(`/arama?q=${encodeURIComponent(q.trim())}`);
 };

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

    <form onSubmit={handleSearch} className="relative hidden w-full max-w-[280px] md:block lg:max-w-[500px]">
     <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-400/80" aria-hidden />
     <Input
      name="q"
      type="search"
      placeholder="Ara"
      aria-label="Ürün ara"
      className="h-10 rounded-full border border-emerald-700/50 bg-emerald-900/40 pl-10 pr-4 text-sm text-white placeholder:text-emerald-300/60 transition-all duration-200 focus-visible:border-emerald-500 focus-visible:bg-emerald-900/60 focus-visible:ring-2 focus-visible:ring-emerald-400/20"
     />
    </form>

    <div className="flex items-center gap-1">
     {headerActions.map(({ href, ariaLabel, Icon }) => (
      <Button
       key={href}
       variant="ghost"
       size="icon"
       asChild
       className="size-9 rounded-full text-emerald-200/90 transition-colors duration-200 hover:bg-emerald-800/50 hover:text-white"
      >
       <Link href={href} aria-label={ariaLabel}>
        <Icon className="size-5" />
       </Link>
      </Button>
     ))}
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
