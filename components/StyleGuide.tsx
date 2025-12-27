import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GoogleLogo,
  FacebookIcon,
  StarIcon,
  EyeIcon,
  ChatIcon,
  CheckIcon,
  WarningCircleIcon,
  XIcon,
} from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MoveRight,
  ArrowRight,
  Loader2,
  User,
  Settings,
  ChevronLeft,
  CreditCard,
  Music,
  Facebook,
  Twitter,
  Apple,
  LogOut,
  PlusCircle,
} from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Tag } from "./ui/tag";
import {
  SelectableCard,
  SelectableCardIcon,
  SelectableCardLabel,
} from "./ui/selectable-card";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { FilterGroup, FilterGroupItem } from "./ui/filter-group";
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderTitle,
} from "./ui/page-header";

// Helper component for displaying a row in the typography scale
const TextStyleRow = ({
  as: Tag = "p",
  name,
  className,
  weight,
}: {
  as?: React.ElementType;
  name: string;
  className: string;
  weight: string;
}) => (
  <div className="flex w-full items-center justify-between border-b py-3">
    <Tag className={className}>{name}</Tag>
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

export default function StyleGuide() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Tango App Style Guide</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Typography Scale</h2>
          <div className="space-y-4">
            <TextStyleRow as="h1" name="Header 1" className="text-h1" weight="600" />
            <TextStyleRow as="h2" name="Header 2" className="text-h2" weight="600" />
            <TextStyleRow as="h3" name="Header 3" className="text-h3" weight="600" />
            <TextStyleRow as="h4" name="Header 4" className="text-h4" weight="600" />
            <TextStyleRow
              as="h4"
              name="Header 4 Medium"
              className="text-h4Medium"
              weight="500"
            />
            <TextStyleRow name="Body 1" className="text-body1" weight="400" />
            <TextStyleRow
              name="Body 1 Medium"
              className="text-body1Medium"
              weight="500"
            />
            <TextStyleRow
              name="Body 1 SemiBold"
              className="text-body1Semibold"
              weight="600"
            />
            <TextStyleRow name="Body 2" className="text-body2" weight="400" />
            <TextStyleRow
              name="Body 2 Medium"
              className="text-body2Medium"
              weight="500"
            />
            <TextStyleRow
              name="Body 2 SemiBold"
              className="text-body2Semibold"
              weight="600"
            />
            <TextStyleRow name="Body 3" className="text-body3" weight="400" />
            <TextStyleRow
              name="Body 3 Medium"
              className="text-body3Medium"
              weight="500"
            />
            <TextStyleRow
              name="Body 3 SemiBold"
              className="text-body3Semibold"
              weight="600"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Buttons</h2>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex flex-col items-start gap-2">
                <Label className="text-sm text-muted-foreground px-1">Primary</Label>
                <Button>Button</Button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label className="text-sm text-muted-foreground px-1">Secondary</Label>
                <Button variant="outline">Button</Button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label className="text-sm text-muted-foreground px-1">Disabled</Label>
                <Button disabled>Button</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Buttons with Icons</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-col items-start gap-2">
                  <Label className="text-sm text-muted-foreground px-1">Icon Left</Label>
                  <Button>
                    <Mail className="mr-2 h-4 w-4" /> Login with Email
                  </Button>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label className="text-sm text-muted-foreground px-1">Icon Right</Label>
                  <Button variant="outline">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label className="text-sm text-muted-foreground px-1">Loading State</Label>
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 pt-4">
              <div className="flex flex-col items-start gap-2">
                <Label className="text-sm text-muted-foreground px-1">Google Button</Label>
                <Button variant="outline" size="xl" className="w-full max-w-[453px] justify-center border-gray-6">
                  <GoogleLogo className="mr-2 h-6 w-6" />
                  Sign Up with Google
                </Button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label className="text-sm text-muted-foreground px-1">Blue Button</Label>
                <Button variant="blue" size="xl" className="w-full max-w-[453px] justify-center" aria-label="Sign Up with Facebook">
                  <FacebookIcon className="mr-2 h-6 w-6" aria-hidden="true" />
                  Sign Up with Blue
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Input Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Default</Label>
              <Input type="email" placeholder="placeholder" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Filled</Label>
              <Input type="email" defaultValue="user.name@email.com" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">With Icon</Label>
              <div className="relative w-full max-w-sm">
                <Input type="email" placeholder="placeholder" className="pr-12" />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-4" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Success</Label>
              <div className="relative w-full max-w-sm">
                <Input variant="success" type="email" defaultValue="valid.email@tango.app" className="pr-12" />
                <CheckIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-success" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Error</Label>
              <div className="w-full max-w-sm space-y-1">
                <div className="relative">
                  <Input variant="error" type="email" defaultValue="invalid-email" className="pr-12" />
                  <WarningCircleIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-destructive" />
                </div>
                <p className="text-sm text-destructive">Please enter a valid email address.</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Disabled</Label>
              <Input type="email" placeholder="placeholder" disabled />
            </div>
            <div className="flex flex-col items-start gap-2 md:col-span-2">
              <Label className="text-sm text-muted-foreground px-1">Focus State</Label>
              <p className="text-sm text-muted-foreground">
                The input field border will darken when it is focused (selected), as shown in the "Hover" state from your design.
              </p>
            </div>
          </div>
        </section>


        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Selection Controls</h2>
          <p className="text-sm text-muted-foreground">
            Note: Control sizes have been increased for better usability, per accessibility best practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start gap-4">
              <Label className="text-sm text-muted-foreground px-1">Radio Group</Label>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Sliders & Progress Bars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label>Slider (Single)</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-4">
              <Label>Slider (Range)</Label>
              {/* To render a range slider, we pass an array to defaultValue */}
              {/* The Slider component will automatically render a thumb for each value */}
              <Slider defaultValue={[25, 75]} max={100} step={1} className="w-[60%]" />
            </div>
            <div className="space-y-4 md:col-span-2">
              <Label>Progress Bar</Label>
              <Progress value={33} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Filter Controls</h2>
          <div className="space-y-2">
            <Label>Sort By</Label>
            {/* This container enables horizontal scrolling on small screens */}
            {/* The inner div uses w-max to prevent wrapping */}
            <div className="w-full overflow-x-auto pb-2">
              <div className="flex w-max space-x-2">
                <FilterGroup type="single" defaultValue="relevance">
                  <FilterGroupItem value="relevance">Relevance</FilterGroupItem>
                  <FilterGroupItem value="low-high">Price: Low - High</FilterGroupItem>
                  <FilterGroupItem value="high-low">Price: High - Low</FilterGroupItem>
                  <FilterGroupItem value="newest">Newest</FilterGroupItem>
                </FilterGroup>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Filter by Category (with horizontal scroll)</Label>
            <div className="w-full overflow-x-auto pb-2">
              <div className="flex w-max space-x-2">
                <FilterGroup type="single" defaultValue="leaders">
                  <FilterGroupItem value="all">All</FilterGroupItem>
                  <FilterGroupItem value="leaders">Leaders</FilterGroupItem>
                  <FilterGroupItem value="followers">Followers</FilterGroupItem>
                  <FilterGroupItem value="technique">Technique</FilterGroupItem>
                  <FilterGroupItem value="musicality">Musicality</FilterGroupItem>
                  <FilterGroupItem value="history">History</FilterGroupItem>
                </FilterGroup>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Page Headers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PageHeader className="border rounded-lg">
              <PageHeaderAction>
                <Button variant="ghost" size="icon">
                  <ChevronLeft />
                </Button>
              </PageHeaderAction>
              <PageHeaderTitle>Sub Page Title</PageHeaderTitle>
              <PageHeaderAction />
            </PageHeader>
            <PageHeader className="border rounded-lg">
              <PageHeaderAction />
              <PageHeaderTitle>Filters</PageHeaderTitle>
              <PageHeaderAction>
                <Button variant="ghost" size="icon">
                  <XIcon />
                </Button>
              </PageHeaderAction>
            </PageHeader>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Selectable Cards</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Label className="text-sm text-muted-foreground px-1">Default State</Label>
              <SelectableCard>
                <SelectableCardIcon><StarIcon className="size-5" /></SelectableCardIcon>
                <SelectableCardLabel>Musicality</SelectableCardLabel>
              </SelectableCard>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Label className="text-sm text-muted-foreground px-1">Selected State</Label>
              <SelectableCard pressed>
                <SelectableCardIcon><StarIcon className="size-5" /></SelectableCardIcon>
                <SelectableCardLabel>Musicality</SelectableCardLabel>
              </SelectableCard>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Segmented Controls</h2>
          <div className="flex flex-col items-start gap-2">
            <Label className="text-sm text-muted-foreground px-1">Planner View</Label>
            <ToggleGroup type="single" defaultValue="day" className="w-full max-w-md">
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Tags / Pills</h2>
          <div className="flex items-end gap-8 flex-wrap">
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Watch & Study</Label>
              <Tag variant="watch"><EyeIcon className="size-4" /> Watch & study</Tag>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Condensed</Label>
              <Tag variant="watch" size="condensed"><EyeIcon className="size-4" /></Tag>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Dance Along</Label>
              <Tag variant="dance"><Music className="size-4" /> Dance Along</Tag>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Condensed</Label>
              <Tag variant="dance" size="condensed"><Music className="size-4" /></Tag>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Explanation</Label>
              <Tag variant="explanation"><ChatIcon className="size-4" /> Explanation</Tag>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="text-sm text-muted-foreground px-1">Condensed</Label>
              <Tag variant="explanation" size="condensed"><ChatIcon className="size-4" /></Tag>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Custom Brand Icons</h2>
          <div className="flex items-center gap-6 flex-wrap text-muted-foreground">
            <div className="flex items-center gap-2"><GoogleLogo className="size-5" /> GoogleLogo</div>
            <div className="flex items-center gap-2"><FacebookIcon className="size-5" /> FacebookIcon</div>
            <div className="flex items-center gap-2"><StarIcon className="size-5 stroke-foreground" /> StarIcon</div>
            <div className="flex items-center gap-2"><EyeIcon className="size-5" /> EyeIcon</div>
            <div className="flex items-center gap-2"><Music className="size-5" /> Music</div>
            <div className="flex items-center gap-2"><ChatIcon className="size-5" /> ChatIcon</div>
            <div className="flex items-center gap-2"><CheckIcon className="size-5 text-success" /> CheckIcon</div>
            <div className="flex items-center gap-2">
              <WarningCircleIcon className="size-5 text-destructive" />{" "}
              WarningCircleIcon
            </div>
            <div className="flex items-center gap-2"><XIcon className="size-5" /> XIcon</div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Icon Library (Curated)</h2>
          <p className="text-muted-foreground">
            A curated list of common icons. For the full set, please refer to the{" "}
            <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Lucide Icon Library
            </a>.
          </p>
          <div className="flex items-center gap-6 flex-wrap text-muted-foreground">
            <div className="flex items-center gap-2"><User /> User</div>
            <div className="flex items-center gap-2"><Settings /> Settings</div>
            <div className="flex items-center gap-2"><CreditCard /> Billing</div>
            <div className="flex items-center gap-2"><MoveRight /> MoveRight</div>
            <div className="flex items-center gap-2"><Facebook /> Facebook</div>
            <div className="flex items-center gap-2"><Twitter /> Twitter</div>
            <div className="flex items-center gap-2"><Apple /> Apple</div>
            <div className="flex items-center gap-2"><LogOut /> Log Out</div>
            <div className="flex items-center gap-2"><PlusCircle /> Add New</div>
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
      </CardContent>
    </Card>
  );
}
