
const AuthForm = ({ type, active, title, children }) => {
 const isSignup = type === "signup";
 return (
  <div
   className={cn(
    "absolute inset-y-0 z-10 flex w-1/2 flex-col justify-center gap-4 bg-[#141317] p-8 transition-transform duration-650 ease-out",
    isSignup ? "left-1/2" : "left-0",
    active ? "translate-x-0" : isSignup ? "translate-x-full" : "-translate-x-full"
   )}
  >
   <h2 className="m-0 text-2xl font-medium text-white md:text-3xl">{title}</h2>
   {children}
  </div>
 )
}

export default AuthForm