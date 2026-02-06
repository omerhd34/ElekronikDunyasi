"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
 User, LogOut, Phone, MapPin, MapPinned, Eye, EyeOff, Package, Heart, ChevronRight,
 FileText, CreditCard, Settings, Lock, Plus, Pencil, Trash2, Star, AlertTriangle, Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { useFavorites } from "@/context/favorites-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function validatePassword(password) {
 if (password.length < 10) return { valid: false, msg: "En az 10 karakter olmalıdır." };
 if (!/[A-Z]/.test(password)) return { valid: false, msg: "En az bir büyük harf olmalıdır." };
 if (!/[0-9]/.test(password)) return { valid: false, msg: "En az bir rakam olmalıdır." };
 return { valid: true };
}

function PasswordInput({ value, onChange, placeholder, name, id, required, minLength, className }) {
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
  </div>
 );
}

function Hero({ type, active, title, text, buttonText, onClick }) {
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
 );
}

function AccountDashboard({ customer: initialCustomer, onLogout, onCustomerUpdate }) {
 const { favoriteIds } = useFavorites();
 const [customer, setCustomer] = useState(initialCustomer);
 const [activeTab, setActiveTab] = useState("profil");
 const [favoriteProducts, setFavoriteProducts] = useState([]);
 const [favoritesLoading, setFavoritesLoading] = useState(false);
 const [addresses, setAddresses] = useState([]);
 const [cards, setCards] = useState([]);
 const [addressModalOpen, setAddressModalOpen] = useState(false);
 const [cardModalOpen, setCardModalOpen] = useState(false);
 const [editAddress, setEditAddress] = useState(null);
 const [editCard, setEditCard] = useState(null);
 const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
 const [deletePassword, setDeletePassword] = useState("");
 const [deleteError, setDeleteError] = useState("");
 const [deleteLoading, setDeleteLoading] = useState(false);
 const [activeOrdersCount, setActiveOrdersCount] = useState(0);

 const [profileForm, setProfileForm] = useState({
  firstName: customer?.firstName ?? "",
  lastName: customer?.lastName ?? "",
  phone: customer?.phone ?? "",
 });
 const [profileLoading, setProfileLoading] = useState(false);
 const [profileSuccess, setProfileSuccess] = useState(false);

 const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
 });
 const [passwordLoading, setPasswordLoading] = useState(false);
 const [passwordError, setPasswordError] = useState("");
 const [passwordSuccess, setPasswordSuccess] = useState(false);

 const [emailNotifications, setEmailNotifications] = useState(customer?.emailNotifications ?? true);
 const [notificationsLoading, setNotificationsLoading] = useState(false);

 useEffect(() => {
  setCustomer(initialCustomer);
  setProfileForm({ firstName: initialCustomer?.firstName ?? "", lastName: initialCustomer?.lastName ?? "", phone: initialCustomer?.phone ?? "" });
  setEmailNotifications(initialCustomer?.emailNotifications ?? true);
 }, [initialCustomer]);

 useEffect(() => {
  const ids = favoriteIds.slice(0, 8);
  let cancelled = false;
  if (ids.length > 0) queueMicrotask(() => !cancelled && setFavoritesLoading(true));
  Promise.all(
   ids.map((id) => fetch(`/api/products/by-id/${id}`).then((r) => (r.ok ? r.json() : null)).catch(() => null))
  ).then((list) => {
   if (!cancelled) {
    setFavoriteProducts(list.filter(Boolean));
    setFavoritesLoading(false);
   }
  });
  return () => { cancelled = true; };
 }, [favoriteIds]);

 const fetchAddresses = () => fetch("/api/auth/addresses").then((r) => (r.ok ? r.json() : [])).then(setAddresses);
 const fetchCards = () => fetch("/api/auth/cards").then((r) => (r.ok ? r.json() : [])).then(setCards);

 useEffect(() => {
  if (activeTab === "adresler") fetchAddresses();
  if (activeTab === "kartlar") fetchCards();
  if (activeTab === "ayarlar") fetch("/api/auth/orders/active-count").then((r) => (r.ok ? r.json() : { count: 0 })).then((d) => setActiveOrdersCount(d.count ?? 0)).catch(() => setActiveOrdersCount(0));
 }, [activeTab]);

 const navItems = [
  { id: "profil", label: "Profil Bilgileri", icon: User },
  { id: "siparisler", label: "Siparişlerim", icon: FileText },
  { id: "favoriler", label: "Favorilerim", icon: Heart },
  { id: "adresler", label: "Adreslerim", icon: MapPin },
  { id: "kartlar", label: "Kayıtlı Kartlarım", icon: CreditCard },
  { id: "ayarlar", label: "Ayarlar", icon: Settings },
 ];

 const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setProfileLoading(true);
  setProfileSuccess(false);
  try {
   const res = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileForm),
   });
   const data = await res.json();
   if (res.ok) {
    setCustomer(data.customer);
    onCustomerUpdate?.(data.customer);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2000);
   }
  } finally {
   setProfileLoading(false);
  }
 };

 const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  setPasswordError("");
  setPasswordSuccess(false);
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
   setPasswordError("Yeni şifreler eşleşmiyor.");
   return;
  }
  const check = validatePassword(passwordForm.newPassword);
  if (!check.valid) {
   setPasswordError(check.msg);
   return;
  }
  setPasswordLoading(true);
  try {
   const res = await fetch("/api/auth/password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     currentPassword: passwordForm.currentPassword,
     newPassword: passwordForm.newPassword,
    }),
   });
   const data = await res.json();
   if (res.ok) {
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
   } else setPasswordError(data.error || "Şifre güncellenemedi.");
  } catch {
   setPasswordError("Bir hata oluştu.");
  } finally {
   setPasswordLoading(false);
  }
 };

 const handleNotificationsChange = async (checked) => {
  setEmailNotifications(checked);
  setNotificationsLoading(true);
  try {
   await fetch("/api/auth/notifications", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailNotifications: checked }),
   });
  } finally {
   setNotificationsLoading(false);
  }
 };

 const handleDeleteAccount = async (e) => {
  e.preventDefault();
  setDeleteError("");
  setDeleteLoading(true);
  try {
   const res = await fetch("/api/auth/account", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: deletePassword }),
   });
   const data = await res.json();
   if (res.ok) {
    setDeleteAccountModalOpen(false);
    onLogout();
   } else setDeleteError(data.error || "Hesap silinemedi.");
  } catch {
   setDeleteError("Bir hata oluştu.");
  } finally {
   setDeleteLoading(false);
  }
 };

 const initials = [customer?.firstName?.[0], customer?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "?";

 return (
  <div className="min-h-[70vh] bg-gray-50">
   {/* Üst bar: sağ üstte Çıkış Yap */}
   <div className="container mx-auto flex justify-end px-4 pt-4">
    <Button variant="outline" onClick={onLogout} className="gap-2 rounded-full">
     <LogOut className="size-4" />
     Çıkış Yap
    </Button>
   </div>

   <div className="container mx-auto flex flex-col gap-6 px-4 py-6 md:flex-row md:gap-8 md:py-8 lg:gap-12">
    {/* Sidebar */}
    <aside className="w-full shrink-0 md:w-64 lg:w-72">
     <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
       <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-lg font-bold text-white">
        {initials}
       </div>
       <div>
        <h2 className="font-semibold text-gray-900">{customer?.firstName} {customer?.lastName}</h2>
        <p className="text-sm text-gray-500">{customer?.email}</p>
       </div>
      </div>
      <nav className="space-y-1">
       {navItems.map((tab) => (
        <button
         key={tab.id}
         type="button"
         onClick={() => setActiveTab(tab.id)}
         className={cn(
          "flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer",
          activeTab === tab.id
           ? "bg-purple-50 text-purple-700"
           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
         )}
        >
         <tab.icon className="size-5 shrink-0" />
         {tab.label}
        </button>
       ))}
      </nav>
     </div>
    </aside>

    {/* Main content */}
    <main className="min-w-0 flex-1">
     {activeTab === "profil" && (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
       <h2 className="mb-6 text-xl font-semibold text-gray-900">Profil Bilgileri</h2>
       <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
         <div className="space-y-2">
          <Label htmlFor="firstName">Ad *</Label>
          <Input id="firstName" value={profileForm.firstName} onChange={(e) => setProfileForm((p) => ({ ...p, firstName: e.target.value }))} required className="h-11" />
         </div>
         <div className="space-y-2">
          <Label htmlFor="lastName">Soyad *</Label>
          <Input id="lastName" value={profileForm.lastName} onChange={(e) => setProfileForm((p) => ({ ...p, lastName: e.target.value }))} required className="h-11" />
         </div>
        </div>
        <div className="space-y-2">
         <Label htmlFor="email">E-posta *</Label>
         <Input id="email" type="email" value={customer?.email ?? ""} readOnly disabled className="h-11 bg-gray-100" />
        </div>
        <div className="space-y-2">
         <Label htmlFor="phone">Telefon *</Label>
         <Input id="phone" type="tel" value={profileForm.phone} onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))} placeholder="0XXXXXXXXXX" className="h-11" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
         <Button type="submit" disabled={profileLoading} className="rounded-full bg-purple-600 hover:bg-purple-500">
          {profileLoading ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
         </Button>
         {profileSuccess && <span className="text-sm text-emerald-600">Kaydedildi!</span>}
        </div>
       </form>
      </div>
     )}

     {activeTab === "siparisler" && (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
       <h2 className="mb-6 text-xl font-semibold text-gray-900">Siparişlerim</h2>
       <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
        <Package className="mb-4 size-16 text-gray-400" />
        <p className="mb-2 font-medium text-gray-800">Henüz siparişiniz yok</p>
        <p className="mb-6 max-w-sm text-sm text-gray-500">Alışverişe başlayın, siparişleriniz burada listelenecektir.</p>
        <Button asChild className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
         <Link href="/">Alışverişe Başla <ChevronRight className="size-4" /></Link>
        </Button>
       </div>
      </div>
     )}

     {activeTab === "favoriler" && (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
       <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Favorilerim</h2>
        {favoriteProducts.length > 0 && (
         <Button asChild variant="outline" size="sm">
          <Link href="/favoriler">Tümünü Gör <ChevronRight className="size-4" /></Link>
         </Button>
        )}
       </div>
       {favoritesLoading ? (
        <p className="py-12 text-center text-gray-500">Yükleniyor…</p>
       ) : favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
         <Heart className="mb-4 size-16 text-red-400" />
         <p className="mb-2 font-medium text-gray-800">Henüz favori ürününüz yok</p>
         <p className="mb-6 max-w-sm text-sm text-gray-500">Ürün kartlarındaki kalp ikonuna tıklayarak favorilere ekleyebilirsiniz.</p>
         <Button asChild className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
          <Link href="/">Ürünlere Göz At <ChevronRight className="size-4" /></Link>
         </Button>
        </div>
       ) : (
        <div className="grid grid-cols-1 gap-4">
         {favoriteProducts.map((p) => <ProductCard key={p.id} product={p} variant="wide" />)}
        </div>
       )}
      </div>
     )}

     {activeTab === "adresler" && (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
       <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Adreslerim</h2>
        <Button onClick={() => setAddressModalOpen(true)} className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
         <Plus className="size-4" /> Yeni Adres Ekle
        </Button>
       </div>
       {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
         <MapPin className="mb-4 size-16 text-gray-400" />
         <p className="mb-2 font-medium text-gray-800">Henüz adresiniz yok</p>
         <p className="mb-6 max-w-sm text-sm text-gray-500">Yeni adres ekleyerek siparişlerinizi kolayca teslim alabilirsiniz.</p>
         <Button onClick={() => setAddressModalOpen(true)} className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
          <Plus className="size-4" /> Yeni Adres Ekle
         </Button>
        </div>
       ) : (
        <div className="space-y-4">
         {addresses.map((addr) => (
          <AddressCard key={addr.id} address={addr} onUpdate={fetchAddresses} onEdit={setEditAddress} />
         ))}
        </div>
       )}
      </div>
     )}

     {activeTab === "kartlar" && (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
       <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Kayıtlı Kartlarım</h2>
        <Button onClick={() => setCardModalOpen(true)} className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
         <Plus className="size-4" /> Yeni Kart Ekle
        </Button>
       </div>
       {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
         <CreditCard className="mb-4 size-16 text-gray-400" />
         <p className="mb-2 font-medium text-gray-800">Henüz kayıtlı kartınız yok</p>
         <p className="mb-6 max-w-sm text-sm text-gray-500">Kart ekleyerek ödemelerinizi daha hızlı tamamlayabilirsiniz.</p>
         <Button onClick={() => setCardModalOpen(true)} className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
          <Plus className="size-4" /> Yeni Kart Ekle
         </Button>
        </div>
       ) : (
        <div className="space-y-4">
         {cards.map((card) => (
          <CardCard key={card.id} card={card} onUpdate={fetchCards} onEdit={setEditCard} />
         ))}
        </div>
       )}
      </div>
     )}

     {activeTab === "ayarlar" && (
      <div className="space-y-6">
       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Hesap Ayarları</h2>
        <p className="mb-6 text-sm text-gray-500">Şifre, bildirimler ve hesap yönetimi</p>

        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50/50 p-6">
         <div className="mb-4 flex items-center gap-3">
          <Lock className="size-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Şifre Değiştir</h3>
         </div>
         <p className="mb-4 text-sm text-gray-600">Güvenliğiniz için güçlü bir şifre kullanın</p>
         <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-2">
           <Label>Mevcut Şifre</Label>
           <PasswordInput name="currentPassword" id="pwd-current" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))} placeholder="••••••••" required />
          </div>
          <div className="space-y-2">
           <Label>Yeni Şifre</Label>
           <PasswordInput name="newPassword" id="pwd-new" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))} placeholder="••••••••" required minLength={10} />
           <p className="text-xs text-gray-500">En az 10 karakter, en az 1 büyük harf, en az 1 rakam</p>
          </div>
          <div className="space-y-2">
           <Label>Yeni Şifre Tekrar</Label>
           <PasswordInput name="confirmPassword" id="pwd-confirm" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••" required />
          </div>
          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-emerald-600">Şifre güncellendi.</p>}
          <Button type="submit" disabled={passwordLoading} className="gap-2 rounded-full bg-purple-600 hover:bg-purple-500">
           <Lock className="size-4" /> Şifreyi Güncelle
          </Button>
         </form>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50/50 p-6">
         <div className="mb-4 flex items-center gap-3">
          <Bell className="size-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Bildirim Tercihleri</h3>
         </div>
         <p className="mb-4 text-sm text-gray-600">Sipariş ve kampanya bildirimleri</p>
         <label className="flex cursor-pointer items-center gap-3">
          <Checkbox checked={emailNotifications} onCheckedChange={handleNotificationsChange} disabled={notificationsLoading} />
          <span className="text-sm font-medium">E-posta bildirimleri al</span>
         </label>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50/50 p-6">
         <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="size-5 text-red-600" />
          <h3 className="font-semibold text-red-800">Tehlikeli Bölge</h3>
         </div>
         <p className="mb-2 text-sm text-gray-600">Geri alınamaz işlemler</p>
         <p className="mb-4 text-sm text-gray-700">Hesabınızı sildiğinizde tüm verileriniz (siparişler, adresler, favoriler) kalıcı olarak silinecektir.</p>
         {activeOrdersCount > 0 && (
          <p className="mb-4 text-sm font-medium text-red-700">Hesabı silmek için önce tüm aktif siparişlerinizi tamamlamanız gerekir ({activeOrdersCount} aktif sipariş).</p>
         )}
         <Button variant="destructive" onClick={() => setDeleteAccountModalOpen(true)} className="gap-2" disabled={activeOrdersCount > 0}>
          <AlertTriangle className="size-4" /> Hesabı Sil
         </Button>
        </div>
       </div>
      </div>
     )}
    </main>
   </div>

   <AddAddressModal open={addressModalOpen} onClose={() => setAddressModalOpen(false)} onSuccess={() => { setAddressModalOpen(false); fetchAddresses(); }} />
   <AddCardModal open={cardModalOpen} onClose={() => setCardModalOpen(false)} onSuccess={() => { setCardModalOpen(false); fetchCards(); }} />
   <EditAddressModal address={editAddress} open={!!editAddress} onClose={() => setEditAddress(null)} onSuccess={() => { setEditAddress(null); fetchAddresses(); }} />
   <EditCardModal card={editCard} open={!!editCard} onClose={() => setEditCard(null)} onSuccess={() => { setEditCard(null); fetchCards(); }} />
   <Dialog open={deleteAccountModalOpen} onOpenChange={setDeleteAccountModalOpen}>
    <DialogContent className="sm:max-w-md">
     <DialogHeader>
      <DialogTitle>Hesabı Sil</DialogTitle>
     </DialogHeader>
     <form onSubmit={handleDeleteAccount} className="space-y-4">
      <p className="text-sm text-gray-600">Hesabınızı silmek için şifrenizi girin.</p>
      <div className="space-y-2">
       <Label>Şifre</Label>
       <Input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="••••••••" required />
      </div>
      {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}
      <DialogFooter>
       <Button type="button" variant="outline" onClick={() => setDeleteAccountModalOpen(false)}>İptal</Button>
       <Button type="submit" variant="destructive" disabled={deleteLoading}>{deleteLoading ? "Siliniyor…" : "Hesabı Sil"}</Button>
      </DialogFooter>
     </form>
    </DialogContent>
   </Dialog>
  </div>
 );
}

