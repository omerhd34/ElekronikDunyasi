"use client";

import { Mail, MailOpen, Trash2, User, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { timeAgo } from "./timeAgo";

export default function MessageItem({
  msg,
  isExpanded,
  onToggleExpand,
  onToggleRead,
  onDelete,
}) {
  return (
    <div
      className={cn(
        "transition-colors",
        !msg.isRead && "bg-blue-50/50 dark:bg-blue-950/10"
      )}
    >
      <button
        type="button"
        onClick={() => {
          onToggleExpand(msg.id);
          if (!msg.isRead) onToggleRead(msg);
        }}
        className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/30"
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
              onClick={() => onToggleRead(msg)}
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
              onClick={() => onDelete(msg.id)}
              className="gap-1.5 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="size-3.5" /> Sil
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
