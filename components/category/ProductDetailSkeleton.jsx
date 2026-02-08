"use client";

export default function ProductDetailSkeleton() {
 return (
  <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
   <div className="container px-4 py-10">
    <div className="mb-8 flex items-center gap-2">
     <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
     <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
     <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
     <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
     <div className="h-4 w-40 animate-pulse rounded-md bg-gray-200" />
    </div>
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-14">
     <div className="lg:col-span-2">
      <div className="aspect-square animate-pulse rounded-2xl bg-gray-200/80" />
     </div>
     <div className="space-y-5 lg:col-span-3">
      <div className="h-9 w-4/5 animate-pulse rounded-lg bg-gray-200/80" />
      <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200/60" />
      <div className="h-6 w-48 animate-pulse rounded-md bg-gray-200/60" />
      <div className="h-16 w-64 animate-pulse rounded-2xl bg-gray-200/80" />
      <div className="flex gap-3 pt-2">
       <div className="h-12 w-44 animate-pulse rounded-xl bg-gray-200/80" />
       <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200/80" />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
