export default function CategoryBanner({ title, description }) {
 return (
  <div className="relative h-48 overflow-hidden bg-linear-to-r from-emerald-600 to-emerald-800 md:h-64">
   <div className="container relative z-10 flex h-full flex-col justify-center px-4">
    <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
     {title}
    </h1>
    {description && (
     <p className="mt-2 max-w-xl text-emerald-100 md:text-lg">
      {description}
     </p>
    )}
   </div>
  </div>
 );
}
