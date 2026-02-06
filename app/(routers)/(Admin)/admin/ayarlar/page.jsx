"use client";

import { useState, useEffect } from "react";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
} from "@/components/ui/dialog";
import { Truck, Loader2, HelpCircle, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

const FAQ_CATEGORIES = [
 { value: "genel", label: "Genel" },
 { value: "basvuru", label: "Başvuru" },
 { value: "odemeler", label: "Ödemeler" },
 { value: "faturalandirma", label: "Faturalandırma" },
];

function parseFaqsFromSettings(settings) {
 if (!settings || typeof settings.faqs !== "string") return [];
 try {
  const arr = JSON.parse(settings.faqs);
  return Array.isArray(arr) ? arr : [];
 } catch {
  return [];
 }
}

export default function AyarlarPage() {
 const [shippingCost, setShippingCost] = useState("");
 const [faqs, setFaqs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [savingFaqs, setSavingFaqs] = useState(false);
 const [message, setMessage] = useState({ type: "", text: "" });
 const [faqMessage, setFaqMessage] = useState({ type: "", text: "" });
 const [editIndex, setEditIndex] = useState(null);
 const [dialogOpen, setDialogOpen] = useState(false);
 const [formFaq, setFormFaq] = useState({ id: "", category: "genel", question: "", answer: "" });
 const [showFaqList, setShowFaqList] = useState(false);

 useEffect(() => {
  let cancelled = false;
  fetch("/api/admin/settings")
   .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Yetkisiz"))))
   .then((data) => {
    if (!cancelled) {
     setShippingCost(String(data.shipping_cost ?? "140"));
     setFaqs(parseFaqsFromSettings(data));
    }
   })
   .catch(() => {
    if (!cancelled) setShippingCost("140");
   })
   .finally(() => {
    if (!cancelled) setLoading(false);
   });
  return () => { cancelled = true; };
 }, []);

 const handleShippingSubmit = (e) => {
  e.preventDefault();
  const num = Number(shippingCost);
  if (Number.isNaN(num) || num < 0) {
   setMessage({ type: "error", text: "Geçerli bir tutar girin (0 veya pozitif sayı)." });
   return;
  }
  setSaving(true);
  setMessage({ type: "", text: "" });
  fetch("/api/admin/settings", {
   method: "PATCH",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ shipping_cost: Math.round(num) }),
  })
   .then((r) => {
    if (!r.ok) return r.json().then((err) => Promise.reject(err));
    return r.json();
   })
   .then((data) => {
    setShippingCost(String(data.shipping_cost ?? shippingCost));
    setMessage({ type: "success", text: "Kargo ücreti kaydedildi." });
   })
   .catch((err) => {
    setMessage({ type: "error", text: err?.message || "Kaydedilirken bir hata oluştu." });
   })
   .finally(() => setSaving(false));
 };

 const openAddFaq = () => {
  setEditIndex(null);
  setFormFaq({ id: "", category: "genel", question: "", answer: "" });
  setDialogOpen(true);
 };

 const openEditFaq = (index) => {
  const faq = faqs[index];
  setEditIndex(index);
  setFormFaq({
   id: faq.id || "",
   category: faq.category || "genel",
   question: faq.question || "",
   answer: faq.answer || "",
  });
  setDialogOpen(true);
 };

 const removeFaq = (index) => {
  setFaqs((prev) => prev.filter((_, i) => i !== index));
  setFaqMessage({ type: "success", text: "Listeden kaldırıldı. Değişiklikleri kaydetmek için 'SSS listesini kaydet' butonuna tıklayın." });
 };

 const saveFaqFromDialog = () => {
  const q = (formFaq.question || "").trim();
  if (!q) {
   setFaqMessage({ type: "error", text: "Soru metni girin." });
   return;
  }
  const item = {
   id: formFaq.id || `item-${Date.now()}`,
   category: formFaq.category || "genel",
   question: q,
   answer: (formFaq.answer || "").trim(),
  };
  if (editIndex !== null) {
   setFaqs((prev) => prev.map((f, i) => (i === editIndex ? item : f)));
  } else {
   setFaqs((prev) => [...prev, item]);
  }
  setDialogOpen(false);
  setFaqMessage({ type: "success", text: "Listeye eklendi/güncellendi. Kalıcı olması için 'SSS listesini kaydet' butonuna tıklayın." });
 };

 const handleSaveFaqs = () => {
  setSavingFaqs(true);
  setFaqMessage({ type: "", text: "" });
  fetch("/api/admin/settings", {
   method: "PATCH",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ faqs }),
  })
   .then((r) => {
    if (!r.ok) return r.json().then((err) => Promise.reject(err));
    return r.json();
   })
   .then(() => {
    setFaqMessage({ type: "success", text: "SSS listesi kaydedildi." });
   })
   .catch((err) => {
    setFaqMessage({ type: "error", text: err?.message || "Kaydedilirken bir hata oluştu." });
   })
   .finally(() => setSavingFaqs(false));
 };

 if (loading) {
  return (
   <div className="flex items-center justify-center py-12">
    <Loader2 className="size-8 animate-spin text-muted-foreground" />
   </div>
  );
 }

 return (
  <div className="space-y-8">
   <div className="space-y-1">
    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Ayarlar</h1>
    <p className="text-base text-muted-foreground md:text-lg">
     Site ve sipariş ayarlarını buradan yönetebilirsiniz.
    </p>
   </div>

   <Card className="max-w-xl">
    <CardHeader>
     <CardTitle className="flex items-center gap-2">
      <Truck className="size-5 text-emerald-600" />
      Kargo Ücreti
     </CardTitle>
     <CardDescription>
      Sepet sayfasında gösterilen sabit kargo ücretini (₺) girin.
     </CardDescription>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleShippingSubmit} className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
       <Input
        type="number"
        min={0}
        step={1}
        value={shippingCost}
        onChange={(e) => setShippingCost(e.target.value)}
        placeholder="140"
        className="max-w-[180px]"
        disabled={saving}
       />
       <span className="text-sm text-muted-foreground">₺</span>
       <Button type="submit" disabled={saving} className="sm:shrink-0">
        {saving ? (
         <>
          <Loader2 className="size-4 animate-spin" />
          Kaydediliyor…
         </>
        ) : (
         "Kaydet"
        )}
       </Button>
      </div>
      {message.text && (
       <p
        className={
         message.type === "error"
          ? "text-sm text-red-600 dark:text-red-400"
          : "text-sm text-emerald-600 dark:text-emerald-400"
        }
       >
        {message.text}
       </p>
      )}
     </form>
    </CardContent>
   </Card>

   <Card>
    <CardHeader>
     <CardTitle className="flex items-center gap-2">
      <HelpCircle className="size-5 text-emerald-600" />
      Sıkça Sorulan Sorular
     </CardTitle>
     <CardDescription>
      Ana sayfa ve SSS sayfasında gösterilen sorular. Ekleyebilir, düzenleyebilir veya silebilirsiniz.
     </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
     <div className="flex flex-wrap gap-2">
      <Button
       type="button"
       variant="outline"
       onClick={() => setShowFaqList((v) => !v)}
       className="gap-2"
      >
       {showFaqList ? (
        <>
         <EyeOff className="size-4" />
         Soruları gizle
        </>
       ) : (
        <>
         <Eye className="size-4" />
         Soruları gör
        </>
       )}
      </Button>
      <Button type="button" variant="outline" onClick={openAddFaq} className="gap-2">
       <Plus className="size-4" />
       Yeni soru ekle
      </Button>
      <Button
       type="button"
       disabled={savingFaqs || faqs.length === 0}
       onClick={handleSaveFaqs}
       className="gap-2"
      >
       {savingFaqs ? (
        <>
         <Loader2 className="size-4 animate-spin" />
         Kaydediliyor…
        </>
       ) : (
        "SSS listesini kaydet"
       )}
      </Button>
     </div>
     {faqMessage.text && (
      <p
       className={
        faqMessage.type === "error"
         ? "text-sm text-red-600 dark:text-red-400"
         : "text-sm text-emerald-600 dark:text-emerald-400"
       }
      >
       {faqMessage.text}
      </p>
     )}
     {showFaqList && (
      <ul className="space-y-2">
       {faqs.length === 0 ? (
        <li className="rounded-lg border border-dashed bg-muted/30 py-6 text-center text-sm text-muted-foreground">
         Henüz soru yok. &quot;Yeni soru ekle&quot; ile ekleyin.
        </li>
       ) : (
        faqs.map((faq, index) => (
         <li
          key={faq.id || index}
          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2 text-sm"
         >
          <div className="min-w-0 flex-1">
           <span className="font-medium text-foreground line-clamp-1">{faq.question}</span>
           <span className="ml-2 text-xs text-muted-foreground">
            {FAQ_CATEGORIES.find((c) => c.value === faq.category)?.label ?? faq.category}
           </span>
          </div>
          <div className="flex shrink-0 gap-1">
           <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => openEditFaq(index)}
            aria-label="Düzenle"
           >
            <Pencil className="size-4" />
           </Button>
           <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-destructive hover:text-destructive"
            onClick={() => removeFaq(index)}
            aria-label="Sil"
           >
            <Trash2 className="size-4" />
           </Button>
          </div>
         </li>
        ))
       )}
      </ul>
     )}
    </CardContent>
   </Card>

   <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogContent className="max-w-lg">
     <DialogHeader>
      <DialogTitle>{editIndex !== null ? "Soruyu düzenle" : "Yeni soru ekle"}</DialogTitle>
     </DialogHeader>
     <div className="grid gap-4 py-2">
      <div className="space-y-2">
       <label className="text-sm font-medium">Kategori</label>
       <Select
        value={formFaq.category}
        onValueChange={(v) => setFormFaq((p) => ({ ...p, category: v }))}
       >
        <SelectTrigger className="w-full">
         <SelectValue />
        </SelectTrigger>
        <SelectContent>
         {FAQ_CATEGORIES.map((c) => (
          <SelectItem key={c.value} value={c.value}>
           {c.label}
          </SelectItem>
         ))}
        </SelectContent>
       </Select>
      </div>
      <div className="space-y-2">
       <label className="text-sm font-medium">Soru</label>
       <Input
        value={formFaq.question}
        onChange={(e) => setFormFaq((p) => ({ ...p, question: e.target.value }))}
        placeholder="Örn: Kargo süresi ne kadar?"
       />
      </div>
      <div className="space-y-2">
       <label className="text-sm font-medium">Cevap</label>
       <Textarea
        value={formFaq.answer}
        onChange={(e) => setFormFaq((p) => ({ ...p, answer: e.target.value }))}
        placeholder="Cevap metni..."
        rows={4}
        className="resize-y"
       />
      </div>
     </div>
     <DialogFooter>
      <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
       İptal
      </Button>
      <Button type="button" onClick={saveFaqFromDialog}>
       {editIndex !== null ? "Güncelle" : "Ekle"}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </div>
 );
}
