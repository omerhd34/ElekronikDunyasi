"use client";

import { useState } from "react";
import IletisimHero from "@/components/contact/IletisimHero";
import AdresCard from "@/components/contact/AdresCard";
import IletisimCard from "@/components/contact/IletisimCard";
import SaatlerCard from "@/components/contact/SaatlerCard";
import ContactForm from "@/components/contact/ContactForm";
import MapCard from "@/components/contact/MapCard";
import StoreImageCard from "@/components/contact/StoreImageCard";
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
    <div className="space-y-6 -mt-12 relative z-10">
     <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-4 items-stretch">
      <AdresCard />
      <MapCard />
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-4 items-stretch">
      <SaatlerCard acik={acik} />
      <StoreImageCard onImageClick={() => setLightboxOpen(true)} />
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-4 items-stretch">
      <IletisimCard />
      <ContactForm />
     </div>
    </div>
   </div>
  </div>
 );
}
