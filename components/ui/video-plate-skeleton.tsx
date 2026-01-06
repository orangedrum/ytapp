import * as React from "react";
import { cn } from "@/lib/utils";

const VideoPlateSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-[341px] h-[369px] rounded-[10px] overflow-hidden bg-muted",
        className
      )}
      {...props}
    >
      <div className="animate-pulse w-full h-full">
        <div className="absolute top-0 left-0 w-full h-7 bg-gray-300/50" />
        <div className="absolute top-[39px] right-[13px] w-10 h-10 bg-gray-300/50 rounded-[11px]" />
        <div className="absolute bottom-[9px] right-[5px] h-6 w-28 bg-gray-300/50 rounded-[10px]" />
      </div>
    </div>
  );
});
VideoPlateSkeleton.displayName = "VideoPlateSkeleton";

export { VideoPlateSkeleton };