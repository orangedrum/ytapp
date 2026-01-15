"use client";

import React from "react";
import Link from "next/link";
import { ChevronIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TitleBarProps {
  title: string;
  backHref?: string;
  className?: string;
}

export function TitleBar({ title, backHref = "/", className }: TitleBarProps) {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3 sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/5", className)}>
      {/* Back Button - Explicit 44px square container */}
      <Link 
        href={backHref} 
        aria-label="Go back"
      >
        <Button variant="ghost" className="-ml-2 text-foreground hover:bg-transparent h-11 w-11 p-0 flex items-center justify-center rounded-full">
            <ChevronIcon className="w-8 h-8 rotate-90" />
        </Button>
      </Link>
      
      {/* Title */}
      <h1 className="text-h4 font-semibold text-foreground">{title}</h1>
      
      {/* Action Button - Explicit 44px square container */}
      <Button variant="ghost" className="-mr-2 text-foreground hover:bg-transparent h-11 w-11 p-0 flex items-center justify-center rounded-full" aria-label="Add to list">
          <PlusIcon className="w-8 h-8" />
      </Button>
    </div>
  );
}
