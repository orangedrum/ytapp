import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { EyeIcon } from "@/components/ui/icons";
import { VerticalCategoryTag } from "./vertical-category-tag";

interface VideoListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  duration: string;
  imageUrl: string;
  category: string;
  categoryLabel?: string; // Defaults to category if not provided
  statusIcon?: React.ReactNode;
  onPlay?: React.MouseEventHandler<HTMLDivElement>;
  alt?: string;
}

const VideoListItem = React.forwardRef<HTMLDivElement, VideoListItemProps>(
  (
    {
      className,
      title,
      duration,
      imageUrl,
      category,
      categoryLabel,
      statusIcon,
      onPlay,
      alt = "Video thumbnail",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-[500px] h-[60px] sm:h-[53px] items-center justify-between rounded-[10px] border border-border bg-background overflow-hidden cursor-pointer hover:bg-accent/5 transition-colors",
          className
        )}
        onClick={onPlay}
        {...props}
      >
        {/* Left Section: Tag + Image + Text */}
        <div className="flex items-center h-full flex-1 gap-0">
          <VerticalCategoryTag category={category} />
          
          <div className="relative w-[48px] h-full sm:w-[56px] flex-shrink-0">
            <Image src={imageUrl} alt={alt} fill className="object-fill" />
          </div>

          <div className="flex flex-col items-start justify-center px-2 sm:px-3 gap-0.5 sm:gap-1 overflow-hidden">
            <h4 className="text-foreground text-sm sm:text-base font-semibold truncate w-full font-sans">
              {title}
            </h4>
            <span className="text-muted-foreground text-[11px] sm:text-xs font-medium font-sans">
              {duration}
            </span>
          </div>
        </div>

        {/* Right Section: Status Icon */}
        <div className="flex items-center justify-center px-2.5 sm:px-4 h-full border-l border-transparent">
           {/* The JSON has a specific container for the icon, we can replicate that style if passed, or let the parent control the icon style */}
           {statusIcon || (
             <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-[10px] border-[0.5px] border-black/10 bg-[#DBFFFB]">
                <EyeIcon className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-foreground" />
             </div>
           )}
        </div>
      </div>
    );
  }
);
VideoListItem.displayName = "VideoListItem";

export { VideoListItem };