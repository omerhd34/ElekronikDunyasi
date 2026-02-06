"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Send, ExternalLink, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ADRES = "Mehmet Akif, Recep Ayan Cd. 23B, 34406 Çekmeköy/İstanbul";
const TELEFON = "0546 219 72 21";
const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.387843688099!2d29.190566999999994!3d41.016769999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacf2779a48c45%3A0x416c273604ffeee2!2zRUxFS1RST07EsEsgRMOcTllBU0k!5e0!3m2!1str!2str!4v1770239287331!5m2!1str!2str";

const GUNLER = [
 "Pazar",
 "Pazartesi",
 "Salı",
 "Çarşamba",
 "Perşembe",
 "Cuma",
 "Cumartesi",
];

const CALISMA_SAATLERI = {
 0: { acilis: "09:00", kapanis: "23:00" }, // Pazar
 1: { acilis: "09:00", kapanis: "22:30" }, // Pazartesi
 2: { acilis: "09:00", kapanis: "22:30" }, // Salı
 3: { acilis: "09:00", kapanis: "22:30" }, // Çarşamba
 4: { acilis: "09:00", kapanis: "23:00" }, // Perşembe
 5: { acilis: "09:00", kapanis: "23:00" }, // Cuma
 6: { acilis: "09:00", kapanis: "23:00" }, // Cumartesi
};

function saatToDakika(saatStr) {
 const [s, d] = saatStr.split(":").map(Number);
 return s * 60 + d;
}

function suanAcikMi() {
 const now = new Date();
 const gun = now.getDay();
 const saat = now.getHours();
 const dakika = now.getMinutes();
 const toplamDakika = saat * 60 + dakika;
 const { acilis, kapanis } = CALISMA_SAATLERI[gun];
 const acilisDk = saatToDakika(acilis);
 const kapanisDk = saatToDakika(kapanis);
 return toplamDakika >= acilisDk && toplamDakika < kapanisDk;
}

