
export function normalizeProduct(dbProduct) {
 if (!dbProduct) return null;
 const images = dbProduct.images ?? [];
 const listPrice = Number(dbProduct.price);
 const discountPrice =
  dbProduct.discountPrice != null ? Number(dbProduct.discountPrice) : null;
 const discount =
  discountPrice != null && listPrice > 0
   ? Math.round(((listPrice - discountPrice) / listPrice) * 100)
   : 0;
 const specs = (dbProduct.specifications ?? [])
  .flatMap((spec) => (spec.items ?? []).map((item) => item.value))
  .filter(Boolean);
 return {
  id: dbProduct.id,
  name: dbProduct.name,
  slug: dbProduct.slug,
  category: dbProduct.category,
  price: discountPrice != null ? discountPrice : listPrice,
  oldPrice: discountPrice != null ? listPrice : null,
  discount,
  image: images[0] ?? "",
  images,
  rating: Number(dbProduct.rating ?? 0),
  reviewCount: Number(dbProduct.reviewCount ?? 0),
  isNew: Boolean(dbProduct.isNewProduct),
  inStock: (dbProduct.stock ?? 0) > 0,
  stock: dbProduct.stock ?? 0,
  specs,
  description: dbProduct.description,
  brand: dbProduct.brand ?? "",
  color: dbProduct.color ?? "",
  specifications: dbProduct.specifications ?? [],
  isFeatured: Boolean(dbProduct.isFeatured),
  soldCount: dbProduct.soldCount ?? 0,
  viewCount: dbProduct.viewCount ?? 0,
  createdAt: dbProduct.createdAt ? new Date(dbProduct.createdAt).getTime() : 0,
 };
}

export function formatPrice(price) {
 return new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
 }).format(price);
}

export const categoryInfo = {
 "bilgisayar-tablet": {
  title: "Bilgisayar ve Tablet",
  description: "En yeni dizüstü bilgisayarlar, tabletler ve aksesuarlar",
  banner: "https://picsum.photos/seed/computers/1200/300",
 },
 kamera: {
  title: "Kamera",
  description: "Profesyonel fotoğraf makineleri ve video ekipmanları",
  banner: "https://picsum.photos/seed/cameras/1200/300",
 },
 "sarj-pil": {
  title: "Şarj & Pil",
  description: "Powerbank, şarj aletleri ve pil çeşitleri",
  banner: "https://picsum.photos/seed/charging/1200/300",
 },
 kulaklik: {
  title: "Kulaklık",
  description: "Kablosuz kulaklıklar ve ses sistemleri",
  banner: "https://picsum.photos/seed/headphones/1200/300",
 },
 "saat-akilli-saat": {
  title: "Saat & Giyilebilir",
  description: "Akıllı saatler ve fitness takip cihazları",
  banner: "https://picsum.photos/seed/watches/1200/300",
 },
 "kucuk-ev-aletleri": {
  title: "Küçük Ev Aletleri",
  description: "Elektrikli süpürgeler, temizlik ve bakım ürünleri",
  banner: "https://picsum.photos/seed/appliances/1200/300",
 },
 mutfak: {
  title: "Mutfak",
  description: "Mutfak robotları, kahve makineleri ve blenderlar",
  banner: "https://picsum.photos/seed/kitchen/1200/300",
 },
 "el-aletleri": {
  title: "El Aletleri",
  description: "Profesyonel ve hobi amaçlı el aletleri",
  banner: "https://picsum.photos/seed/tools/1200/300",
 },
};
