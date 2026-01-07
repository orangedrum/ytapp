import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StarFilledIcon, StarIcon, CalendarIcon, CircleIconPlay, PlayCircleIconRating } from "@/components/ui/icons";

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5, className }) => {
  return (
    <div className={cn("flex items-end justify-between w-[89px]", className)}>
      {Array.from({ length: maxRating }, (_, i) =>
        i < Math.floor(rating) ? (
          <StarFilledIcon key={i} className="size-3.5 text-[#FFA928]" />
        ) : (
          <StarIcon key={i} className="size-3.5 text-black" />
        )
      )}
    </div>
  );
};

interface VideoCardRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  rating: number;
  views: number;
  onPlay?: React.MouseEventHandler<HTMLDivElement>;
  onAddToCalendar?: React.MouseEventHandler<HTMLButtonElement>;
  onPlayButton?: React.MouseEventHandler<HTMLButtonElement>;
  alt?: string;
}

const VideoCardRating = React.forwardRef<HTMLDivElement, VideoCardRatingProps>(
  (
    {
      className,
      imageUrl,
      rating,
      views,
      onPlay,
      onAddToCalendar,
      onPlayButton,
      alt = "Video thumbnail",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-[326px] h-auto md:h-[94px] items-start gap-2.5 p-1 md:p-3 rounded-[10px] flex-col-reverse md:flex-row",
          className
        )}
        {...props}
      >
        {/* Left Section */}
        <div className="flex flex-col w-full h-auto justify-center items-center gap-2">
          {/* Rating Info */}
          <div className="flex w-full h-[28px] items-center gap-1.5 px-2 justify-center md:justify-start">
            <p className="text-2xl sm:text-xl font-semibold text-foreground leading-tight">{rating.toFixed(1)}</p>
            <Rating rating={rating} />
            <p className="text-sm sm:text-xs text-gray-2">{views} Views</p>
          </div>
          {/* Button Group */}
          <div className="flex w-full items-start gap-2 flex-col sm:flex-row">
            <Button variant="outline" className="flex-1 h-[39px] sm:h-[35px] gap-2.5 border-gray-6 w-full" onClick={onAddToCalendar}>
              <span className="text-xs sm:text-[11px] font-medium">Add To</span>
              <CalendarIcon className="size-4" />
            </Button>
            <Button className="flex-1 h-[39px] sm:h-[35px] gap-2.5 bg-foreground hover:bg-foreground/90 w-full" onClick={onPlayButton}>
              <span className="text-xs sm:text-[11px] font-medium">Play</span>
              <CircleIconPlay className="size-4" />
            </Button>
          </div>
        </div>
        {/* Right Section: Video Thumbnail */}
        <div
          className="relative w-full md:w-[91px] h-[70px] rounded-[4px] md:rounded-[20px] flex-shrink-0 cursor-pointer"
          onClick={onPlay}
          role="button"
          aria-label="Play video"
        >
          <Image src={imageUrl} alt={alt} fill className="object-cover object-top rounded-[4px] md:rounded-lg" />
          <PlayCircleIconRating className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[33px]" />
        </div>
      </div>
    );
  }
);
VideoCardRating.displayName = "VideoCardRating";

export { VideoCardRating };
