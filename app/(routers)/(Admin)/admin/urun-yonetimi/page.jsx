"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { categoryInfo } from "@/lib/product-utils";
import { ChevronDown, ChevronUp, Plus, Trash2, X, Package, DollarSign, ImageIcon, ListChecks, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = Object.keys(categoryInfo);
const MAX_IMAGES = 15;

const emptyForm = (category = CATEGORY_OPTIONS[0] ?? "") => ({
 name: "",
 slug: "",
 description: "",
 price: "",
 discountPrice: "",
 category,
 images: [],
 stock: "0",
 brand: "",
 color: "",
 tags: "",
 isNewProduct: false,
 isFeatured: false,
 specifications: [],
});

export default function UrunYonetimiPage() {
 const [products, setProducts] = useState([]);
 const [productsLoading, setProductsLoading] = useState(true);
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState({ type: "", text: "" });
 const [editingId, setEditingId] = useState(null);
 const [form, setForm] = useState(emptyForm());
 const [specsOpen, setSpecsOpen] = useState(true);
 const [showForm, setShowForm] = useState(false);
 const fileInputRef = useRef(null);

 const update = (key, value) => {
  setForm((prev) => ({ ...prev, [key]: value }));
  if (key === "name" && typeof value === "string") {
   const slug = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9ğüşıöç-]/gi, "");
   setForm((p) => ({ ...p, slug: p.slug || slug }));
  }
 };

 const loadProducts = async () => {
  setProductsLoading(true);
  try {
   const res = await fetch("/api/products");
   const data = await res.json().catch(() => []);
   setProducts(Array.isArray(data) ? data : []);
  } catch {
   setProducts([]);
  } finally {
   setProductsLoading(false);
  }
 };

 useEffect(() => {
  loadProducts();
 }, []);

 const startEdit = async (product) => {
  setEditingId(product.id);
  setForm({
   name: product.name ?? "",
   slug: product.slug ?? "",
   description: product.description ?? "",
   price: String(product.price ?? ""),
   discountPrice: product.oldPrice != null ? String(product.oldPrice) : "",
   category: product.category ?? CATEGORY_OPTIONS[0],
   images: Array.isArray(product.images) ? [...product.images] : [],
   stock: String(product.stock ?? 0),
   brand: product.brand ?? "",
   color: product.color ?? "",
   tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
   isNewProduct: product.isNew ?? false,
   isFeatured: product.isFeatured ?? false,
   specifications: Array.isArray(product.specifications)
    ? product.specifications.map((s) => ({
     category: s.category ?? "",
     items: (s.items ?? []).map((i) => ({
      key: i.key ?? "",
      value: i.value ?? "",
     })),
    }))
    : [],
  });
  setMessage({ type: "", text: "" });
  setShowForm(true);
 };

 const startNew = () => {
  setEditingId(null);
  setForm(emptyForm(form.category));
  setMessage({ type: "", text: "" });
  setShowForm(true);
 };

 const closeForm = () => {
  setShowForm(false);
  setEditingId(null);
  setForm(emptyForm(form.category));
  setMessage({ type: "", text: "" });
 };

 const triggerFileSelect = () => {
  if (form.images.length >= MAX_IMAGES) return;
  fileInputRef.current?.click();
 };

 const compressImage = (file) =>
  new Promise((resolve) => {
   const fallback = () => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => resolve(null);
    r.readAsDataURL(file);
   };
   const img = new Image();
   const url = URL.createObjectURL(file);
   img.onload = () => {
    URL.revokeObjectURL(url);
    const maxW = 1200;
    const scale = img.width > maxW ? maxW / img.width : 1;
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return fallback();
    ctx.drawImage(img, 0, 0, w, h);
    try {
     const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
     resolve(dataUrl);
    } catch {
     fallback();
    }
   };
   img.onerror = () => {
    URL.revokeObjectURL(url);
    fallback();
   };
   img.src = url;
  });

 const handleFileSelect = (e) => {
  const files = Array.from(e.target.files ?? []);
  if (!files.length) return;
  const imageFiles = files.filter((f) => f.type.startsWith("image/"));
  const remaining = MAX_IMAGES - form.images.length;
  const toProcess = imageFiles.slice(0, remaining);
  if (!toProcess.length) return;

  Promise.all(toProcess.map(compressImage)).then((urls) => {
   const valid = urls.filter(Boolean);
   if (valid.length) {
    setForm((p) => ({
     ...p,
     images: [...p.images, ...valid].slice(0, MAX_IMAGES),
    }));
   }
  });
  e.target.value = "";
 };

 const removeImage = (index) => {
  setForm((p) => ({
   ...p,
   images: p.images.filter((_, i) => i !== index),
  }));
 };

 const addSpecCategory = () => {
  setForm((p) => ({
   ...p,
   specifications: [...p.specifications, { category: "", items: [{ key: "", value: "" }] }],
  }));
 };

 const updateSpecCategory = (catIndex, categoryName) => {
  setForm((p) => {
   const next = [...p.specifications];
   next[catIndex] = { ...next[catIndex], category: categoryName };
   return { ...p, specifications: next };
  });
 };

 const removeSpecCategory = (catIndex) => {
  setForm((p) => ({
   ...p,
   specifications: p.specifications.filter((_, i) => i !== catIndex),
  }));
 };

 const addSpecItem = (catIndex) => {
  setForm((p) => {
   const next = [...p.specifications];
   next[catIndex] = {
    ...next[catIndex],
    items: [...(next[catIndex].items ?? []), { key: "", value: "" }],
   };
   return { ...p, specifications: next };
  });
 };

 const updateSpecItem = (catIndex, itemIndex, field, value) => {
  setForm((p) => {
   const next = [...p.specifications];
   const items = [...(next[catIndex].items ?? [])];
   items[itemIndex] = { ...items[itemIndex], [field]: value };
   next[catIndex] = { ...next[catIndex], items };
   return { ...p, specifications: next };
  });
 };

 const removeSpecItem = (catIndex, itemIndex) => {
  setForm((p) => {
   const next = [...p.specifications];
   next[catIndex] = {
    ...next[catIndex],
    items: (next[catIndex].items ?? []).filter((_, i) => i !== itemIndex),
   };
   return { ...p, specifications: next };
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage({ type: "", text: "" });
  if (form.images.length === 0) {
   setMessage({ type: "error", text: "En az bir görsel ekleyin." });
   return;
  }
  setLoading(true);
  try {
   const payload = {
    name: form.name.trim(),
    slug: form.slug.trim().toLowerCase() || undefined,
    description: form.description.trim(),
    price: parseFloat(form.price) || 0,
    discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : null,
    category: form.category.trim(),
    images: form.images,
    stock: parseInt(form.stock, 10) || 0,
    brand: form.brand.trim() || undefined,
    color: form.color.trim() || undefined,
    tags: form.tags
     .split(",")
     .map((t) => t.trim())
     .filter(Boolean),
    isNewProduct: form.isNewProduct,
    isFeatured: form.isFeatured,
    specifications: form.specifications
     .filter((s) => s.category?.trim())
     .map((s) => ({
      category: s.category.trim(),
      items: (s.items ?? []).filter((i) => i.key?.trim() && i.value?.trim()).map((i) => ({
       key: i.key.trim(),
       value: i.value.trim(),
      })),
     }))
     .filter((s) => s.items.length > 0),
   };

   if (editingId) {
    const res = await fetch(`/api/products/by-id/${editingId}`, {
     method: "PATCH",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
    });
    const rawPatch = await res.text();
    let data = {};
    try {
     data = rawPatch ? JSON.parse(rawPatch) : {};
    } catch {
     data = { error: rawPatch?.slice(0, 200) || "Sunucu yanıt veremedi." };
    }
    if (!res.ok) {
     setMessage({ type: "error", text: data.error || "Ürün güncellenemedi." });
     return;
    }
    setMessage({ type: "success", text: `Ürün güncellendi: ${data.name}` });
    await loadProducts();
   } else {
    const res = await fetch("/api/products", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
    });
    const raw = await res.text();
    let data = {};
    try {
     data = raw ? JSON.parse(raw) : {};
    } catch {
     if (res.status === 413) data = { error: "Görseller çok büyük. Daha küçük görsel ekleyin." };
     else if (res.ok) data = { error: "Yanıt işlenemedi." };
     else if (raw?.startsWith?.("<")) data = { error: "Sunucu hata döndü. Görselleri küçültüp tekrar deneyin veya daha az görsel ekleyin." };
     else data = { error: raw?.trim?.().slice(0, 200) || "Sunucu yanıt veremedi." };
    }
    if (!res.ok) {
     const msg = data?.error || (res.status === 413 ? "Görseller çok büyük. Daha küçük görsel ekleyin." : "Ürün eklenemedi.");
     setMessage({ type: "error", text: msg });
     return;
    }
    setMessage({ type: "success", text: `Ürün eklendi: ${data.name}. Slug: ${data.slug}` });
    setForm(emptyForm(form.category));
    await loadProducts();
   }
  } catch (err) {
   setMessage({ type: "error", text: err?.message || "Bağlantı hatası. Tekrar deneyin." });
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="mx-auto w-full max-w-6xl space-y-10">
   <div className="space-y-1">
    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Ürün Yönetimi</h1>
    <p className="text-base text-muted-foreground md:text-lg">
     Ürün ekleyin veya düzenleyin. Fiyat, stok, görseller ve ürün özelliklerini yönetin.
    </p>
   </div>

   {message.text && (
    <Alert variant={message.type === "error" ? "destructive" : "default"} className="rounded-xl">
     <AlertDescription className="text-sm">{message.text}</AlertDescription>
    </Alert>
   )}

   <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-start justify-between gap-4 border-b bg-muted/20 pb-6">
     <div>
      <CardTitle className="text-xl">Ürünler</CardTitle>
      <CardDescription className="mt-1 text-base">
       Listeden düzenlemek için ürünü seçin veya yeni ürün ekleyin.
      </CardDescription>
     </div>
     <Button type="button" variant="default" size="sm" onClick={startNew} className="shrink-0">
      + Yeni ürün
     </Button>
    </CardHeader>
    <CardContent className="pt-6">
     {productsLoading ? (
      <div className="flex items-center gap-3 py-8">
       <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
       <p className="text-sm text-muted-foreground">Yükleniyor…</p>
      </div>
     ) : products.length === 0 ? (
      <p className="py-8 text-center text-sm text-muted-foreground">
       Henüz ürün yok. &quot;Yeni ürün&quot; ile ekleyerek başlayın.
      </p>
     ) : (
      <ul className="space-y-2 text-sm">
       {products.map((p) => (
        <li
         key={p.id}
         className="flex items-center justify-between gap-2 rounded-xl border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50"
        >
         <span className="truncate font-medium">{p.name}</span>
         <div className="flex items-center gap-2 shrink-0">
          <span className="text-muted-foreground text-xs hidden sm:inline">{p.category}</span>
          <Button
           type="button"
           variant="secondary"
           size="sm"
           className="h-8"
           onClick={() => startEdit(p)}
          >
           Düzenle
          </Button>
         </div>
        </li>
       ))}
      </ul>
     )}
    </CardContent>
   </Card>

   {showForm && (
    <Card className="overflow-hidden">
     <CardHeader className="flex flex-row items-start justify-between gap-4 border-b bg-muted/20 pb-6">
      <div>
       <CardTitle className="text-xl">{editingId ? "Ürünü düzenle" : "Yeni ürün ekle"}</CardTitle>
       <CardDescription className="mt-1 text-base">
        Zorunlu alanlar * ile işaretlidir. En az bir görsel ekleyin.
       </CardDescription>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={closeForm} className="shrink-0">
       Kapat
      </Button>
     </CardHeader>
     <CardContent className="pt-6">
      <form onSubmit={handleSubmit} className="w-full space-y-10">
       {/* Temel bilgiler */}
       <section className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
         <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <Package className="size-4 text-primary" />
         </div>
         <h3 className="font-semibold text-foreground">Temel bilgiler</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
         <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name" className="text-sm font-medium">Ürün adı *</Label>
          <Input
           id="name"
           value={form.name}
           onChange={(e) => update("name", e.target.value)}
           placeholder="Örn: Apple MacBook Air M3"
           required
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-medium">Slug (URL) *</Label>
          <Input
           id="slug"
           value={form.slug}
           onChange={(e) => update("slug", e.target.value)}
           placeholder="macbook-air-m3"
           required
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">Kategori *</Label>
          <select
           id="category"
           value={form.category}
           onChange={(e) => update("category", e.target.value)}
           required
           className="flex h-11 w-full rounded-xl border border-input/80 bg-muted/30 px-3 py-2 text-sm focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
           {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
             {categoryInfo[cat]?.title ?? cat}
            </option>
           ))}
          </select>
         </div>
         <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description" className="text-sm font-medium">Açıklama *</Label>
          <Textarea
           id="description"
           value={form.description}
           onChange={(e) => update("description", e.target.value)}
           placeholder="Ürün açıklaması"
           rows={4}
           required
           className="rounded-xl border-input/80 bg-muted/30 focus:bg-background resize-none"
          />
         </div>
        </div>
       </section>

       {/* Fiyat & Stok */}
       <section className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
         <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
          <DollarSign className="size-4 text-emerald-600 dark:text-emerald-400" />
         </div>
         <h3 className="font-semibold text-foreground">Fiyat & Stok</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
         <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">Fiyat (₺) *</Label>
          <Input
           id="price"
           type="number"
           min="0"
           step="0.01"
           value={form.price}
           onChange={(e) => update("price", e.target.value)}
           required
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="discountPrice" className="text-sm font-medium">İndirimli fiyat</Label>
          <Input
           id="discountPrice"
           type="number"
           min="0"
           step="0.01"
           value={form.discountPrice}
           onChange={(e) => update("discountPrice", e.target.value)}
           placeholder="Opsiyonel"
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="stock" className="text-sm font-medium">Stok</Label>
          <Input
           id="stock"
           type="number"
           min="0"
           value={form.stock}
           onChange={(e) => update("stock", e.target.value)}
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
        </div>
       </section>

       {/* Görseller */}
       <section className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
         <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10">
          <ImageIcon className="size-4 text-amber-600 dark:text-amber-400" />
         </div>
         <h3 className="font-semibold text-foreground">Görseller *</h3>
         <span className="ml-auto text-sm text-muted-foreground">({form.images.length}/{MAX_IMAGES})</span>
        </div>
        <input
         ref={fileInputRef}
         type="file"
         accept="image/*"
         multiple
         className="hidden"
         onChange={handleFileSelect}
        />
        <Button
         type="button"
         variant="secondary"
         size="lg"
         className="h-12 rounded-xl"
         onClick={triggerFileSelect}
         disabled={form.images.length >= MAX_IMAGES}
        >
         <ImageIcon className="mr-2 size-5" /> Ekle
        </Button>
        {form.images.length >= MAX_IMAGES && (
         <p className="text-sm text-muted-foreground">En fazla {MAX_IMAGES} görsel ekleyebilirsiniz.</p>
        )}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
         {form.images.map((url, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border-2 border-muted bg-muted shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img
            src={url}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
             e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100'/%3E%3Ctext x='50' y='50' fill='%239ca3af' text-anchor='middle' dy='.3em' font-size='11'%3EHata%3C/text%3E%3C/svg%3E";
            }}
           />
           <button
            type="button"
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100"
            onClick={() => removeImage(i)}
            aria-label="Görseli kaldır"
           >
            <X className="size-3.5" />
           </button>
          </div>
         ))}
        </div>
       </section>

       {/* Ürün Özellikleri */}
       <section>
        <button
         type="button"
         className={cn(
          "flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-colors",
          specsOpen ? "border-primary/20 bg-primary/5" : "border-muted bg-muted/30 hover:bg-muted/50"
         )}
         onClick={() => setSpecsOpen(!specsOpen)}
        >
         <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10">
           <ListChecks className="size-4 text-violet-600 dark:text-violet-400" />
          </div>
          <span className="font-semibold text-foreground">Ürün Özellikleri</span>
         </div>
         {specsOpen ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
        </button>
        {specsOpen && (
         <div className="mt-4 space-y-4 rounded-xl border border-muted bg-muted/20 p-4">
          <div className="flex justify-end">
           <Button type="button" variant="secondary" size="sm" className="rounded-lg" onClick={addSpecCategory}>
            + Kategori Ekle
           </Button>
          </div>
          <div className="space-y-4">
           {form.specifications.map((spec, catIndex) => (
            <div key={catIndex} className="rounded-xl border border-muted/80 bg-background p-4 shadow-sm">
             <div className="mb-3 flex items-center gap-2">
              <Input
               value={spec.category}
               onChange={(e) => updateSpecCategory(catIndex, e.target.value)}
               placeholder="Kategori adı (örn: Tasarım, Montaj)"
               className="h-10 rounded-lg font-medium"
              />
              <Button
               type="button"
               variant="ghost"
               size="sm"
               className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
               onClick={() => removeSpecCategory(catIndex)}
              >
               <Trash2 className="size-4" /> Sil
              </Button>
             </div>
             <div className="space-y-2">
              {(spec.items ?? []).map((item, itemIndex) => (
               <div key={itemIndex} className="flex gap-2">
                <Input
                 value={item.key}
                 onChange={(e) => updateSpecItem(catIndex, itemIndex, "key", e.target.value)}
                 placeholder="Özellik adı"
                 className="h-10 flex-1 rounded-lg"
                />
                <Input
                 value={item.value}
                 onChange={(e) => updateSpecItem(catIndex, itemIndex, "value", e.target.value)}
                 placeholder="Değer"
                 className="h-10 flex-1 rounded-lg"
                />
                <button
                 type="button"
                 className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                 onClick={() => removeSpecItem(catIndex, itemIndex)}
                 aria-label="Özelliği sil"
                >
                 <X className="size-4" />
                </button>
               </div>
              ))}
             </div>
             <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2 rounded-lg text-muted-foreground"
              onClick={() => addSpecItem(catIndex)}
             >
              <Plus className="mr-1.5 size-4" /> Özellik Ekle
             </Button>
            </div>
           ))}
          </div>
         </div>
        )}
       </section>

       {/* Marka, Renk, Etiketler */}
       <section className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
         <div className="flex size-8 items-center justify-center rounded-lg bg-slate-500/10">
          <Tag className="size-4 text-slate-600 dark:text-slate-400" />
         </div>
         <h3 className="font-semibold text-foreground">Marka, renk & etiketler</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
         <div className="space-y-2">
          <Label htmlFor="brand" className="text-sm font-medium">Marka</Label>
          <Input
           id="brand"
           value={form.brand}
           onChange={(e) => update("brand", e.target.value)}
           placeholder="Örn: Apple"
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="color" className="text-sm font-medium">Renk</Label>
          <Input
           id="color"
           value={form.color}
           onChange={(e) => update("color", e.target.value)}
           placeholder="Örn: Siyah, Beyaz"
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
         <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="tags" className="text-sm font-medium">Etiketler (virgülle ayırın)</Label>
          <Input
           id="tags"
           value={form.tags}
           onChange={(e) => update("tags", e.target.value)}
           placeholder="laptop, apple, m3"
           className="h-11 rounded-xl border-input/80 bg-muted/30 focus:bg-background"
          />
         </div>
        </div>
       </section>

       {/* Bayraklar & Gönder */}
       <section className="flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-6 rounded-xl border bg-muted/20 p-4">
         <label className="flex cursor-pointer items-center gap-3">
          <Switch
           id="isNewProduct"
           checked={form.isNewProduct}
           onCheckedChange={(v) => update("isNewProduct", v)}
          />
          <span className="text-sm font-medium">Yeni ürün</span>
         </label>
         <label className="flex cursor-pointer items-center gap-3">
          <Switch
           id="isFeatured"
           checked={form.isFeatured}
           onCheckedChange={(v) => update("isFeatured", v)}
          />
          <span className="text-sm font-medium">Öne çıkan</span>
         </label>
        </div>
        <div className="flex gap-2">
         <Button
          type="submit"
          size="lg"
          className="min-w-[140px] rounded-xl"
          disabled={loading}
         >
          {loading ? (editingId ? "Güncelleniyor…" : "Ekleniyor…") : editingId ? "Güncelle" : "Ürün Ekle"}
         </Button>
         {editingId ? (
          <Button type="button" variant="outline" size="lg" className="rounded-xl" onClick={startNew}>
           İptal
          </Button>
         ) : (
          <Button type="button" variant="ghost" size="lg" className="rounded-xl" onClick={closeForm}>
           İptal
          </Button>
         )}
        </div>
       </section>
      </form>
     </CardContent>
    </Card>
   )}
  </div>
 );
}
