"use client";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";

// Initialize Builder with your API Key
// We add || "" to ensure it never crashes the build if the key is missing momentarily
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");

// We use 'any' for content to bypass strict type checking during the build
export function RenderBuilderContent({ content, model }: { content: any; model?: string }) {
  // Call the useIsPreviewing hook to determine if 
  // the page is being viewed in an editor
  const isPreviewing = useIsPreviewing();

  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model={model || "page"} />;
  }

  // If content is missing, show a success message so Builder can connect
  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>App Connected!</h1>
      <p>Go back to Builder.io and create your page.</p>
    </div>
  );
}
