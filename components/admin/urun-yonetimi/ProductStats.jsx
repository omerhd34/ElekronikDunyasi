"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderOpen,
  LayoutGrid,
  TrendingUp,
  Star,
  Sparkles,
  Tag,
} from "lucide-react";
import { categoryInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import { CATEGORY_OPTIONS } from "./productConstants";

export default function ProductStats({
  products,
  stats,
  filterCategory,
  filterStock,
  filterFeatured,
  filterNew,
  filterDiscounted,
  showCategoryList,
  onFilterCategory,
  onFilterStock,
  onFilterFeatured,
  onFilterNew,
  onFilterDiscounted,
  onToggleCategoryList,
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Card className="rounded-xl border-blue-200/50 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
              <FolderOpen className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs font-medium text-muted-foreground">Ürünler</p>
            </div>
          </CardContent>
        </Card>
        <button
          type="button"
          onClick={onToggleCategoryList}
          className={cn(
            "w-full rounded-xl border border-slate-200/50 bg-slate-50/50 dark:border-slate-700/30 dark:bg-slate-800/20 text-left transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-slate-500/50",
            showCategoryList && "ring-2 ring-slate-500/50"
          )}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-500/20">
              <LayoutGrid className="size-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{CATEGORY_OPTIONS.length}</p>
              <p className="text-xs font-medium text-muted-foreground">Kategoriler</p>
            </div>
          </CardContent>
        </button>
        <button
          type="button"
          onClick={() => onFilterStock(filterStock === "out" ? "" : "out")}
          className={cn(
            "w-full rounded-xl border border-red-200/50 bg-red-50/50 dark:border-red-900/30 dark:bg-red-950/20 text-left transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500/50",
            filterStock === "out" && "ring-2 ring-red-500/50"
          )}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-500/20">
              <TrendingUp className="size-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.outOfStock}</p>
              <p className="text-xs font-medium text-muted-foreground">Stokta Olmayanlar</p>
            </div>
          </CardContent>
        </button>
        <button
          type="button"
          onClick={() => onFilterFeatured(filterFeatured === "yes" ? "" : "yes")}
          className={cn(
            "w-full rounded-xl border border-amber-200/50 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/20 text-left transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500/50",
            filterFeatured === "yes" && "ring-2 ring-amber-500/50"
          )}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
              <Star className="size-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.featured}</p>
              <p className="text-xs font-medium text-muted-foreground">Öne Çıkanlar</p>
            </div>
          </CardContent>
        </button>
        <button
          type="button"
          onClick={() => onFilterNew(filterNew === "yes" ? "" : "yes")}
          className={cn(
            "w-full rounded-xl border border-emerald-200/50 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-950/20 text-left transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            filterNew === "yes" && "ring-2 ring-emerald-500/50"
          )}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
              <Sparkles className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.new}</p>
              <p className="text-xs font-medium text-muted-foreground">Yeniler</p>
            </div>
          </CardContent>
        </button>
        <button
          type="button"
          onClick={() => onFilterDiscounted(filterDiscounted === "yes" ? "" : "yes")}
          className={cn(
            "w-full rounded-xl border border-violet-200/50 bg-violet-50/50 dark:border-violet-900/30 dark:bg-violet-950/20 text-left transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-violet-500/50",
            filterDiscounted === "yes" && "ring-2 ring-violet-500/50"
          )}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
              <Tag className="size-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.discounted}</p>
              <p className="text-xs font-medium text-muted-foreground">İndirimliler</p>
            </div>
          </CardContent>
        </button>
      </div>

      {showCategoryList && (
        <Card className="rounded-xl border-slate-200/50 dark:border-slate-700/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <LayoutGrid className="size-5 text-slate-600 dark:text-slate-400" />
              Kategoriler
            </CardTitle>
            <CardDescription>Toplam {CATEGORY_OPTIONS.length} kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {CATEGORY_OPTIONS.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      onFilterCategory(filterCategory === cat ? "" : cat);
                      onToggleCategoryList(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors hover:bg-muted/50",
                      filterCategory === cat ? "border-primary bg-primary/10" : "bg-muted/30"
                    )}
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {categoryInfo[cat]?.title ?? cat}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {products.filter((p) => p.category === cat).length} ürün
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}
