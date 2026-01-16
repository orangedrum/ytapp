"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon, CartIcon } from "@/components/ui/icons";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export function LibraryHeader() {
  return (
    <div className="flex flex-col w-full bg-background border-b border-border pb-4">
      
      {/* Top Row: Title and Actions */}
      <div className="flex items-end justify-between px-6 pt-12 pb-4">
        <h2 className="text-h2 font-semibold text-foreground">
          Library
        </h2>
        <div className="flex flex-col items-end gap-1">
          <div className="relative">
            <CartIcon className="w-6 h-6 text-foreground" />
          </div>
          <Link href="#" className="text-xs underline text-foreground">
            show suggested order
          </Link>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex items-center gap-2 px-6 mb-4">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon className="w-6 h-6 text-[#B3B3B3]" />
          </div>
          <Input 
            className="pl-11 pr-10 h-[52px] rounded-[10px] border-[#E6E6E6] text-base" 
            placeholder="Search for classes..." 
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Mic className="w-6 h-6 text-[#B3B3B3]" />
          </div>
        </div>
        <Button 
          variant="default" 
          className="w-[52px] h-[52px] p-0 rounded-[10px] bg-[#1A1A1A] flex items-center justify-center shrink-0"
        >
          <FilterIcon className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Filter Row (Scrollable) */}
      <div className="flex items-center gap-2 px-6 overflow-x-auto no-scrollbar pb-2">
        <Button 
          variant="secondary" 
          className="h-[36px] px-5 rounded-[10px] border border-[#E6E6E6] bg-transparent text-[#1A1A1A] font-medium whitespace-nowrap hover:bg-gray-100"
        >
          All
        </Button>
        <Button 
          variant="default" 
          className="h-[36px] px-5 rounded-[10px] bg-[#1A1A1A] text-white font-medium whitespace-nowrap hover:bg-black/90"
        >
          Leaders
        </Button>
        <Button 
          variant="secondary" 
          className="h-[36px] px-5 rounded-[10px] border border-[#E6E6E6] bg-transparent text-[#1A1A1A] font-medium whitespace-nowrap hover:bg-gray-100"
        >
          Followers
        </Button>
        <Button 
          variant="secondary" 
          className="h-[36px] px-5 rounded-[10px] border border-[#E6E6E6] bg-transparent text-[#1A1A1A] font-medium whitespace-nowrap hover:bg-gray-100"
        >
          Technique
        </Button>
      </div>

    </div>
  );
}