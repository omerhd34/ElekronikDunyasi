"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { adminQuickLinks } from "./adminConstants";

export default function AdminQuickLinks() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Hızlı Erişim</CardTitle>
        <CardDescription className="text-base">
          Sık kullandığınız sayfalara kısayollar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {adminQuickLinks.map((item) => (
            <Button
              key={item.href}
              variant="outline"
              className="flex h-auto w-full justify-between gap-4 py-5 pl-4 pr-4 text-left transition-colors hover:bg-muted/50"
              asChild
            >
              <Link href={item.href}>
                <span className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <item.icon className="size-5 text-muted-foreground" />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
