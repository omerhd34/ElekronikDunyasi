"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Send, X, ZoomIn } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiFacebook } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const ADRES = "Mehmet Akif Mahallesi, Recep Ayan Caddesi, No: 23B, 34406, Çekmeköy/İstanbul";
const TELEFON1 = "0546 219 72 21";
const TELEFON2 = "0505 891 81 81";
const INSTAGRAM = "https://www.instagram.com/elektronik_dunyasi34/";
const FACEBOOK = "https://www.facebook.com/modagiyim3434/?locale=tr_TR";
const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.387843688099!2d29.190566999999994!3d41.016769999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacf2779a48c45%3A0x416c273604ffeee2!2zRUxFS1RST07EsEsgRMOcTllBU0k!5e0!3m2!1str!2str!4v1770239287331!5m2!1str!2str";

const CALISMA_SAATLERI = {
 0: { acilis: "09:00", kapanis: "22:30" },
 1: { acilis: "09:00", kapanis: "22:30" },
 2: { acilis: "09:00", kapanis: "22:30" },
 3: { acilis: "09:00", kapanis: "23:00" },
 4: { acilis: "09:00", kapanis: "23:00" },
 5: { acilis: "09:00", kapanis: "23:00" },
 6: { acilis: "09:00", kapanis: "23:00" },
};

const GUNLER = [
 "Pazartesi",
 "Salı",
 "Çarşamba",
 "Perşembe",
 "Cuma",
 "Cumartesi",
 "Pazar",
];

function getGunIndex(jsDay) {
 return (jsDay + 6) % 7;
}

function saatToDakika(saatStr) {
 const [s, d] = saatStr.split(":").map(Number);
 return s * 60 + d;
}

function suanAcikMi() {
 const now = new Date();
 const gun = getGunIndex(now.getDay());
 const toplamDakika = now.getHours() * 60 + now.getMinutes();
 const { acilis, kapanis } = CALISMA_SAATLERI[gun];
 return toplamDakika >= saatToDakika(acilis) && toplamDakika < saatToDakika(kapanis);
}

