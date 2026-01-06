import * as React from "react";
import { cn } from "@/lib/utils";

// Centralized map for category styles
const categoryStyles: Record<string, { color: string; abbreviation: string }> = {
  adorn: { color: "bg-[#F42495]", abbreviation: "ADORN" },
  technique: { color: "bg-[#F49524]", abbreviation: "TECH" },
  posture: { color: "bg-[#18C2CD]", abbreviation: "POS" },
  lead: { color: "bg-[#1873CD]", abbreviation: "LEAD" },
  musicality: { color: "bg-[#9747FF]", abbreviation: "MUSIC" },
  connection: { color: "bg-purple-500", abbreviation: "CONN" }, // Placeholder from before, kept for demo
};

interface VerticalCategoryTagProps {
  category: string;
  className?: string;
}

const VerticalCategoryTag: React.FC<VerticalCategoryTagProps> = ({
  category,
  className,
}) => {
  const style = categoryStyles[category.toLowerCase()];
  const bgColorClass = style ? style.color : "bg-gray-500";
  const label = style ? style.abbreviation : category.substring(0, 4).toUpperCase();

  return (
    <div className={cn("relative flex w-[20px] sm:w-[25px] h-full flex-col justify-center items-center flex-shrink-0", className)}>
      <div className={cn("absolute left-0 top-0 w-full h-full rounded-l-[8px]", bgColorClass)} />
      <div className="absolute z-10 flex items-center justify-center w-[60px] h-[20px] sm:w-[53px] sm:h-[25px] -rotate-90 origin-center">
        <span className="text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-none whitespace-nowrap font-mono">
          {label}
        </span>
      </div>
    </div>
  );
};

VerticalCategoryTag.displayName = "VerticalCategoryTag";

export { VerticalCategoryTag };