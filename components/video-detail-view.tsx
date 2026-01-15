"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import YouTube from "react-youtube";
import { ChevronDown, ArrowRight, X } from "lucide-react";
import { VideoPlate } from "@/components/ui/video-plate";
import { StarFilledIcon, StarIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { TitleBar } from "@/components/ui/title-bar";
import { Video } from "@/lib/types";

// Custom Check Icon for the Modal from JSON
const SuccessCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path opacity="0.2" d="M68.25 39C68.25 44.7851 66.5345 50.4403 63.3205 55.2504C60.1065 60.0606 55.5382 63.8096 50.1935 66.0235C44.8488 68.2373 38.9676 68.8166 33.2936 67.688C27.6197 66.5593 22.4078 63.7736 18.3171 59.6829C14.2265 55.5922 11.4407 50.3803 10.312 44.7064C9.18343 39.0324 9.76267 33.1512 11.9765 27.8065C14.1904 22.4618 17.9394 17.8935 22.7496 14.6795C27.5597 11.4655 33.2149 9.75 39 9.75C46.7576 9.75 54.1974 12.8317 59.6829 18.3171C65.1683 23.8026 68.25 31.2424 68.25 39Z" fill="#0C9409" />
    <path d="M52.912 29.963C53.1387 30.1893 53.3185 30.4582 53.4411 30.7541C53.5638 31.05 53.6269 31.3672 53.6269 31.6875C53.6269 32.0078 53.5638 32.325 53.4411 32.6209C53.3185 32.9168 53.1387 33.1857 52.912 33.412L35.8495 50.4745C35.6232 50.7012 35.3543 50.881 35.0584 51.0036C34.7625 51.1263 34.4453 51.1894 34.125 51.1894C33.8047 51.1894 33.4875 51.1263 33.1916 51.0036C32.8957 50.881 32.6269 50.7012 32.4005 50.4745L25.088 43.162C24.6306 42.7047 24.3737 42.0843 24.3737 41.4375C24.3737 40.7907 24.6306 40.1703 25.088 39.713C25.5454 39.2556 26.1657 38.9986 26.8125 38.9986C27.4593 38.9986 28.0797 39.2556 28.537 39.713L34.125 45.304L49.463 29.963C49.6894 29.7363 49.9582 29.5566 50.2541 29.4339C50.55 29.3112 50.8672 29.2481 51.1875 29.2481C51.5078 29.2481 51.825 29.3112 52.1209 29.4339C52.4168 29.5566 52.6857 29.7363 52.912 29.963ZM70.6875 39C70.6875 45.2672 68.8291 51.3936 65.3472 56.6046C61.8653 61.8156 56.9164 65.8771 51.1263 68.2754C45.3362 70.6738 38.9649 71.3013 32.8181 70.0786C26.6713 68.856 21.0251 65.838 16.5936 61.4064C12.162 56.9749 9.14405 51.3287 7.92138 45.1819C6.69871 39.0352 7.32623 32.6639 9.72458 26.8737C12.1229 21.0836 16.1844 16.1347 21.3954 12.6528C26.6064 9.17094 32.7328 7.3125 39 7.3125C47.4013 7.32137 55.456 10.6627 61.3967 16.6034C67.3373 22.544 70.6786 30.5987 70.6875 39ZM65.8125 39C65.8125 33.697 64.24 28.5131 61.2938 24.1038C58.3476 19.6945 54.1601 16.2579 49.2607 14.2285C44.3614 12.1991 38.9703 11.6681 33.7692 12.7027C28.568 13.7373 23.7905 16.2909 20.0407 20.0407C16.2909 23.7905 13.7373 28.568 12.7027 33.7691C11.6681 38.9703 12.1991 44.3614 14.2285 49.2607C16.2579 54.16 19.6945 58.3476 24.1038 61.2938C28.5131 64.24 33.697 65.8125 39 65.8125C46.1087 65.8044 52.9238 62.977 57.9504 57.9504C62.977 52.9238 65.8045 46.1086 65.8125 39Z" fill="#0C9409" />
  </svg>
);

