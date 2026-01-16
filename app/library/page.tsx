import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { LibraryHeader } from "@/components/library-header";
import { PageTransition } from "@/components/ui/page-transition";
import { VideoListItem } from "@/components/ui/video-list-item";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";

export const revalidate = 0;

export default async function LibraryPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: videos } = await supabase.from("videos").select("*");

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
      <div className="flex flex-col min-h-screen bg-background">
        <LibraryHeader />
        <div className="flex-1 px-6 pt-2 pb-20">
          <div className="flex flex-col gap-4">
            {processedVideos.map((video: Video) => (
              <Link href={`/video/${video.id}`} key={video.id} className="block">
                <VideoListItem
                  imageUrl={video.thumbnail_url || "https://placehold.co/56x53/e2e8f0/e2e8f0"}
                  category={video.category || "General"}
                  title={video.title || "Untitled"}
                  duration={video.duration || "00:00"}
                  className="w-full"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}