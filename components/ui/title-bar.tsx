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
    <div className={cn("flex items-center justify-between px-4 py-3 sticky top-0 z-40 bg-background border-b border-border/5", className)}>
      {/* Back Button - Explicit 44px square container using raw Link/div to avoid Button component padding */}
      <Link 
        href={backHref} 
        className="flex items-center justify-center w-[44px] h-[44px] -ml-2 text-foreground hover:opacity-70 transition-opacity"
        aria-label="Go back"
      >
        <ChevronIcon className="w-8 h-8 rotate-90" />
      </Link>
      
      {/* Title */}
      <h1 className="text-h4 font-semibold text-foreground">{title}</h1>
      
      {/* Action Button - Explicit 44px square container using raw button */}
      <button 
        className="flex items-center justify-center w-[44px] h-[44px] -mr-2 text-foreground hover:opacity-70 transition-opacity"
        aria-label="Add to list"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
}
