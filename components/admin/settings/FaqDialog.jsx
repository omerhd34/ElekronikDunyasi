"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FAQ_CATEGORIES } from "./faqConstants";

export default function FaqDialog({
  open,
  onOpenChange,
  formFaq,
  onFormFaqChange,
  editIndex,
  onSave,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editIndex !== null ? "Soruyu düzenle" : "Yeni soru ekle"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori</label>
            <Select
              value={formFaq.category}
              onValueChange={(v) => onFormFaqChange((p) => ({ ...p, category: v }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FAQ_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Soru</label>
            <Input
              value={formFaq.question}
              onChange={(e) =>
                onFormFaqChange((p) => ({ ...p, question: e.target.value }))
              }
              placeholder="Örn: Kargo süresi ne kadar?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cevap</label>
            <Textarea
              value={formFaq.answer}
              onChange={(e) =>
                onFormFaqChange((p) => ({ ...p, answer: e.target.value }))
              }
              placeholder="Cevap metni..."
              rows={4}
              className="resize-y"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button type="button" onClick={onSave}>
            {editIndex !== null ? "Güncelle" : "Ekle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
