import StyleGuide from "@/components/StyleGuide";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Video } from "@/lib/types";

export const revalidate = 0; // Make this page dynamic

export default async function StyleGuidePage() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch a single sample video from your 'videos' table
  const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching sample video:", error.message);
  }

  const sampleVideo = (videos?.[0] as Video) || null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-50">
      <div className="container mx-auto">
        <StyleGuide sampleVideo={sampleVideo} />
      </div>
    </main>
  );
}
