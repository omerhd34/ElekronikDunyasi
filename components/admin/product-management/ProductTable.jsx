"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoryInfo, formatPrice } from "@/lib/product-utils";
import {
  Package,
  ImageIcon,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductTable({
  products,
  loading,
  searchQuery,
  editingId,
  deletingId,
  sortBy,
  onSortPrice,
  onSortStock,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-center gap-3 py-16">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Ürünler yükleniyor…</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <Package className="size-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {products.length === 0 ? "Henüz ürün yok" : "Sonuç bulunamadı"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.length === 0
                ? '"Yeni Ürün Ekle" butonu ile başlayın.'
                : `"${searchQuery}" için eşleşen ürün bulunamadı.`}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ürün
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kategori
                </th>
                <th className="px-4 py-3.5 text-left">
                  <button
                    type="button"
                    onClick={onSortPrice}
                    className="-mx-1 inline-flex cursor-pointer select-none items-center gap-1 rounded px-1 py-0.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted/60"
                  >
                    Fiyat (₺)
                    {sortBy === "price_asc" && <ArrowUp className="size-3.5" />}
                    {sortBy === "price_desc" && <ArrowDown className="size-3.5" />}
                  </button>
                </th>
                <th className="px-4 py-3.5 text-left">
                  <button
                    type="button"
                    onClick={onSortStock}
                    className="-mx-1 inline-flex cursor-pointer select-none items-center gap-1 rounded px-1 py-0.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted/60"
                  >
                    Stok
                    {sortBy === "stock_asc" && <ArrowUp className="size-3.5" />}
                    {sortBy === "stock_desc" && <ArrowDown className="size-3.5" />}
                  </button>
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Durum
                </th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className={cn(
                    "border-b border-border/50 transition-colors hover:bg-muted/20",
                    editingId === p.id && "bg-primary/5"
                  )}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon className="size-5 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                        {p.brand && (
                          <p className="truncate text-xs text-muted-foreground">{p.brand}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-foreground">
                      {categoryInfo[p.category]?.title ?? p.category}
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-bold text-foreground">{formatPrice(p.price)}</p>
                    {p.oldPrice != null && (
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(p.oldPrice)}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium tabular-nums">{p.stock ?? 0}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.inStock ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                          <Check className="size-3" /> Stokta
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/50 dark:text-red-300">
                          Stokta yok
                        </span>
                      )}
                      {p.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                          <Star className="size-3" /> Öne Çıkan
                        </span>
                      )}
                      {p.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                          Yeni
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 rounded-lg border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/50"
                        onClick={() => onEdit(p)}
                        title="Düzenle"
                      >
                        <Pencil className="size-3.5" /> Düzenle
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 rounded-lg border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/50"
                        disabled={deletingId === p.id}
                        onClick={() => onDelete(p)}
                        title="Sil"
                      >
                        {deletingId === p.id ? (
                          <span className="size-3.5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                        ) : (
                          <Trash2 className="size-3.5" />
                        )}{" "}
                        Sil
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{products.length}</span> ürün listeleniyor
        </div>
      </CardContent>
    </Card>
  );
}
