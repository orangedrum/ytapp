import * as React from "react";
import { cn } from "@/lib/utils";
import { getCategoryData } from "@/lib/categories";

interface VerticalCategoryTagProps {
  category: string;
  className?: string;
}

const VerticalCategoryTag: React.FC<VerticalCategoryTagProps> = ({
  category,
  className,
}) => {
  const { color, abbreviation } = getCategoryData(category);

  return (
    <div className={cn("relative flex w-[20px] sm:w-[25px] h-full flex-col justify-center items-center flex-shrink-0", className)}>
      <div className={cn("absolute left-0 top-0 w-full h-full rounded-l-[8px]", color)} />
      <div className="absolute z-10 flex items-center justify-center w-[60px] h-[20px] sm:w-[53px] sm:h-[25px] -rotate-90 origin-center">
        <span className="text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-none whitespace-nowrap font-mono">
          {abbreviation}
        </span>
      </div>
    </div>
  );
};

VerticalCategoryTag.displayName = "VerticalCategoryTag";

export { VerticalCategoryTag };