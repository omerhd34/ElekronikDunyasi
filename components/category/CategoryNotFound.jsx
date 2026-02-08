"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryNotFound() {
 return (
  <div className="container flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
   <h1 className="mb-4 text-2xl font-bold text-gray-800">
    Kategori Bulunamadı
   </h1>
   <p className="mb-8 text-gray-600">
    Aradığınız kategori mevcut değil veya kaldırılmış olabilir.
   </p>
   <Button asChild>
    <Link href="/">Ana Sayfaya Dön</Link>
   </Button>
  </div>
 );
}
