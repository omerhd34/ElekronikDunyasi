import Link from "next/link";

const logoClassName =
 "border-b-2 border-white/30 pb-1 text-base tracking-[0.2em] text-white transition-all duration-200 group-hover:border-white group-hover:text-white md:text-xl md:tracking-[0.22em]";

export function SiteLogo() {
 return (
  <Link
   href="/"
   className="group relative inline-flex outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
   aria-label="ELEKTRONİK DÜNYASI"
  >
   <span className={logoClassName}>ELEKTRONİK DÜNYASI</span>
  </Link>
 );
}