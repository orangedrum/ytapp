import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-foreground/20 px-2 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        watch: "bg-tag-watch text-tag-foreground",
        dance: "bg-tag-dance text-tag-foreground",
        explanation: "bg-tag-explanation text-tag-foreground",
      },
      size: {
        default: "h-6",
        condensed: "h-6 w-6 p-0",
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

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div className={cn(tagVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };