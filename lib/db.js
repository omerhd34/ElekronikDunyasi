import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

if (!process.env.DATABASE_URL?.trim()) {
  throw new Error(
    "DATABASE_URL tanımlı değil. .env dosyasına ekleyin. Örnek: postgresql://kullanici:sifre@localhost:5432/veritabani_adi"
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
