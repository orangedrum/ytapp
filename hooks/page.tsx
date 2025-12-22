import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/components/AuthForm";

export default function StyleguidePage() {
  return (
    <div className="container py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Style Guide</h1>
        <p className="text-lg text-muted-foreground">
          A reference for the design system, typography, and components.
        </p>
      </div>

      <hr className="border-t" />

      {/* Typography Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Heading 1</p>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              The quick brown fox
            </h1>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Heading 2</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Jumps over the lazy dog
            </h2>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Heading 3</p>
            <h3 className="text-2xl font-semibold tracking-tight">
              Design System v1.0
            </h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Body Text</p>
            <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t" />

      {/* Buttons Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <hr className="border-t" />

      {/* Inputs Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Inputs & Forms</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email-example">Email Address</Label>
          <Input type="email" id="email-example" placeholder="name@example.com" />
        </div>
      </section>

      <hr className="border-t" />

      {/* Cards Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Cards</h2>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Notification</CardTitle>
            <CardDescription>You have a new message.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your practice session has been scheduled for tomorrow at 10:00 AM.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Mark as Read</Button>
          </CardFooter>
        </Card>
      </section>

      <hr className="border-t" />

      {/* Auth Component Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Auth Component</h2>
        <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900">
            <AuthForm />
        </div>
      </section>
    </div>
  );
}