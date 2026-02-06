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
import { MessageSquare, Mail } from "lucide-react";

export default function MesajlarPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Mesajlar
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          İletişim formundan gelen mesajları burada görüntüleyebilir ve yanıtlayabilirsiniz.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Gelen Mesajlar</CardTitle>
              <CardDescription className="mt-1 text-base">
                İletişim formu gönderildiğinde mesajlar burada listelenecek.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Empty className="min-h-[320px] border-0 py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="mb-4">
                <MessageSquare className="size-8 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle className="text-xl">Henüz mesaj yok</EmptyTitle>
              <EmptyDescription className="mt-2 max-w-md text-base">
                Müşteriler iletişim formunu kullandığında mesajlar burada
                görünecek. Okundu/okunmadı ve yanıtlama özellikleri eklenecek.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    </div>
  );
}
