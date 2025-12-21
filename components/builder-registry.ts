"use client";
import { Builder } from "@builder.io/react";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// 1. Register Auth Form
Builder.registerComponent(AuthForm, {
  name: "Auth Form",
});

// 2. Register Shadcn Button
Builder.registerComponent(Button, {
  name: "Shadcn Button",
  inputs: [
    { name: "children", type: "string", defaultValue: "Click Me" },
    {
      name: "variant",
      type: "string",
      enum: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      defaultValue: "default",
    },
  ],
});

// 3. Register Shadcn Input
Builder.registerComponent(Input, {
  name: "Shadcn Input",
  inputs: [
    { name: "type", type: "string", defaultValue: "text" },
    { name: "placeholder", type: "string", defaultValue: "Type here..." },
  ],
});

// 4. Register Shadcn Label
Builder.registerComponent(Label, {
  name: "Shadcn Label",
  inputs: [{ name: "children", type: "string", defaultValue: "Label Text" }],
});

// 5. Register Shadcn Card Family
Builder.registerComponent(Card, {
  name: "Shadcn Card",
  canHaveChildren: true,
});
Builder.registerComponent(CardHeader, {
  name: "Card Header",
  canHaveChildren: true,
});
Builder.registerComponent(CardTitle, {
  name: "Card Title",
  canHaveChildren: true,
});
Builder.registerComponent(CardContent, {
  name: "Card Content",
  canHaveChildren: true,
});
Builder.registerComponent(CardFooter, {
  name: "Card Footer",
  canHaveChildren: true,
});

// 6. Register Shadcn Carousel Family
Builder.registerComponent(Carousel, {
  name: "Shadcn Carousel",
  canHaveChildren: true,
  inputs: [
    {
      name: "orientation",
      type: "string",
      enum: ["horizontal", "vertical"],
      defaultValue: "horizontal",
    },
  ],
});
Builder.registerComponent(CarouselContent, {
  name: "Carousel Content",
  canHaveChildren: true,
});
Builder.registerComponent(CarouselItem, {
  name: "Carousel Item",
  canHaveChildren: true,
});
Builder.registerComponent(CarouselNext, { name: "Carousel Next" });
Builder.registerComponent(CarouselPrevious, { name: "Carousel Previous" });
