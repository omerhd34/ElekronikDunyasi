import { cn } from "@/lib/utils";

const Hero = ({ type, active, title, text, buttonText, onClick }) => {
 const isSignup = type === "signup";
 return (
  <div
   className={cn(
    "absolute top-0 z-30 flex h-full w-1/2 flex-col items-center justify-center gap-4 px-6 text-[#f9f9f9] transition-transform duration-650 ease-out",
    isSignup ? "left-0" : "left-1/2",
    active ? "translate-x-0" : isSignup ? "-translate-x-full" : "translate-x-full"
   )}
  >
   <h2 className="m-0 text-center text-3xl font-medium md:text-4xl">{title}</h2>
   <p className="max-w-[200px] text-center text-base opacity-90 md:text-lg">{text}</p>
   <button
    type="button"
    onClick={onClick}
    className="rounded-full border-2 border-white bg-white/10 px-8 py-3.5 font-medium uppercase cursor-pointer tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
   >
    {buttonText}
   </button>
  </div>
 )
}

export default Hero
