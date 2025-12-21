import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
}

export const WaitlistDialog = ({ open, onOpenChange, trigger }: WaitlistDialogProps) => {
  const handleJoinWaitlist = () => {
    window.open('https://forms.gle/Ectggxgnv81Z2Yir6', '_blank', 'noopener,noreferrer');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-center">
            We're in Pilot Mode! 🎯
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base leading-relaxed pt-2">
            We're currently testing YankeeTango with a select group of dancers 
            to build the ultimate solo tango practice experience.
            <br /><br />
            Want to be first to know when we launch publicly?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="w-full sm:flex-1 min-h-[44px] m-0">
            Maybe Later
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleJoinWaitlist}
            className="w-full sm:flex-1 min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Join the Waitlist
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
