import { MapPin, MapPinned, Pencil, Phone, Star, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const AddressCard = ({ address, onUpdate, onEdit }) => {
 const handleSetDefault = async () => {
  await fetch(`/api/auth/addresses/${address.id}/default`, { method: "PUT" });
  onUpdate();
 };
 const handleDelete = async () => {
  if (!confirm("Bu adresi silmek istediğinize emin misiniz?")) return;
  await fetch(`/api/auth/addresses/${address.id}`, { method: "DELETE" });
  onUpdate();
 };

 return (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
   <div className="mb-3 flex items-start justify-between gap-2">
    <h3 className="font-semibold uppercase text-gray-800">{address.title}</h3>
    {address.isDefault && (
     <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
      <Star className="size-3 fill-current" /> Varsayılan
     </span>
    )}
   </div>
   <p className="font-medium text-gray-900">{address.recipientName}</p>
   <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
    <Phone className="size-4 shrink-0" />{address.phone}
   </p>
   <p className="mt-1 flex items-start gap-2 text-sm text-gray-600">
    <MapPin className="mt-0.5 size-4 shrink-0" />{address.address}
   </p>
   <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
    <MapPinned className="size-4 shrink-0" />{address.district} / {address.city}
   </p>
   <div className="mt-4 flex flex-wrap gap-2">
    {!address.isDefault && (
     <Button size="sm" variant="outline" onClick={handleSetDefault} className="gap-1 text-purple-600 border-purple-200 hover:bg-purple-50">
      <Star className="size-4" /> Varsayılan Yap
     </Button>
    )}
    <Button type="button" size="sm" variant="outline" className="gap-1" onClick={() => onEdit?.(address)}>
     <Pencil className="size-4" />
     Düzenle
    </Button>
    <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={handleDelete}>
     <Trash2 className="size-4" />
     Sil
    </Button>
   </div>
  </div>

 )
}

export default AddressCard


