"use client"

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectableCardVariants = cva(
  "relative inline-flex flex-col items-center justify-start w-[75px] h-[57px] rounded-[10px] border-2 p-1 transition-colors data-[state=on]:bg-foreground data-[state=off]:bg-background data-[state=on]:text-background data-[state=off]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const SelectableCard = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof selectableCardVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(selectableCardVariants({ variant, className }))}
    {...props}
  />
));

SelectableCard.displayName = "SelectableCard";

const SelectableCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-8 w-8 flex items-center justify-center", className)}
    {...props}
  />
));

SelectableCardIcon.displayName = "SelectableCardIcon";

const SelectableCardLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-[11px] font-medium text-center", className)} {...props} />
));

SelectableCardLabel.displayName = "SelectableCardLabel";

export { SelectableCard, SelectableCardIcon, SelectableCardLabel };