import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  HeartFilledIcon,
  EyeIcon,
  ChatIcon,
} from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";
import { Music } from "lucide-react";

// This PlayCircleIcon is from the provided JSON, slightly different from the one in VideoPlate.
const PlayCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="56"
    height="53"
    viewBox="0 0 56 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M27.5659 47.9558C40.2528 47.9558 50.5375 38.1964 50.5375 26.1577C50.5375 14.1189 40.2528 4.35962 27.5659 4.35962C14.879 4.35962 4.59424 14.1189 4.59424 26.1577C4.59424 38.1964 14.879 47.9558 27.5659 47.9558Z"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.9716 17.4385L36.7546 26.1577L22.9716 34.8769V17.4385Z"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const tagIconMap = {
  watch: EyeIcon,
  dance: Music,
  explanation: ChatIcon,
};

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  category: string;
  tagVariant: keyof typeof tagIconMap;
  tagLabel: string;
  title: string;
  duration: string;
  description: string;
  isFavorited?: boolean;
  onFavoriteToggle?: React.MouseEventHandler<HTMLButtonElement>;
  onPlay?: React.MouseEventHandler<HTMLDivElement>;
  alt?: string;
}

const VideoCard = React.forwardRef<HTMLDivElement, VideoCardProps>(
  (
    {
      className,
      imageUrl,
      category,
      tagVariant,
      tagLabel,
      title,
      duration,
      description,
      isFavorited = false,
      onFavoriteToggle,
      onPlay,
      alt = "Video thumbnail",
      ...props
    },
    ref
  ) => {
    const TagIcon = tagIconMap[tagVariant];

    return (
      <div ref={ref} className={cn("flex w-[267px] h-[434px] p-4 flex-col items-start gap-4 rounded-lg border border-border bg-background shadow-[0_4px_12.1px_0_rgba(0,0,0,0.25)]", className)} {...props} >
        <div className="relative self-stretch h-[241px] group" role="button" onClick={onPlay} aria-label="Play video" >
          <Image src={imageUrl} alt={alt} width={235} height={241} className="w-full h-full object-cover rounded-[10px]" />
          <div className="absolute top-0 left-0 w-full h-[18px] bg-[#F49524] rounded-t-[10px] flex items-center justify-center" >
            <p className="text-white text-sm font-semibold tracking-[0.15px]">{category}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[10px]" >
            <PlayCircleIcon className="w-[55px] h-[52px]" />
          </div>
          <Button variant="ghost" size="icon" className="absolute top-[26px] right-[9px] w-7 h-[26px] p-[11px] bg-white rounded-[11px] shadow-[0_11px_14px_0_rgba(82,82,82,0.25)] hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); onFavoriteToggle?.(e); }} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"} >
            {isFavorited ? (<HeartFilledIcon className="size-[25px] text-destructive" />) : (<HeartIcon className="size-[25px] text-foreground" />)}
          </Button>
          <div className="absolute bottom-0 right-[21px]">
            <Tag variant={tagVariant}><TagIcon className="size-4 mr-1.5" />{tagLabel}</Tag>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 self-stretch">
          <p className="text-body1 text-foreground">{title}</p>
          <p className="text-body1Semibold text-foreground">{duration}</p>
          <p className="text-body2 text-muted-foreground self-stretch">{description}</p>
        </div>
      </div>
    );
  }
);
VideoCard.displayName = "VideoCard";

export { VideoCard };