import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Target, Trophy, MessageCircleQuestion } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useIsMobile } from '@/hooks/use-mobile';

const authenticatedNavItems = [
  { path: "/library", label: "Library", icon: BookOpen },
  { path: "/practice-zone", label: "Practice Zone", icon: Target },
  { path: "/practice-leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/qa", label: "Q&A", icon: MessageCircleQuestion }
];

export const AuthenticatedNav = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't render if user is not authenticated
  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden pb-safe">
        <div className="flex justify-around items-center h-16">
          {authenticatedNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  active ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // Desktop Sub-Navigation
  return (
    <nav className="hidden md:block sticky top-16 z-40 bg-black border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 h-12">
          {authenticatedNavItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-light transition-colors border-b-2 h-full flex items-center ${
                  active
                    ? 'text-white font-medium border-white'
                    : 'text-white/70 hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
