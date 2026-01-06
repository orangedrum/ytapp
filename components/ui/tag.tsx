import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] border-[0.5px] text-[11px] font-medium h-6 tracking-[0.5px]",
  {
    variants: {
      variant: {
        watch: "border-black bg-[#DBFFFB] text-foreground",
        dance: "border-blue-300 bg-blue-50 text-blue-800",
        explanation: "border-yellow-300 bg-yellow-50 text-yellow-800",
      },
      size: {
        default: "px-2.5",
        condensed: "px-1.5",
      },
    },
    defaultVariants: {
      variant: "watch",
      size: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant, size, className }))} {...props} />
  );
}

export { Tag, tagVariants };