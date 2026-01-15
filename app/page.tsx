import React from "react";
import { DancePageBackground } from "@/components/ui/dance-page-background";
import { createClient } from "@supabase/supabase-js";
import { DancePageCarousel } from "@/components/dance-page-carousel";
import { Video } from "@/lib/types"; // Import Video type
import { getYouTubeThumbnail } from "@/lib/youtube";
import { PageTransition } from "@/components/ui/page-transition";

export const revalidate = 0;

export default async function DancePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const styleGuideId = "303f6703-726f-4b36-b56b-9c7f68161501";

  // 1. Fetch the specific styleguide video
  const { data: styleGuideVideo } = await supabase
    .from("videos")
    .select("*")
    .eq("id", styleGuideId)
    .maybeSingle();

  // 2. Fetch up to 2 other videos to fill the carousel (excluding the styleguide one)
  const { data: otherVideos } = await supabase
    .from("videos")
    .select("*")
    .neq("id", styleGuideId)
    .limit(2);

  let videos: Video[] = [];

  if (styleGuideVideo) videos.push(styleGuideVideo);
  if (otherVideos) videos.push(...otherVideos);

  // Fallback: If we have 0 videos, try to fetch any 3
  if (videos.length === 0) {
     const { data: fallbackVideos } = await supabase.from("videos").select("*").limit(3);
     if (fallbackVideos) videos = fallbackVideos;
  }

  // Ensure we have at least 3 items by duplicating if necessary (carousel needs 3 to function well)
  if (videos.length > 0 && videos.length < 3) {
    while (videos.length < 3) {
      // Duplicate the first video to fill slots if DB is sparse
      videos.push({ ...videos[0], id: `${videos[0].id}-dup-${videos.length}` });
    }
  }

  // If we have the styleguide video and enough videos, place it in the center (index 1)
  if (videos.length >= 3 && styleGuideVideo && videos.some(v => v.id === styleGuideId)) {
      const idx = videos.findIndex(v => v.id === styleGuideId);
      if (idx !== 1) {
          // Swap to index 1 so it appears in the center initially
          const temp = videos[1];
          videos[1] = videos[idx];
          videos[idx] = temp;
      }
  }

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
    <PageTransition>
      <DancePageBackground />
      <div className="absolute top-2 left-6 z-20 flex flex-col items-start">
        <h1 className="text-h1 font-semibold leading-[0.8] tracking-tight text-foreground">
          Yankee
          <br />
          Tango
        </h1>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-40 pb-20 overflow-x-hidden">
        <div className="w-full max-w-full px-0 space-y-6">
          <h4 className="text-body1Semibold text-center">Today&apos;s Suggested Videos</h4>
          <DancePageCarousel videos={(processedVideos as Video[])} />
        </div>
      </div>
    </PageTransition>
  );
}