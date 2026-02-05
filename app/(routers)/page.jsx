import Link from 'next/link';
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Star, Truck, ShieldCheck, CreditCard, Phone } from "lucide-react";

const newProducts = [
 { id: 1, name: "iPhone 15 Pro Max", price: "84.999 ₺", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80", category: "Telefon" },
 { id: 2, name: "MacBook Air M3", price: "42.999 ₺", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80", category: "Bilgisayar" },
 { id: 3, name: "Sony WH-1000XM5", price: "12.499 ₺", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80", category: "Kulaklık" },
 { id: 4, name: "Samsung Galaxy S24", price: "39.999 ₺", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", category: "Telefon" },
 { id: 5, name: "iPad Air 5", price: "19.999 ₺", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", category: "Tablet" },
];

const discountedProducts = [
 { id: 1, name: "Dyson V15 Detect", oldPrice: "29.999 ₺", price: "24.999 ₺", discount: "%15", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80" },
 { id: 2, name: "LG 55' OLED TV", oldPrice: "65.000 ₺", price: "52.000 ₺", discount: "%20", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80" },
 { id: 3, name: "JBL Flip 6", oldPrice: "4.500 ₺", price: "3.200 ₺", discount: "%28", image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80" },
 { id: 4, name: "Logitech MX Master 3S", oldPrice: "3.800 ₺", price: "2.900 ₺", discount: "%23", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80" },
 { id: 5, name: "Apple Watch Series 9", oldPrice: "16.000 ₺", price: "13.500 ₺", discount: "%15", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80" },
];

const faqs = [
 { id: "faq-1", q: "Kargom ne zaman ulaşır?", a: "Siparişleriniz 24 saat içinde kargoya verilir ve 1-3 iş günü içinde size ulaşır." },
 { id: "faq-2", q: "İade koşulları nelerdir?", a: "14 gün içinde, ambalajı açılmamış ürünleri koşulsuz iade edebilirsiniz." },
 { id: "faq-3", q: "Taksit seçenekleri var mı?", a: "Tüm kredi kartlarına peşin fiyatına 3 taksit veya vade farkıyla 9 taksit imkanı sunuyoruz." },
];

export default function HomePage() {
 return (
  <div className="min-h-screen bg-gray-50 pb-20">

   {/* 1. HERO SECTION */}
   <section className="bg-slate-950 text-white py-24 px-4">
    <div className="max-w-[1400px] mx-auto text-center space-y-8">
     <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 border-none">
      YENİ SEZON TEKNOLOJİ
     </Badge>
     <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
      ELEKTRONİK DÜNYASI
     </h1>
     <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Çekmeköy&apos;ün en güvenilir teknoloji adresi. En yeni telefonlar, bilgisayarlar ve ev elektroniği en uygun fiyatlarla burada.
     </p>
     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
      <Button size="xl" className="h-14 px-8 text-lg bg-white text-slate-950 hover:bg-gray-200 font-semibold">
       Alışverişe Başla
      </Button>
      <Button
       size="xl"
       variant="outline"
       className="h-14 px-8 text-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-slate-950 transition-colors font-semibold"
      >
       İletişime Geç
      </Button>
     </div>
    </div>
   </section>

   {/* 2. AVANTAJLAR BANDI */}
   <section className="bg-white border-b shadow-sm relative z-10">
    <div className="max-w-[1400px] mx-auto py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
     <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className="p-4 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform"><Truck size={28} /></div>
      <span className="font-bold text-gray-800 text-lg">Hızlı Kargo</span>
     </div>
     <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className="p-4 bg-green-50 rounded-full text-green-600 group-hover:scale-110 transition-transform"><ShieldCheck size={28} /></div>
      <span className="font-bold text-gray-800 text-lg">Güvenli Alışveriş</span>
     </div>
     <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className="p-4 bg-purple-50 rounded-full text-purple-600 group-hover:scale-110 transition-transform"><CreditCard size={28} /></div>
      <span className="font-bold text-gray-800 text-lg">Taksit İmkanı</span>
     </div>
     <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className="p-4 bg-orange-50 rounded-full text-orange-600 group-hover:scale-110 transition-transform"><Phone size={28} /></div>
      <span className="font-bold text-gray-800 text-lg">7/24 Destek</span>
     </div>
    </div>
   </section>

   {/* 3. SLIDER: YENİ ÜRÜNLER (Image Component ile) */}
   <section className="max-w-[1400px] mx-auto py-20 px-12">
    <div className="flex justify-between items-end mb-10">
     <div>
      <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Yeni Gelenler</h2>
      <p className="text-gray-500 mt-2 text-lg">En son teknoloji ürünleri keşfedin.</p>
     </div>
     <Link href="/yeniler">
      <Button variant="link" className="text-blue-600 text-lg font-semibold cursor-pointer">
       Tümünü Gör &rarr;
      </Button>
     </Link>
    </div>

    <Carousel className="w-full relative" opts={{ align: "start", loop: true }}>
     <CarouselContent className="-ml-6">
      {newProducts.map((product) => (
       <CarouselItem key={product.id} className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4">
        <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200">
         <CardContent className="p-5 flex flex-col h-full">
          {/* GÖRSEL ALANI DÜZENLENDİ */}
          <div className="aspect-square bg-gray-100 rounded-xl mb-5 overflow-hidden relative group">
           <img
            src={product.image}
            alt={product.name}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
           />
           <Badge className="absolute top-3 left-3 bg-blue-600 px-3 py-1 z-10">YENİ</Badge>
          </div>
          <div className="text-sm font-medium text-gray-500 mb-2">{product.category}</div>
          <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-1">{product.name}</h3>
          <div className="mt-auto flex items-center justify-between">
           <span className="text-xl font-bold text-slate-900">{product.price}</span>
           <Button size="icon" className="h-10 w-10 rounded-full bg-slate-900 hover:bg-blue-600 transition-colors">
            <ShoppingCart size={18} />
           </Button>
          </div>
         </CardContent>
        </Card>
       </CarouselItem>
      ))}
     </CarouselContent>

     <CarouselPrevious className="-left-12 h-12 w-12 border-2 border-gray-300 hover:bg-white hover:text-blue-600 hover:border-blue-600" />
     <CarouselNext className="-right-12 h-12 w-12 border-2 border-gray-300 hover:bg-white hover:text-blue-600 hover:border-blue-600" />
    </Carousel>
   </section>

   {/* 4. SLIDER: İNDİRİMLİ ÜRÜNLER  */}
   <section className="bg-red-50 py-20 px-12">
    <div className="max-w-[1400px] mx-auto">
     <div className="flex justify-between items-end mb-10">
      <div>
       <h2 className="text-4xl font-bold text-red-600 flex items-center gap-3">
        <Star className="fill-red-600 h-8 w-8" /> Fırsat Ürünleri
       </h2>
       <p className="text-gray-600 mt-2 text-lg">Sınırlı süre geçerli indirimleri kaçırmayın.</p>
      </div>
      <Link href="/indirimler">
       <Button variant="link" className="text-red-600 text-lg font-semibold hover:text-red-800 cursor-pointer">
        Tümünü Gör &rarr;
       </Button>
      </Link>
     </div>

     <Carousel className="w-full relative" opts={{ align: "start", loop: true }}>
      <CarouselContent className="-ml-6">
       {discountedProducts.map((product) => (
        <CarouselItem key={product.id} className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4">
         <Card className="h-full border-red-100 hover:border-red-300 hover:shadow-md transition-all">
          <CardContent className="p-5 flex flex-col h-full">
           {/* GÖRSEL ALANI DÜZENLENDİ */}
           <div className="aspect-square bg-white rounded-xl mb-5 overflow-hidden relative group">
            <img
             src={product.image}
             alt={product.name}
             className="object-cover group-hover:scale-105 transition-transform duration-300"
             sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <Badge className="absolute top-3 right-3 bg-red-600 animate-pulse px-3 py-1 z-10">{product.discount} İndirim</Badge>
           </div>
           <h3 className="font-semibold text-gray-900 mb-2 text-lg line-clamp-1">{product.name}</h3>
           <div className="mt-auto">
            <span className="text-gray-400 line-through mr-3 text-lg">{product.oldPrice}</span>
            <span className="text-2xl font-bold text-red-600">{product.price}</span>
           </div>
           <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white h-11 text-md font-medium">
            Sepete Ekle
           </Button>
          </CardContent>
         </Card>
        </CarouselItem>
       ))}
      </CarouselContent>

      <CarouselPrevious className="-left-12 h-12 w-12 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 hover:border-red-600" />
      <CarouselNext className="-right-12 h-12 w-12 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 hover:border-red-600" />
     </Carousel>
    </div>
   </section>

   {/* 5. SIKÇA SORULAN SORULAR */}
   <section className="max-w-[1000px] mx-auto py-24 px-6">
    <div className="text-center mb-12">
     <h2 className="text-4xl font-bold text-gray-900">Sık Sorulan Sorular</h2>
     <p className="text-gray-500 mt-3 text-lg">Aklınıza takılan soruların cevapları.</p>
    </div>

    <Accordion type="single" collapsible className="w-full">
     {faqs.map((faq) => (
      <AccordionItem key={faq.id} value={faq.id} className="mb-4 border rounded-lg px-4 bg-white shadow-sm">
       <AccordionTrigger className="text-lg font-medium text-gray-800 hover:no-underline hover:text-blue-600 py-6">
        {faq.q}
       </AccordionTrigger>
       <AccordionContent className="text-gray-600 text-lg leading-relaxed pb-6">
        {faq.a}
       </AccordionContent>
      </AccordionItem>
     ))}
    </Accordion>
   </section>

  </div>
 );
}