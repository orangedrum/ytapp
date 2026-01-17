"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon } from "@/components/ui/icons";
import { Mic, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { FilterModal } from "@/components/filter-modal";

export function LibraryHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Read active filter from URL, default to 'all'
  // Ensure we handle null or empty string as 'all'
  const activeFilter = (searchParams.get("category") ?? "all").toLowerCase();

  const handleFilterChange = (filter: string) => {
    console.log("LibraryHeader: Handling filter change to:", filter);
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("category");
    } else {
      params.set("category", filter);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex flex-col w-full bg-background border-b border-border pb-4">
        
        {/* Top Row: Title and Actions */}
        <div className="flex items-end justify-between px-6 pt-4 pb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-h2 font-semibold text-foreground">Library</h2>
            <Link href="#" className="text-xs underline text-foreground">show suggested order</Link>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="relative">
              <Bookmark className="w-6 h-6 text-foreground" />
            </div>
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
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FilterIcon className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Filter Row (Scrollable) */}
        <div className="flex items-center gap-2 px-6 overflow-x-auto no-scrollbar pb-2">
          <Button 
            variant={activeFilter === "all" ? "default" : "secondary"}
            className={cn(
              "h-[36px] px-5 rounded-[10px] font-medium whitespace-nowrap",
              activeFilter === "all" 
                ? "bg-[#1A1A1A] text-white hover:bg-black/90" 
                : "border border-[#E6E6E6] bg-transparent text-[#1A1A1A] hover:bg-gray-100"
            )}
            onClick={() => handleFilterChange("all")}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === "suggested" ? "default" : "secondary"}
            className={cn(
              "h-[36px] px-5 rounded-[10px] font-medium whitespace-nowrap",
              activeFilter === "suggested" 
                ? "bg-[#1A1A1A] text-white hover:bg-black/90" 
                : "border border-[#E6E6E6] bg-transparent text-[#1A1A1A] hover:bg-gray-100"
            )}
            onClick={() => handleFilterChange("suggested")}
          >
            Suggested Order
          </Button>
          
          {/* Category Filters */}
          {Object.entries(CATEGORIES).map(([key, { label }]) => (
            <Button 
              key={key}
              variant={activeFilter === key ? "default" : "secondary"}
              className={cn(
                "h-[36px] px-5 rounded-[10px] font-medium whitespace-nowrap",
                activeFilter === key 
                  ? "bg-[#1A1A1A] text-white hover:bg-black/90" 
                  : "border border-[#E6E6E6] bg-transparent text-[#1A1A1A] hover:bg-gray-100"
              )}
              onClick={() => handleFilterChange(key)}
            >
              {label}
            </Button>
          ))}
        </div>

      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        currentCategory={activeFilter}
        onApplyFilter={handleFilterChange}
      />
    </>
  );
}
