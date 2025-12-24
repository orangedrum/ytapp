import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '@/components/builder';

// Initialize Builder with your API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params?: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  // If props.params.page is undefined, we are on the homepage ('/')
  const urlPath = '/' + (props.params?.page?.join('/') || '');

  const content = await builder
    // Get the page content from Builder with the specified URL
    .get('page', {
      userAttributes: {
        // Combine the array of path segments into a single URL string
        // e.g. ['tango', 'boleos'] becomes '/tango/boleos'
        urlPath,
      },
    })
    // Convert the result to a promise
    .toPromise();

  // --- DIAGNOSTIC LOG ---
  // This will print to the Vercel logs so we can see exactly what Builder is sending back
  console.log('Builder content for', urlPath, ':', content);

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} />
    </>
  );
}
