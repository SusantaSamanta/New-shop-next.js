"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductPagination() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">1</span> to{" "}
        <span className="font-medium">10</span> of{" "}
        <span className="font-medium">1286</span> products
      </p>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button size="icon">1</Button>

        <Button variant="outline" size="icon">
          2
        </Button>

        <Button variant="outline" size="icon">
          3
        </Button>

        <Button variant="outline" size="icon">
          4
        </Button>

        <Button variant="outline" size="icon">
          5
        </Button>

        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}