export default function IletisimPage() {
 const [formState, setFormState] = useState({
  ad: "",
  email: "",
  konu: "",
  mesaj: "",
 });
 const [gonderildi, setGonderildi] = useState(false);

 const acik = suanAcikMi();

 const handleSubmit = (e) => {
  e.preventDefault();
  setGonderildi(true);
  setFormState({ ad: "", email: "", konu: "", mesaj: "" });
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormState((prev) => ({ ...prev, [name]: value }));
 };

 return (
  <div className="min-h-[60vh]">
   {/* Başlık */}
   <section className="border-b bg-muted/30 py-12">
    <div className="container px-4">
     <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
      İletişim
     </h1>
     <p className="mt-2 text-muted-foreground">
      Sorularınız için bize ulaşın; size yardımcı olmaktan mutluluk duyarız.
     </p>
    </div>
   </section>

   <div className="container px-4 py-10">
    <div className="grid gap-10 lg:grid-cols-5">
     {/* Sol: İletişim bilgileri */}
     <div className="space-y-6 lg:col-span-2">
      <Card className="border-border/80 gap-3 pb-4 pt-0 shadow-sm">
       <CardHeader className="rounded-t-xl bg-emerald-300/30 pb-0 pt-3">
        <div className="flex items-center gap-3">
         <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MapPin className="size-5" />
         </div>
         <CardTitle className="text-lg">Adres</CardTitle>
        </div>
       </CardHeader>
       <CardContent>
        <p className="text-muted-foreground leading-relaxed">
         {ADRES}
        </p>
        <a
         href="https://maps.app.goo.gl/xP4LWjiCzHSNWnWp7"
         target="_blank"
         rel="noopener noreferrer"
         className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
         Haritada aç
         <ExternalLink className="size-3.5" />
        </a>
       </CardContent>
      </Card>

      <Card className="border-border/80 gap-3 pb-4 pt-0 shadow-sm">
       <CardHeader className="rounded-t-xl bg-emerald-300/30 pb-0 pt-3">
        <div className="flex items-center gap-3">
         <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Clock className="size-5" />
         </div>
         <div className="flex flex-1 items-center justify-between gap-2">
          <CardTitle className="text-lg">Çalışma saatleri</CardTitle>
          <span
           className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            acik
             ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
             : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
           )}
          >
           {acik ? "Açık" : "Kapalı"}
          </span>
         </div>
        </div>
       </CardHeader>
       <CardContent>
        <Accordion type="single" collapsible className="w-full">
         <AccordionItem value="saatler" className="border-0">
          <AccordionTrigger className="py-1.5 hover:no-underline">
           <span className="text-muted-foreground text-sm">
            Haftalık çalışma saatleri
           </span>
          </AccordionTrigger>
          <AccordionContent>
           <ul className="space-y-1.5 text-sm text-muted-foreground">
            {GUNLER.map((gun, i) => (
             <li
              key={gun}
              className="flex justify-between gap-4"
             >
              <span>{gun}</span>
              <span className="tabular-nums">
               {CALISMA_SAATLERI[i].acilis}–
               {CALISMA_SAATLERI[i].kapanis}
              </span>
             </li>
            ))}
           </ul>
          </AccordionContent>
         </AccordionItem>
        </Accordion>
       </CardContent>
      </Card>

      <Card className="border-border/80 gap-3 pb-4 pt-0 shadow-sm">
       <CardHeader className="rounded-t-xl bg-emerald-300/30 pb-0 pt-3">
        <div className="flex items-center gap-3">
         <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Phone className="size-5" />
         </div>
         <CardTitle className="text-lg">Telefon</CardTitle>
        </div>
       </CardHeader>
       <CardContent>
        <a
         href={`tel:${TELEFON.replace(/\s/g, "")}`}
         className="text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
         {TELEFON}
        </a>
       </CardContent>
      </Card>
     </div>

     {/* Sağ: Dükkan Resmi ve Harita */}
     <div className="lg:col-span-3 space-y-6">
      {/* Dükkan Resmi */}
      <Card className="overflow-hidden border-border/80 gap-3 pb-4 pt-0 shadow-sm">
       <CardHeader className="rounded-t-xl bg-emerald-300/30 pb-0 pt-3">
        <div className="flex items-center gap-3">
         <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Store className="size-5" />
         </div>
         <CardTitle className="text-lg">Dükkanımız</CardTitle>
        </div>
       </CardHeader>
       <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
         <Image
          src="/electronik-dunyasi.png"
          alt="Elektronik Dünyası dükkan fotoğrafı"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority={true}
         />
        </div>
       </CardContent>
      </Card>

      {/* Harita */}
      <Card className="overflow-hidden border-border/80 gap-3 pb-4 pt-0 shadow-sm">
       <CardHeader className="rounded-t-xl bg-emerald-300/30 pb-0 pt-3">
        <div className="flex items-center gap-3">
         <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MapPin className="size-5" />
         </div>
         <CardTitle className="text-lg">Konum</CardTitle>
        </div>
       </CardHeader>
       <CardContent>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-b-xl sm:aspect-video">
         <iframe
          src={GOOGLE_MAPS_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Elektronik Dünyası konum haritası"
          className="absolute inset-0 h-full w-full"
         />
        </div>
       </CardContent>
      </Card>
     </div>
    </div>

    {/* İletişim formu */}
    <section className="mt-16">
     <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
       <h2 className="text-2xl font-semibold">Bize ulaşın</h2>
       <p className="mt-1 text-muted-foreground text-sm">
        Formu doldurarak mesaj gönderebilirsiniz.
       </p>
      </div>
      {gonderildi ? (
       <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30">
        <CardContent className="flex items-center gap-3 py-6">
         <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
          <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
         </div>
         <div>
          <p className="font-medium text-emerald-800 dark:text-emerald-200">
           Mesajınız alındı
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
           En kısa sürede size dönüş yapacağız.
          </p>
         </div>
        </CardContent>
       </Card>
      ) : (
       <Card className="border-border/80 shadow-sm">
        <CardContent className="pt-6">
         <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
         >
          <div className="grid gap-4 sm:grid-cols-2">
           <div className="space-y-2">
            <Label htmlFor="ad">Adınız ve soyadınız</Label>
            <Input
             id="ad"
             name="ad"
             value={formState.ad}
             onChange={handleChange}
             placeholder="Adınız ve soyadınız"
             required
            />
           </div>
           <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
             id="email"
             name="email"
             type="email"
             value={formState.email}
             onChange={handleChange}
             placeholder="ornek@email.com"
             required
            />
           </div>
          </div>
          <div className="space-y-2">
           <Label htmlFor="konu">Konu</Label>
           <Input
            id="konu"
            name="konu"
            value={formState.konu}
            onChange={handleChange}
            placeholder="Mesajınızın konusu"
           />
          </div>
          <div className="space-y-2">
           <Label htmlFor="mesaj">Mesajınız</Label>
           <Textarea
            id="mesaj"
            name="mesaj"
            value={formState.mesaj}
            onChange={handleChange}
            placeholder="Mesajınızı buraya yazın..."
            rows={5}
            required
            className="resize-none"
           />
          </div>
          <Button type="submit" className="gap-2 cursor-pointer">
           <Send className="size-4 " />
           Gönder
          </Button>
         </form>
        </CardContent>
       </Card>
      )}
     </div>
    </section>
   </div>
  </div>
 );
}
