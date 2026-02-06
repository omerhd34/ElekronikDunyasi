"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteLogo() {
 const pathname = usePathname();

 const handleClick = (e) => {
  if (pathname === "/") {
   e.preventDefault();
   window.scrollTo({ top: 0, behavior: "smooth" });
  }
 };

 return (
  <Link
   href="/"
   onClick={handleClick}
   className="group relative inline-flex items-center gap-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:gap-4"
   aria-label="ELEKTRONİK DÜNYASI"
  >
   <span className="relative flex h-9 w-9 shrink-0 items-center justify-center md:h-10 md:w-10 lg:h-12 lg:w-12">
    <svg
     viewBox="0 0 40 40"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     className="h-full w-full transition-transform duration-300 group-hover:scale-105"
     aria-hidden
    >
     <rect
      x="4"
      y="4"
      width="32"
      height="32"
      rx="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.4"
      fill="none"
      className="text-white transition-opacity group-hover:stroke-opacity-70"
     />
     <path
      d="M12 12h16M12 20h12M12 28h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.9"
      className="text-white"
     />
     <circle cx="28" cy="28" r="3" fill="currentColor" className="text-amber-400" />
    </svg>
   </span>
   <span className="flex flex-col">
    <span className="font-semibold tracking-[0.18em] text-white transition-colors group-hover:text-white md:tracking-[0.2em] lg:text-lg lg:tracking-[0.22em]">
     ELEKTRONİK
    </span>
    <span className="-mt-0.5 text-xs font-medium tracking-[0.35em] text-white/80 transition-colors group-hover:text-white/95 md:text-sm md:tracking-[0.4em] lg:text-base lg:tracking-[0.45em]">
     DÜNYASI
    </span>
   </span>
  </Link>
 );
}