import {
  Package,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Users,
} from "lucide-react";

export const adminStatCards = [
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

export const adminQuickLinks = [
  { href: "/admin/urun-yonetimi", label: "Ürün Yönetimi", icon: Package },
  { href: "/admin/son-siparisler", label: "Son Siparişler", icon: ShoppingBag },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
];
