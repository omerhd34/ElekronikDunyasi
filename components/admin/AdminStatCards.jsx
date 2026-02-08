"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminStatCards } from "./adminConstants";
import { cn } from "@/lib/utils";

export default function AdminStatCards({ getStatValue, loading }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {adminStatCards.map((stat) => (
        <Card
          key={stat.key}
          className="overflow-hidden transition-shadow hover:shadow-md"
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-lg",
                stat.bgColor,
                stat.color
              )}
            >
              <stat.icon className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-9 w-20 animate-pulse rounded bg-muted" />
            ) : (
              <span className="text-2xl font-bold tabular-nums md:text-3xl">
                {getStatValue(stat.key)}
              </span>
            )}
            <p className="mt-1.5 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
