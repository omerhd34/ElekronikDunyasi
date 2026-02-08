import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { MAHALLE, CADDE, NO, ILCE, IL, POSTA_KODU } from "./constants";

const adresSatirlari = [
 { etiket: "Mahalle", deger: MAHALLE },
 { etiket: "Cadde", deger: CADDE },
 { etiket: "No", deger: NO },
 { etiket: "İlçe", deger: `${ILCE} / ${IL}` },
 { etiket: "Posta Kodu", deger: POSTA_KODU },
];

export default function AdresCard() {
 return (
  <Card className="border border-emerald-100/80 bg-white shadow-md shadow-gray-200/50 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/30 hover:-translate-y-0.5">
   <CardContent className="flex items-start gap-4 p-5 flex-1">
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-emerald-50 text-emerald-600 ring-2 ring-emerald-200/50">
     <MapPin className="size-5" />
    </div>
    <div className="min-w-0 flex-1 space-y-3">
     <p className="text-xs font-semibold text-emerald-700/90 uppercase tracking-widest">
      Adres
     </p>
     <dl className="space-y-2">
      {adresSatirlari.map(({ etiket, deger }) => (
       <div
        key={etiket}
        className="flex flex-col sm:flex-row sm:gap-2 sm:items-baseline"
       >
        <dt className="text-xs text-muted-foreground shrink-0 w-24">
         {etiket}:
        </dt>
        <dd className="text-sm font-medium text-foreground">
         {deger}
        </dd>
       </div>
      ))}
     </dl>
    </div>
   </CardContent>
  </Card>
 );
}
