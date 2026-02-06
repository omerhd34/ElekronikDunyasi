"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Mail,
  MailOpen,
  Trash2,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const dk = Math.floor(diff / 60000);
  if (dk < 1) return "Az önce";
  if (dk < 60) return `${dk} dk önce`;
  const saat = Math.floor(dk / 60);
  if (saat < 24) return `${saat} saat önce`;
  const gun = Math.floor(saat / 24);
  if (gun < 30) return `${gun} gün önce`;
  return new Date(dateStr).toLocaleDateString("tr-TR");
}

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
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Mesajlar
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          İletişim formundan gelen mesajları burada görüntüleyebilir ve
          yönetebilirsiniz.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Gelen Mesajlar</CardTitle>
              <CardDescription className="mt-1 text-base">
                {messages.length > 0
                  ? `${messages.length} mesaj${unreadCount > 0 ? ` · ${unreadCount} okunmamış` : ""}`
                  : "İletişim formu gönderildiğinde mesajlar burada listelenecek."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <Empty className="min-h-[320px] border-0 py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="mb-4">
                  <MessageSquare className="size-8 text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle className="text-xl">Henüz mesaj yok</EmptyTitle>
                <EmptyDescription className="mt-2 max-w-md text-base">
                  Müşteriler iletişim formunu kullandığında mesajlar burada
                  görünecek.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="divide-y">
              {messages.map((msg) => {
                const isExpanded = expandedId === msg.id;
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "transition-colors",
                      !msg.isRead && "bg-blue-50/50 dark:bg-blue-950/10"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedId(isExpanded ? null : msg.id);
                        if (!msg.isRead) toggleRead(msg);
                      }}
                      className="flex w-full items-center gap-4 px-6 py-4 text-left cursor-pointer hover:bg-muted/30 transition-colors"
                    >
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-full",
                          msg.isRead
                            ? "bg-muted text-muted-foreground"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                        )}
                      >
                        {msg.isRead ? (
                          <MailOpen className="size-5" />
                        ) : (
                          <Mail className="size-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "truncate text-sm",
                              msg.isRead
                                ? "font-medium text-foreground"
                                : "font-bold text-foreground"
                            )}
                          >
                            {msg.name}
                          </span>
                          {!msg.isRead && (
                            <span className="shrink-0 rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                              Yeni
                            </span>
                          )}
                        </div>
                        <p className="truncate text-sm text-muted-foreground">
                          {msg.subject || msg.body}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden text-xs text-muted-foreground sm:block">
                          {timeAgo(msg.createdAt)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="size-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="size-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t bg-muted/10 px-6 py-5">
                        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <User className="size-4" />
                            {msg.name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Mail className="size-4" />
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-primary hover:underline"
                            >
                              {msg.email}
                            </a>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-4" />
                            {new Date(msg.createdAt).toLocaleString("tr-TR")}
                          </span>
                        </div>
                        {msg.subject && (
                          <p className="mb-2 text-sm font-semibold text-foreground">
                            Konu: {msg.subject}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                          {msg.body}
                        </p>
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleRead(msg)}
                            className="gap-1.5 text-xs"
                          >
                            {msg.isRead ? (
                              <>
                                <Mail className="size-3.5" /> Okunmadı İşaretle
                              </>
                            ) : (
                              <>
                                <MailOpen className="size-3.5" /> Okundu İşaretle
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteMessage(msg.id)}
                            className="gap-1.5 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="size-3.5" /> Sil
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
