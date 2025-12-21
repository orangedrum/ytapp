import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface CompleteProfileModalProps {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export const CompleteProfileModal = ({ userId, displayName, avatarUrl }: CompleteProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPointer, setShowPointer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const firstLoginKey = `first_login_timestamp_${userId}`;
    const dismissedUntil = localStorage.getItem(`profile_reminder_dismissed_${userId}`);
    
    // Store first login timestamp if it doesn't exist
    let firstLoginTimestamp = localStorage.getItem(firstLoginKey);
    if (!firstLoginTimestamp) {
      firstLoginTimestamp = Date.now().toString();
      localStorage.setItem(firstLoginKey, firstLoginTimestamp);
      return; // Don't show on very first login
    }
    
    // Calculate time since first login (in hours)
    const hoursSinceFirstLogin = (Date.now() - parseInt(firstLoginTimestamp)) / (1000 * 60 * 60);
    
    // Check if we should show the modal (after 24 hours and profile incomplete)
    if (hoursSinceFirstLogin >= 24 && (!displayName || !avatarUrl)) {
      // Check if dismissed and not expired
      if (dismissedUntil) {
        const dismissedDate = new Date(dismissedUntil);
        const now = new Date();
        if (now < dismissedDate) {
          return; // Still within dismissal period
        }
      }
      
      // Wait a bit after login to show modal
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [userId, displayName, avatarUrl]);

  const handleCompleteProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleMaybeLater = () => {
    setIsOpen(false);
    setShowPointer(true);
    
    // Set dismissal for 7 days
    const dismissUntil = new Date();
    dismissUntil.setDate(dismissUntil.getDate() + 7);
    localStorage.setItem(`profile_reminder_dismissed_${userId}`, dismissUntil.toISOString());
    
    // Dispatch custom event to show pointer
    window.dispatchEvent(new CustomEvent('showProfilePointer'));
    
    // Hide pointer after 10 seconds
    setTimeout(() => {
      setShowPointer(false);
    }, 10000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            Help others recognize you! 👋
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Adding a name and photo makes the community more personal and helps you connect with fellow dancers on the leaderboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleCompleteProfile} className="w-full">
            Complete Profile
          </Button>
          <Button onClick={handleMaybeLater} variant="outline" className="w-full">
            Maybe Later
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          We'll remind you again in 7 days if your profile is still incomplete
        </p>
      </DialogContent>
    </Dialog>
  );
};
