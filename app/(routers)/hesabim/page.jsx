"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import PasswordInput from "@/components/account/PasswordInput";
import Hero from "@/components/account/Hero";
import AuthForm from "@/components/account/AuthForm";
import ValidatePassword from "@/components/account/ValidatePassword";
import AccountDashboard from "@/components/account/AccountDashboard";

export default function HesabimPage() {
 const [customer, setCustomer] = useState(null);
 const [loading, setLoading] = useState(true);
 const [view, setView] = useState("signup");
 const isSignup = view === "signup";
 const toggleView = () => setView(isSignup ? "signin" : "signup");

 const [registerForm, setRegisterForm] = useState({
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
 });

 const [registerLoading, setRegisterLoading] = useState(false);
 const [registerError, setRegisterError] = useState("");

 const [loginForm, setLoginForm] = useState({ email: "", password: "" });
 const [loginLoading, setLoginLoading] = useState(false);
 const [loginError, setLoginError] = useState("");

 useEffect(() => {
  fetch("/api/auth/session")
   .then((res) => res.json())
   .then((data) => setCustomer(data.customer ?? null))
   .catch(() => setCustomer(null))
   .finally(() => setLoading(false));
 }, []);

 const handleRegister = async (e) => {
  e.preventDefault();
  setRegisterError("");
  if (registerForm.password !== registerForm.confirmPassword) {
   setRegisterError("Şifreler eşleşmiyor.");
   return;
  }
  const pwdCheck = ValidatePassword(registerForm.password);
  if (!pwdCheck.valid) {
   setRegisterError(pwdCheck.msg);
   return;
  }
  setRegisterLoading(true);
  try {
   const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     email: registerForm.email,
     password: registerForm.password,
     firstName: registerForm.firstName,
     lastName: registerForm.lastName,
    }),
   });
   const data = await res.json();
   if (res.ok) {
    setCustomer(data.customer);
    setRegisterForm({ email: "", password: "", confirmPassword: "", firstName: "", lastName: "" });
   } else {
    setRegisterError(data.error || "Kayıt oluşturulamadı.");
   }
  } catch {
   setRegisterError("Bir hata oluştu.");
  } finally {
   setRegisterLoading(false);
  }
 };

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError("");
  setLoginLoading(true);
  try {
   const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginForm),
   });
   const data = await res.json();
   if (res.ok) {
    setCustomer(data.customer);
    setLoginForm({ email: "", password: "" });
   } else {
    setLoginError(data.error || "Giriş yapılamadı.");
   }
  } catch {
   setLoginError("Bir hata oluştu.");
  } finally {
   setLoginLoading(false);
  }
 };

 const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  setCustomer(null);
 };

 if (loading) {
  return (
   <div className="flex min-h-[60vh] items-center justify-center bg-gray-950">
    <p className="text-gray-400">Yükleniyor…</p>
   </div>
  );
 }

 if (customer) {
  return (
   <AccountDashboard customer={customer} onLogout={handleLogout} />
  );
 }

 return (
  <div className="flex min-h-[70vh] items-center justify-center bg-gray-950 px-4 py-12">
   <div className="relative w-full max-w-[880px]">
    <div className="relative h-[500px] overflow-hidden rounded-2xl bg-[#141317] shadow-2xl md:h-[540px]">
     <div
      className={cn(
       "absolute inset-y-0 left-0 z-20 w-1/2 bg-linear-to-br from-purple-600 to-blue-500 transition-transform duration-650 ease-out",
       isSignup ? "translate-x-0" : "translate-x-full"
      )}
     />

     {/* Hero: Kayıt görünümünde sol, "Hey There!" */}
     <Hero
      type="signup"
      active={isSignup}
      title="Merhaba!"
      text="Yolculuğunuza buradan başlayın ve hemen keşfetmeye başlayın."
      buttonText="GİRİŞ YAP"
      onClick={toggleView}
     />

     {/* Hero: Giriş görünümünde sağ, "Welcome Back!" */}
     <Hero
      type="signin"
      active={!isSignup}
      title="Tekrar Hoş Geldiniz!"
      text="Son alışverişlerinizi takip etmek için giriş yapın."
      buttonText="KAYIT OL"
      onClick={toggleView}
     />

     {/* Form: Kayıt */}
     <AuthForm type="signup" active={isSignup} title="Hesap Oluştur">
      <form onSubmit={handleRegister} className="flex w-full flex-col items-center gap-3">
       {registerError && (
        <p className="w-full rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-400">{registerError}</p>
       )}
       <Input
        name="firstName"
        value={registerForm.firstName}
        onChange={(e) => setRegisterForm((p) => ({ ...p, firstName: e.target.value }))}
        placeholder="Ad"
        required
        className="h-12 w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
       />
       <Input
        name="lastName"
        value={registerForm.lastName}
        onChange={(e) => setRegisterForm((p) => ({ ...p, lastName: e.target.value }))}
        placeholder="Soyad"
        required
        className="h-12 w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
       />
       <Input
        name="email"
        type="email"
        value={registerForm.email}
        onChange={(e) => setRegisterForm((p) => ({ ...p, email: e.target.value }))}
        placeholder="E-posta"
        required
        className="h-12 w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
       />
       <div className="w-full space-y-1">
        <PasswordInput
         name="password"
         id="register-password"
         value={registerForm.password}
         onChange={(e) => setRegisterForm((p) => ({ ...p, password: e.target.value }))}
         placeholder="Şifre"
         required
         minLength={10}
         className="w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
        />
        {registerForm.password && !ValidatePassword(registerForm.password).valid && (
         <p className="text-xs text-red-400">{ValidatePassword(registerForm.password).msg}</p>
        )}
       </div>
       <PasswordInput
        name="confirmPassword"
        id="register-confirmPassword"
        value={registerForm.confirmPassword}
        onChange={(e) => setRegisterForm((p) => ({ ...p, confirmPassword: e.target.value }))}
        placeholder="Şifre Tekrar"
        required
        minLength={10}
        className="w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
       />
       <Button
        type="submit"
        disabled={registerLoading}
        className="mt-2 h-12 w-full rounded-full bg-linear-to-r from-purple-600 to-blue-500 font-medium uppercase tracking-wider text-white hover:from-purple-500 hover:to-blue-400 disabled:opacity-70"
       >
        {registerLoading ? "Kayıt oluşturuluyor…" : "KAYIT OL"}
       </Button>
      </form>
     </AuthForm>

     {/* Form: Giriş */}
     <AuthForm type="signin" active={!isSignup} title="Giriş Yap">
      <form onSubmit={handleLogin} className="flex w-full flex-col items-center gap-3">
       {loginError && (
        <p className="w-full rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-400">{loginError}</p>
       )}
       <Input
        name="email"
        type="email"
        value={loginForm.email}
        onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
        placeholder="E-posta / Kullanıcı Adı"
        required
        className="h-12 w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
       />
       <PasswordInput
        name="password"
        id="login-password"
        value={loginForm.password}
        onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
        placeholder="Şifre"
        required
        className="w-full rounded-xl border-0 bg-[#1f1b2b] px-4 py-3.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500"
       />
       <a
        href="#"
        className="self-end text-xs text-gray-400 hover:text-gray-300"
        onClick={(e) => e.preventDefault()}
       >
        Şifremi unuttum?
       </a>
       <Button
        type="submit"
        disabled={loginLoading}
        className="mt-2 h-12 w-40 rounded-full bg-linear-to-r from-purple-600 to-blue-500 font-medium uppercase tracking-wider text-white hover:from-purple-500 hover:to-blue-400 disabled:opacity-70"
       >
        {loginLoading ? "Giriş yapılıyor…" : "GİRİŞ YAP"}
       </Button>
      </form>
     </AuthForm>
    </div>
   </div>
  </div>
 );
}