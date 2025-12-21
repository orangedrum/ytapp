import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

// Initialize Builder with your API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Page() {
  const content = await builder
    // Get the page content from Builder with the specified URL
    .get("page", {
      userAttributes: {
        // Explicitly set the path to "/" for the homepage
        urlPath: "/",
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} />
    </>
  );
}
