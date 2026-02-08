"use client";

import { useState } from "react";
import IletisimHero from "@/components/contact/IletisimHero";
import AdresCard from "@/components/contact/AdresCard";
import IletisimCard from "@/components/contact/IletisimCard";
import SaatlerCard from "@/components/contact/SaatlerCard";
import ContactForm from "@/components/contact/ContactForm";
import MapAndImageSection from "@/components/contact/MapAndImageSection";
import ImageLightbox from "@/components/contact/ImageLightbox";
import { suanAcikMi } from "@/components/contact/utils";

export default function IletisimPage() {
 const [lightboxOpen, setLightboxOpen] = useState(false);
 const acik = suanAcikMi();

 return (
  <div className="min-h-[60vh]">
   <ImageLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />

   <IletisimHero />

   <div className="container px-4 py-10 md:py-14">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 -mt-12 relative z-10 mb-12 items-stretch">
     <AdresCard />
     <IletisimCard />
     <SaatlerCard acik={acik} />
    </div>

    <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-stretch lg:h-[520px]">
     <div className="flex flex-col h-full min-h-0">
      <ContactForm />
     </div>

     <div className="h-full min-h-[280px] sm:min-h-[360px] lg:min-h-0">
      <MapAndImageSection onImageClick={() => setLightboxOpen(true)} />
     </div>
    </div>
   </div>
  </div>
 );
}
