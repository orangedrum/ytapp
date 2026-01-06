// /Users/orangedrum/Dropbox/ProductShift/jobs/yankeetango/ytapp/components/ui/tag.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        watch: "border-cyan-200 bg-cyan-100 text-cyan-800 hover:bg-cyan-100/80 dark:border-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300",
        dance: "border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:border-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        explanation: "border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:border-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
      },
      size: {
        default: "h-6",
        condensed: "h-6 w-6 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant, size }), className)} {...props} />
  )
}

export { Tag, tagVariants }
