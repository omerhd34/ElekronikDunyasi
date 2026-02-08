export function timeAgo(dateStr) {
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
