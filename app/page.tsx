import React from "react";
import { DancePageBackground } from "@/components/ui/dance-page-background";
import { createClient } from "@supabase/supabase-js";
import { DancePageCarousel } from "@/components/dance-page-carousel";
import { Video } from "@/lib/types"; // Import Video type
import { getYouTubeThumbnail } from "@/lib/youtube";

export const revalidate = 0;

export default async function DancePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch a specific set of videos, including the one from the styleguide
  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    // Using .in() to fetch specific videos. The first ID is from the styleguide.
    .in("id", ["303f6703-726f-4b36-b56b-9c7f68161501", "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e"])
    .limit(3);

  // Process videos to ensure they have thumbnails
  const processedVideos = videos?.map((video: Video) => {
    if (!video.thumbnail_url && video.video_url) {
      const thumbnail = getYouTubeThumbnail(video.video_url);
      if (thumbnail) {
        return { ...video, thumbnail_url: thumbnail };
      }
    }
    return video;
  }) || [];

  return (
    <>
      <DancePageBackground />
      <div className="absolute top-12 left-6 z-20 flex flex-col items-start">
        <h2 className="text-h2 font-semibold leading-[0.85] tracking-tight text-foreground">
          Yankee
          <br />
          Tango
        </h2>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full pt-48 sm:pt-56">
        <div className="w-full max-w-full px-0 space-y-6">
          <h4 className="text-body1Semibold text-center">Today&apos;s Suggested Videos</h4>
          <DancePageCarousel videos={(processedVideos as Video[])} />
        </div>
      </div>
    </>
  );
}