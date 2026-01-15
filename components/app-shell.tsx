"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation } from "@/components/ui/bottom-nav";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Handle navigation from the bottom nav
  const handleNavigate = (path: string) => {
    // Map the 'Dance' tab (which emits '/dance') to the root route '/'
    if (path === "/dance") {
      router.push("/");
    } else {
      router.push(path);
    }
  };

  // If we are at root, highlight the 'Dance' tab
  const activePath = pathname === "/" ? "/dance" : pathname;

  // Hide navigation on the style guide to keep it separate
  const isStyleGuide = pathname.startsWith("/styleguide");
  
  // Hide navigation on specific flow pages to keep them immersive
  const isImmersivePage = pathname.startsWith("/video/") || 
                          pathname.startsWith("/practice/celebration") || 
                          pathname.startsWith("/practice/calendar");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 
        Main Content Area 
        Added padding-bottom to prevent content from being hidden behind the fixed bottom nav on mobile
      */}
      <main className={cn("flex-1", !isStyleGuide && !isImmersivePage && "pb-[84px] md:pb-0")}>
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className={cn("fixed bottom-0 left-0 right-0 z-50 dark", (isStyleGuide || isImmersivePage) && "hidden")}>
        <BottomNavigation 
          activePath={activePath} 
          onNavigate={handleNavigate} 
          className="border-t bg-black text-white border-white/10"
        />
      </div>
    </div>
  );
}