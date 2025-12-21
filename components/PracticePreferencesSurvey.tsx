import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { format, startOfWeek } from "date-fns";

interface PracticePreferencesSurveyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const DAYS = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];

export const PracticePreferencesSurvey = ({ open, onOpenChange, userId }: PracticePreferencesSurveyProps) => {
  const [danceRole, setDanceRole] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [practiceDays, setPracticeDays] = useState<string[]>(['tuesday', 'thursday']);
  const [instructionalDays, setInstructionalDays] = useState<string[]>(['tuesday']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Auto-select beginner on mount
  useEffect(() => {
    if (!skillLevel) {
      setSkillLevel("beginner");
    }
  }, []);

  const handlePracticeDayToggle = (day: string) => {
    setPracticeDays(prev => {
      const newDays = prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day];
      
      // If day is removed from practice days, also remove from instructional days
      if (!newDays.includes(day)) {
        setInstructionalDays(inst => inst.filter(d => d !== day));
      }
      
      return newDays;
    });
  };

  const handleInstructionalDayToggle = (day: string) => {
    if (!practiceDays.includes(day)) return; // Can't select if not a practice day
    
    setInstructionalDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!danceRole || !skillLevel) {
      toast.error("Please select your dance role and skill level");
      return;
    }

    if (practiceDays.length === 0) {
      toast.error("Please select at least one practice day");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          dance_role: danceRole,
          skill_level: skillLevel,
          practice_days: practiceDays,
          instructional_days: instructionalDays
        })
        .eq('user_id', userId);

      if (error) throw error;

      // Generate schedule immediately after preferences are set
      const today = new Date();
      const monday = startOfWeek(today, { weekStartsOn: 1 });

      toast.success("Preferences saved! Generating your personalized schedule...");

      const { error: scheduleError } = await supabase.functions.invoke('generate-weekly-schedule', {
        body: {
          user_id: userId,
          week_start_date: format(monday, 'yyyy-MM-dd'),
          force_regenerate: true
        }
      });

      if (scheduleError) {
        console.error('Schedule generation error:', scheduleError);
        toast.error("Preferences saved, but schedule generation failed. Tap the ✨ Refresh button to try again.");
      } else {
        toast.success("Your practice schedule is ready! 🎉");
      }

      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['scheduled-practice'] });
      queryClient.invalidateQueries({ queryKey: ['practice-logs'] });
      queryClient.invalidateQueries({ queryKey: ['check-schedule'] });

      onOpenChange(false);
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error("Failed to save preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Personalize Your Practice</DialogTitle>
          <DialogDescription className="text-base">
            Help us tailor your practice library with videos perfect for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">What role do you dance?</Label>
            <RadioGroup value={danceRole} onValueChange={setDanceRole}>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value="leader" id="leader" />
                <Label htmlFor="leader" className="font-normal cursor-pointer text-base">Leader</Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value="follower" id="follower" />
                <Label htmlFor="follower" className="font-normal cursor-pointer text-base">Follower</Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="font-normal cursor-pointer text-base">Both</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">What's your skill level?</Label>
            <RadioGroup value={skillLevel} onValueChange={setSkillLevel}>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="font-normal cursor-pointer text-base">Beginner</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Which days would you like to practice?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DAYS.map((day) => (
                <div key={day.value} className="flex items-center space-x-2 min-h-[44px]">
                  <Checkbox
                    id={`practice-${day.value}`}
                    checked={practiceDays.includes(day.value)}
                    onCheckedChange={() => handlePracticeDayToggle(day.value)}
                  />
                  <Label 
                    htmlFor={`practice-${day.value}`} 
                    className="font-normal cursor-pointer text-base"
                  >
                    {day.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Which days would you like new instructional videos?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DAYS.map((day) => (
                <div key={day.value} className="flex items-center space-x-2 min-h-[44px]">
                  <Checkbox
                    id={`instructional-${day.value}`}
                    checked={instructionalDays.includes(day.value)}
                    onCheckedChange={() => handleInstructionalDayToggle(day.value)}
                    disabled={!practiceDays.includes(day.value)}
                  />
                  <Label 
                    htmlFor={`instructional-${day.value}`} 
                    className={`font-normal cursor-pointer text-base ${
                      !practiceDays.includes(day.value) ? 'text-muted-foreground' : ''
                    }`}
                  >
                    {day.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
            💡 You can change these preferences anytime in your Profile settings.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto min-h-[44px]"
          >
            Skip for now
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full sm:w-auto min-h-[44px]"
          >
            {isSubmitting ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};