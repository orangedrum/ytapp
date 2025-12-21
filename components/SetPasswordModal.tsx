import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Lock } from "lucide-react";

interface SetPasswordModalProps {
  open: boolean;
  onComplete: () => void;
  userId: string | undefined;
}

export const SetPasswordModal = ({ open, onComplete, userId }: SetPasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const validatePassword = () => {
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSetPassword = async () => {
    if (!validatePassword() || !userId) return;

    setIsSubmitting(true);
    try {
      // Update the user's password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      // Mark password as set in the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ password_set: true })
        .eq('user_id', userId);

      if (profileError) throw profileError;

      // Force immediate refetch and wait for completion
      await queryClient.refetchQueries({ queryKey: ['profile', userId] });

      // Give React a moment to update
      await new Promise(resolve => setTimeout(resolve, 100));

      toast({
        title: "Password set successfully",
        description: "Welcome to Yankee Tango! Let's get you set up.",
      });

      onComplete();
    } catch (error: any) {
      console.error('Error setting password:', error);
      toast({
        title: "Error setting password",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">Set Your Password</DialogTitle>
          <DialogDescription className="text-center">
            Welcome to Yankee Tango! Please create a secure password to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <Button 
          onClick={handleSetPassword} 
          disabled={isSubmitting || !password || !confirmPassword}
          className="w-full"
        >
          {isSubmitting ? "Setting password..." : "Continue"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
