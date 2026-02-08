"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
const ImageLightbox = ({ open, onClose }) => {
 useEffect(() => {
  if (!open) return;
  const handler = (e) => e.key === "Escape" && onClose();
  document.addEventListener("keydown", handler);
  document.body.style.overflow = "hidden";
  return () => {
   document.removeEventListener("keydown", handler);
   document.body.style.overflow = "";
  };
 }, [open, onClose]);

 if (!open) return null;

 return (
  <div
   className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
   onClick={onClose}
  >
   <button
    type="button"
    onClick={onClose}
    className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
    aria-label="Kapat"
   >
    <X className="size-5" />
   </button>
   <div
    className="relative max-h-[85vh] max-w-4xl w-full overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
    onClick={(e) => e.stopPropagation()}
   >
    <Image
     src="/electronik-dunyasi.png"
     alt="Elektronik Dünyası dükkan fotoğrafı"
     width={1200}
     height={800}
     className="h-full w-full object-contain"
     priority
    />
   </div>
  </div>

 )
}

export default ImageLightbox