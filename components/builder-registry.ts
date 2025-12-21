import { Builder } from "@builder.io/react";
import { Button } from "@/components/ui/button"; // <--- Check this path!

Builder.registerComponent(Button, {
  name: "Shadcn Button",
  inputs: [
    { name: "children", type: "string", defaultValue: "Click Me" },
    { 
      name: "variant", 
      type: "string", 
      enum: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      defaultValue: "default"
    },
  ],
});
