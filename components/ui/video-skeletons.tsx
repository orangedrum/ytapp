import { cn } from "@/lib/utils";

const SkeletonBase = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("animate-pulse bg-gray-300/50 rounded-md", className)} {...props} />
);

export const VideoPlateSkeleton = () => (
  <div className="relative w-full max-w-[341px] aspect-[341/369] rounded-[10px] overflow-hidden border bg-card">
    <SkeletonBase className="w-full h-full rounded-none" />
  </div>
);

export const VideoCardSkeleton = () => (
  <div className="flex w-full max-w-[235px] flex-col gap-2.5 rounded-[10px] border bg-card p-2.5 shadow-sm">
    <SkeletonBase className="h-[158px] w-full rounded-md" />
    <div className="flex flex-col gap-2 px-1">
      <div className="flex items-center justify-between">
        <SkeletonBase className="h-4 w-16" />
        <SkeletonBase className="h-6 w-16 rounded-full" />
      </div>
      <SkeletonBase className="h-5 w-3/4" />
      <div className="space-y-1">
        <SkeletonBase className="h-3 w-full" />
        <SkeletonBase className="h-3 w-2/3" />
      </div>
    </div>
  </div>
);

export const VideoCardHorizontalSkeleton = () => (
  <div className="inline-flex w-full max-w-[342px] h-[107px] sm:h-auto sm:min-h-[95px] p-3 sm:p-[14px_15px] items-center gap-3 sm:gap-4 rounded-[10px] border border-border bg-background">
    <SkeletonBase className="w-[70px] h-[65px] sm:w-[83px] sm:h-[79px] rounded-[4px] flex-shrink-0" />
    <div className="flex flex-col justify-between self-stretch flex-1 py-1">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-2 w-full">
          <SkeletonBase className="h-4 w-3/4" />
          <SkeletonBase className="h-3 w-24" />
          <SkeletonBase className="h-3 w-12" />
        </div>
        <SkeletonBase className="size-4 rounded-sm flex-shrink-0" />
      </div>
      <div className="flex justify-end items-end w-full mt-auto">
        <SkeletonBase className="w-[24px] h-[22px] rounded-[3px]" />
      </div>
    </div>
  </div>
);

export const VideoCardHalfSkeleton = () => (
  <div className="inline-flex flex-col w-[120px] h-[200px] sm:w-[140px] sm:h-[220px] md:w-[161px] md:h-[247px] rounded-[10px] border border-border bg-background shadow-sm overflow-hidden">
    <SkeletonBase className="w-full h-[140px] sm:h-[155px] md:h-[174px] rounded-none" />
    <div className="flex flex-col items-start gap-2 p-[5px] pt-4 w-full">
      <SkeletonBase className="h-4 w-3/4" />
      <SkeletonBase className="h-3 w-1/2" />
    </div>
  </div>
);

export const VideoListItemSkeleton = () => (
  <div className="flex w-full max-w-[500px] h-[60px] sm:h-[53px] items-center justify-between rounded-[10px] border border-border bg-background overflow-hidden">
    <div className="flex items-center h-full flex-1 gap-0">
      <SkeletonBase className="w-[20px] sm:w-[25px] h-full rounded-none" />
      <SkeletonBase className="w-[48px] h-full sm:w-[56px] rounded-none flex-shrink-0" />
      <div className="flex flex-col items-start justify-center px-2 sm:px-3 gap-2 w-full">
        <SkeletonBase className="h-4 w-3/4" />
        <SkeletonBase className="h-3 w-12" />
      </div>
    </div>
    <div className="flex items-center justify-center px-2.5 sm:px-4 h-full">
      <SkeletonBase className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
    </div>
  </div>
);

export const VideoCardRatingSkeleton = () => (
  <div className="flex w-full max-w-[326px] h-auto md:h-[94px] items-start gap-2.5 p-1 md:p-3 rounded-[10px] flex-col-reverse md:flex-row border bg-card">
    <div className="flex flex-col w-full h-auto justify-center items-center gap-2">
      <div className="flex w-full h-[28px] items-center gap-2 px-2 justify-center md:justify-start">
        <SkeletonBase className="h-6 w-8" />
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-3 w-12" />
      </div>
      <div className="flex w-full items-start gap-2 flex-col sm:flex-row">
        <SkeletonBase className="flex-1 h-[39px] sm:h-[35px] w-full" />
        <SkeletonBase className="flex-1 h-[39px] sm:h-[35px] w-full" />
      </div>
    </div>
    <SkeletonBase className="w-full md:w-[91px] h-[70px] rounded-[4px] md:rounded-lg flex-shrink-0" />
  </div>
);
