"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Lock, Mail, ArrowRight, Shield } from "lucide-react";

export default function AdminGirisPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
   await new Promise((r) => setTimeout(r, 800));
   if (!email.trim() || !password) {
    setError("E-posta ve şifre girin.");
    return;
   }
  } catch {
   setError("Giriş yapılamadı. Lütfen tekrar deneyin.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <Card className="overflow-hidden border-0 shadow-2xl shadow-black/10 dark:shadow-none dark:border dark:border-border">
   <CardHeader className="space-y-3 pb-4 pt-8 text-center">
    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
     <Shield className="size-7 text-primary" />
    </div>
    <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
     Admin Girişi
    </CardTitle>
    <CardDescription className="text-base">
     Elektronik Dünyası yönetim paneline erişmek için giriş yapın.
    </CardDescription>
   </CardHeader>
   <form onSubmit={handleSubmit}>
    <CardContent className="space-y-5 px-6">
     {error && (
      <div
       role="alert"
       className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      >
       {error}
      </div>
     )}
     <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium">
       E-posta
      </Label>
      <div className="relative">
       <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
       <Input
        id="email"
        type="email"
        placeholder="admin@ornek.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 pl-10"
        autoComplete="email"
       />
      </div>
     </div>
     <div className="space-y-2">
      <Label htmlFor="password" className="text-sm font-medium">
       Şifre
      </Label>
      <div className="relative">
       <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
       <Input
        id="password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-11 pl-10"
        autoComplete="current-password"
       />
      </div>
     </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-5 border-t bg-muted/30 px-6 py-6">
     <Button
      type="submit"
      className="h-11 w-full text-base font-medium"
      size="lg"
      disabled={loading}
     >
      {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
      <ArrowRight className="ml-2 size-4" />
     </Button>
     <p className="text-center text-sm text-muted-foreground">
      <Link
       href="/"
       className="font-medium underline underline-offset-4 hover:text-foreground"
      >
       ← Siteye dön
      </Link>
     </p>
    </CardFooter>
   </form>
  </Card>
 );
}
