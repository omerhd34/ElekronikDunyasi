"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const EditAddressModal = ({ address, open, onClose, onSuccess }) => {
 const [form, setForm] = useState({ title: "", recipientName: "", address: "", city: "", district: "", phone: "", isDefault: false });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 useEffect(() => {
  if (address) setForm({ title: address.title, recipientName: address.recipientName, address: address.address, city: address.city, district: address.district, phone: address.phone, isDefault: !!address.isDefault });
 }, [address]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
   const res = await fetch(`/api/auth/addresses/${address?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
   });
   let data;
   try { data = await res.json(); } catch { setError("Sunucu yanıtı okunamadı."); return; }
   if (res.ok) {
    onSuccess();
   } else setError(data.error || "Adres güncellenemedi.");
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
     <DialogTitle>Adresi Düzenle</DialogTitle>
    </DialogHeader>
    {address && (
     <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
       <Label>Adres Başlığı *</Label>
       <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ev, İş, Diğer" required />
      </div>
      <div className="space-y-2">
       <Label>Alıcı Adı Soyadı *</Label>
       <Input value={form.recipientName} onChange={(e) => setForm((p) => ({ ...p, recipientName: e.target.value }))} placeholder="Ad Soyad" required />
      </div>
      <div className="space-y-2">
       <Label>Telefon *</Label>
       <Input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="0XXXXXXXXXX" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
       <div className="space-y-2">
        <Label>Şehir *</Label>
        <Input value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} placeholder="Şehir" required />
       </div>
       <div className="space-y-2">
        <Label>İlçe *</Label>
        <Input value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="İlçe" required />
       </div>
      </div>
      <div className="space-y-2">
       <Label>Adres *</Label>
       <Textarea value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="Mahalle, Sokak, Bina No, Daire No" required rows={3} />
      </div>
      <label className="flex cursor-pointer items-center gap-3">
       <Checkbox checked={form.isDefault} onCheckedChange={(c) => setForm((p) => ({ ...p, isDefault: !!c }))} />
       <span className="text-sm">Varsayılan adres olarak kaydet</span>
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

export default EditAddressModal