import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
 return (
  <div className="min-h-[60vh] bg-gray-50">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div className="flex flex-col items-center justify-center gap-4 py-16 sm:py-24">
     <Spinner className="size-10 text-slate-700" />
     <p className="text-sm font-medium text-gray-500 animate-pulse">Yükleniyor...</p>
    </div>

    <div className="space-y-8 max-w-4xl mx-auto opacity-60">
     <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full max-w-xl" />
     </div>
     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
       <Skeleton key={i} className="aspect-4/3 rounded-xl" />
      ))}
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
       <Skeleton key={i} className="aspect-3/4 rounded-xl" />
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}
