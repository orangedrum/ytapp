import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { VideoCard } from "@/components/ui/video-card";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";

export const revalidate = 0;

export default async function LibraryPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <div className="container mx-auto p-4 space-y-6 pb-24 md:pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Library</h1>
        <p className="text-muted-foreground">Browse the complete collection of tango lessons.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-stretch">
        {videos?.map((video: Video) => {
          const imageUrl = video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) : "") || "https://placehold.co/235x240/e2e8f0/e2e8f0";
          
          return (
            <VideoCard
              key={video.id}
              imageUrl={imageUrl || ""}
              category={video.category}
              tagVariant={video.tag_variant}
              tagLabel={video.tag_label}
              title={video.title}
              duration={video.duration}
              description={video.description}
              isFavorited={false} // We will wire this up later
            />
          );
        })}
      </div>
    </div>
  );
}
