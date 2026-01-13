"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import { VideoCard } from "@/components/ui/video-card";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type PropType = {
  videos: Video[];
  options?: EmblaOptionsType;
};

export const DancePageCarousel: React.FC<PropType> = ({ videos, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    ...options,
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((api: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress * api.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("scroll", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="w-full max-w-5xl mx-auto overflow-visible">
      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {videos.map((video, index) => {
            // Calculate distance from the current scroll position
            // We need to handle the loop logic for correct distance calculation if loop is true
            // For simplicity in this visual effect, let's assume a basic distance check first
            // In a looped carousel, the index might need adjustment relative to the scroll position
            
            // Simplified logic: The center item is the one closest to the scrollProgress
            // We can use the emblaApi to get the selected index, but for smooth animation
            // we want to use the scroll position.
            
            let distanceFromCenter = 0;
            if (emblaApi) {
               const snaps = emblaApi.scrollSnapList();
               const scrollSnap = snaps[index];
               const scrollProgress = emblaApi.scrollProgress();
               
               // This is a simplified distance for visual scaling. 
               // For a perfect loop, Embla has internal engine details, but we can approximate
               // by checking the selected index.
               const selectedIndex = emblaApi.selectedScrollSnap();
               distanceFromCenter = Math.abs(index - selectedIndex);
               
               // Handle wrap-around for loop (basic check for 3 items)
               if (distanceFromCenter > 1) distanceFromCenter = 3 - distanceFromCenter;
            }

            const isCenter = distanceFromCenter < 0.5; // Threshold for being "center"
            const scale = isCenter ? 1 : 0.7;
            const zIndex = isCenter ? 10 : 0;
            const opacity = isCenter ? 1 : 0.6;
            const translateX = isCenter ? "0%" : index < (emblaApi?.selectedScrollSnap() || 0) ? "20%" : "-20%";

            return (
              <div
                key={video.id}
                className={cn(
                  "flex-[0_0_70%] min-w-0 pl-4 transition-all duration-500 ease-out",
                  "sm:flex-[0_0_40%]" 
                )}
                style={{
                  transform: `scale(${scale}) translateX(${translateX})`,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
              >
                <VideoCard
                  imageUrl={video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) || "" : "") || "https://placehold.co/235x240/e2e8f0/e2e8f0"}
                  category={video.category}
                  tagVariant={video.tag_variant}
                  tagLabel={video.tag_label}
                  title={video.title}
                  duration={video.duration}
                  description={video.description}
                  className="h-auto aspect-[235/340] w-full shadow-2xl"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};