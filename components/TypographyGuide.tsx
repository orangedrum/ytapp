import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Helper component for displaying a row in the typography scale
const TextStyleRow = ({
  name,
  className,
  weight,
}: {
  name: string;
  className: string;
  weight: string;
}) => (
  <div className="flex w-full items-center justify-between border-b py-3">
    <p className={className}>{name}</p>
    <p className="text-muted-foreground">{weight}</p>
  </div>
);

// Helper component for displaying a color swatch
const ColorSwatch = ({
  name,
  hex,
  className,
}: {
  name: string;
  hex: string;
  className: string;
}) => (
  <div className="flex flex-col gap-4 w-36">
    <div className={cn("h-24 w-full rounded-lg border", className)} />
    <p className="text-sm text-muted-foreground text-center">{hex}</p>
  </div>
);

export default function TypographyGuide() {
  return (
    <div className="p-10 space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Typography Scale</h2>
        <div className="space-y-4">
          <TextStyleRow name="Header 1" className="text-h1" weight="600" />
          <TextStyleRow name="Header 2" className="text-h2" weight="600" />
          <TextStyleRow name="Header 3" className="text-h3" weight="600" />
          <TextStyleRow name="Header 4" className="text-h4" weight="600" />
          <TextStyleRow
            name="Header 4 Medium"
            className="text-h4-medium"
            weight="500"
          />
          <TextStyleRow name="Body 1" className="text-body-1" weight="400" />
          <TextStyleRow
            name="Body 1 Medium"
            className="text-body-1-medium"
            weight="500"
          />
          <TextStyleRow
            name="Body 1 SemiBold"
            className="text-body-1-semibold"
            weight="600"
          />
          <TextStyleRow name="Body 2" className="text-body-2" weight="400" />
          <TextStyleRow
            name="Body 2 Medium"
            className="text-body-2-medium"
            weight="500"
          />
          <TextStyleRow
            name="Body 2 SemiBold"
            className="text-body-2-semibold"
            weight="600"
          />
          <TextStyleRow name="Body 3" className="text-body-3" weight="400" />
          <TextStyleRow
            name="Body 3 Medium"
            className="text-body-3-medium"
            weight="500"
          />
          <TextStyleRow
            name="Body 3 SemiBold"
            className="text-body-3-semibold"
            weight="600"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Brand Colors & Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="tango">Tango Action</Button>
          <Button variant="gold">Gold Accent</Button>
          <Button variant="elegant">Elegant Dark</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Color Palette</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          <ColorSwatch name="Foreground" hex="#1A1A1A" className="bg-foreground" />
          <ColorSwatch name="Gray 4" hex="#333333" className="bg-gray-1" />
          <ColorSwatch name="Gray 3" hex="#4D4D4D" className="bg-gray-2" />
          <ColorSwatch name="Gray 2" hex="#666666" className="bg-gray-3" />
          <ColorSwatch name="Muted Fg" hex="#808080" className="bg-muted-foreground" />
          <ColorSwatch name="Gray 5" hex="#999999" className="bg-gray-4" />
          <ColorSwatch name="Gray 6" hex="#B3B3B3" className="bg-gray-5" />
          <ColorSwatch name="Gray 7" hex="#CCCCCC" className="bg-gray-6" />
          <ColorSwatch name="Border" hex="#E6E6E6" className="bg-border" />
          <ColorSwatch name="Background" hex="#FFFFFF" className="bg-background" />
          <ColorSwatch name="Success" hex="#0C9409" className="bg-success" />
          <ColorSwatch name="Destructive" hex="#ED1010" className="bg-destructive" />
        </div>
      </section>
    </div>
  );
}