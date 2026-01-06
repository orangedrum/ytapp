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

interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  activePath?: string;
  onNavigate?: (path: string) => void;
}

export function BottomNavigation({ className, activePath, onNavigate, ...props }: BottomNavigationProps) {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname;

  return (
    <nav
      className={cn(
        "flex h-16 items-center justify-around border-t border-border bg-background",
        className
      )}
      {...props}
    >
      {navItems.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(item.href);
              }
            }}
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