"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

// Reusing the card style from SelectableCard but for display only
const StatCard = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center w-[75px] h-[57px] rounded-[10px] border-2 border-foreground bg-foreground p-1">
    <div className="h-8 w-8 flex items-center justify-center">
      <StarFilledIcon className="w-7 h-7 text-background" />
    </div>
    <p className="text-[11px] font-medium text-center text-background leading-tight">
      {label}
    </p>
  </div>
);

interface CelebrationPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CelebrationPage({ searchParams }: CelebrationPageProps) {
  const time = typeof searchParams.time === 'string' ? searchParams.time : "04:37";
  const category = typeof searchParams.category === 'string' ? searchParams.category : "adornos";
  const videoId = typeof searchParams.videoId === 'string' ? searchParams.videoId : null;

  // Determine stats to show. If category is 'technique', ensure it's included.
  // We'll replace the first card with the practiced category if it's not already there.
  const defaultStats = ["Musicality", "Balance", "Posture"];
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const stats = defaultStats.includes(displayCategory) ? defaultStats : [displayCategory, "Balance", "Posture"];

  const calendarUrl = videoId ? `/practice/calendar?videoId=${videoId}` : '/practice/calendar';

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoId) {
      try {
        const stored = localStorage.getItem('completedVideos');
        const completedVideos = stored ? JSON.parse(stored) : [];
        if (!completedVideos.includes(videoId)) {
          completedVideos.push(videoId);
          localStorage.setItem('completedVideos', JSON.stringify(completedVideos));
        }
      } catch (e) {
        console.error("Failed to save completed video", e);
      }
    }
  }, [videoId]);

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      
      {/* Main Content - Centered Vertically */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 pb-24 gap-8">
        
        {/* Celebration Image Placeholder */}
        <div className="relative w-[204px] h-[204px]">
           <svg width="204" height="204" viewBox="0 0 204 204" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M114.75 76.5C114.75 73.9783 115.498 71.5132 116.899 69.4165C118.3 67.3198 120.291 65.6856 122.621 64.7205C124.951 63.7555 127.514 63.503 129.987 63.995C132.461 64.4869 134.732 65.7013 136.516 67.4844C138.299 69.2675 139.513 71.5393 140.005 74.0126C140.497 76.4859 140.244 79.0495 139.279 81.3792C138.314 83.709 136.68 85.7002 134.584 87.1012C132.487 88.5022 130.022 89.25 127.5 89.25C124.118 89.25 120.875 87.9067 118.484 85.5156C116.093 83.1245 114.75 79.8815 114.75 76.5ZM188.062 44.625V159.375C188.062 163.602 186.383 167.656 183.395 170.645C180.406 173.633 176.352 175.312 172.125 175.312H31.875C27.6481 175.312 23.5943 173.633 20.6055 170.645C17.6166 167.656 15.9375 163.602 15.9375 159.375V44.625C15.9375 40.3981 17.6166 36.3443 20.6055 33.3555C23.5943 30.3666 27.6481 28.6875 31.875 28.6875H172.125C176.352 28.6875 180.406 30.3666 183.395 33.3555C186.383 36.3443 188.062 40.3981 188.062 44.625ZM35.0625 47.8125V111.339L62.0447 84.3572C65.0334 81.3694 69.0864 79.6909 73.3125 79.6909C77.5386 79.6909 81.5916 81.3694 84.5803 84.3572L117.388 117.141L131.078 103.458C134.067 100.47 138.12 98.792 142.346 98.792C146.572 98.792 150.625 100.47 153.614 103.458L168.938 118.806V47.8125H35.0625ZM35.0625 156.188H129.365L73.3125 100.135L35.0625 138.385V156.188ZM168.938 156.188V145.828L142.346 119.236L130.911 130.688L156.411 156.188H168.938Z" fill="#B3B3B3"></path>
          </svg>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-h3 font-semibold text-foreground">
            Rising Star!
          </h2>
          <p className="text-body1Medium text-muted-foreground">
            You completed {time} of {category}
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col items-center gap-4 w-full">
          <h3 className="text-h4 font-semibold text-foreground text-center">
            You Just Improved Your:
          </h3>
          <div className="flex items-center justify-center gap-4 w-full">
            {stats.map((stat) => (
              <StatCard key={stat} label={stat} />
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 h-[80px] flex items-center px-6">
        <div className="w-full max-w-md mx-auto">
          <Link href={calendarUrl} className="w-full">
            <Button className="w-full h-[54px] text-base font-medium rounded-[10px] bg-foreground text-background hover:bg-foreground/90">
              Continue
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
