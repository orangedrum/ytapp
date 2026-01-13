"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type UseEmblaCarouselType } from "embla-carousel-react";
import { VideoCard } from "@/components/ui/video-card";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

type PropType = {
  videos: Video[];
  options?: CarouselOptions;
};

export const DancePageCarousel: React.FC<PropType> = ({ videos, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    ...options,
  });
  
  // Use a ref to store the tween values to avoid re-renders on every scroll frame
  // We will manipulate the DOM directly for performance in the scroll loop
  const tweenNodes = useRef<HTMLElement[]>([]);

  const onScroll = useCallback((api: CarouselApi) => {
    if (!api) return;

    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    api.scrollSnapList().forEach((scrollSnap, index) => {
      const node = tweenNodes.current[index];
      if (!node) return;

      // Calculate distance from the current scroll position to this slide's snap point
      let diffToTarget = scrollSnap - scrollProgress;
      
      // Handle loop logic: if difference is too large, it means we wrapped around
      const slidesCount = api.scrollSnapList().length;
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === 1) {
              diffToTarget = (scrollSnap + 1) - scrollProgress;
            } else {
              diffToTarget = (scrollSnap - 1) - scrollProgress;
            }
          }
        });
      }
      
      // Normalize diff to -1 to 1 range for the immediate neighbors
      // We want the effect to be localized around the center
      const tweenValue = 1 - Math.abs(diffToTarget * slidesCount);
      const clampedTween = Math.max(0, Math.min(1, tweenValue));
      
      const scale = 0.85 + (clampedTween * 0.15); // 0.85 at edges, 1.0 at center
      const opacity = 0.5 + (clampedTween * 0.5); // 0.5 at edges, 1.0 at center
      const zIndex = Math.round(clampedTween * 100);
      const pointerEvents = clampedTween > 0.9 ? "auto" : "none"; // Only center item is clickable
      
      // Apply styles directly
      node.style.transform = `scale(${scale}) translate3d(0,0,0)`; // translate3d for hardware acceleration
      node.style.opacity = `${opacity}`;
      node.style.zIndex = `${zIndex}`;
      node.style.pointerEvents = pointerEvents;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("scroll", onScroll);
  }, [emblaApi, onScroll]);

  // Initialize refs array
  const setTweenNode = useCallback((node: HTMLElement | null, index: number) => {
    if (node) {
      tweenNodes.current[index] = node;
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 items-center py-8">
          {videos.map((video, index) => {
            return (
              <div
                key={video.id}
                ref={(node) => setTweenNode(node, index)}
                className={cn(
                  "flex-[0_0_75%] min-w-0 pl-4 relative sm:flex-[0_0_45%]",
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                <VideoCard
                  imageUrl={video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) || "" : "") || "https://placehold.co/235x240/e2e8f0/e2e8f0"}
                  category={video.category}
                  tagVariant={video.tag_variant}
                  tagLabel={video.tag_label}
                  title={video.title}
                  duration={video.duration}
                  description={video.description}
                  className="h-auto aspect-[235/340] w-full shadow-2xl bg-card select-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
