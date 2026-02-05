"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 LayoutDashboard,
 Package,
 MessageSquare,
 ShoppingBag,
 LogOut,
} from "lucide-react";
import {
 Sidebar,
 SidebarContent,
 SidebarFooter,
 SidebarGroup,
 SidebarGroupContent,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 SidebarProvider,
 SidebarInset,
} from "@/components/ui/sidebar";

const adminNavItems = [
 { href: "/admin", label: "Panel", icon: LayoutDashboard },
 { href: "/admin/son-siparisler", label: "Son Siparişler", icon: ShoppingBag },
 { href: "/admin/urun-yonetimi", label: "Ürün Yönetimi", icon: Package },
 { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
];

export function AdminLayout({ children }) {
 const pathname = usePathname();
 const isLoginPage = pathname === "/admin-giris";

 if (isLoginPage) {
  return (
   <div className="flex min-h-svh items-center justify-center bg-muted/30 p-4">
    <div className="w-full max-w-md">{children}</div>
   </div>
  );
 }

 return (
  <SidebarProvider>
   <div className="flex min-h-svh w-full">
    <Sidebar>
     <SidebarHeader className="border-b border-sidebar-border">
      <div className="flex items-center gap-2 px-2 py-4">
       <span className="font-semibold text-sidebar-foreground">
        Admin Panel
       </span>
      </div>
     </SidebarHeader>
     <SidebarContent>
      <SidebarGroup>
       <SidebarGroupContent>
        <SidebarMenu>
         {adminNavItems.map((item) => {
          const isActive =
           pathname === item.href ||
           (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
           <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={!!isActive}>
             <Link href={item.href}>
              <item.icon className="size-4" />
              <span>{item.label}</span>
             </Link>
            </SidebarMenuButton>
           </SidebarMenuItem>
          );
         })}
        </SidebarMenu>
       </SidebarGroupContent>
      </SidebarGroup>
     </SidebarContent>
     <SidebarFooter className="border-t border-sidebar-border">
      <SidebarMenu>
       <SidebarMenuItem>
        <SidebarMenuButton asChild>
         <Link href="/admin-giris">
          <LogOut className="size-4" />
          <span>Çıkış</span>
         </Link>
        </SidebarMenuButton>
       </SidebarMenuItem>
      </SidebarMenu>
     </SidebarFooter>
    </Sidebar>
    <SidebarInset>
     <div className="flex flex-1 flex-col p-6">{children}</div>
    </SidebarInset>
   </div>
  </SidebarProvider>
 );
}
