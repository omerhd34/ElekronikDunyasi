"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProductSearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder ?? "Ürün adı, kategori veya marka ile ara..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border-input/80 bg-muted/30 pl-10 focus:bg-background"
      />
    </div>
  );
}
