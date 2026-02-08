"use client";

import { use } from "react";
import CategoryListing from "@/components/category/CategoryListing";

export default function KategoriPage({ params }) {
 const { slug } = use(params);
 return <CategoryListing slug={slug} />;
}
