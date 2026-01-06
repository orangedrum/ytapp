import StyleGuide from "@/components/StyleGuide";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";

export const revalidate = 0; // Make this page dynamic

export default async function StyleGuidePage() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch a single sample video from your 'videos' table
  const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", "303f6703-726f-4b36-b56b-9c7f68161501");

  if (error) {
    console.error("Error fetching sample video:", error.message);
  }

  let sampleVideo = (videos?.[0] as Video) || null;

  // If we have a video but no image, try to generate one from the YouTube URL
  if (sampleVideo && !sampleVideo.thumbnail_url && sampleVideo.video_url) {
    const thumbnail = getYouTubeThumbnail(sampleVideo.video_url);
    if (thumbnail) {
      sampleVideo = { ...sampleVideo, thumbnail_url: thumbnail };
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-50">
      <div className="container mx-auto">
        <StyleGuide sampleVideo={sampleVideo} />
      </div>
    </main>
  );
}
