"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingBag,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/son-siparisler", label: "Son Siparişler", icon: ShoppingBag },
  { href: "/admin/urun-yonetimi", label: "Ürün Yönetimi", icon: Package },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
];

const breadcrumbLabels = {
  "/admin": "Panel",
  "/admin/son-siparisler": "Son Siparişler",
  "/admin/urun-yonetimi": "Ürün Yönetimi",
  "/admin/mesajlar": "Mesajlar",
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
  const isLoginPage = pathname === "/admin-giris";

  if (isLoginPage) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-linear-to-br from-slate-50 via-white to-emerald-50/30 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
        <div className="w-full max-w-md">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full flex-col">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
        <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-semibold text-foreground shrink-0"
          >
            Admin Panel
          </Link>
          <nav className="flex items-center gap-1" aria-label="Ana menü">
            {adminNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/admin-giris"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shrink-0"
          >
            <LogOut className="size-4 shrink-0" />
            <span className="hidden sm:inline">Çıkış</span>
          </Link>
        </div>
      </header>
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <AdminBreadcrumb />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
