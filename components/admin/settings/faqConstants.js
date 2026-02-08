export const FAQ_CATEGORIES = [
  { value: "genel", label: "Genel" },
  { value: "basvuru", label: "Başvuru" },
  { value: "odemeler", label: "Ödemeler" },
  { value: "faturalandirma", label: "Faturalandırma" },
];

export function parseFaqsFromSettings(settings) {
  if (!settings || typeof settings.faqs !== "string") return [];
  try {
    const arr = JSON.parse(settings.faqs);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
