"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
 return (
  <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
   <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
    <h1 className="mb-3 text-2xl font-bold text-gray-900">
     Ürün Bulunamadı
    </h1>
    <p className="mb-8 max-w-md text-gray-600">
     Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
    </p>
    <Button asChild className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
     <Link href="/">Ana Sayfaya Dön</Link>
    </Button>
   </div>
  </div>
 );
}
