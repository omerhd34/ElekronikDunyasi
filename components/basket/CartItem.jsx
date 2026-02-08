import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/product-utils";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
 const { product, productId, quantity } = item;

 return (
  <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
   {/* Resim Alanı */}
   <Link
    href={`/kategori/${product.category}/${product.slug}`}
    className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-20 sm:w-20"
   >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
     src={product.image}
     alt={product.name}
     className="h-full w-full object-cover"
    />
   </Link>

   {/* İsim ve Birim Fiyat */}
   <div className="min-w-0 flex-1">
    <Link
     href={`/kategori/${product.category}/${product.slug}`}
     className="font-medium text-gray-800 hover:text-emerald-600 line-clamp-2"
    >
     {product.name}
    </Link>
    <p className="mt-1 text-lg font-bold text-emerald-600">
     {formatPrice(product.price)}
    </p>
   </div>

   {/* Miktar ve Kontroller */}
   <div className="flex items-center gap-2 sm:gap-4">
    <div className="flex items-center rounded-full border border-gray-200 bg-gray-50">
     <button
      type="button"
      onClick={() => onUpdateQuantity(productId, quantity - 1)}
      className="flex size-9 cursor-pointer items-center justify-center rounded-l-full text-gray-600 hover:bg-gray-100"
      aria-label="Azalt"
     >
      <Minus className="size-4" />
     </button>
     <span className="min-w-8 text-center text-sm font-medium tabular-nums">
      {quantity}
     </span>
     <button
      type="button"
      onClick={() => onUpdateQuantity(productId, quantity + 1)}
      className="flex size-9 cursor-pointer items-center justify-center rounded-r-full text-gray-600 hover:bg-gray-100"
      aria-label="Artır"
     >
      <Plus className="size-4" />
     </button>
    </div>

    {/* Toplam Fiyat */}
    <span className="w-20 text-right text-sm font-semibold text-gray-800">
     {formatPrice(product.price * quantity)}
    </span>

    {/* Sil Butonu */}
    <button
     type="button"
     onClick={() => onRemove(productId)}
     className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 cursor-pointer"
     aria-label="Ürünü kaldır"
    >
     <Trash2 className="size-5" />
    </button>
   </div>
  </div>
 );
}