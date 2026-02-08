"use client";

export default function ProductDescription({ description }) {
 if (!description) return null;

 return (
  <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
   <h3 className="mb-4 text-base font-semibold text-gray-900">
    Ürün Açıklaması
   </h3>
   <p className="leading-relaxed text-gray-600">{description}</p>
  </div>
 );
}
