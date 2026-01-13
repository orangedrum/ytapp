import React from "react";
import { DancePageBackground } from "@/components/ui/dance-page-background";
import { createClient } from "@supabase/supabase-js";
import { VideoCard } from "@/components/ui/video-card";
import { Video } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/youtube";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <h1 className="text-h1 font-semibold leading-[0.85] tracking-tight text-foreground">
          Yankee
          <br />
          Tango
        </h1>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-24 pt-32 gap-8">
        <div className="w-full max-w-md px-6 space-y-6">
          <h4 className="text-h4 text-center font-semibold">Today&apos;s Suggested Videos</h4>
          
          <Carousel className="w-full" opts={{ align: "center" }}>
            <CarouselContent className="-ml-4">
              {videos?.map((video: Video) => (
                <CarouselItem key={video.id} className="pl-4 basis-[85%] sm:basis-[70%]">
                  <VideoCard
                    imageUrl={video.thumbnail_url || (video.video_url ? getYouTubeThumbnail(video.video_url) || "" : "") || "https://placehold.co/235x240/e2e8f0/e2e8f0"}
                    category={video.category}
                    tagVariant={video.tag_variant}
                    tagLabel={video.tag_label}
                    title={video.title}
                    duration={video.duration}
                    description={video.description}
                    className="h-auto aspect-[235/340]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}