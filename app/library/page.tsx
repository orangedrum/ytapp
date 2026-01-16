import React from "react";
import { LibraryHeader } from "@/components/library-header";
import { PageTransition } from "@/components/ui/page-transition";

export default function LibraryPage() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-background">
        <LibraryHeader />
        <div className="flex-1 p-6">
          {/* Content will go here */}
          <p className="text-muted-foreground text-center mt-10">Library content coming soon...</p>
        </div>
      </div>
    </PageTransition>
  );
}