function SaatlerCard({ acik }) {
 const now = new Date();
 const bugun = getGunIndex(now.getDay());
 const { acilis, kapanis } = CALISMA_SAATLERI[bugun];

 return (
  <Card className="border border-amber-100/80 bg-white shadow-md shadow-gray-200/50 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/30 hover:-translate-y-0.5">
   <CardContent className="flex items-start gap-3 py-4 px-4 flex-1">
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-100 to-amber-50 text-amber-600 ring-2 ring-amber-200/50">
     <Clock className="size-5" />
    </div>
    <div className="min-w-0 w-full">
     <p className="text-xs font-semibold text-amber-700/90 uppercase tracking-widest">Çalışma Saatleri</p>
     <p className="text-sm font-semibold text-foreground mt-1">
      {GUNLER[bugun]}: {acilis} – {kapanis}
      <span className={cn("ml-1.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium", acik ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
       {acik ? "Açık" : "Kapalı"}
      </span>
     </p>
     <ul className="mt-2 space-y-1 text-sm border-t border-amber-100 pt-2">
      {GUNLER.map((gunAdi, i) => (
       <li key={gunAdi} className="flex justify-between gap-3 text-muted-foreground">
        <span>{gunAdi}</span>
        <span className="tabular-nums font-medium text-foreground shrink-0">
         {CALISMA_SAATLERI[i].acilis} – {CALISMA_SAATLERI[i].kapanis}
        </span>
       </li>
      ))}
     </ul>
    </div>
   </CardContent>
  </Card>
 );
}

function ImageLightbox({ open, onClose }) {
 useEffect(() => {
  if (!open) return;
  const handler = (e) => e.key === "Escape" && onClose();
  document.addEventListener("keydown", handler);
  document.body.style.overflow = "hidden";
  return () => {
   document.removeEventListener("keydown", handler);
   document.body.style.overflow = "";
  };
 }, [open, onClose]);

 if (!open) return null;

 return (
  <div
   className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
   onClick={onClose}
  >
   <button
    type="button"
    onClick={onClose}
    className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
    aria-label="Kapat"
   >
    <X className="size-5" />
   </button>
   <div
    className="relative max-h-[85vh] max-w-4xl w-full overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
    onClick={(e) => e.stopPropagation()}
   >
    <Image
     src="/electronik-dunyasi.png"
     alt="Elektronik Dünyası dükkan fotoğrafı"
     width={1200}
     height={800}
     className="h-full w-full object-contain"
     priority
    />
   </div>
  </div>
 );
}

export default function IletisimPage() {
 const [formState, setFormState] = useState({
  ad: "",
  email: "",
  konu: "",
  mesaj: "",
 });
 const [gonderildi, setGonderildi] = useState(false);
 const [gonderiliyor, setGonderiliyor] = useState(false);
 const [lightboxOpen, setLightboxOpen] = useState(false);
 const acik = suanAcikMi();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setGonderiliyor(true);
  try {
   const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     name: formState.ad,
     email: formState.email,
     subject: formState.konu,
     body: formState.mesaj,
    }),
   });
   if (res.ok) {
    setGonderildi(true);
    setFormState({ ad: "", email: "", konu: "", mesaj: "" });
    setTimeout(() => setGonderildi(false), 3000);
   }
  } catch { /* ignore */ }
  finally { setGonderiliyor(false); }
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormState((prev) => ({ ...prev, [name]: value }));
 };

 return (
  <div className="min-h-[60vh]">
   <ImageLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />

   {/* Hero */}
   <section className="relative overflow-hidden bg-emerald-950 text-white">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-emerald-400 via-emerald-950 to-emerald-950" />
    <div className="container relative z-10 px-4 py-14 md:py-20 text-center">
     <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
      Bize Ulaşın
     </h1>
     <p className="mx-auto mt-3 max-w-lg text-emerald-200/80 text-base md:text-lg">
      Sorularınız, önerileriniz veya siparişleriniz hakkında bizimle iletişime geçin.
     </p>
    </div>
   </section>

   <div className="container px-4 py-10 md:py-14">
    {/* Hızlı bilgi kartları */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 -mt-12 relative z-10 mb-12 items-stretch">
     <Card className="border border-emerald-100/80 bg-white shadow-md shadow-gray-200/50 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/30 hover:-translate-y-0.5">
      <CardContent className="flex items-start gap-3 py-4 px-4 flex-1">
       <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-emerald-50 text-emerald-600 ring-2 ring-emerald-200/50">
        <MapPin className="size-5" />
       </div>
       <div className="min-w-0">
        <p className="text-xs font-semibold text-emerald-700/90 uppercase tracking-widest">Adres</p>
        <p className="text-sm font-medium text-foreground leading-snug mt-1">{ADRES}</p>
       </div>
      </CardContent>
     </Card>
     <Card className="border border-slate-100 bg-white shadow-md shadow-gray-200/50 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-0.5">
      <CardContent className="flex flex-col gap-3 py-4 px-4 flex-1">
       <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 ring-2 ring-blue-200/50">
         <Phone className="size-5" />
        </div>
        <p className="text-xs font-semibold text-blue-700/90 uppercase tracking-widest">İletişim</p>
       </div>
       <div className="space-y-3">
        <div>
         <p className="text-xs font-medium text-muted-foreground mb-1.5">Telefon</p>
         <ul className="space-y-1.5">
          <li className="flex items-center justify-between gap-2 rounded-lg bg-gray-50/80 py-1.5 px-2.5">
           <a href={`tel:${TELEFON1.replace(/\s/g, "")}`} className="text-sm font-semibold text-foreground hover:text-emerald-600 transition-colors">
            {TELEFON1}
           </a>
           <a
            href={`https://wa.me/90${TELEFON1.replace(/\D/g, "").replace(/^0/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center justify-center size-8 rounded-full bg-[#25D366] text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
            aria-label="WhatsApp ile ara"
           >
            <SiWhatsapp className="size-4" />
           </a>
          </li>
          <li className="flex items-center justify-between gap-2 rounded-lg bg-gray-50/80 py-1.5 px-2.5">
           <a href={`tel:${TELEFON2.replace(/\s/g, "")}`} className="text-sm font-semibold text-foreground hover:text-emerald-600 transition-colors">
            {TELEFON2}
           </a>
           <a
            href={`https://wa.me/90${TELEFON2.replace(/\D/g, "").replace(/^0/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center justify-center size-8 rounded-full bg-[#25D366] text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
            aria-label="WhatsApp ile ara"
           >
            <SiWhatsapp className="size-4" />
           </a>
          </li>
         </ul>
        </div>
        <div className="border-t border-slate-100 pt-3">
         <p className="text-xs font-medium text-muted-foreground mb-2">Sosyal Medya</p>
         <div className="flex items-center gap-2">
          <a
           href={INSTAGRAM}
           target="_blank"
           rel="noopener noreferrer"
           className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-pink-100 to-purple-100 text-pink-600 shadow-sm transition-all hover:scale-105 hover:shadow-md"
           aria-label="Instagram"
          >
           <SiInstagram className="size-4" />
          </a>
          <a
           href={FACEBOOK}
           target="_blank"
           rel="noopener noreferrer"
           className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-100 to-blue-50 text-[#1877F2] shadow-sm transition-all hover:scale-105 hover:shadow-md"
           aria-label="Facebook"
          >
           <SiFacebook className="size-4" />
          </a>
         </div>
        </div>
       </div>
      </CardContent>
     </Card>
     <SaatlerCard acik={acik} />
    </div>

    <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-stretch lg:h-[520px]">
     <div className="flex flex-col h-full min-h-0">
      {gonderildi ? (
       <Card className="border-emerald-200 bg-emerald-50 h-full flex flex-col">
        <CardContent className="flex items-center gap-4 py-8 flex-1">
         <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100">
          <Mail className="size-6 text-emerald-600" />
         </div>
         <div>
          <p className="font-semibold text-emerald-800">Mesajınız alındı</p>
          <p className="text-sm text-emerald-700">En kısa sürede size dönüş yapacağız.</p>
         </div>
        </CardContent>
       </Card>
      ) : (
       <Card className="border-border/60 shadow-sm h-full flex flex-col overflow-hidden">
        <CardContent className="pt-6 pb-6 flex-1 flex flex-col min-h-0 overflow-auto">
         <div className="mb-4 shrink-0">
          <h2 className="text-2xl font-bold text-foreground">Mesaj Gönderin</h2>
          <p className="mt-1 text-sm text-muted-foreground">
           Formu doldurun, en kısa sürede size dönüş yapalım.
          </p>
         </div>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="grid gap-4 sm:grid-cols-2">
           <div className="space-y-2">
            <Label htmlFor="ad">Adınız ve soyadınız</Label>
            <Input id="ad" name="ad" value={formState.ad} onChange={handleChange} placeholder="Adınız ve soyadınız" required className="h-11" />
           </div>
           <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} placeholder="ornek@email.com" required className="h-11" />
           </div>
          </div>
          <div className="space-y-2">
           <Label htmlFor="konu">Konu</Label>
           <Input id="konu" name="konu" value={formState.konu} onChange={handleChange} placeholder="Mesajınızın konusu" className="h-11" />
          </div>
          <div className="space-y-2 flex-1 min-h-0 flex flex-col">
           <Label htmlFor="mesaj">Mesajınız</Label>
           <Textarea id="mesaj" name="mesaj" value={formState.mesaj} onChange={handleChange} placeholder="Mesajınızı buraya yazın..." rows={4} required className="resize-none min-h-[80px]" />
          </div>
          <Button type="submit" className="h-11 gap-2 cursor-pointer shrink-0" disabled={gonderiliyor}>
           <Send className="size-4" />
           {gonderiliyor ? "Gönderiliyor…" : "Gönder"}
          </Button>
         </form>
        </CardContent>
       </Card>
      )}
     </div>

     <div className="h-full min-h-[280px] sm:min-h-[360px] lg:min-h-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
       <Card className="overflow-hidden border-border/60 shadow-sm h-full flex flex-col min-h-0 gap-0 py-0">
        <CardContent className="p-0 flex-1 min-h-0 flex flex-col">
         <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative block w-full flex-1 min-h-0 min-w-0 overflow-hidden cursor-pointer group"
         >
          <Image
           src="/electronik-dunyasi.png"
           alt="Elektronik Dünyası dükkan fotoğrafı"
           fill
           sizes="(max-width: 640px) 100vw, 35vw"
           className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
           <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100" aria-label="Büyüt">
            <ZoomIn className="size-5" />
           </span>
          </div>
         </button>
        </CardContent>
       </Card>

       <Card className="overflow-hidden border-border/60 shadow-sm h-full flex flex-col min-h-0 gap-0 py-0">
        <CardContent className="p-0 flex-1 min-h-0 flex flex-col">
         <div className="relative w-full flex-1 min-h-[200px]">
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
    </div>
   </div>
  </div>
 );
}
