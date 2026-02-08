"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import AdminPageHero from "@/components/admin/AdminPageHero";
import ShippingCostCard from "@/components/admin/settings/ShippingCostCard";
import FaqManager from "@/components/admin/settings/FaqManager";
import { parseFaqsFromSettings } from "@/components/admin/settings/faqConstants";

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
  const [formFaq, setFormFaq] = useState({
    id: "",
    category: "genel",
    question: "",
    answer: "",
  });
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
    setFaqMessage({
      type: "success",
      text: "Listeden kaldırıldı. Değişiklikleri kaydetmek için 'SSS listesini kaydet' butonuna tıklayın.",
    });
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
    setFaqMessage({
      type: "success",
      text: "Listeye eklendi/güncellendi. Kalıcı olması için 'SSS listesini kaydet' butonuna tıklayın.",
    });
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
      <AdminPageHero
        title="Ayarlar"
        description="Site ve sipariş ayarlarını buradan yönetebilirsiniz."
      />
      <ShippingCostCard
        shippingCost={shippingCost}
        onShippingCostChange={setShippingCost}
        saving={saving}
        onSave={handleShippingSubmit}
        message={message}
      />
      <FaqManager
        faqs={faqs}
        showFaqList={showFaqList}
        onToggleShowList={() => setShowFaqList((v) => !v)}
        onAddFaq={openAddFaq}
        onEditFaq={openEditFaq}
        onRemoveFaq={removeFaq}
        onSaveFaqs={handleSaveFaqs}
        savingFaqs={savingFaqs}
        faqMessage={faqMessage}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        formFaq={formFaq}
        setFormFaq={setFormFaq}
        editIndex={editIndex}
        saveFaqFromDialog={saveFaqFromDialog}
      />
    </div>
  );
}
