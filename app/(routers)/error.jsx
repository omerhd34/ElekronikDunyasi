"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }) {
 useEffect(() => {
  console.error("Route error:", error);
 }, [error]);

 return (
  <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
   <div className="max-w-md w-full text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
     <AlertCircle className="size-8" aria-hidden />
    </div>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
     Bir şeyler yanlış gitti
    </h1>
    <p className="text-gray-600 mb-8">
     Sayfa yüklenirken bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
     <Button
      onClick={reset}
      className="gap-2"
     >
      <RefreshCw className="size-4" />
      Tekrar dene
     </Button>
     <Button variant="outline" asChild>
      <Link href="/">Ana sayfaya dön</Link>
     </Button>
    </div>
   </div>
  </div>
 );
}
