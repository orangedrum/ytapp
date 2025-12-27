"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const FilterGroupContext = React.createContext<
  VariantProps<typeof filterGroupItemVariants>
>({
  size: "default",
});

const FilterGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof filterGroupItemVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-start gap-2", className)}
    {...props}
  >
    <FilterGroupContext.Provider value={{ size }}>
      {children}
    </FilterGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
FilterGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const filterGroupItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-background text-foreground hover:bg-accent data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:border-foreground",
      },
      size: {
        default: "h-9 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const FilterGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof filterGroupItemVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(FilterGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(filterGroupItemVariants({ variant, size: context.size || size, className }))}
      {...props}
    />
  );
});

FilterGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { FilterGroup, FilterGroupItem };