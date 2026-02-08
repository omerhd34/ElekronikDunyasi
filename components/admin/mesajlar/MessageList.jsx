"use client";

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
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import MessageItem from "./MessageItem";

export default function MessageList({
  messages,
  loading,
  unreadCount,
  expandedId,
  setExpandedId,
  onToggleRead,
  onDelete,
}) {
  return (
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
            {messages.map((msg) => (
              <MessageItem
                key={msg.id}
                msg={msg}
                isExpanded={expandedId === msg.id}
                onToggleExpand={(id) =>
                  setExpandedId((prev) => (prev === id ? null : id))
                }
                onToggleRead={onToggleRead}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
