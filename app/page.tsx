import React from "react";
import { DancePageBackground } from "@/components/ui/dance-page-background";

export default function DancePage() {
  return (
    <>
      <DancePageBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <h1 className="text-3xl font-bold">Dance</h1>
        <p className="text-muted-foreground mt-2">Your daily recommended videos will appear here.</p>
      </div>
    </>
  );
}