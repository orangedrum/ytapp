import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { LibraryHeader } from "@/components/library-header";
import { PageTransition } from "@/components/ui/page-transition";
import { VideoListItem } from "@/components/ui/video-list-item";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";

export const revalidate = 0;

interface LibraryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: videos } = await supabase.from("videos").select("*");

  // Filter videos based on searchParams
  const categoryFilter = typeof searchParams.category === 'string' ? searchParams.category.toLowerCase() : 'all';
  
  const filteredVideos = videos?.filter((video: Video) => {
    if (categoryFilter === 'all' || categoryFilter === 'suggested') return true;
    // Simple case-insensitive match for category
    return video.category?.toLowerCase() === categoryFilter;
  }) || [];

  // Process videos to ensure they have thumbnails
  const processedVideos = filteredVideos.map((video: Video) => {
    if (!video.thumbnail_url && video.video_url) {
      const thumbnail = getYouTubeThumbnail(video.video_url);
      if (thumbnail) {
        return { ...video, thumbnail_url: thumbnail };
      }
    }
    return video;
  });

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-background">
        <LibraryHeader />
        {/* Updated padding-bottom from pb-20 to pb-4 as requested */}
        <div className="flex-1 px-6 pt-2 pb-4">
          <div className="flex flex-col gap-4">
            {processedVideos.length > 0 ? (
              processedVideos.map((video: Video) => (
                <Link href={`/video/${video.id}`} key={video.id} className="block">
                  <VideoListItem
                    imageUrl={video.thumbnail_url || "https://placehold.co/56x53/e2e8f0/e2e8f0"}
                    category={video.category || "General"}
                    title={video.title || "Untitled"}
                    duration={video.duration || "00:00"}
                    className="w-full"
                  />
                </Link>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-10">
                No videos found for this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
