import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StarFilledIcon, CalendarIcon, PlayIcon, PlayCircleIconRating } from "@/components/ui/icons";

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5, className }) => {
  return (
    <div className={cn("flex items-end justify-between w-[89px]", className)}>
      {Array.from({ length: maxRating }, (_, i) => (
        <StarFilledIcon key={i} className="size-3.5 text-[#FFA928]" />
      ))}
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
      
