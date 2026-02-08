"use client";

import { Shield, RotateCcw, Package } from "lucide-react";

const services = [
 { icon: Shield, label: "2 Yıl Garanti" },
 { icon: RotateCcw, label: "14 Gün İade" },
 { icon: Package, label: "Hızlı Teslimat" },
];

export default function ProductServices() {
 return (
  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
   {services.map(({ icon: Icon, label }) => (
    <div
     key={label}
     className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
    >
     <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
      <Icon className="size-5 text-emerald-600" />
     </div>
     <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
   ))}
  </div>
 );
}
