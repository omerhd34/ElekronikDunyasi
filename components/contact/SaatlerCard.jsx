import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CALISMA_SAATLERI, GUNLER } from "./constants";
import { getGunIndex } from "./utils";

export default function SaatlerCard({ acik }) {
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
     <p className="text-xs font-semibold text-amber-700/90 uppercase tracking-widest">
      Çalışma Saatleri
     </p>
     <p className="text-sm font-semibold text-foreground mt-1">
      {GUNLER[bugun]}: {acilis} – {kapanis}
      <span
       className={cn(
        "ml-1.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium",
        acik ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
       )}
      >
       {acik ? "Açık" : "Kapalı"}
      </span>
     </p>
     <ul className="mt-2 space-y-1 text-sm border-t border-amber-100 pt-2">
      {GUNLER.map((gunAdi, i) => (
       <li
        key={gunAdi}
        className="flex justify-between gap-3 text-muted-foreground"
       >
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
