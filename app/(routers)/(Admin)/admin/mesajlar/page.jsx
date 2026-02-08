"use client";

import { useState, useEffect, useCallback } from "react";
import AdminPageHero from "@/components/admin/AdminPageHero";
import MessageList from "@/components/admin/messages/MessageList";

export default function MesajlarPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchMessages = useCallback(() => {
    fetch("/api/messages")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleRead = async (msg) => {
    const newRead = !msg.isRead;
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, isRead: newRead } : m))
    );
    await fetch(`/api/messages/${msg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: newRead }),
    });
  };

  const deleteMessage = async (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (expandedId === id) setExpandedId(null);
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-8">
      <AdminPageHero
        title="Mesajlar"
        description="İletişim formundan gelen mesajları burada görüntüleyebilir ve yönetebilirsiniz."
      />
      <MessageList
        messages={messages}
        loading={loading}
        unreadCount={unreadCount}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        onToggleRead={toggleRead}
        onDelete={deleteMessage}
      />
    </div>
  );
}
