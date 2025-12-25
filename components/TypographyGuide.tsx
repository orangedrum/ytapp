import React from "react";
import { Button } from "@/components/ui/button";

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
    </div>
  );
}