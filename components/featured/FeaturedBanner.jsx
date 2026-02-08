import { Star } from "lucide-react";

export default function FeaturedBanner() {
 return (
  <div className="relative h-48 overflow-hidden bg-linear-to-r from-amber-500 to-amber-700 md:h-64">
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
   <div className="container relative z-10 flex h-full flex-col justify-center px-4">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
     <Star className="size-8 fill-white text-white sm:size-10" />
     Öne Çıkan Ürünler
    </h1>
    <p className="mt-2 max-w-xl text-amber-100 md:text-lg">
     Sizin için özenle seçtiğimiz ürünler
    </p>
   </div>
  </div>
 );
}