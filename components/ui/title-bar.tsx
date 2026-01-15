"use client";

import React from "react";
import Link from "next/link";
import { ChevronIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

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
        className="flex items-center justify-center w-[44px] h-[44px] -ml-2 text-foreground hover:opacity-70 transition-opacity"
        aria-label="Go back"
      >
        <ChevronIcon className="w-6 h-6 rotate-90" />
      </Link>
      
      {/* Title */}
      <h1 className="text-h4 font-semibold text-foreground">{title}</h1>
      
      {/* Action Button - Explicit 44px square container */}
      <button 
        className="flex items-center justify-center w-[44px] h-[44px] -mr-2 text-foreground hover:opacity-70 transition-opacity"
        aria-label="Add to list"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
