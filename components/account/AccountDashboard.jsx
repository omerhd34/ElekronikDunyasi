"use client";
import { useFavorites } from "@/context/favorites-context";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MapPin, Package, Heart, ChevronRight, FileText, CreditCard, Settings, LogOut, Plus, Lock, Bell, AlertTriangle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import AddressCard from "@/components/account/AddressCard";
import CardCard from "./CardCard";
import PasswordInput from "./PasswordInput";
import { Checkbox } from "../ui/checkbox";
import AddAddressModal from "./AddAddressModal";
import AddCardModal from "./AddCardModal";
import EditAddressModal from "./EditAddressModal";
import EditCardModal from "./EditCardModal";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

const AccountDashboard = ({ customer: initialCustomer, onLogout, onCustomerUpdate }) => {
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
  const check = ValidatePassword(passwordForm.newPassword);
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
   <AlertDialog open={deleteAccountModalOpen} onOpenChange={setDeleteAccountModalOpen}>
    <AlertDialogContent className="sm:max-w-md">
     <AlertDialogHeader>
      <AlertDialogTitle>Hesabı Sil</AlertDialogTitle>
     </AlertDialogHeader>
     <form onSubmit={handleDeleteAccount} className="space-y-4">
      <p className="text-sm text-gray-600">Hesabınızı silmek için şifrenizi girin.</p>
      <div className="space-y-2">
       <Label>Şifre</Label>
       <Input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="••••••••" required />
      </div>
      {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}
      <AlertDialogFooter>
       <Button type="button" variant="outline" onClick={() => setDeleteAccountModalOpen(false)}>İptal</Button>
       <Button type="submit" variant="destructive" disabled={deleteLoading}>{deleteLoading ? "Siliniyor…" : "Hesabı Sil"}</Button>
      </AlertDialogFooter>
     </form>
    </AlertDialogContent>
   </AlertDialog>
  </div>
 )
}

export default AccountDashboard