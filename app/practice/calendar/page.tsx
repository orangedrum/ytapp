import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckDuotoneIcon, CircleIcon, StarFilledIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

// Placeholder for the score animation
const ScoreCard = () => (
  <div className="flex flex-col items-center justify-center w-[119px] h-[91px] rounded-[10px] border-2 border-foreground bg-foreground p-2 shadow-lg">
    <div className="h-12 w-12 flex items-center justify-center mb-1">
      <StarFilledIcon className="w-10 h-10 text-background" />
    </div>
    <p className="text-[11px] font-medium text-center text-background leading-tight">
      Practice Score
    </p>
  </div>
);

// Day item for the calendar
const DayItem = ({ day, status, animate }: { day: string, status: 'checked' | 'unchecked', animate?: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs font-medium text-gray-2">{day}</span>
    <div className={cn(
      "relative flex items-center justify-center w-6 h-6 rounded-full", 
      animate && "animate-in zoom-in-0 duration-700 ease-out fill-mode-forwards delay-100"
    )}>
      {status === 'checked' ? (
        <div className={cn("relative flex items-center justify-center", animate && "drop-shadow-[0_0_8px_rgba(12,148,9,0.8)]")}>
           <CheckDuotoneIcon className="w-6 h-6 text-success" />
        </div>
      ) : (
        <CircleIcon className="w-6 h-6 text-foreground" />
      )}
    </div>
  </div>
);

interface PracticeCalendarPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PracticeCalendarPage({ searchParams }: PracticeCalendarPageProps) {
  const videoId = typeof searchParams.videoId === 'string' ? searchParams.videoId : null;
  // If we have a videoId, go back to the video with feedback modal trigger, otherwise go home
  const nextUrl = videoId ? `/video/${videoId}?feedback=true` : '/';

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      
      {/* Main Content - Centered Vertically */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 pb-24 gap-10">
        
        {/* Title */}
        <h2 className="text-h4 font-semibold text-foreground text-center px-4">
          Consistent Practice Builds Results
        </h2>

        {/* Score Animation Placeholder */}
        <div className="flex justify-center w-full">
          <ScoreCard />
        </div>

        {/* Weekly Progress Calendar */}
        <div className="w-full max-w-[341px] p-4 rounded-[22px] border-2 border-gray-1 bg-background flex justify-between items-center">
           <DayItem day="T" status="checked" />
           <DayItem day="W" status="checked" />
           <DayItem day="T" status="unchecked" />
           <DayItem day="F" status="checked" />
           <DayItem day="S" status="checked" animate={true} />
           <DayItem day="S" status="unchecked" />
           <DayItem day="M" status="unchecked" />
        </div>

        {/* Motivational Text */}
        <p className="text-body1 text-gray-2 text-center max-w-[260px] leading-snug">
          Keep practicing to be matched with practice partners & receive special rewards
        </p>

      </div>

      {/* Sticky Footer Button */}
      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 bg-background border-t border-border z-40 h-[80px] flex items-center px-6">
        <div className="w-full max-w-md mx-auto">
          <Link href={nextUrl} className="w-full">
            <Button className="w-full h-[54px] text-base font-medium rounded-[10px] bg-foreground text-background hover:bg-foreground/90">
              I'll Keep Practicing!
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
