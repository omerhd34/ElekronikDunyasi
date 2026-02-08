import Link from "next/link";

export default function BrandBanner({ brandName }) {
 return (
  <div className="relative h-48 overflow-hidden bg-linear-to-r from-emerald-600 to-emerald-800 md:h-64">
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
   <div className="container relative z-10 flex h-full flex-col justify-center px-4">
    <Link
     href="/"
     className="mb-2 text-sm text-emerald-200 hover:text-white"
    >
     ← Ana Sayfa
    </Link>
    <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
     {brandName}
    </h1>
    <p className="mt-2 max-w-xl text-emerald-100 md:text-lg">
     {brandName} markasına ait tüm ürünler
    </p>
   </div>
  </div>
 );
}