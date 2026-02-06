"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingBag, Package } from "lucide-react";

export default function SonSiparislerPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Son Siparişler
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Son verilen siparişleri listeleyin, durum güncelleyin ve takip edin.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Package className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Sipariş Listesi</CardTitle>
              <CardDescription className="mt-1 text-base">
                Sipariş modülü eklendiğinde burada siparişler listelenecek.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Empty className="min-h-[320px] border-0 py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="mb-4">
                <ShoppingBag className="size-8 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle className="text-xl">Henüz sipariş yok</EmptyTitle>
              <EmptyDescription className="mt-2 max-w-md text-base">
                Müşteriler sipariş verdiğinde siparişler burada görünecek.
                Ödeme, kargo ve sipariş takip özellikleri eklenecek.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    </div>
  );
}
