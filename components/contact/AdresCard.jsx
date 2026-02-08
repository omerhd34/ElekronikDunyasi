import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { ADRES } from "./constants";

export default function AdresCard() {
  return (
    <Card className="border border-emerald-100/80 bg-white shadow-md shadow-gray-200/50 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/30 hover:-translate-y-0.5">
      <CardContent className="flex items-start gap-3 py-4 px-4 flex-1">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-emerald-50 text-emerald-600 ring-2 ring-emerald-200/50">
          <MapPin className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700/90 uppercase tracking-widest">
            Adres
          </p>
          <p className="text-sm font-medium text-foreground leading-snug mt-1">
            {ADRES}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
