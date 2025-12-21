import { useState } from "react";
import { CheckCircle2, Flame, Sparkles, Trophy, Users, MessageCircleQuestion, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePWAInstall } from "@/hooks/usePWAInstall";

interface PracticeOnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
}

export const PracticeOnboardingModal = ({
  open,
  onOpenChange,
  onClose,
}: PracticeOnboardingModalProps) => {
  const [step, setStep] = useState(0);
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();

  const steps = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Welcome to YankeeTango! 🎯",
      description: "Your personalized platform for growing your Argentine Tango skills without a partner. Let's take a quick tour!",
    },
    {
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      title: "Track Progress & Build Your Streak 🔥",
      description: "Set up a practice schedule and watch videos to raise your practice score. Practice daily to build your streak! Miss 2 consecutive days and your streak resets. Consistency is key to building a healthy practice habit.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Compete on the Leaderboard",
      description: "See how you rank against other dancers! Track your position by practice score and streak length. Friendly competition keeps you motivated.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Connect with Practice Partners",
      description: "Discover dancers near you with similar skill levels and goals. Build your tango community and find accountability partners.",
    },
    {
      icon: <MessageCircleQuestion className="w-8 h-8 text-purple-500" />,
      title: "Ask Questions & Learn",
      description: "Stuck on a technique? Ask questions in our Q&A forum and get answers from instructors and experienced dancers in the community.",
    },
    {
      icon: <Settings className="w-8 h-8 text-gray-500" />,
      title: "Personalize Your Experience",
      description: "Set your dance role, skill level, practice days, and instructional video preferences. We'll customize your library and help you find the right practice partners.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "Refresh Your Schedule ✨",
      description: "Want different videos this week? Tap the ✨ Refresh button at the top of your practice calendar. We'll shuffle in fresh content while keeping your practice days and preferences.",
    },
    {
      icon: <Download className="w-8 h-8 text-blue-500" />,
      title: "Install the App! 📱",
      description: "Ready to start practicing? Install YankeeTango on your device for the best experience. Get offline access and app-like performance!",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('practice-onboarding-seen', 'true');
      onOpenChange(false);
      if (onClose) {
        onClose();
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      localStorage.setItem('practice-onboarding-seen', 'true');
      
      // Show install pointer if app is installable and not installed
      if (isInstallable && !isInstalled) {
        setTimeout(() => {
          window.dispatchEvent(new Event('showInstallPointer'));
        }, 300);
      }
      
      if (onClose) {
        onClose();
      }
    }
    onOpenChange(open);
  };


  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="w-[90vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl">
            Welcome to Yankee Tango!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Here's a quick tour:
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <div className="bg-muted/50 p-4 rounded-full">
            {steps[step].icon}
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold px-2">
            {steps[step].title}
          </h3>
          
          <p className="text-muted-foreground text-base leading-relaxed px-4">
            {steps[step].description}
          </p>
          
          {/* Install button on last step */}
          {step === 7 && (
            <div className="w-full px-4 pt-2">
              {isInstallable && !isInstalled ? (
                <Button
                  onClick={promptInstall}
                  className="w-full min-h-[56px] text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  <Download className="w-6 h-6 mr-2" />
                  Install App Now
                </Button>
              ) : isInstalled ? (
                <div className="text-center py-4 text-green-600 font-semibold text-lg">
                  ✅ App Already Installed!
                </div>
              ) : null}
            </div>
          )}
          
          {/* Progress indicator */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <p className="text-xs text-muted-foreground">Step {step + 1} of {steps.length}</p>
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === step ? 'bg-primary scale-110' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleNext} 
            className="w-full min-h-[44px]"
          >
            {step < steps.length - 1 ? 'Next' : 'Complete Tour'}
          </Button>
          <Button 
            variant="ghost" 
            onClick={handlePrevious} 
            disabled={step === 0}
            className="w-full min-h-[44px]"
          >
            Previous
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};