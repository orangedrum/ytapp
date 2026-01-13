import React from "react";
import { DancePageBackground } from "@/components/ui/dance-page-background";
import { createClient } from "@supabase/supabase-js";
import { DancePageCarousel } from "@/components/dance-page-carousel";
import { Video } from "@/lib/types"; // Import Video type

export const revalidate = 0;

export default async function DancePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .limit(3);

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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-24 pt-32 gap-8">
        <div className="w-full max-w-4xl px-0 space-y-6">
          <h4 className="text-h4 text-center font-semibold">Today&apos;s Suggested Videos</h4>
          <DancePageCarousel videos={(videos as Video[]) || []} />
        </div>
      </div>
    </>
  );
}