function AddressCard({ address, onUpdate, onEdit }) {
 const handleSetDefault = async () => {
  await fetch(`/api/auth/addresses/${address.id}/default`, { method: "PUT" });
  onUpdate();
 };
 const handleDelete = async () => {
  if (!confirm("Bu adresi silmek istediğinize emin misiniz?")) return;
  await fetch(`/api/auth/addresses/${address.id}`, { method: "DELETE" });
  onUpdate();
 };
 return (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
   <div className="mb-3 flex items-start justify-between gap-2">
    <h3 className="font-semibold uppercase text-gray-800">{address.title}</h3>
    {address.isDefault && (
     <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
      <Star className="size-3 fill-current" /> Varsayılan
     </span>
    )}
   </div>
   <p className="font-medium text-gray-900">{address.recipientName}</p>
   <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
    <Phone className="size-4 shrink-0" />{address.phone}
   </p>
   <p className="mt-1 flex items-start gap-2 text-sm text-gray-600">
    <MapPin className="mt-0.5 size-4 shrink-0" />{address.address}
   </p>
   <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
    <MapPinned className="size-4 shrink-0" />{address.district} / {address.city}
   </p>
   <div className="mt-4 flex flex-wrap gap-2">
    {!address.isDefault && (
     <Button size="sm" variant="outline" onClick={handleSetDefault} className="gap-1 text-purple-600 border-purple-200 hover:bg-purple-50">
      <Star className="size-4" /> Varsayılan Yap
     </Button>
    )}
    <Button type="button" size="sm" variant="outline" className="gap-1" onClick={() => onEdit?.(address)}><Pencil className="size-4" /> Düzenle</Button>
    <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={handleDelete}><Trash2 className="size-4" /> Sil</Button>
   </div>
  </div>
 );
}

