"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Loader2 } from "lucide-react";

export default function ShippingCostCard({
  shippingCost,
  onShippingCostChange,
  saving,
  onSave,
  message,
}) {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="size-5 text-emerald-600" />
          Kargo Ücreti
        </CardTitle>
        <CardDescription>
          Sepet sayfasında gösterilen sabit kargo ücretini (₺) girin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              type="number"
              min={0}
              step={1}
              value={shippingCost}
              onChange={(e) => onShippingCostChange(e.target.value)}
              placeholder="140"
              className="max-w-[180px]"
              disabled={saving}
            />
            <span className="text-sm text-muted-foreground">₺</span>
            <Button type="submit" disabled={saving} className="sm:shrink-0">
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Kaydediliyor…
                </>
              ) : (
                "Kaydet"
              )}
            </Button>
          </div>
          {message?.text && (
            <p
              className={
                message.type === "error"
                  ? "text-sm text-red-600 dark:text-red-400"
                  : "text-sm text-emerald-600 dark:text-emerald-400"
              }
            >
              {message.text}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
