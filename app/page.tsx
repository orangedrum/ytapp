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

  const { data: videos } = await supabase
    .from("videos")
    .select("*")
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-20 pt-20 gap-4">
        <div className="w-full max-w-4xl px-0 space-y-4">
          <h4 className="text-h4 text-center font-semibold">Today&apos;s Suggested Videos</h4>
          <DancePageCarousel videos={(processedVideos as Video[])} />
        </div>
      </div>
    </>
  );
}