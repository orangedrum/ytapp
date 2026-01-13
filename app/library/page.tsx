import { createClient } from "@supabase/supabase-js";
import { VideoCard } from "@/components/ui/video-card";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";

export const revalidate = 0;

export default async function LibraryPage() {
  // Deductive Reasoning: Check for missing environment variables to prevent server crash
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
        <p className="text-muted-foreground mt-2">Supabase environment variables are missing in Vercel.</p>
      </div>
    );
  }

  try {
    // Deductive Reasoning: Switch to standard client to bypass cookie/auth-helper issues
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: videos, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error(`Supabase Error: ${error.message}`);
    }

    return (
      <div className="container mx-auto p-4 space-y-6 pb-24 md:pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground">Browse the complete collection of tango lessons.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-stretch">
          {videos?.map((video: Video) => {
            // Safe thumbnail generation to prevent crashes from bad URLs
            let imageUrl = "https://placehold.co/235x240/e2e8f0/e2e8f0";
            try {
               imageUrl = video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) : "") || "https://placehold.co/235x240/e2e8f0/e2e8f0";
            } catch (e) {
               console.error("Thumbnail generation error for video", video.id, e);
            }
            
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
  } catch (error: any) {
    console.error("Library Page Error:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          {error.message || "An unexpected error occurred while loading the library."}
        </p>
      </div>
    );
  }
}
