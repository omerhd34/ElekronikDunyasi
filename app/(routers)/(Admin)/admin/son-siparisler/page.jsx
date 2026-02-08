"use client";

import AdminPageHero from "@/components/admin/AdminPageHero";
import OrdersEmptyCard from "@/components/admin/son-siparisler/OrdersEmptyCard";

export default function SonSiparislerPage() {
  return (
    <div className="space-y-8">
      <AdminPageHero
        title="Son Siparişler"
        description="Son verilen siparişleri listeleyin, durum güncelleyin ve takip edin."
      />
      <OrdersEmptyCard />
    </div>
  );
}
