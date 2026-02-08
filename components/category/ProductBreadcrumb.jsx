"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductBreadcrumb({ categoryTitle, categorySlug, productName }) {
 return (
  <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
   <Link href="/" className="transition-colors hover:text-emerald-600">
    Ana Sayfa
   </Link>
   <ChevronRight className="size-4 shrink-0 text-gray-300" aria-hidden />
   <Link
    href={`/kategori/${categorySlug}`}
    className="transition-colors hover:text-emerald-600"
   >
    {categoryTitle}
   </Link>
   <ChevronRight className="size-4 shrink-0 text-gray-300" aria-hidden />
   <span className="max-w-[180px] truncate font-medium text-gray-800 sm:max-w-none">
    {productName}
   </span>
  </nav>
 );
}
