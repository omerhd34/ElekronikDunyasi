import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const DEFAULT_SHIPPING_COST = 140;

export async function GET() {
 try {
  const setting = await prisma.siteSetting.findUnique({
   where: { key: "shipping_cost" },
  });
  const value = setting?.value;
  const shippingCost =
   value != null && !Number.isNaN(Number(value))
    ? Number(value)
    : DEFAULT_SHIPPING_COST;
  return NextResponse.json({ shippingCost });
 } catch (error) {
  return NextResponse.json(
   { shippingCost: DEFAULT_SHIPPING_COST },
   { status: 200 }
  );
 }
}
