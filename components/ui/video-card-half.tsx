import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  HeartFilledIcon,
  EyeIcon,
} from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";

interface VideoCardHalfProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  category: string;
  title: string;
  duration: string;
  isFavorited?: boolean;
  onFavoriteToggle?: React.MouseEventHandler<HTMLButtonElement>;
  onPlay?: React.MouseEventHandler<HTMLDivElement>;
  alt?: string;
}

const VideoCardHalf = React.forwardRef<HTMLDivElement, VideoCardHalfProps>(
  (
    {
      className,
      imageUrl,
      category,
      title,
      duration,
      isFavorited = false,
      onFavoriteToggle,
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
          "inline-flex flex-col w-[120px] h-[200px] sm:w-[140px] sm:h-[220px] md:w-[161px] md:h-[247px] rounded-[10px] border border-border bg-background shadow-sm",
          className
        )}
        {...props}
      >
        <div
          className="relative w-full h-[140px] sm:h-[155px] md:h-[174px] group cursor-pointer"
          onClick={onPlay}
          role="button"
          aria-label="Play video"
        >
          <Image src={imageUrl} alt={alt} fill className="object-cover rounded-t-[10px]" />
          
          <div className="absolute top-0 left-0 w-full h-[18px] bg-[#F49524] rounded-t-[10px] flex items-center justify-center z-10">
            <p className="text-white text-xs sm:text-sm font-semibold tracking-[0.15px]">{category}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-5 sm:top-[25px] md:top-[29px] right-2 sm:right-2.5 md:right-[6px] w-[30px] h-[30px] md:w-[34px] md:h-[34px] p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
            onClick={(e) => { e.stopPropagation(); onFavoriteToggle?.(e); }}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? (<HeartFilledIcon className="size-[18px] text-destructive" />) : (<HeartIcon className="size-[18px] text-foreground" />)}
          </Button>

          <div className="absolute bottom-[-12px] right-1.5 sm:right-2 md:right-[5px]">
            <Tag variant="watch" className="w-[20px] h-[20px] md:w-6 md:h-6 p-0 border-black/50">
              <EyeIcon className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
            </Tag>
          </div>
        </div>
        <div className="flex flex-col items-start gap-0.5 p-[5px] pt-4">
          <p className="text-foreground text-sm md:text-base font-semibold truncate w-full">{title}</p>
          <p className="text-muted-foreground text-[11px] md:text-xs font-medium">{duration}</p>
        </div>
      </div>
    );
  }
);
VideoCardHalf.displayName = "VideoCardHalf";

export { VideoCardHalf };