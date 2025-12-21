import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { NotificationBell } from "./NotificationBell";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPointer, setShowPointer] = useState(false);
  const [showInstallPointer, setShowInstallPointer] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { data: profile } = useUserProfile(user?.id);
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();

  // Listen for custom events to show pointers
  useEffect(() => {
    const handleShowProfilePointer = () => {
      setShowPointer(true);
      setTimeout(() => setShowPointer(false), 10000);
    };

    const handleShowInstallPointer = () => {
      setShowInstallPointer(true);
      setTimeout(() => setShowInstallPointer(false), 10000);
    };

    window.addEventListener('showProfilePointer', handleShowProfilePointer);
    window.addEventListener('showInstallPointer', handleShowInstallPointer);
    
    return () => {
      window.removeEventListener('showProfilePointer', handleShowProfilePointer);
      window.removeEventListener('showInstallPointer', handleShowInstallPointer);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const publicNavItems = [{
    path: "/about",
    label: "About"
  }, {
    path: "/services",
    label: "Services"
  }, {
    path: "/testimonials",
    label: "Testimonials"
  }, {
    path: "/freebrain-partnership",
    label: "FreeBrain Partnership"
  }, {
    path: "/blog",
    label: "Blog"
  }, {
    path: "/contact",
    label: "Contact"
  }];

  // Only show menu dropdown for non-authenticated users
  const navItems = user ? [] : publicNavItems;

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  return <>
    {/* Mobile Install App Banner - Pinned at top */}
    {(isInstallable || !isInstalled) && !isInstalled && (
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-blue-500 px-4 py-2">
        <div className="flex items-center gap-2 relative">
          <Button
            onClick={promptInstall}
            className="flex-1 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            📱 Install App
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInstallHelp(true)}
            className="h-10 w-10 text-white hover:bg-blue-600"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          {/* Mobile Pointer */}
          {showInstallPointer && (
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg text-sm z-50 animate-bounce whitespace-nowrap">
              👆 Install app
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-popover"></div>
            </div>
          )}
        </div>
      </div>
    )}
    
    <nav ref={navRef} className={`fixed left-0 right-0 z-40 bg-background border-b border-border ${(isInstallable || !isInstalled) && !isInstalled ? 'md:top-0 top-14' : 'top-0'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl font-light tracking-wide border border-foreground px-4 py-1 text-foreground">YANKEE TANGO</div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-4">
            {!user && (
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blog')}
                className="font-light"
              >
                Blog
              </Button>
            )}
            {(isInstallable || !isInstalled) && !isInstalled && (
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={promptInstall}
                    className="font-semibold bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 shadow-md"
                  >
                    📱 Install App
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowInstallHelp(true)}
                    className="h-8 w-8"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Animated Pointer */}
                {showInstallPointer && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-4 py-2 rounded-md shadow-lg text-sm z-50 animate-bounce whitespace-nowrap">
                    👆 Install app
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-popover"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {!loading && (
              user ? (
                <div className="hidden md:flex items-center gap-2 relative">
                  <NotificationBell userId={user.id} />
                  <div ref={dropdownRef} className="relative">
                    <DropdownMenu onOpenChange={() => setShowPointer(false)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 font-light">
                          {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="h-6 w-6 rounded-full object-cover" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          {profile?.display_name || user.email}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          <Settings className="h-4 w-4 mr-2" />
                          Profile & Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {showPointer && (
                      <div className="absolute -bottom-12 right-0 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg text-sm z-50 animate-bounce">
                        You can update your profile here anytime 👆
                        <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-popover"></div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="hidden md:flex items-center gap-2 font-light"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              )
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col space-y-2">
              {!user && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/blog');
                    setIsOpen(false);
                  }}
                  className="justify-start font-light mx-4"
                >
                  Blog
                </Button>
              )}
              {!loading && (
                user ? (
                  <div className="px-4 py-2 border-t border-border mt-2 pt-4 relative">
                    <div className="flex items-center gap-2 mb-3">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                      <div className="flex flex-col flex-1">
                        <span className="text-sm font-light">{profile?.display_name || user.email}</span>
                        <NotificationBell userId={user.id} />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate('/profile');
                        setIsOpen(false);
                        setShowPointer(false);
                      }}
                      className="w-full justify-start font-light mb-2 relative"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Profile & Settings
                      {showPointer && (
                        <div className="absolute -top-10 left-0 right-0 bg-popover text-popover-foreground px-2 py-1 rounded-md shadow-lg text-xs z-50 animate-bounce text-center">
                          Update here anytime 👆
                        </div>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="w-full justify-start font-light"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                    className="mx-4 my-2 font-light"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )
              )}
            </div>
          </div>}
      </div>
    </nav>

    {/* Installation Help Dialog */}
    <AlertDialog open={showInstallHelp} onOpenChange={setShowInstallHelp}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Alternative Installation Methods</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 text-left">
            <div>
              <p className="font-semibold mb-1">📱 iPhone (Safari)</p>
              <p className="text-sm">1. Tap the Share button <span className="inline-block">⎙</span></p>
              <p className="text-sm">2. Scroll down and tap "Add to Home Screen"</p>
              <p className="text-sm">3. Tap "Add" in the top right</p>
            </div>
            
            <div>
              <p className="font-semibold mb-1">🤖 Android (Chrome)</p>
              <p className="text-sm">1. Tap the menu (⋮) in the top right</p>
              <p className="text-sm">2. Tap "Add to Home Screen" or "Install App"</p>
              <p className="text-sm">3. Tap "Add" or "Install"</p>
            </div>
            
            <div>
              <p className="font-semibold mb-1">💻 Desktop (Chrome/Edge)</p>
              <p className="text-sm">1. Look for the install icon (⊕) in the address bar</p>
              <p className="text-sm">2. Or click menu (⋮) → "Install YankeeTango"</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={() => setShowInstallHelp(false)}>
          Got it
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  </>;
};
export default Navigation;