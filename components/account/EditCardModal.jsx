"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import isExpiryValid from "./isExpiryValid";

const EditCardModal = ({ card, open, onClose, onSuccess }) => {
 const [form, setForm] = useState({ title: "", cardHolder: "", expiryMonth: "", expiryYear: "", isDefault: false });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 useEffect(() => {
  if (card) setForm({ title: card.title, cardHolder: card.cardHolder, expiryMonth: String(card.expiryMonth ?? "").padStart(2, "0"), expiryYear: card.expiryYear ?? "", isDefault: !!card.isDefault });
 }, [card]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (!isExpiryValid(form.expiryMonth, form.expiryYear)) {
   setError("Son kullanma tarihi bu yıldan ileri bir tarih olmalıdır.");
   return;
  }
  setLoading(true);
  try {
   const res = await fetch(`/api/auth/cards/${card?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: form.title, cardHolder: form.cardHolder, expiryMonth: form.expiryMonth, expiryYear: form.expiryYear, isDefault: form.isDefault }),
   });
   let data;
   try { data = await res.json(); } catch { setError("Sunucu yanıtı okunamadı."); return; }
   if (res.ok) {
    onSuccess();
   } else setError(data.error || "Kart güncellenemedi.");
  } catch (err) {
   setError(err?.message || "Bir hata oluştu.");
  } finally {
   setLoading(false);
  }
 };
 return (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
   <DialogContent className="sm:max-w-lg">
    <DialogHeader>
     <DialogTitle>Kartı Düzenle</DialogTitle>
    </DialogHeader>
    {card && (
     <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
       <Label>Kart Numarası</Label>
       <Input value={`•••• ${card.last4}`} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
      </div>
      <div className="space-y-2">
       <Label>Kart Başlığı *</Label>
       <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ana Kart, İş Kartı, vb." required />
      </div>
      <div className="space-y-2">
       <Label>Kart Sahibi *</Label>
       <Input value={form.cardHolder} onChange={(e) => setForm((p) => ({ ...p, cardHolder: e.target.value }))} placeholder="Ad ve Soyad" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
       <div className="space-y-2">
        <Label>Son Kullanma Ayı *</Label>
        <Input value={form.expiryMonth} onChange={(e) => { let v = e.target.value.replace(/\D/g, "").slice(0, 2); if (v.length === 2) { const n = parseInt(v, 10); if (n < 1) v = "01"; else if (n > 12) v = "12"; } setForm((p) => ({ ...p, expiryMonth: v })); }} placeholder="MM" required maxLength={2} />
       </div>
       <div className="space-y-2">
        <Label>Son Kullanma Yılı *</Label>
        <Input value={form.expiryYear} onChange={(e) => setForm((p) => ({ ...p, expiryYear: e.target.value.replace(/\D/g, "").slice(0, 2) }))} placeholder="YY" required maxLength={2} />
       </div>
      </div>
      <label className="flex cursor-pointer items-center gap-3">
       <Checkbox checked={form.isDefault} onCheckedChange={(c) => setForm((p) => ({ ...p, isDefault: !!c }))} />
       <span className="text-sm">Varsayılan kart olarak kaydet</span>
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DialogFooter>
       <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
       <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-500">Kaydet</Button>
      </DialogFooter>
     </form>
    )}
   </DialogContent>
  </Dialog>
 )
}

export default EditCardModal