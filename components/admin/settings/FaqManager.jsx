"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { FAQ_CATEGORIES } from "./faqConstants";
import FaqDialog from "./FaqDialog";

export default function FaqManager({
  faqs,
  showFaqList,
  onToggleShowList,
  onAddFaq,
  onEditFaq,
  onRemoveFaq,
  onSaveFaqs,
  savingFaqs,
  faqMessage,
  dialogOpen,
  setDialogOpen,
  formFaq,
  setFormFaq,
  editIndex,
  saveFaqFromDialog,
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="size-5 text-emerald-600" />
            Sıkça Sorulan Sorular
          </CardTitle>
          <CardDescription>
            Ana sayfa ve SSS sayfasında gösterilen sorular. Ekleyebilir,
            düzenleyebilir veya silebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onToggleShowList}
              className="gap-2"
            >
              {showFaqList ? (
                <>
                  <EyeOff className="size-4" />
                  Soruları gizle
                </>
              ) : (
                <>
                  <Eye className="size-4" />
                  Soruları gör
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onAddFaq} className="gap-2">
              <Plus className="size-4" />
              Yeni soru ekle
            </Button>
            <Button
              type="button"
              disabled={savingFaqs || faqs.length === 0}
              onClick={onSaveFaqs}
              className="gap-2"
            >
              {savingFaqs ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Kaydediliyor…
                </>
              ) : (
                "SSS listesini kaydet"
              )}
            </Button>
          </div>
          {faqMessage?.text && (
            <p
              className={
                faqMessage.type === "error"
                  ? "text-sm text-red-600 dark:text-red-400"
                  : "text-sm text-emerald-600 dark:text-emerald-400"
              }
            >
              {faqMessage.text}
            </p>
          )}
          {showFaqList && (
            <ul className="space-y-2">
              {faqs.length === 0 ? (
                <li className="rounded-lg border border-dashed bg-muted/30 py-6 text-center text-sm text-muted-foreground">
                  Henüz soru yok. &quot;Yeni soru ekle&quot; ile ekleyin.
                </li>
              ) : (
                faqs.map((faq, index) => (
                  <li
                    key={faq.id || index}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2 text-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-foreground line-clamp-1">
                        {faq.question}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {FAQ_CATEGORIES.find((c) => c.value === faq.category)?.label ??
                          faq.category}
                      </span>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => onEditFaq(index)}
                        aria-label="Düzenle"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => onRemoveFaq(index)}
                        aria-label="Sil"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </CardContent>
      </Card>

      <FaqDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formFaq={formFaq}
        onFormFaqChange={setFormFaq}
        editIndex={editIndex}
        onSave={saveFaqFromDialog}
      />
    </>
  );
}
