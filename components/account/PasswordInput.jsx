"use client";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PasswordInput = ({ value, onChange, placeholder, name, id, required, minLength, className }) => {
 const [visible, setVisible] = useState(false);

 return (
  <div className="relative w-full">
   <Input
    id={id}
    name={name}
    type={visible ? "text" : "password"}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    minLength={minLength}
    className={cn("h-12 pr-12", className)}
   />
   <button
    type="button"
    onClick={() => setVisible((v) => !v)}
    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 transition-colors hover:text-gray-200 cursor-pointer"
    aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
   >
    {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
   </button>
  </div>)
}

export default PasswordInput