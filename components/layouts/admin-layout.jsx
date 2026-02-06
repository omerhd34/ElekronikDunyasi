"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
 LayoutDashboard,
 Package,
 MessageSquare,
 ShoppingBag,
 LogOut,
 ChevronRight,
 Loader2,
 Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
 { href: "/admin", label: "Panel", icon: LayoutDashboard },
 { href: "/admin/son-siparisler", label: "Son Siparişler", icon: ShoppingBag },
 { href: "/admin/urun-yonetimi", label: "Ürün Yönetimi", icon: Package },
 { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
 { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];

const breadcrumbLabels = {
 "/admin": "Panel",
 "/admin/son-siparisler": "Son Siparişler",
 "/admin/urun-yonetimi": "Ürün Yönetimi",
 "/admin/mesajlar": "Mesajlar",
 "/admin/ayarlar": "Ayarlar",
};

function AdminBreadcrumb() {
 const pathname = usePathname();
 if (!pathname || pathname === "/admin-giris") return null;
 const label = breadcrumbLabels[pathname] ?? "Admin";
 return (
  <nav
   aria-label="Breadcrumb"
   className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
  >
   <Link href="/admin" className="transition-colors hover:text-foreground">
    Admin
   </Link>
   {pathname !== "/admin" && (
    <>
     <ChevronRight className="size-4 shrink-0 opacity-60" />
     <span className="font-medium text-foreground">{label}</span>
    </>
   )}
  </nav>
 );
}

export function AdminLayout({ children }) {
 const pathname = usePathname();
 const router = useRouter();
 const isLoginPage = pathname === "/admin-giris";
 const [authChecked, setAuthChecked] = useState(false);
 const [authenticated, setAuthenticated] = useState(false);

 useEffect(() => {
  if (isLoginPage) {
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setAuthChecked(true);
   return;
  }
  fetch("/api/admin/session")
   .then((r) => {
    if (r.ok) {
     setAuthenticated(true);
    } else {
     router.replace("/admin-giris");
    }
   })
   .catch(() => router.replace("/admin-giris"))
   .finally(() => setAuthChecked(true));
 }, [isLoginPage, router]);

 const handleLogout = useCallback(async () => {
  try {
   await fetch("/api/admin/logout", { method: "POST" });
  } catch { /* ignore */ }
  router.replace("/admin-giris");
 }, [router]);

 if (isLoginPage) {
  return (
   <div className="flex min-h-svh items-center justify-center bg-linear-to-br from-slate-50 via-white to-emerald-50/30 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
    <div className="w-full max-w-md">{children}</div>
   </div>
  );
 }

 if (!authChecked || !authenticated) {
  return (
   <div className="flex min-h-svh items-center justify-center">
    <Loader2 className="size-8 animate-spin text-muted-foreground" />
   </div>
  );
 }

 return (
  <div className="flex min-h-svh w-full flex-col">
   <header className="sticky top-0 z-50 w-full border-b border-emerald-900/50 bg-linear-to-b from-emerald-950 to-emerald-900 shadow-xl shadow-black/20 backdrop-blur-md">
    <div className="container flex h-20 items-center justify-between gap-4 px-4 md:px-6">
     <Link
      href="/admin"
      className="flex items-center gap-2 text-base font-bold tracking-tight text-white shrink-0"
     >
      <LayoutDashboard className="size-5 text-emerald-400" />
      Admin Panel
     </Link>
     <nav className="flex items-center gap-4" aria-label="Ana menü">
      {adminNavItems.map((item) => {
       const isActive =
        pathname === item.href ||
        (item.href !== "/admin" && pathname?.startsWith(item.href));
       return (
        <Link
         key={item.href}
         href={item.href}
         className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          isActive
           ? "bg-emerald-500/20 text-white"
           : "text-emerald-200/80 hover:bg-emerald-500/15 hover:text-white"
         )}
        >
         <item.icon className="size-4 shrink-0" />
         <span className="hidden sm:inline">{item.label}</span>
        </Link>
       );
      })}
     </nav>
     <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-200/80 transition-all duration-200 hover:bg-red-500/15 hover:text-red-300 shrink-0 cursor-pointer"
     >
      <LogOut className="size-4 shrink-0" />
      <span className="hidden sm:inline">Çıkış</span>
     </button>
    </div>
   </header>
   <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
    <AdminBreadcrumb />
    <main className="flex-1">{children}</main>
   </div>
  </div>
 );
}
