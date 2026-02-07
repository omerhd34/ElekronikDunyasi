import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
 return (
  <div className="min-h-svh bg-gray-50 flex flex-col items-center justify-center px-4">
   <div className="max-w-md w-full text-center">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-600 mb-6">
     <FileQuestion className="size-10" aria-hidden />
    </div>
    <p className="text-6xl sm:text-7xl font-bold text-slate-200 mb-2">404</p>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
     Sayfa bulunamadı
    </h1>
    <p className="text-gray-600 mb-8">
     Aradığınız sayfa mevcut değil veya taşınmış olabilir.
    </p>
    <Button asChild size="lg" className="gap-2">
     <Link href="/">
      <Home className="size-4" />
      Ana sayfaya dön
     </Link>
    </Button>
   </div>
  </div>
 );
}
