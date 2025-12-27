import * as React from "react";
import { cn } from "@/lib/utils";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-14 w-full items-center justify-between px-4",
      className
    )}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

const PageHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-h4 text-center font-semibold", className)}
    {...props}
  />
));
PageHeaderTitle.displayName = "PageHeaderTitle";

const PageHeaderAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-10", className)} {...props} />
));
PageHeaderAction.displayName = "PageHeaderAction";

export { PageHeader, PageHeaderTitle, PageHeaderAction };