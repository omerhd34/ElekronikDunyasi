"use client";

import { useState, useEffect } from "react";
import AdminPageHero from "@/components/admin/AdminPageHero";
import AdminStatCards from "@/components/admin/AdminStatCards";
import AdminQuickLinks from "@/components/admin/AdminQuickLinks";

export default function AdminPage() {
  const [productCount, setProductCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/products").then((res) => res.json()).catch(() => []),
      fetch("/api/messages").then((res) => res.json()).catch(() => []),
      fetch("/api/admin/customers").then((res) => res.json()).catch(() => ({ count: 0 })),
    ])
      .then(([products, messages, customers]) => {
        if (!cancelled) {
          if (Array.isArray(products)) setProductCount(products.length);
          if (Array.isArray(messages)) setMessageCount(messages.length);
          setCustomerCount(typeof customers?.count === "number" ? customers.count : 0);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const getStatValue = (key) => {
    if (loading) return null;
    if (key === "products") return productCount;
    if (key === "messages") return messageCount;
    if (key === "customers") return customerCount !== null ? customerCount : "—";
    return "—";
  };

  return (
    <div className="space-y-10">
      <AdminPageHero
        title="Hoş geldiniz"
        description="Yönetim panelinden siparişleri, ürünleri ve mesajları takip edin."
      />
      <AdminStatCards getStatValue={getStatValue} loading={loading} />
      <AdminQuickLinks />
    </div>
  );
}
