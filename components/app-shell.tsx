"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation } from "@/components/ui/bottom-nav";

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 
        Main Content Area 
        Added padding-bottom to prevent content from being hidden behind the fixed bottom nav on mobile
      */}
      <main className="flex-1 pb-[84px] md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <BottomNavigation 
          activePath={activePath} 
          onNavigate={handleNavigate} 
          className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        />
      </div>
    </div>
  );
}