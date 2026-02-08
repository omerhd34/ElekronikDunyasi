import { Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const CardCard = ({ card, onUpdate, onEdit }) => {
 const handleSetDefault = async () => {
  await fetch(`/api/auth/cards/${card.id}/default`, { method: "PUT" });
  onUpdate();
 };
 const handleDelete = async () => {
  if (!confirm("Bu kartı silmek istediğinize emin misiniz?")) return;
  await fetch(`/api/auth/cards/${card.id}`, { method: "DELETE" });
  onUpdate();
 };

 return (
  <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
   <div className="mb-3 flex items-start justify-between gap-2">
    <h3 className="font-semibold text-gray-800">{card.title} •••• {card.last4}</h3>
    {card.isDefault && (
     <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
      <Star className="size-3 fill-current" /> Varsayılan
     </span>
    )}
   </div>
   <p className="text-sm text-gray-600">Kart Sahibi: {card.cardHolder}</p>
   <p className="text-sm text-gray-600">Son Kullanma: {card.expiryMonth}/{card.expiryYear}</p>
   <div className="mt-4 flex flex-wrap gap-2">
    {!card.isDefault && (
     <Button size="sm" variant="outline" onClick={handleSetDefault} className="gap-1 text-purple-600 border-purple-200 hover:bg-purple-50">
      <Star className="size-4" /> Varsayılan Yap
     </Button>
    )}
    <Button type="button" size="sm" variant="outline" className="gap-1" onClick={() => onEdit?.(card)}><Pencil className="size-4" /> Düzenle</Button>
    <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={handleDelete}><Trash2 className="size-4" /> Sil</Button>
   </div>
  </div>

 )
}

export default CardCard