function CardCard({ card, onUpdate, onEdit }) {
 const handleSetDefault = async () => {
  await fetch(`/api/auth/cards/${card.id}/default`, { method: "PUT" });
  onUpdate();
 };
 const handleDelete = async () => {
  if (!confirm("Bu kartı silmek istediğinize emin misiniz?")) return;
  await fetch(`/api/auth/cards/${card.id}`, { method: "DELETE" });
  onUpdate();
 };
 return (
  <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
   <div className="mb-3 flex items-start justify-between gap-2">
    <h3 className="font-semibold text-gray-800">{card.title} •••• {card.last4}</h3>
    {card.isDefault && (
     <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
      <Star className="size-3 fill-current" /> Varsayılan
     </span>
    )}
   </div>
   <p className="text-sm text-gray-600">Kart Sahibi: {card.cardHolder}</p>
   <p className="text-sm text-gray-600">Son Kullanma: {card.expiryMonth}/{card.expiryYear}</p>
   <div className="mt-4 flex flex-wrap gap-2">
    {!card.isDefault && (
     <Button size="sm" variant="outline" onClick={handleSetDefault} className="gap-1 text-purple-600 border-purple-200 hover:bg-purple-50">
      <Star className="size-4" /> Varsayılan Yap
     </Button>
    )}
    <Button type="button" size="sm" variant="outline" className="gap-1" onClick={() => onEdit?.(card)}><Pencil className="size-4" /> Düzenle</Button>
    <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={handleDelete}><Trash2 className="size-4" /> Sil</Button>
   </div>
  </div>
 );
}

