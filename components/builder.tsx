"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

// Initialize Builder with your API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export function RenderBuilderContent({ content, model }: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if 
  // the page is being viewed in an editor
  const isPreviewing = useIsPreviewing();

  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model={model || "page"} />;
  }

  // If the "content" is null and the page is not being previewed in Builder,
  // render the DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />;
}
