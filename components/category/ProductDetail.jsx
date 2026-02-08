"use client";

import { useState, useEffect } from "react";
import { categoryInfo } from "@/lib/product-utils";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductPriceCard from "./ProductPriceCard";
import ProductServices from "./ProductServices";
import ProductDescription from "./ProductDescription";
import ProductSpecs from "./ProductSpecs";
import SimilarProducts from "./SimilarProducts";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import ProductNotFound from "./ProductNotFound";

export default function ProductDetail({ categorySlug, productSlug }) {
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [similarProducts, setSimilarProducts] = useState([]);
 const [similarLoading, setSimilarLoading] = useState(true);

 const { addItem, removeItem, items } = useCart();
 const inCart = product
  ? items.some((i) => i.productId === String(product.id))
  : false;
 const { isFavorite, toggleFavorite } = useFavorites();

 useEffect(() => {
  if (!productSlug) {
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setProduct(null);
   setLoading(false);
   return;
  }
  setLoading(true);
  fetch(`/api/products/${encodeURIComponent(productSlug)}`)
   .then((r) => (r.ok ? r.json() : null))
   .then((p) => {
    setProduct(p);
    setLoading(false);
   })
   .catch(() => {
    setProduct(null);
    setLoading(false);
   });
 }, [productSlug]);

 useEffect(() => {
  if (!product?.category || !product?.id) return;
  let cancelled = false;
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setSimilarLoading(true);
  fetch(`/api/products?category=${encodeURIComponent(product.category)}`)
   .then((r) => (r.ok ? r.json() : []))
   .then((list) => {
    if (cancelled) return;
    setSimilarProducts(
     list.filter((p) => p.id !== product.id).slice(0, 8)
    );
    setSimilarLoading(false);
   })
   .catch(() => {
    if (cancelled) return;
    setSimilarProducts([]);
    setSimilarLoading(false);
   });
  return () => {
   cancelled = true;
  };
 }, [product?.category, product?.id]);

 const category = categoryInfo[categorySlug];

 const images =
  product?.images?.length > 0
   ? product.images
   : product?.image
    ? [product.image]
    : [];

 const prevImage = () => {
  setCurrentImageIndex((prev) =>
   prev === 0 ? images.length - 1 : prev - 1
  );
 };

 const nextImage = () => {
  setCurrentImageIndex((prev) =>
   prev === images.length - 1 ? 0 : prev + 1
  );
 };

 if (loading) return <ProductDetailSkeleton />;
 if (!product) return <ProductNotFound />;

 const categoryTitle =
  category?.title ??
  categoryInfo[product.category]?.title ??
  product.category;

 return (
  <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
   <div className="container px-4 py-6 md:py-10">
    <ProductBreadcrumb
     categoryTitle={categoryTitle}
     categorySlug={product.category}
     productName={product.name}
    />

    <div className="grid gap-8 lg:grid-cols-5 lg:gap-14">
     <div className="lg:col-span-2">
      <ProductGallery
       productName={product.name}
       images={images}
       currentIndex={currentImageIndex}
       onPrev={prevImage}
       onNext={nextImage}
       onSelectIndex={setCurrentImageIndex}
       discountPercent={product.discount ?? 0}
       isNew={product.isNew}
      />
     </div>

     <div className="lg:col-span-3">
      <ProductInfo
       name={product.name}
       brand={product.brand}
       rating={product.rating}
       reviewCount={product.reviewCount}
      />

      <ProductPriceCard
       product={product}
       inCart={inCart}
       isFavorite={isFavorite(product.id)}
       onAddToCart={() =>
        inCart ? removeItem(product.id) : addItem(product.id, 1)
       }
       onToggleFavorite={() => toggleFavorite(product.id)}
      />

      <ProductServices />
      <ProductDescription description={product.description} />
     </div>
    </div>

    <ProductSpecs
     specifications={product.specifications}
     specs={product.specs}
    />

    <SimilarProducts
     products={similarProducts}
     loading={similarLoading}
    />
   </div>
  </div>
 );
}
