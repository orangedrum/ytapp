"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, X } from "lucide-react";
import { VideoPlate } from "@/components/ui/video-plate";
import { StarFilledIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { TitleBar } from "@/components/ui/title-bar";
import { Video } from "@/lib/types";

interface VideoDetailViewProps {
  video: Video;
  imageUrl: string;
}

export function VideoDetailView({ video, imageUrl }: VideoDetailViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube ID from various URL formats
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = video.video_url ? getYouTubeId(video.video_url) : null;

  // Full Screen Video Player Overlay
  if (isPlaying && videoId) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-200">
        <button 
          onClick={() => setIsPlaying(false)}
          className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-50 transition-colors"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="w-full h-full max-w-5xl max-h-screen aspect-video p-4 md:p-10">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-2xl"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Header */}
      <TitleBar title="Video Details" />

      {/* Video Plate - Centered and Constrained */}
      <div className="w-full px-6 flex justify-center">
        <div 
          className="w-full max-w-[341px] relative shadow-sm mx-auto"
        >
           <VideoPlate
            imageUrl={imageUrl}
            category={video.category || "General"}
            tagVariant={video.tag_variant || "watch"}
            tagLabel={video.tag_label || "Watch"}
            alt={video.title || "Video"}
          />
          {/* Play Trigger Overlay - Only covers the center area */}
          <div 
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ pointerEvents: 'none' }}
          >
            <div 
              className="w-24 h-24 bg-transparent cursor-pointer flex items-center justify-center"
              style={{ pointerEvents: 'auto' }}
              onClick={() => setIsPlaying(true)}
            />
          </div>
        </div>
      </div>

      {/* Video Info Section */}
      {/* Reduced bottom padding to tighten layout above fixed footer */}
      <div className="flex flex-col px-6 pt-2 pb-4 gap-4 w-full max-w-md mx-auto">
        
        {/* Title, Rating, and Description Group */}
        <div className="flex flex-col gap-0">
          {/* Title and Rating Row */}
          <div className="flex flex-col gap-2 mb-2">
            <h3 className="text-h4 text-foreground leading-[120%] tracking-tight">
              {video.title || "Untitled Video"}
            </h3>
            
            <div className="flex items-center gap-1.5">
              <StarFilledIcon className="w-[19px] h-[18px] text-[#FFA928]" />
              
              <div className="flex items-center gap-1 text-base font-medium">
                <span className="text-foreground underline decoration-solid underline-offset-auto">
                  4.0/5
                </span>
                <span className="text-muted-foreground">
                  (45 reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-base font-normal text-muted-foreground leading-snug">
            {video.description || "The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist."}
          </p>
        </div>

        {/* Schedule for a different day Section */}
        <div className="flex flex-col items-start gap-3 w-full max-w-[264px]">
          <h4 className="text-body1Semibold text-foreground leading-[120%]">
            Schedule for a different day
          </h4>
          
          <div className="flex flex-col items-start gap-1 w-full">
            <button className="flex w-full h-[52px] px-5 justify-between items-center bg-background border border-border rounded-[10px] hover:bg-gray-100/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-base font-normal text-foreground leading-[140%]">
                  tomorrow
                </span>
              </div>
              <ChevronDown className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

      </div>

      {/* Play Video Fixed Footer */}
      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 bg-background border-t border-border z-40 h-[80px]">
        <div className="w-full h-full max-w-md mx-auto px-6 flex items-center justify-between relative">
          
          {/* Length Info */}
          <div className="flex flex-col gap-0">
            <span className="text-base font-normal text-muted-foreground leading-[140%]">
              Length
            </span>
            <span className="text-h4 text-foreground leading-[120%]">
              {video.duration || "00:00"}
            </span>
          </div>

          {/* Play Button */}
          <Button 
            onClick={() => setIsPlaying(true)}
            className="flex w-[240px] h-[54px] px-6 justify-center items-center gap-2.5 rounded-[10px] bg-foreground hover:bg-foreground/90 text-background text-base font-medium leading-[140%]"
          >
            Play Video
            <ArrowRight className="w-6 h-6 text-background" />
          </Button>

        </div>
      </div>

    </div>
  );
}
