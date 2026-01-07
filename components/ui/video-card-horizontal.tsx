import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrashIcon, PlusIcon, StarIcon, StarFilledIcon } from "@/components/ui/icons";

// Specific to this card's overlay
const PlayCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_2419_4695)">
      <path d="M15.5002 28.4167C22.6338 28.4167 28.4168 22.6337 28.4168 15.5C28.4168 8.36632 22.6338 2.58333 15.5002 2.58333C8.36648 2.58333 2.5835 8.36632 2.5835 15.5C2.5835 22.6337 8.36648 28.4167 15.5002 28.4167Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.9168 10.3333L20.6668 15.5L12.9168 20.6667V10.3333Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_2419_4695">
        <rect width="31" height="31" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5, className }) => {
  return (
    <div className={cn("flex items-center", className)}>
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

interface VideoCardHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  rating: number;
  duration: string;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onAdd?: React.MouseEventHandler<HTMLButtonElement>;
  onPlay?: React.MouseEventHandler<HTMLDivElement>;
  alt?: string;
}

const VideoCardHorizontal = React.forwardRef<HTMLDivElement, VideoCardHorizontalProps>(
  (
    {
      className,
      imageUrl,
      title,
      rating,
      duration,
      onDelete,
      onAdd,
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
          "inline-flex w-full max-w-[342px] h-[107px] sm:h-auto sm:min-h-[95px] p-3 sm:p-[14px_15px] items-center gap-3 sm:gap-4 rounded-[10px] border border-border bg-background",
          className
        )}
        {...props}
      >
        <div
          className="relative w-[70px] h-[65px] sm:w-[83px] sm:h-[79px] flex-shrink-0 group"
          role="button"
          onClick={onPlay}
          aria-label="Play video"
        >
          <Image src={imageUrl} alt={alt} fill className="object-cover object-top rounded-[4px]" />
          <div className="absolute top-[calc(50%-15.5px)] left-[calc(50%-15.5px)] cursor-pointer">
            <PlayCircleIcon className="w-[31px] h-[31px]" />
          </div>
        </div>
        <div className="flex flex-col justify-between self-stretch flex-1">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-px">
              <p className="text-body1Semibold text-foreground sm:text-sm line-clamp-2">{title}</p>
              <Rating rating={rating} className="gap-x-0.5" />
              <p className="text-body3 text-gray-2 sm:text-xs">{duration}</p>
            </div>
            <Button variant="ghost" size="icon" className="size-4 flex-shrink-0" onClick={onDelete} aria-label="Delete video" >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="flex justify-end items-end w-full">
            <Button variant="outline" size="icon" className="w-[24px] h-[22px] sm:w-[20px] sm:h-[18px] p-1 rounded-[3px] border-[0.64px] border-gray-6" onClick={onAdd} aria-label="Add video" >
              <PlusIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
VideoCardHorizontal.displayName = "VideoCardHorizontal";

export { VideoCardHorizontal };