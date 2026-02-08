"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GOOGLE_MAPS_EMBED } from "./constants";

export default function MapAndImageSection({ onImageClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      <Card className="overflow-hidden border-border/60 shadow-sm h-full flex flex-col min-h-0 gap-0 py-0">
        <CardContent className="p-0 flex-1 min-h-0 flex flex-col">
          <button
            type="button"
            onClick={onImageClick}
            className="relative block w-full flex-1 min-h-0 min-w-0 overflow-hidden cursor-pointer group"
          >
            <Image
              src="/electronik-dunyasi.png"
              alt="Elektronik Dünyası dükkan fotoğrafı"
              fill
              sizes="(max-width: 640px) 100vw, 35vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
              <span
                className="flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100"
                aria-label="Büyüt"
              >
                <ZoomIn className="size-5" />
              </span>
            </div>
          </button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border/60 shadow-sm h-full flex flex-col min-h-0 gap-0 py-0">
        <CardContent className="p-0 flex-1 min-h-0 flex flex-col">
          <div className="relative w-full flex-1 min-h-[200px]">
            <iframe
              src={GOOGLE_MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elektronik Dünyası konum haritası"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
