"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    ad: "",
    email: "",
    konu: "",
    mesaj: "",
  });
  const [gonderildi, setGonderildi] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGonderiliyor(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.ad,
          email: formState.email,
          subject: formState.konu,
          body: formState.mesaj,
        }),
      });
      if (res.ok) {
        setGonderildi(true);
        setFormState({ ad: "", email: "", konu: "", mesaj: "" });
        setTimeout(() => setGonderildi(false), 3000);
      }
    } catch {
      /* ignore */
    } finally {
      setGonderiliyor(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  if (gonderildi) {
    return (
      <Card className="border-emerald-200 bg-emerald-50 h-full flex flex-col">
        <CardContent className="flex items-center gap-4 py-8 flex-1">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="size-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-emerald-800">Mesajınız alındı</p>
            <p className="text-sm text-emerald-700">
              En kısa sürede size dönüş yapacağız.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 shadow-sm h-full flex flex-col overflow-hidden">
      <CardContent className="pt-6 pb-6 flex-1 flex flex-col min-h-0 overflow-auto">
        <div className="mb-4 shrink-0">
          <h2 className="text-2xl font-bold text-foreground">
            Mesaj Gönderin
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Formu doldurun, en kısa sürede size dönüş yapalım.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 flex-1 min-h-0"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ad">Adınız ve soyadınız</Label>
              <Input
                id="ad"
                name="ad"
                value={formState.ad}
                onChange={handleChange}
                placeholder="Adınız ve soyadınız"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="ornek@email.com"
                required
                className="h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="konu">Konu</Label>
            <Input
              id="konu"
              name="konu"
              value={formState.konu}
              onChange={handleChange}
              placeholder="Mesajınızın konusu"
              className="h-11"
            />
          </div>
          <div className="space-y-2 flex-1 min-h-0 flex flex-col">
            <Label htmlFor="mesaj">Mesajınız</Label>
            <Textarea
              id="mesaj"
              name="mesaj"
              value={formState.mesaj}
              onChange={handleChange}
              placeholder="Mesajınızı buraya yazın..."
              rows={4}
              required
              className="resize-none min-h-[80px]"
            />
          </div>
          <Button
            type="submit"
            className="h-11 gap-2 cursor-pointer shrink-0"
            disabled={gonderiliyor}
          >
            <Send className="size-4" />
            {gonderiliyor ? "Gönderiliyor…" : "Gönder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
