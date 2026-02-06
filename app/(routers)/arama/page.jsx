"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

export default function AramaPage() {
 const searchParams = useSearchParams();
 const q = searchParams.get("q") ?? "";
 const [results, setResults] = useState([]);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (!q.trim()) {
   setResults([]);
   return;
  }
  setLoading(true);
  fetch(`/api/products?q=${encodeURIComponent(q)}`)
   .then((r) => (r.ok ? r.json() : []))
   .then((list) => {
    setResults(Array.isArray(list) ? list.slice(0, 50) : []);
    setLoading(false);
   })
   .catch(() => {
    setResults([]);
    setLoading(false);
   });
 }, [q]);

 return (
  <div className="min-h-screen bg-gray-50">
   <div className="container px-4 py-8">
    <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
     Arama
    </h1>
    {q ? (
     <>
      {loading ? (
       <p className="mb-8 text-gray-600">Yükleniyor…</p>
      ) : (
       <p className="mb-8 text-gray-600">
        &quot;{q}&quot; için {results.length} ürün bulundu.
       </p>
      )}
      {!loading && results.length > 0 ? (
       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((product) => (
         <ProductCard key={product.id} product={product} />
        ))}
       </div>
      ) : !loading ? (
       <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
        <Search className="mb-4 size-12 text-gray-300" />
        <p className="text-gray-600">
         &quot;{q}&quot; ile eşleşen ürün bulunamadı.
        </p>
        <Button asChild className="mt-6">
         <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
       </div>
      ) : null}
     </>
    ) : (
     <p className="text-gray-600">Aramak için yukarıdaki kutuya yazın.</p>
    )}
   </div>
  </div>
 );
}
