/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Truck, ShieldCheck, CreditCard, Phone, Sparkles, Star } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import { categoryInfo } from "@/lib/product-utils";
import { brands, musteriYorumlari } from "@/lib/site-config";
import Image from 'next/image';
const categories = Object.entries(categoryInfo);

export default function HomePage() {
 const router = useRouter();
 const [newProducts, setNewProducts] = useState([]);
 const [discountedProducts, setDiscountedProducts] = useState([]);
 const [featuredProducts, setFeaturedProducts] = useState([]);
 const [faqs, setFaqs] = useState([]);

 useEffect(() => {
  Promise.all([
   fetch('/api/products?new=1').then((r) => (r.ok ? r.json() : [])),
   fetch('/api/products?discounted=1').then((r) => (r.ok ? r.json() : [])),
   fetch('/api/products?featured=1').then((r) => (r.ok ? r.json() : [])),
   fetch('/api/settings/faqs').then((r) => (r.ok ? r.json() : [])),
  ]).then(([newList, discountedList, featuredList, faqList]) => {
   setNewProducts(newList || []);
   setDiscountedProducts(discountedList || []);
   setFeaturedProducts(featuredList || []);
   setFaqs(Array.isArray(faqList) ? faqList : []);
  });
 }, []);

 return (
  <div className="min-h-screen bg-gray-50">
   {/* HERO SECTION */}
   <section className="relative overflow-hidden bg-slate-950 text-white">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-950"></div>

    <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
     <div className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8 w-full">
      <Badge variant="outline" className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm border-blue-500 text-blue-400 bg-blue-950/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700 inline-flex items-center">
       <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 inline-block" /> YENİ SEZON TEKNOLOJİ
      </Badge>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
       Geleceği <br className="hidden sm:block" />
       <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
        Bugün Keşfet
       </span>
      </h1>

      <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
       En yeni bilgisayarlar, profesyonel kameralar ve akıllı ev sistemleri.
       Teknoloji tutkunları için özenle seçilmiş premium ürünler.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
       <Button
        size="lg"
        variant="outline"
        className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white rounded-full backdrop-blur-sm transition-colors w-full sm:w-auto"
        onClick={() => router.push('/yeniler')}
       >
        Yeni Ürünleri Keşfet
       </Button>
       <Button size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-white text-slate-950 hover:bg-gray-100 hover:text-slate-950 font-semibold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all w-full sm:w-auto"
        onClick={() => router.push('/indirimler')}
       >
        İndirimleri Keşfet
       </Button>
      </div>
     </div>

     <div className="flex-1 w-full max-w-[750px] lg:max-w-[920px] relative mt-8 lg:mt-0 min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[550px]">
      <div className="absolute inset-0 bg-linear-to-b from-blue-500/20 to-transparent blur-3xl rounded-full transform scale-75 z-0"></div>
      <Image
       src="/fix.jpg"
       alt="Hero Product"
       fill
       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 750px, 920px"
       className="relative z-10 object-cover rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
      />
     </div>
    </div>
   </section>

   {/* KATEGORİLER */}
   <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div className="mb-6 sm:mb-8">
     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Popüler Kategoriler</h2>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
     {categories.slice(0, 4).map(([slug, info]) => (
      <Link key={slug} href={`/kategori/${slug}`} className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-4/3 bg-gray-100">
       <img
        src={info.banner}
        alt={info.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
       />
       <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6">
        <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg">{info.title}</h3>
        <p className="text-gray-200 text-xs sm:text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 mt-1">
         İncele &rarr;
        </p>
       </div>
      </Link>
     ))}
    </div>
   </section>

   {/* AVANTAJLAR BANDI */}
   <section className="bg-white py-12 sm:py-16 lg:py-20 border-y border-gray-100">
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-all duration-300 border border-blue-100">
       <div className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg">
        <Truck className="w-6 h-6 sm:w-8 sm:h-8" />
       </div>
       <div>
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">Hızlı Kargo</h3>
        <p className="text-sm text-gray-600">24 saatte kargoda</p>
       </div>
      </div>
      <div className="bg-linear-to-br from-emerald-50 to-emerald-100/50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-all duration-300 border border-emerald-100">
       <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg">
        <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
       </div>
       <div>
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">Güvenli Ödeme</h3>
        <p className="text-sm text-gray-600">%100 korumalı</p>
       </div>
      </div>
      <div className="bg-linear-to-br from-purple-50 to-purple-100/50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-all duration-300 border border-purple-100">
       <div className="p-4 bg-purple-500 text-white rounded-2xl shadow-lg">
        <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />
       </div>
       <div>
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">Taksit İmkanı</h3>
        <p className="text-sm text-gray-600">9 taksite varan</p>
       </div>
      </div>
      <div className="bg-linear-to-br from-orange-50 to-orange-100/50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-all duration-300 border border-orange-100">
       <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg">
        <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
       </div>
       <div>
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">7/24 Destek</h3>
        <p className="text-sm text-gray-600">Müşteri hizmetleri</p>
       </div>
      </div>
     </div>
    </div>
   </section>

   {/* YENİ ÜRÜNLER */}
   {newProducts.length > 0 && (
    <section className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
      <div>
       <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Yeni Gelenler</h2>
       <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">En son teknoloji ürünleri keşfedin.</p>
      </div>
      <Link href="/yeniler">
       <Button variant="outline" className="hidden sm:flex rounded-full text-sm sm:text-base">
        Tümünü Gör
       </Button>
      </Link>
     </div>

     <Carousel className="w-full" opts={{ align: "start", loop: newProducts.length > 4, dragFree: newProducts.length > 4, watchDrag: newProducts.length > 4 }}>
      <CarouselContent className="-ml-2 sm:-ml-4 pb-4">
       {newProducts.map((product) => (
        <CarouselItem key={product.id} className="pl-2 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
         <ProductCard product={product} />
        </CarouselItem>
       ))}
      </CarouselContent>
      {newProducts.length > 4 && (
       <>
        <CarouselPrevious className="hidden md:flex -left-15 h-12 w-12 rounded-full" />
        <CarouselNext className="hidden md:flex -right-15 h-12 w-12 rounded-full" />
       </>
      )}
     </Carousel>
    </section>
   )}

   {/* ÖNE ÇIKAN ÜRÜNLER */}
   {featuredProducts.length > 0 && (
    <section className="bg-amber-50/50 py-12 sm:py-16 lg:py-20 border-y border-amber-100">
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
       <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
         <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-500 text-amber-500" /> Öne Çıkan Ürünler
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">Sizin için özenle seçtiğimiz ürünler.</p>
       </div>
       <Link href="/one-cikan-urunler">
        <Button variant="outline" className="hidden sm:flex rounded-full text-sm sm:text-base">
         Tümünü Gör
        </Button>
       </Link>
      </div>

      <Carousel className="w-full" opts={{ align: "start", loop: featuredProducts.slice(0, 6).length > 4, dragFree: featuredProducts.slice(0, 6).length > 4, watchDrag: featuredProducts.slice(0, 6).length > 4 }}>
       <CarouselContent className="-ml-2 sm:-ml-4 pb-4">
        {featuredProducts.slice(0, 6).map((product) => (
         <CarouselItem key={product.id} className="pl-2 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
          <ProductCard product={product} />
         </CarouselItem>
        ))}
       </CarouselContent>
       {featuredProducts.slice(0, 6).length > 4 && (
        <>
         <CarouselPrevious className="hidden md:flex -left-15 text-amber-600 border-amber-200 hover:bg-amber-50 h-10 w-10 sm:h-12 sm:w-12" />
         <CarouselNext className="hidden md:flex -right-15 text-amber-600 border-amber-200 hover:bg-amber-50 h-10 w-10 sm:h-12 sm:w-12" />
        </>
       )}
      </Carousel>
     </div>
    </section>
   )}

   {/* İNDİRİMLİ ÜRÜNLER */}
   {discountedProducts.length > 0 && (
    <section className="bg-red-50/50 py-12 sm:py-16 lg:py-20 border-y border-red-100">
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
       <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 flex items-center gap-2 sm:gap-3">
         <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-red-600 text-red-600" /> Fırsat Ürünleri
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Sınırlı süre geçerli indirimleri kaçırmayın.</p>
       </div>
       <Link href="/indirimler">
        <Button variant="outline" className="hidden sm:flex rounded-full text-sm sm:text-base">
         Tümünü Gör
        </Button>
       </Link>
      </div>

      <Carousel className="w-full" opts={{ align: "start", loop: discountedProducts.length > 4, dragFree: discountedProducts.length > 4, watchDrag: discountedProducts.length > 4 }}>
       <CarouselContent className="-ml-2 sm:-ml-4 pb-4">
        {discountedProducts.map((product) => (
         <CarouselItem key={product.id} className="pl-2 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
          <ProductCard product={product} />
         </CarouselItem>
        ))}
       </CarouselContent>
       {discountedProducts.length > 4 && (
        <>
         <CarouselPrevious className="hidden md:flex -left-15 text-red-600 border-red-200 hover:bg-red-50 h-10 w-10 sm:h-12 sm:w-12" />
         <CarouselNext className="hidden md:flex -right-15 text-red-600 border-red-200 hover:bg-red-50 h-10 w-10 sm:h-12 sm:w-12" />
        </>
       )}
      </Carousel>
     </div>
    </section>
   )}

   {/* MÜŞTERİ YORUMLARI */}
   <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">Müşterilerimiz Ne Diyor?</h2>
    <div className="relative">
     <Carousel className="w-full" opts={{ align: "start", loop: true }}>
      <CarouselContent className="-ml-2 sm:-ml-4 pb-4">
       {musteriYorumlari.map((t) => (
        <CarouselItem key={t.initials + t.name} className="pl-2 sm:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
         <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 h-full">
          <div className="flex gap-1 mb-4">
           {Array.from({ length: 5 }).map((_, j) => (
            <Sparkles key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
           ))}
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
           &ldquo;{t.text}&rdquo;
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
           <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs sm:text-sm shrink-0">
            {t.initials}
           </div>
           <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">{t.name}</h4>
            <span className="text-xs text-gray-500">Onaylı Müşteri</span>
           </div>
          </div>
         </div>
        </CarouselItem>
       ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-8 lg:-left-15 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md" aria-label="Önceki yorumlar" />
      <CarouselNext className="hidden md:flex -right-8 lg:-right-15 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md" aria-label="Sonraki yorumlar" />
     </Carousel>
    </div>
   </section>

   {/* SIKÇA SORULAN SORULAR */}
   <section className="max-w-3xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
    <div className="text-center mb-8 sm:mb-12">
     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sık Sorulan Sorular</h2>
     <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-3">Aklınıza takılan soruların cevapları.</p>
     <Link
      href="/sss"
      className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700"
     >
      Tüm soruları gör
      <span aria-hidden>→</span>
     </Link>
    </div>

    <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
     {faqs.slice(0, 5).map((faq) => (
      <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-xl px-2 sm:px-3 bg-white data-[state=open]:border-blue-200 data-[state=open]:ring-2 sm:data-[state=open]:ring-4 data-[state=open]:ring-blue-50 transition-all">
       <AccordionTrigger className="text-left font-medium text-sm sm:text-base text-gray-800 hover:text-blue-600 py-3 sm:py-4 px-3 sm:px-4 hover:no-underline">
        {faq.question}
       </AccordionTrigger>
       <AccordionContent className="text-sm sm:text-base text-gray-600 px-3 sm:px-4 pb-3 sm:pb-4 leading-relaxed">
        {faq.answer}
       </AccordionContent>
      </AccordionItem>
     ))}
    </Accordion>
   </section>

   {/* MARKALAR BANDI */}
   <section className="py-8 sm:py-10 border-b border-gray-100 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
     <p className="text-center text-xs sm:text-sm md:text-lg font-medium text-gray-400 mb-6 sm:mb-8 uppercase tracking-wider">
      Dünyanın En İyi Markaları Burada
     </p>
     <div className="flex flex-col gap-4 sm:gap-6">
      {[brands.slice(0, Math.ceil(brands.length / 2)), brands.slice(Math.ceil(brands.length / 2))].map((rowBrands, rowIndex) => (
       <div key={rowIndex} className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="brands-slider-track flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 w-max">
         {[...rowBrands, ...rowBrands, ...rowBrands, ...rowBrands].map((brand, index) => (
          <Link
           key={`${rowIndex}-${index}`}
           href={`/marka/${encodeURIComponent(brand.name)}`}
           className={`shrink-0 text-base sm:text-lg md:text-xl lg:text-2xl font-bold cursor-pointer transition-colors hover:opacity-100 whitespace-nowrap ${brand.className}`}
          >
           {brand.name}
          </Link>
         ))}
        </div>
       </div>
      ))}
     </div>
    </div>
   </section>

  </div>
 );
}