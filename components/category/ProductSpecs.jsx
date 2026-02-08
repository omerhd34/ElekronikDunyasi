"use client";

import { Check } from "lucide-react";

export default function ProductSpecs({ specifications, specs }) {
 const hasSpecs =
  (specifications?.length ?? 0) > 0 || (specs?.length ?? 0) > 0;
 if (!hasSpecs) return null;

 return (
  <section
   className="mt-12 rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50 ring-1 ring-gray-100"
   aria-labelledby="specs-heading"
  >
   <div className="border-b border-gray-100 px-6 py-5">
    <h2 id="specs-heading" className="text-lg font-bold text-gray-900">
     Teknik Özellikler
    </h2>
   </div>
   <div className="p-6">
    {specifications?.length > 0 ? (
     <div className="space-y-8">
      {specifications.map((group, gi) => (
       <div key={gi}>
        {group.category && (
         <h4 className="mb-3 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
          {group.category}
         </h4>
        )}
        <dl className="divide-y divide-gray-100 rounded-lg border border-gray-100">
         {(group.items ?? []).map((item, ii) => (
          <div
           key={ii}
           className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3 sm:gap-4"
          >
           <dt className="text-sm text-gray-500">{item.key}</dt>
           <dd className="text-sm font-medium text-gray-900 sm:col-span-2">
            {item.value}
           </dd>
          </div>
         ))}
        </dl>
       </div>
      ))}
     </div>
    ) : (
     <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {(specs ?? []).map((spec, i) => (
       <li
        key={i}
        className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-gray-700"
       >
        <Check className="size-4 shrink-0 text-emerald-500" />
        {spec}
       </li>
      ))}
     </ul>
    )}
   </div>
  </section>
 );
}
