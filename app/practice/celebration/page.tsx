"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

// Reusing the card style from SelectableCard but for display only
const StatCard = ({ label, index }: { label: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 + index * 0.1, duration: 0.4, type: "spring" }}
    className="flex flex-col items-center justify-center w-[75px] h-[57px] rounded-[10px] border-2 border-foreground bg-foreground p-1"
  >
    <div className="h-8 w-8 flex items-center justify-center">
      <StarFilledIcon className="w-7 h-7 text-background" />
    </div>
    <p className="text-[11px] font-medium text-center text-background leading-tight">
      {label}
    </p>
  </motion.div>
);

const ConfettiParticle = ({ delay }: { delay: number }) => {
  // Randomize start/end positions for a more natural explosion
  const [randomX, setRandomX] = useState(0);
  const [randomY, setRandomY] = useState(0);
  const [randomRotate, setRandomRotate] = useState(0);
  const [color, setColor] = useState("#FFC700");

  useEffect(() => {
    setRandomX(Math.random() * 100 - 50); // -50% to 50%
    setRandomY(Math.random() * -100 - 50); // -150% to -50%
    setRandomRotate(Math.random() * 360);
    const colors = ["#FFC700", "#FF0000", "#2E81FF", "#00C792", "#FF0099"];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0 }}
      animate={{
        opacity: [1, 1, 0],
        x: randomX * 5, // Spread out
        y: [0, randomY, randomY + 200], // Go up then fall down
        rotate: randomRotate + 720,
        scale: [0, 1, 0.5],
      }}
      transition={{ duration: 2.5, delay: delay, ease: "circOut" }}
      style={{ backgroundColor: color }}
      className="absolute w-3 h-3 rounded-sm top-1/2 left-1/2 pointer-events-none"
    />
  );
};

const ConfettiExplosion = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((i) => (
        <ConfettiParticle key={i} delay={Math.random() * 0.5} />
      ))}
    </div>
  );
};

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
    <PageTransition className="flex flex-col h-screen bg-background relative overflow-hidden">
      <ConfettiExplosion />
      
      {/* Main Content - Centered Vertically */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 pb-24 gap-8 z-10">
        
        {/* Celebration Image Placeholder */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative w-[204px] h-[204px]"
        >
           <svg width="204" height="204" viewBox="0 0 204 204" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M114.75 76.5C114.75 73.9783 115.498 71.5132 116.899 69.4165C118.3 67.3198 120.291 65.6856 122.621 64.7205C124.951 63.7555 127.514 63.503 129.987 63.995C132.461 64.4869 134.732 65.7013 136.516 67.4844C138.299 69.2675 139.513 71.5393 140.005 74.0126C140.497 76.4859 140.244 79.0495 139.279 81.3792C138.314 83.709 136.68 85.7002 134.584 87.1012C132.487 88.5022 130.022 89.25 127.5 89.25C124.118 89.25 120.875 87.9067 118.484 85.5156C116.093 83.1245 114.75 79.8815 114.75 76.5ZM188.062 44.625V159.375C188.062 163.602 186.383 167.656 183.395 170.645C180.406 173.633 176.352 175.312 172.125 175.312H31.875C27.6481 175.312 23.5943 173.633 20.6055 170.645C17.6166 167.656 15.9375 163.602 15.9375 159.375V44.625C15.9375 40.3981 17.6166 36.3443 20.6055 33.3555C23.5943 30.3666 27.6481 28.6875 31.875 28.6875H172.125C176.352 28.6875 180.406 30.3666 183.395 33.3555C186.383 36.3443 188.062 40.3981 188.062 44.625ZM35.0625 47.8125V111.339L62.0447 84.3572C65.0334 81.3694 69.0864 79.6909 73.3125 79.6909C77.5386 79.6909 81.5916 81.3694 84.5803 84.3572L117.388 117.141L131.078 103.458C134.067 100.47 138.12 98.792 142.346 98.792C146.572 98.792 150.625 100.47 153.614 103.458L168.938 118.806V47.8125H35.0625ZM35.0625 156.188H129.365L73.3125 100.135L35.0625 138.385V156.188ZM168.938 156.188V145.828L142.346 119.236L130.911 130.688L156.411 156.188H168.938Z" fill="#B3B3B3"></path>
          </svg>
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-h3 font-semibold text-foreground"
          >
            Rising Star!
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-body1Medium text-muted-foreground"
          >
            You completed {time} of {category}
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col items-center gap-4 w-full">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-h4 font-semibold text-foreground text-center"
          >
            You Just Improved Your:
          </motion.h3>
          <div className="flex items-center justify-center gap-4 w-full">
            {stats.map((stat, index) => (
              <StatCard key={stat} label={stat} index={index} />
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Footer Button */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 h-[80px] flex items-center px-6"
      >
        <div className="w-full max-w-md mx-auto">
          <Link href={calendarUrl} className="w-full">
            <Button className="w-full h-[54px] text-base font-medium rounded-[10px] bg-foreground text-background hover:bg-foreground/90">
              Continue
            </Button>
          </Link>
        </div>
      </motion.div>

    </PageTransition>
  );
}
