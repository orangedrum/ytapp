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

const PlayCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M39.9998 73.3334C58.4093 73.3334 73.3332 58.4095 73.3332 40C73.3332 21.5905 58.4093 6.66669 39.9998 6.66669C21.5903 6.66669 6.6665 21.5905 6.6665 40C6.6665 58.4095 21.5903 73.3334 39.9998 73.3334Z"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.3332 26.6667L53.3332 40L33.3332 53.3334V26.6667Z"
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

const categoryStyles: Record<string, { color: string }> = {
  adorn: { color: "bg-[#F42495]" },
  technique: { color: "bg-[#F49524]" },
  posture: { color: "bg-[#18C2CD]" },
  lead: { color: "bg-[#1873CD]" },
  musicality: { color: "bg-[#9747FF]" },
  connection: { color: "bg-purple-500" },
};

interface VideoPlateProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  category: string;
  tagVariant: keyof typeof tagIconMap;
  tagLabel: string;
  isFavorited?: boolean;
  onFavoriteToggle?: React.MouseEventHandler<HTMLButtonElement>;
  onPlay?: React.MouseEventHandler<HTMLDivElement>;
  alt?: string;
}

const VideoPlate = React.forwardRef<HTMLDivElement, VideoPlateProps>(
  (
    {
      className,
      imageUrl,
      category,
      tagVariant,
      tagLabel,
      isFavorited = false,
      onFavoriteToggle,
      onPlay,
      alt = "Video thumbnail",
      ...props
    },
    ref
  ) => {
    const TagIcon = tagIconMap[tagVariant];
    const categoryStyle = categoryStyles[category.toLowerCase()];
    const bgColorClass = categoryStyle ? categoryStyle.color : "bg-gray-500";

    return (
      <div
        ref={ref}
        className={cn("relative w-full max-w-[341px] aspect-[341/369] rounded-[10px] overflow-hidden group", className)}
        {...props}
      >
        <Image src={imageUrl} alt={alt} fill className="object-cover" />
        <div className={cn("absolute top-0 left-0 w-full h-7 flex items-center justify-center", bgColorClass)}>
          <p className="text-white text-base font-semibold tracking-[0.15px]">{category}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={onPlay} role="button" aria-label="Play video" >
          <PlayCircleIcon className="w-20 h-20" />
        </div>
        <Button variant="ghost" size="icon" className="absolute top-[39px] right-[13px] w-10 h-10 bg-white rounded-[11px] shadow-lg hover:bg-gray-100" onClick={onFavoriteToggle} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"} >
          {isFavorited ? (<HeartFilledIcon className="size-[26px] text-destructive" />) : (<HeartIcon className="size-[26px] text-foreground" />)}
        </Button>
        <div className="absolute bottom-[9px] right-[5px]">
          <Tag variant={tagVariant}><TagIcon className="size-4 mr-1.5" />{tagLabel}</Tag>
        </div>
      </div>
    );
  }
);
VideoPlate.displayName = "VideoPlate";

export { VideoPlate };