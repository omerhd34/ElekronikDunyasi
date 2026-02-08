import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
 return (
  <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 shadow-sm">
   <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
    <ShoppingCart className="size-12 text-gray-300" />
   </div>
   <h2 className="mb-2 text-xl font-semibold text-gray-800">
    Sepetiniz boş
   </h2>
   <p className="mb-8 max-w-sm text-center text-gray-500">
    Ürün kartlarındaki sepet ikonuna tıklayarak ürünleri sepete ekleyebilirsiniz.
   </p>
   <Button asChild className="gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700">
    <Link href="/">
     Alışverişe Başla
     <ArrowRight className="size-4" />
    </Link>
   </Button>
  </div>
 );
}