function AddAddressModal({ open, onClose, onSuccess }) {
 const [form, setForm] = useState({ title: "", recipientName: "", address: "", city: "", district: "", phone: "", isDefault: false });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
   const res = await fetch("/api/auth/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
   });
   let data;
   try {
    data = await res.json();
   } catch {
    setError("Sunucu yanıtı okunamadı.");
    return;
   }
   if (res.ok) {
    onSuccess();
    setForm({ title: "", recipientName: "", address: "", city: "", district: "", phone: "", isDefault: false });
   } else setError(data.error || "Adres eklenemedi.");
  } catch (err) {
   setError(err?.message || "Bir hata oluştu.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <Dialog open={open} onOpenChange={onClose}>
   <DialogContent className="sm:max-w-lg">
    <DialogHeader>
     <DialogTitle>Yeni Adres Ekle</DialogTitle>
    </DialogHeader>
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
   </DialogContent>
  </Dialog>
 );
}

function EditAddressModal({ address, open, onClose, onSuccess }) {
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
 );
}

function isExpiryValid(month, year) {
 if (!month || !year) return false;
 const m = parseInt(month, 10);
 const y = parseInt(year, 10);
 if (m < 1 || m > 12) return false;
 const fullYear = 2000 + y;
 const lastDayOfMonth = new Date(fullYear, m, 0);
 return lastDayOfMonth >= new Date();
}

