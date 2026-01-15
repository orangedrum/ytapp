import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";
import { VideoDetailView } from "@/components/video-detail-view";

// Force dynamic rendering since we are fetching data based on params
export const revalidate = 0;

// Video Detail Page Server Component
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

  return <VideoDetailView video={video} imageUrl={imageUrl} />;
}
