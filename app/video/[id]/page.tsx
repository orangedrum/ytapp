import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ChevronLeft, Plus, ChevronDown } from "lucide-react"; // Added ChevronDown
import { VideoPlate } from "@/components/ui/video-plate";
import { StarFilledIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";

// Force dynamic rendering since we are fetching data based on params
export const revalidate = 0;

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  
  let video: Video | null = null;
  let imageUrl = "https://placehold.co/341x369/e2e8f0/e2e8f0";

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the specific video by ID
    const { data: videoData, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Supabase error fetching video:", error);
    }

    if (videoData) {
      video = videoData as Video;
      
      // Safely generate thumbnail
      try {
        imageUrl = video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) || "" : "") || "https://placehold.co/341x369/e2e8f0/e2e8f0";
      } catch (e) {
        console.error("Error generating thumbnail:", e);
      }
    }
  } catch (err) {
    console.error("Unexpected error in VideoDetailPage:", err);
  }

  // Fallback UI if video is not found or crashed
  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
        <p className="text-muted-foreground">Video content unavailable.</p>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/5">
        <Link href="/">
          <Button variant="ghost" size="icon" className="-ml-2 text-foreground hover:bg-transparent">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Video Details</h1>
        <Button variant="ghost" size="icon" className="-mr-2 text-foreground hover:bg-transparent">
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Video Plate - Full Width */}
      <div className="w-full aspect-[341/369] relative">
        <VideoPlate
          imageUrl={imageUrl}
          category={video.category || "General"}
          tagVariant={video.tag_variant || "watch"}
          tagLabel={video.tag_label || "Watch"}
          alt={video.title || "Video"}
        />
      </div>

      {/* Video Info Section */}
      <div className="flex flex-col px-6 py-6 gap-6 w-full max-w-md mx-auto">
        
        {/* Title and Rating Row */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold text-foreground leading-[120%] tracking-tight">
            {video.title || "Untitled Video"}
          </h3>
          
          <div className="flex items-center gap-1.5">
            {/* Star Icon - #FFA928 */}
            <StarFilledIcon className="w-[19px] h-[18px] text-[#FFA928]" />
            
            <div className="flex items-center gap-1 text-base font-medium">
              {/* Rating Score */}
              <span className="text-foreground underline decoration-solid underline-offset-auto">
                4.0/5
              </span>
              {/* Review Count */}
              <span className="text-[#808080]">
                (45 reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="w-full">
          <p className="text-base font-normal text-[#808080] leading-[140%]">
            {video.description || "The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist."}
          </p>
        </div>

        {/* Schedule for a different day Section */}
        {/* Based on JSON: maxWidth 264px, gap 12px */}
        <div className="flex flex-col items-start gap-3 w-full max-w-[264px]">
          {/* Header: 20px (text-xl), 600 weight */}
          <h4 className="text-xl font-semibold text-foreground leading-[120%]">
            Schedule for a different day
          </h4>
          
          {/* Field Container: 162px width in JSON, but usually better to be full width of container on mobile */}
          <div className="flex flex-col items-start gap-1 w-full">
            {/* The Field: height 52px, border #E6E6E6, radius 10px */}
            <button className="flex w-full h-[52px] px-5 justify-between items-center bg-white border border-[#E6E6E6] rounded-[10px] hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {/* Placeholder Text: 16px, 400 weight */}
                <span className="text-base font-normal text-foreground leading-[140%]">
                  tomorrow
                </span>
              </div>
              {/* Chevron Icon */}
              <ChevronDown className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

      </div>

      {/* Placeholder for Future Section 2 */}
      <div className="px-6 py-4 w-full max-w-md mx-auto pb-12">
        {/* Future content goes here */}
      </div>

    </div>
  );
}
