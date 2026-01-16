"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const BagIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.0833 3.375H3.71914C3.22595 3.375 2.75296 3.57254 2.40422 3.92417C2.05549 4.27581 1.85957 4.75272 1.85957 5.25V18.75C1.85957 19.2473 2.05549 19.7242 2.40422 20.0758C2.75296 20.4275 3.22595 20.625 3.71914 20.625H20.0833C20.5765 20.625 21.0495 20.4275 21.3983 20.0758C21.747 19.7242 21.9429 19.2473 21.9429 18.75V5.25C21.9429 4.75272 21.747 4.27581 21.3983 3.92417C21.0495 3.57254 20.5765 3.375 20.0833 3.375ZM19.7114 18.375H4.09105V5.625H19.7114V18.375ZM7.06636 8.25C7.06636 7.95163 7.18391 7.66548 7.39316 7.4545C7.6024 7.24353 7.88619 7.125 8.1821 7.125C8.47802 7.125 8.76181 7.24353 8.97105 7.4545C9.1803 7.66548 9.29785 7.95163 9.29785 8.25C9.29785 8.94619 9.57213 9.61387 10.0604 10.1062C10.5486 10.5984 11.2108 10.875 11.9012 10.875C12.5917 10.875 13.2539 10.5984 13.7421 10.1062C14.2304 9.61387 14.5046 8.94619 14.5046 8.25C14.5046 7.95163 14.6222 7.66548 14.8314 7.4545C15.0407 7.24353 15.3245 7.125 15.6204 7.125C15.9163 7.125 16.2001 7.24353 16.4093 7.4545C16.6186 7.66548 16.7361 7.95163 16.7361 8.25C16.7361 9.54293 16.2267 10.7829 15.32 11.6971C14.4133 12.6114 13.1835 13.125 11.9012 13.125C10.619 13.125 9.38918 12.6114 8.48247 11.6971C7.57575 10.7829 7.06636 9.54293 7.06636 8.25Z" fill="currentColor"></path>
  </svg>
);

const MicIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 16.125C13.2925 16.1235 14.5316 15.6094 15.4455 14.6955C16.3594 13.7816 16.8735 12.5425 16.875 11.25V6C16.875 4.70707 16.3614 3.46709 15.4471 2.55285C14.5329 1.63861 13.2929 1.125 12 1.125C10.7071 1.125 9.46709 1.63861 8.55285 2.55285C7.63861 3.46709 7.125 4.70707 7.125 6V11.25C7.12649 12.5425 7.64058 13.7816 8.5545 14.6955C9.46842 15.6094 10.7075 16.1235 12 16.125ZM9.375 6C9.375 5.30381 9.65156 4.63613 10.1438 4.14384C10.6361 3.65156 11.3038 3.375 12 3.375C12.6962 3.375 13.3639 3.65156 13.8562 4.14384C14.3484 4.63613 14.625 5.30381 14.625 6V11.25C14.625 11.9462 14.3484 12.6139 13.8562 13.1062C13.3639 13.5984 12.6962 13.875 12 13.875C11.3038 13.875 10.6361 13.5984 10.1438 13.1062C9.65156 12.6139 9.375 11.9462 9.375 11.25V6ZM13.125 19.8019V21.75C13.125 22.0484 13.0065 22.3345 12.7955 22.5455C12.5845 2.7565 12.2984 22.875 12 22.875C11.7016 22.875 11.4155 22.7565 11.2045 22.5455C10.9935 22.3345 10.875 22.0484 10.875 21.75V19.8019C8.80129 19.5262 6.89805 18.5074 5.51871 16.9347C4.13937 15.3619 3.37765 13.342 3.375 11.25C3.375 10.9516 3.49353 10.6655 3.7045 10.4545C3.91548 10.2435 4.20163 10.125 4.5 10.125C4.79837 10.125 5.08452 10.2435 5.2955 10.4545C5.50647 10.6655 5.625 10.9516 5.625 11.25C5.625 12.9408 6.29665 14.5623 7.49219 15.7578C8.68774 16.9534 10.3092 17.625 12 17.625C13.6908 17.625 15.3123 16.9534 16.5078 15.7578C17.7034 14.5623 18.375 12.9408 18.375 11.25C18.375 10.9516 18.4935 10.6655 18.7045 10.4545C18.9155 10.2435 19.2016 10.125 19.5 10.125C19.7984 10.125 20.0845 10.2435 20.2955 10.4545C20.5065 10.6655 20.625 10.9516 20.625 11.25C20.6223 13.342 19.8606 15.3619 18.4813 16.9347C17.1019 18.5074 15.1987 19.5262 13.125 19.8019Z" fill="currentColor"></path>
  </svg>
);

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
            <BagIcon className="w-6 h-6 text-foreground" />
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
            <MicIcon className="w-6 h-6 text-[#B3B3B3]" />
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