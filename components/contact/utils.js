import { CALISMA_SAATLERI } from "./constants";

export function getGunIndex(jsDay) {
  return (jsDay + 6) % 7;
}

export function saatToDakika(saatStr) {
  const [s, d] = saatStr.split(":").map(Number);
  return s * 60 + d;
}

export function suanAcikMi() {
  const now = new Date();
  const gun = getGunIndex(now.getDay());
  const toplamDakika = now.getHours() * 60 + now.getMinutes();
  const { acilis, kapanis } = CALISMA_SAATLERI[gun];
  return (
    toplamDakika >= saatToDakika(acilis) &&
    toplamDakika < saatToDakika(kapanis)
  );
}
