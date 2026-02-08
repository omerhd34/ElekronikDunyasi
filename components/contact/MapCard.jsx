"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GOOGLE_MAPS_EMBED } from "./constants";

export default function MapCard() {
 return (
  <Card className="overflow-hidden border-border/60 shadow-sm h-full flex flex-col min-h-0">
   <CardContent className="p-0 flex-1 min-h-0 flex flex-col">
    <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[360px]">
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
 );
}
