import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/product-utils";

export default function OrderSummary({ totalCount, totalPrice, shippingCost }) {
 const grandTotal = totalPrice + shippingCost;

 return (
  <div className="w-full shrink-0 lg:w-80">
   <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-lg font-semibold text-gray-800">Sipariş Özeti</h2>
    <div className="space-y-2 text-sm">
     <div className="flex justify-between text-gray-600">
      <span>Ara Toplam ({totalCount} ürün)</span>
      <span className="font-medium text-gray-800">{formatPrice(totalPrice)}</span>
     </div>
     <div className="flex justify-between text-gray-600">
      <span>Kargo Ücreti</span>
      <span className="font-medium text-gray-800">{formatPrice(shippingCost)}</span>
     </div>
    </div>
    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
     <span className="font-semibold text-gray-800">Toplam</span>
     <span className="text-xl font-bold text-emerald-600">{formatPrice(grandTotal)}</span>
    </div>
    <Button
     asChild
     className="mt-6 w-full gap-2 rounded-full bg-emerald-600 py-6 text-base hover:bg-emerald-700"
    >
     <Link href="#">
      Ödemeye Geç
      <ArrowRight className="size-4" />
     </Link>
    </Button>
   </div>
  </div>
 );
}