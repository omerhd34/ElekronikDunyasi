"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

const CATEGORIES = [
 { id: "genel", label: "Genel" },
 { id: "basvuru", label: "Başvuru" },
 { id: "odemeler", label: "Ödemeler" },
 { id: "faturalandirma", label: "Faturalandırma" },
];

export default function SikSorulanSorularPage() {
 const [activeCategory, setActiveCategory] = useState("genel");
 const [faqs, setFaqs] = useState([]);

 useEffect(() => {
  fetch("/api/settings/faqs")
   .then((r) => (r.ok ? r.json() : []))
   .then((data) => setFaqs(Array.isArray(data) ? data : []))
   .catch(() => setFaqs([]));
 }, []);

 const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

 return (
  <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
   <div className="mx-auto max-w-5xl">
    <div className="mb-8 text-center">
     <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Sıkça Sorulan Sorular
     </h1>
     <p className="mt-3 text-lg text-gray-600">
      Elektronik Dünyası alışverişlerinizle ilgili merak ettiğiniz tüm
      detaylar.
     </p>
    </div>

    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
     {/* Sol sütun - Kategori menüsü */}
     <aside className="shrink-0 lg:w-56">
      <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-3">
       {CATEGORIES.map((cat) => (
        <button
         key={cat.id}
         type="button"
         onClick={() => setActiveCategory(cat.id)}
         className={cn(
          "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
          activeCategory === cat.id
           ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200/60"
           : "bg-white text-gray-800 shadow-sm ring-1 ring-gray-200/80 hover:bg-gray-50",
         )}
        >
         {cat.label}
        </button>
       ))}
      </nav>
     </aside>

     {/* Sağ sütun - Accordion listesi */}
     <div className="min-w-0 flex-1">
      <AccordionPrimitive.Root
       type="single"
       collapsible
       className="w-full space-y-3"
      >
       {filteredFaqs.length === 0 ? (
        <p className="rounded-xl bg-white px-4 py-8 text-center text-gray-500 shadow-sm ring-1 ring-gray-200">
         Bu kategoride henüz soru bulunmuyor.
        </p>
       ) : (
        filteredFaqs.map((faq) => (
         <AccordionPrimitive.Item
          key={faq.id}
          value={faq.id}
          className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm data-[state=open]:bg-white data-[state=closed]:bg-gray-100"
         >
          <AccordionPrimitive.Header className="flex">
           <AccordionPrimitive.Trigger
            className={cn(
             "group flex flex-1 items-center justify-between gap-4 px-4 py-4 text-left font-medium outline-none transition-colors",
             "hover:bg-gray-50/80 data-[state=open]:bg-white data-[state=open]:text-sky-800 data-[state=closed]:text-gray-700 data-[state=closed]:hover:bg-gray-100",
             "focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2",
             "[&_.icon-plus]:block [&_.icon-minus]:hidden [&[data-state=open]_.icon-plus]:hidden [&[data-state=open]_.icon-minus]:block",
            )}
           >
            <span className="pr-2">{faq.question}</span>
            <span
             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white transition-colors group-hover:bg-sky-600"
             aria-hidden
            >
             <Plus className="icon-plus h-4 w-4" />
             <Minus className="icon-minus hidden h-4 w-4" />
            </span>
           </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
           <div className="border-t border-gray-200/80 px-4 pb-4 pt-2 text-gray-600 leading-relaxed">
            {faq.answer}
           </div>
          </AccordionPrimitive.Content>
         </AccordionPrimitive.Item>
        ))
       )}
      </AccordionPrimitive.Root>
     </div>
    </div>

    {/* Alt iletişim notu */}
    <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
     <p className="font-medium text-blue-800">
      Aradığınız cevabı bulamadınız mı?
     </p>
     <p className="mt-2 text-blue-600">
      <a href="/iletisim" className="font-bold hover:underline">
       İletişim
      </a>{" "}
      sayfasından bize ulaşabilirsiniz.
     </p>
    </div>
   </div>
  </div>
 );
}
