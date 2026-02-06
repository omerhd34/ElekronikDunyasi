"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
 Package,
 ShoppingBag,
 MessageSquare,
 ArrowRight,
 TrendingUp,
 Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
 {
  key: "products",
  title: "Toplam Ürün",
  description: "Katalogdaki ürün sayısı",
  icon: Package,
  color: "text-blue-600 dark:text-blue-400",
  bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
 },
 {
  key: "orders",
  title: "Siparişler",
  description: "Sipariş modülü eklenecek",
  icon: TrendingUp,
  color: "text-emerald-600 dark:text-emerald-400",
  bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
 },
 {
  key: "messages",
  title: "Mesajlar",
  description: "İletişim mesajları",
  icon: MessageSquare,
  color: "text-amber-600 dark:text-amber-400",
  bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
 },
 {
  key: "customers",
  title: "Müşteriler",
  description: "Kayıtlı müşteri sayısı",
  icon: Users,
  color: "text-violet-600 dark:text-violet-400",
  bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
 },
];

export default function AdminPage() {
 const [productCount, setProductCount] = useState(0);
 const [messageCount, setMessageCount] = useState(0);
 const [customerCount, setCustomerCount] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  let cancelled = false;
  Promise.all([
   fetch("/api/products").then((res) => res.json()).catch(() => []),
   fetch("/api/messages").then((res) => res.json()).catch(() => []),
   fetch("/api/admin/customers").then((res) => res.json()).catch(() => ({ count: 0 })),
  ])
   .then(([products, messages, customers]) => {
    if (!cancelled) {
     if (Array.isArray(products)) setProductCount(products.length);
     if (Array.isArray(messages)) setMessageCount(messages.length);
     setCustomerCount(typeof customers?.count === "number" ? customers.count : 0);
    }
   })
   .catch(() => { })
   .finally(() => {
    if (!cancelled) setLoading(false);
   });
  return () => { cancelled = true; };
 }, []);

 const getStatValue = (key) => {
  if (loading) return null;
  if (key === "products") return productCount;
  if (key === "messages") return messageCount;
  if (key === "customers") return customerCount !== null ? customerCount : "—";
  return "—";
 };

 const quickLinks = [
  { href: "/admin/urun-yonetimi", label: "Ürün Yönetimi", icon: Package },
  { href: "/admin/son-siparisler", label: "Son Siparişler", icon: ShoppingBag },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
 ];

 return (
  <div className="space-y-10">
   <div className="space-y-1">
    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
     Hoş geldiniz
    </h1>
    <p className="text-base text-muted-foreground md:text-lg">
     Yönetim panelinden siparişleri, ürünleri ve mesajları takip edin.
    </p>
   </div>

   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {statCards.map((stat) => (
     <Card
      key={stat.key}
      className="overflow-hidden transition-shadow hover:shadow-md"
     >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
       <CardTitle className="text-sm font-medium text-muted-foreground">
        {stat.title}
       </CardTitle>
       <div
        className={cn(
         "flex size-9 items-center justify-center rounded-lg",
         stat.bgColor,
         stat.color
        )}
       >
        <stat.icon className="size-4" />
       </div>
      </CardHeader>
      <CardContent>
       {loading ? (
        <div className="h-9 w-20 animate-pulse rounded bg-muted" />
       ) : (
        <span className="text-2xl font-bold tabular-nums md:text-3xl">
         {getStatValue(stat.key)}
        </span>
       )}
       <p className="mt-1.5 text-xs text-muted-foreground">
        {stat.description}
       </p>
      </CardContent>
     </Card>
    ))}
   </div>

   <Card className="overflow-hidden">
    <CardHeader className="pb-4">
     <CardTitle className="text-xl">Hızlı Erişim</CardTitle>
     <CardDescription className="text-base">
      Sık kullandığınız sayfalara kısayollar.
     </CardDescription>
    </CardHeader>
    <CardContent>
     <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {quickLinks.map((item) => (
       <Button
        key={item.href}
        variant="outline"
        className="flex h-auto w-full justify-between gap-4 py-5 pl-4 pr-4 text-left transition-colors hover:bg-muted/50"
        asChild
       >
        <Link href={item.href}>
         <span className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
           <item.icon className="size-5 text-muted-foreground" />
          </span>
          <span className="font-medium">{item.label}</span>
         </span>
         <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
       </Button>
      ))}
     </div>
    </CardContent>
   </Card>
  </div>
 );
}
