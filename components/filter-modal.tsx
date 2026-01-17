"use client";

import React, { useState, useEffect } from "react";
import { XIcon, CheckIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: string;
  onApplyFilter: (category: string) => void;
}

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-start gap-4 w-full px-6">
    <div className="text-sm font-bold text-black text-center mt-2 w-full">{title}</div>
    <div className="flex flex-col items-start w-full gap-3">
      {children}
    </div>
  </div>
);

const RadioOption = ({ label, checked, onClick }: { label: string; checked?: boolean; onClick: () => void }) => (
  <div className="flex min-w-[120px] items-center gap-3 w-full cursor-pointer" onClick={onClick}>
    <div className="w-4 h-4 rounded-full border border-[#757575] flex items-center justify-center flex-shrink-0">
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#1E1E1E]" />}
    </div>
    <div className="flex-1 text-base font-normal text-[#1E1E1E]">{label}</div>
  </div>
);

const CheckboxOption = ({ label, checked, onClick }: { label: string; checked?: boolean; onClick: () => void }) => (
  <div className="flex min-w-[120px] items-center gap-3 w-full cursor-pointer" onClick={onClick}>
    <div className={cn(
      "w-4 h-4 rounded flex items-center justify-center flex-shrink-0",
      checked ? "bg-[#2C2C2C]" : "border border-[#757575] bg-white"
    )}>
      {checked && <CheckIcon className="w-3 h-3 text-[#F5F5F5]" />}
    </div>
    <div className="flex-1 text-base font-normal text-[#1E1E1E]">{label}</div>
  </div>
);

