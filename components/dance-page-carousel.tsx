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
    loop: false,
    align: "center",
    skipSnaps: false,
    ...options,
  });
  
  // Use a ref to store the tween values to avoid re-renders on every scroll frame
  // We will manipulate the DOM directly for performance in the scroll loop
  const tweenNodes = useRef<HTMLElement[]>([]);

  const onScroll = useCallback((api: CarouselApi) => {
    if (!api) return;

    const scrollProgress = api.scrollProgress();
    const snapList = api.scrollSnapList();

    snapList.forEach((scrollSnap, index) => {
      const node = tweenNodes.current[index];
      if (!node) return;

      // Calculate distance from the current scroll position to this slide's snap point
      // We use the engine's location to be precise
      const diffToTarget = scrollSnap - (api.internalEngine().location.get());
      const slidesInView = api.slidesInView();
      const isVisible = slidesInView.indexOf(index) > -1;

      if (isVisible) {
        const tweenValue = 1 - Math.abs(diffToTarget * 1.5); // 1.5 factor to make the falloff faster
        const clampedTween = Math.max(0, Math.min(1, tweenValue));
        
        const scale = 0.7 + (clampedTween * 0.35); // 0.7 at edges, 1.05 at center
        const opacity = 0.4 + (clampedTween * 0.6);
        const zIndex = Math.round(clampedTween * 100);
        // Pull items closer to the center. 
        const translateX = diffToTarget * 100 * 0.8; 
        const pointerEvents = clampedTween > 0.9 ? "auto" : "none";

        node.style.transform = `translate3d(${translateX}%, 0, 0) scale(${scale})`;
        node.style.opacity = `${opacity.toFixed(2)}`;
        node.style.zIndex = `${zIndex}`;
        node.style.pointerEvents = pointerEvents;
      }
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
    <div className="w-full max-w-xs mx-auto" data-carousel-debug="true">
      <div className="overflow-visible" ref={emblaRef} style={{ perspective: '1000px' }}>
        <div className="flex touch-pan-y items-center py-8 justify-center">
          {videos.map((video, index) => {
            return (
              <div
                key={video.id}
                ref={(node) => setTweenNode(node, index)}
                className={cn(
                  "flex-[0_0_70%] min-w-0 relative", 
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
                  className="h-auto w-full shadow-2xl bg-card select-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
