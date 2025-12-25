"use client";

import { useEffect, useState } from "react";
import { builder } from "@builder.io/sdk";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { useSearchParams } from "next/navigation";
import "@/components/builder-registry"; // Ensure our components are registered

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function BuilderPreviewPage() {
  const searchParams = useSearchParams();
  // Get the model name from the URL (e.g. ?model=section) or default to 'page'
  const model = searchParams.get("model") || "page";
  const isPreviewing = useIsPreviewing();

  // If we are in the Builder editor, render the component for the requested model
  if (isPreviewing) {
    return (
      <>
        <BuilderComponent model={model} />
      </>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-10 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Builder.io Preview Page</h1>
        <p className="text-gray-600">
          This page is a preview target for the Builder.io Visual Editor.
          <br />
          Please open this URL inside the Builder.io app.
        </p>
      </div>
    </div>
  );
}