export function FilterModal({ isOpen, onClose, currentCategory, onApplyFilter }: FilterModalProps) {
  // Local state for filters
  const [role, setRole] = useState("Both");
  const [level, setLevel] = useState("Foundamentals");
  const [length, setLength] = useState<string[]>([]);
  const [sessionType, setSessionType] = useState("All");
  
  // Focuses state - mapping "Technique" to the category prop
  const [focuses, setFocuses] = useState<string[]>([]);

  // Sync local state with incoming props when modal opens
  useEffect(() => {
    if (isOpen) {
      // Normalize comparison to handle potential case mismatches
      if (currentCategory.toLowerCase() === 'technique') {
        setFocuses(['Technique']);
      } else {
        // If current category is NOT technique (e.g. 'all' or something else), 
        // ensure Technique is NOT checked in the modal unless user checked it previously in this session (which resets on close/open usually, but here we want to reflect URL)
        setFocuses([]);
      }
    }
  }, [isOpen, currentCategory]);

  const toggleCheckbox = (state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => 
      prev.includes(value) 
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    // If "Technique" is selected in focuses, apply that category
    if (focuses.includes("Technique")) {
      onApplyFilter("technique");
    } else {
      // If Technique is NOT selected, we default to 'all' (or whatever logic implies "no specific focus filter")
      // This ensures that unchecking "Technique" and hitting apply clears the filter.
      onApplyFilter("all");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto font-sans">
      {/* Header */}
      <div className="relative w-full h-[172px] flex-shrink-0 border-b border-[#CCC] bg-white">
        {/* Back Arrow */}
        <button 
          onClick={onClose}
          className="absolute left-6 top-[61px] w-6 h-6 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.375 12C21.375 12.2984 21.2565 12.5846 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H6.46875L11.2988 17.9541C11.5101 18.1654 11.6288 18.4521 11.6288 18.751C11.6288 19.0499 11.5101 19.3365 11.2988 19.5478C11.0874 19.7592 10.8008 19.8779 10.5019 19.8779C10.203 19.8779 9.91635 19.7592 9.705 19.5478L2.955 12.7978C2.85012 12.6933 2.76691 12.5691 2.71012 12.4324C2.65334 12.2956 2.62411 12.149 2.62411 12.001C2.62411 11.8529 2.65334 11.7063 2.71012 11.5696C2.76691 11.4328 2.85012 11.3086 2.955 11.2041L9.705 4.4541C9.80965 4.34945 9.93388 4.26644 10.0706 4.20981C10.2073 4.15317 10.3539 4.12402 10.5019 4.12402C10.6499 4.12402 10.7964 4.15317 10.9331 4.20981C11.0699 4.26644 11.1941 4.34945 11.2988 4.4541C11.4034 4.55875 11.4864 4.68298 11.543 4.81971C11.5997 4.95644 11.6288 5.10298 11.6288 5.25097C11.6288 5.39897 11.5997 5.54551 11.543 5.68224C11.4864 5.81897 11.4034 5.9432 11.2988 6.04785L6.46875 10.875H20.25C20.5484 10.875 20.8345 10.9936 21.0455 11.2045C21.2565 11.4155 21.375 11.7017 21.375 12Z" fill="#1A1A1A"></path>
          </svg>
        </button>

        {/* Title */}
        <div className="absolute left-1/2 top-[59px] -translate-x-1/2 text-24 font-semibold text-[#1A1A1A] leading-[120%]">
          Filters
        </div>

        {/* Cancel Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-[59px] w-6 h-6 cursor-pointer"
        >
          <XIcon className="w-6 h-6 text-[#1A1A1A]" />
        </button>

        {/* Go to Sort Button */}
        <div className="absolute left-6 right-6 top-[102px]">
          <Button 
            variant="outline" 
            className="w-full h-[54px] flex justify-center items-center gap-2.5 rounded-[10px] border-[#CCC] text-base font-medium text-[#1A1A1A]"
            onClick={handleApply}
          >
            Go to Sort
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Filters Content */}
      <div className="flex flex-col items-start gap-4 mt-8 pb-8 w-full max-w-md mx-auto">
        
        <FilterSection title="Role">
          <RadioOption label="Follower" checked={role === "Follower"} onClick={() => setRole("Follower")} />
          <RadioOption label="Leader" checked={role === "Leader"} onClick={() => setRole("Leader")} />
          <RadioOption label="Both" checked={role === "Both"} onClick={() => setRole("Both")} />
        </FilterSection>

        <FilterSection title="Level">
          <RadioOption label="Foundamentals" checked={level === "Foundamentals"} onClick={() => setLevel("Foundamentals")} />
          <RadioOption label="Level 1" checked={level === "Level 1"} onClick={() => setLevel("Level 1")} />
          <RadioOption label="Level 2" checked={level === "Level 2"} onClick={() => setLevel("Level 2")} />
          <RadioOption label="Level 3" checked={level === "Level 3"} onClick={() => setLevel("Level 3")} />
        </FilterSection>

        <FilterSection title="Length of Time">
          <CheckboxOption label="> 5 min" checked={length.includes("> 5 min")} onClick={() => toggleCheckbox(length, setLength, "> 5 min")} />
          <CheckboxOption label="> 15 min" checked={length.includes("> 15 min")} onClick={() => toggleCheckbox(length, setLength, "> 15 min")} />
          <CheckboxOption label="> 30 min" checked={length.includes("> 30 min")} onClick={() => toggleCheckbox(length, setLength, "> 30 min")} />
        </FilterSection>

        <FilterSection title="Session Type">
          <RadioOption label="Practice Along" checked={sessionType === "Practice Along"} onClick={() => setSessionType("Practice Along")} />
          <RadioOption label="Instructional Class" checked={sessionType === "Instructional Class"} onClick={() => setSessionType("Instructional Class")} />
          <RadioOption label="Both" checked={sessionType === "Both"} onClick={() => setSessionType("Both")} />
          <RadioOption label="All" checked={sessionType === "All"} onClick={() => setSessionType("All")} />
        </FilterSection>

        <FilterSection title="Focuses">
          <CheckboxOption label="Posture" checked={focuses.includes("Posture")} onClick={() => toggleCheckbox(focuses, setFocuses, "Posture")} />
          <CheckboxOption label="Walk" checked={focuses.includes("Walk")} onClick={() => toggleCheckbox(focuses, setFocuses, "Walk")} />
          <CheckboxOption label="Balance" checked={focuses.includes("Balance")} onClick={() => toggleCheckbox(focuses, setFocuses, "Balance")} />
          <CheckboxOption label="Musicality" checked={focuses.includes("Musicality")} onClick={() => toggleCheckbox(focuses, setFocuses, "Musicality")} />
          <CheckboxOption label="Strength" checked={focuses.includes("Strength")} onClick={() => toggleCheckbox(focuses, setFocuses, "Strength")} />
          <CheckboxOption label="Sequences" checked={focuses.includes("Sequences")} onClick={() => toggleCheckbox(focuses, setFocuses, "Sequences")} />
          <CheckboxOption label="Adornos (boleos, gonchos)" checked={focuses.includes("Adornos (boleos, gonchos)")} onClick={() => toggleCheckbox(focuses, setFocuses, "Adornos (boleos, gonchos)")} />
          <CheckboxOption label="Technique" checked={focuses.includes("Technique")} onClick={() => toggleCheckbox(focuses, setFocuses, "Technique")} />
          <CheckboxOption label="Disassociation" checked={focuses.includes("Disassociation")} onClick={() => toggleCheckbox(focuses, setFocuses, "Disassociation")} />
          <CheckboxOption label="Embrace" checked={focuses.includes("Embrace")} onClick={() => toggleCheckbox(focuses, setFocuses, "Embrace")} />
        </FilterSection>

      </div>
    </div>
  );
}