const VideoCompleteModal = ({ onReplay, onClose }: { onReplay: () => void, onClose: () => void }) => {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  return (
    <div className="bg-white rounded-[20px] p-6 w-full max-w-[341px] flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200 shadow-2xl">
       {/* Icon */}
       <SuccessCheckIcon className="w-[78px] h-[78px]" />
       
       {/* Stars */}
       <div className="flex gap-[15px]">
         {[1, 2, 3, 4, 5].map((star) => (
           <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
             {star <= rating ? (
               <StarFilledIcon className="w-6 h-6 text-[#FFA928]" />
             ) : (
               <StarIcon className="w-6 h-6 text-[#FFA928]" />
             )}
           </button>
         ))}
       </div>

       {/* Text */}
       <div className="text-center flex flex-col gap-2">
         <h4 className="text-h4 font-semibold text-foreground">Video Complete</h4>
         <p className="text-body1 text-foreground">Great job today. Feel free to leave the teacher a private note about this class.</p>
       </div>

       {/* Input */}
       <div className="w-full">
         <div className="border border-foreground rounded-[10px] h-[52px] px-5 flex items-center">
            <input 
              className="w-full outline-none text-base placeholder:text-[#999] bg-transparent" 
              placeholder="placeholder" 
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 24))}
            />
         </div>
         <div className="text-right text-xs text-gray-400 mt-1">{note.length}/24</div>
       </div>

       {/* Schedule */}
       <div className="w-full flex flex-col gap-3">
          <p className="text-center text-sm font-semibold text-foreground">Schedule again for a different day</p>
          <button className="w-full h-[52px] border border-[#E6E6E6] rounded-[10px] px-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
             <span className="text-base text-foreground">tomorrow</span>
             <ChevronDown className="w-6 h-6" />
          </button>
       </div>

       {/* Replay Link */}
       <button onClick={onReplay} className="text-xs underline text-black tracking-[0.4px] hover:text-gray-700">
         I want to practice this video again right now!
       </button>

       {/* Ok Button */}
       <Button onClick={onClose} className="w-full h-[54px] rounded-[10px] bg-foreground text-background hover:bg-foreground/90 text-base font-medium">
         Ok
       </Button>
    </div>
  )
}

interface VideoDetailViewProps {
  video: Video;
  imageUrl: string;
}

export function VideoDetailView({ video, imageUrl }: VideoDetailViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if we are in feedback mode (returning from calendar)
  const showFeedback = searchParams.get('feedback') === 'true';
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(showFeedback);

  // Helper to extract YouTube ID from various URL formats
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = video.video_url ? getYouTubeId(video.video_url) : null;

  // This function will be called when the video finishes playing
  const handleVideoEnd = () => {
    const params = new URLSearchParams({
      time: video.duration || '0:00',
      category: video.category || 'Practice',
      videoId: video.id, // Pass videoId to allow return navigation
    });
    router.push(`/practice/celebration?${params.toString()}`);
  };

  // Handle replay from modal
  const handleReplay = () => {
    setIsFeedbackOpen(false);
    setIsPlaying(true);
    // Remove query param without full reload if possible, or just let it be
    router.replace(`/video/${video.id}`, { scroll: false });
  };

  // Handle close from modal
  const handleCloseModal = () => {
    setIsFeedbackOpen(false);
    setIsPlaying(false);
    router.push('/');
  };

  // Full Screen Video Player Overlay
  if (isPlaying && videoId) {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        controls: 1, // Show player controls
        rel: 0, // Show related videos from the same channel (best we can do, but onEnd will fire first)
        modestbranding: 1, // Minimize YouTube branding
        iv_load_policy: 3, // Hide video annotations
      },
    };

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
          <YouTube
            videoId={videoId}
            opts={opts}
            onEnd={handleVideoEnd}
            className="w-full h-full"
            iframeClassName="w-full h-full rounded-lg shadow-2xl"
          />
        </div>
      </div>
    );
  }

  // Feedback Modal Overlay (simulating video full screen background)
  if (isFeedbackOpen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200">
         <VideoCompleteModal onReplay={handleReplay} onClose={handleCloseModal} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <TitleBar title="Video Details" />

      {/* Main Content Container - Video Plate + Info Section */}
      <div className="flex-1 flex flex-col px-6 pt-4 pb-24 gap-4 w-full max-w-md mx-auto overflow-y-auto">
        
        {/* Video Plate - Constrained to max-w-md via parent */}
        <div className="w-full relative">
          <div 
            className="w-full aspect-[341/369] relative shadow-sm rounded-[10px] overflow-hidden"
          >
             <VideoPlate
              imageUrl={imageUrl}
              category={video.category || "General"}
              tagVariant={video.tag_variant || "watch"}
              tagLabel={video.tag_label || "Watch"}
              alt={video.title || "Video"}
              className="w-full h-full max-w-none rounded-none"
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
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 h-[80px]">
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