function AddCardModal({ open, onClose, onSuccess }) {
 const [form, setForm] = useState({ title: "", cardNumber: "", cardHolder: "", expiryMonth: "", expiryYear: "", isDefault: false });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (!isExpiryValid(form.expiryMonth, form.expiryYear)) {
   setError("Son kullanma tarihi bu yıldan ileri bir tarih olmalıdır.");
   return;
  }
  setLoading(true);
  try {
   const res = await fetch("/api/auth/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     title: form.title,
     cardNumber: form.cardNumber.replace(/\s/g, ""),
     cardHolder: form.cardHolder,
     expiryMonth: form.expiryMonth,
     expiryYear: form.expiryYear,
     isDefault: form.isDefault,
    }),
   });
   const data = await res.json();
   if (res.ok) {
    onSuccess();
    setForm({ title: "", cardNumber: "", cardHolder: "", expiryMonth: "", expiryYear: "", isDefault: false });
   } else setError(data.error || "Kart eklenemedi.");
  } catch {
   setError("Bir hata oluştu.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <Dialog open={open} onOpenChange={onClose}>
   <DialogContent className="sm:max-w-lg">
    <DialogHeader>
     <DialogTitle>Yeni Kart Ekle</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-4">
     <div className="space-y-2">
      <Label>Kart Başlığı *</Label>
      <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ana Kart, İş Kartı, vb." required />
     </div>
     <div className="space-y-2">
      <Label>Kart Numarası *</Label>
      <Input value={form.cardNumber} onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(0, 16); setForm((p) => ({ ...p, cardNumber: d.replace(/(\d{4})(?=\d)/g, "$1 ") })); }} placeholder="1234 5678 9012 3456" required maxLength={19} />
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
   </DialogContent>
  </Dialog>
 );
}

function EditCardModal({ card, open, onClose, onSuccess }) {
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
 );
}

// AuthForm: form panel
function AuthForm({ type, active, title, children }) {
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
 );
}

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
  const pwdCheck = validatePassword(registerForm.password);
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
    {/* Ana kart */}
    <div className="relative h-[500px] overflow-hidden rounded-2xl bg-[#141317] shadow-2xl md:h-[540px]">
     {/* Kaydırılan gradient arka plan */}
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
        {registerForm.password && !validatePassword(registerForm.password).valid && (
         <p className="text-xs text-red-400">{validatePassword(registerForm.password).msg}</p>
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
