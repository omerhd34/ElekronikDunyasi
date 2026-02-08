import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiFacebook } from "react-icons/si";
import { TELEFON1, TELEFON2, INSTAGRAM, FACEBOOK } from "./constants";

export default function IletisimCard() {
  return (
    <Card className="border border-slate-100 bg-white shadow-md shadow-gray-200/50 rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-0.5">
      <CardContent className="flex flex-col gap-3 py-4 px-4 flex-1">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 ring-2 ring-blue-200/50">
            <Phone className="size-5" />
          </div>
          <p className="text-xs font-semibold text-blue-700/90 uppercase tracking-widest">
            İletişim
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              Telefon
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-center justify-between gap-2 rounded-lg bg-gray-50/80 py-1.5 px-2.5">
                <a
                  href={`tel:${TELEFON1.replace(/\s/g, "")}`}
                  className="text-sm font-semibold text-foreground hover:text-emerald-600 transition-colors"
                >
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
                <a
                  href={`tel:${TELEFON2.replace(/\s/g, "")}`}
                  className="text-sm font-semibold text-foreground hover:text-emerald-600 transition-colors"
                >
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
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Sosyal Medya
            </p>
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
  );
}
