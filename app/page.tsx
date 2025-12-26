import TypographyGuide from "@/components/TypographyGuide";

export default function StyleguidePage() {
  return (
    // Added a min-h-screen to ensure it takes full height and justify-center for centering
    // Also added a background to make it distinct
    <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-50">
      <div className="container mx-auto">
        <TypographyGuide />
      </div>
    </main>
  );
}