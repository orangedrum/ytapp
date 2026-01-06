"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  UserIcon,
  BoxIcon,
  UsersIcon,
  EditIcon,
} from "@/components/ui/icons";
import { Music } from "lucide-react";

// Define the structure for a navigation item
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

// List of navigation items, interpreting the labels from the design
const navItems: NavItem[] = [
  { href: "/dance", label: "Dance", icon: Music },
  { href: "/library", label: "Library", icon: BoxIcon },
  { href: "/community", label: "Community", icon: UsersIcon },
  { href: "/journal", label: "Journal", icon: EditIcon },
  { href: "/account", label: "Account", icon: UserIcon },
];

export function BottomNavigation({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background md:hidden",
        className
      )}
      {...props}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-1 flex-col items-center justify-center gap-1 p-1 text-center"
          >
            <item.icon className={cn("size-6", isActive ? "text-foreground" : "text-muted-foreground")} aria-hidden="true" />
            <span className={cn("text-xs font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}