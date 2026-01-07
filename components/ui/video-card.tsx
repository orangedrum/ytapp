// /Users/orangedrum/Dropbox/ProductShift/jobs/yankeetango/ytapp/components/ui/video-card.tsx
import * as React from "react"
import Image from "next/image"
import { Music } from "lucide-react"
import { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Tag, tagVariants } from "@/components/ui/tag"
import { HeartFilledIcon, PlayIcon, EyeIcon, ChatIcon } from "@/components/ui/icons"
import { getCategoryData } from "@/lib/categories"

const tagIcons = {
  watch: EyeIcon,
  dance: Music,
  explanation: ChatIcon,
}

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  category: string
  tagVariant: VariantProps<typeof tagVariants>["variant"] & keyof typeof tagIcons
  tagLabel: string
  title: string
  duration: string
  description: string
  isFavorited?: boolean
  alt?: string
  onPlay?: React.MouseEventHandler<HTMLDivElement>
  onFavoriteToggle?: React.MouseEventHandler<HTMLButtonElement>
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
      alt = "Video thumbnail",
      onPlay,
      onFavoriteToggle,
      ...props
    },
    ref
  ) => {
    const TagIcon = tagIcons[tagVariant] || EyeIcon
    const { color: bgColorClass } = getCategoryData(category);

    return (
      <div
        ref={ref}
        className={cn(
          "group flex w-full max-w-[235px] flex-col gap-2.5 rounded-[10px] border bg-card p-2.5 shadow-sm",
          className
        )}
        {...props}
      >
        <div
          className="relative h-[180px] w-full cursor-pointer overflow-hidden rounded-md"
          onClick={onPlay}
        >
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
          <div className={cn("absolute top-0 left-0 w-full h-[22px] flex items-center justify-center z-10", bgColorClass)}>
             <p className="text-white text-[10px] font-bold tracking-wider uppercase">{category}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <PlayIcon className="size-12 text-white" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavoriteToggle?.(e)
            }}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartFilledIcon
              className={cn(
                "size-5",
                isFavorited ? "text-destructive" : "text-white"
              )}
            />
          </button>
          {tagVariant && tagLabel && (
            <div className="absolute bottom-2 right-2 z-10">
               <Tag variant={tagVariant} className="h-6 px-2 text-[10px] gap-1 border-white/20 backdrop-blur-sm shadow-sm">
                 <TagIcon className="size-3" />
                 {tagLabel}
               </Tag>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 px-1">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{duration}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    )
  }
)
VideoCard.displayName = "VideoCard"

export { VideoCard }
