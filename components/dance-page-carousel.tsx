"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { VideoCard } from "@/components/ui/video-card";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type PropType = {
  videos: Video[];
};

export const DancePageCarousel: React.FC<PropType> = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start at center (index 1 for 3 items)
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check localStorage for completed videos
    // We'll assume a simple array of IDs stored under 'completedVideos'
    try {
      const stored = localStorage.getItem('completedVideos');
      if (stored) {
        setCompletedVideoIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse completed videos", e);
    }
  }, []);

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart === null) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (dragStart === null) return;
    
    const threshold = 50; // Minimum drag distance to change slide
    if (dragOffset > threshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (dragOffset < -threshold && activeIndex < videos.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }

    setDragStart(null);
    setDragOffset(0);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (dragStart !== null) handleDragEnd(); };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  return (
    <div 
      className="w-full max-w-sm mx-auto relative h-[400px] flex items-center justify-center perspective-1000"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {videos.map((video, index) => {
          // Calculate position relative to active index
          // We subtract dragOffset (normalized) to visualize the drag
          const offset = index - activeIndex;
          
          // Add a small amount of drag offset for visual feedback
          // 300 is roughly the width of a card, used to normalize drag pixels to index units
          const dragFactor = dragOffset / 300; 
          const effectiveOffset = offset + dragFactor;

          const isActive = index === activeIndex;
          const isCompleted = completedVideoIds.includes(video.id);
          
          // 3D Transform Logic
          // Center item (offset 0): scale 1, zIndex 10, x 0
          // Side items (offset +/- 1): scale 0.7, zIndex 5, x +/- 150px
          
          const absOffset = Math.abs(effectiveOffset);
          const isVisible = absOffset < 2.5; // Only render items close to center

          if (!isVisible) return null;

          const scale = Math.max(0.7, 1 - absOffset * 0.3); // 1 -> 0.7
          const opacity = Math.max(0.5, 1 - absOffset * 0.5); // 1 -> 0.5
          const zIndex = 10 - Math.round(absOffset * 5);
          const translateX = effectiveOffset * 60; // 60% of container width spacing
          
          // Rotate slightly for 3D effect
          const rotateY = effectiveOffset * -15; // -15deg to 15deg

          return (
            <div
              key={video.id}
              className={cn(
                "absolute w-[70%] transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing",
                isActive ? "z-20" : "z-10"
              )}
              style={{
                transform: `translateX(${translateX}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                zIndex: zIndex,
                opacity: opacity,
                // Disable pointer events on non-active items to prevent accidental clicks
                pointerEvents: isActive && Math.abs(dragOffset) < 5 ? 'auto' : 'none',
                // If we are dragging, remove transition for instant feedback
                transition: dragStart !== null ? 'none' : 'all 0.3s ease-out'
              }}
            >
              <div className="w-full aspect-[235/340] shadow-2xl rounded-[10px] overflow-hidden">
                <Link href={`/video/${video.id}`} className="block w-full h-full" draggable={false}>
                <VideoCard
                  imageUrl={video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) || "" : "") || "https://placehold.co/235x240/e2e8f0/e2e8f0"}
                  category={video.category}
                  tagVariant={video.tag_variant}
                  tagLabel={video.tag_label}
                  title={video.title}
                  duration={video.duration}
                  description={video.description}
                  isCompleted={isCompleted}
                  className={cn("w-full h-full max-w-none select-none pointer-events-none shadow-none", !isCompleted && "border-0")}
                />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
