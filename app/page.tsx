import { DancePageCarousel } from "@/components/dance-page-carousel";
import { Video } from "@/lib/types"; // Import Video type
import { getYouTubeThumbnail } from "@/lib/youtube";
import { PageTransition } from "@/components/ui/page-transition";

export const revalidate = 0;

  }) || [];

  return (
    <PageTransition>
      <DancePageBackground />
      <div className="absolute top-2 left-6 z-20 flex flex-col items-start">
        <h1 className="text-h1 font-semibold leading-[0.8] tracking-tight text-foreground">
          <DancePageCarousel videos={(processedVideos as Video[])} />
        </div>
      </div>
    </PageTransition>
  );
}
