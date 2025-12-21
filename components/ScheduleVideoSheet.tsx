import { useState } from "react";
import { format, addDays, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/components/AuthProvider";
import { useScheduleVideo } from "@/hooks/usePracticeZone";
import { cn } from "@/lib/utils";

interface ScheduleVideoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
  videoTitle: string;
}

export const ScheduleVideoSheet = ({
  open,
  onOpenChange,
  videoId,
  videoTitle,
}: ScheduleVideoSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { user } = useAuth();
  const scheduleVideo = useScheduleVideo();

  const handleQuickSchedule = (daysFromNow: number) => {
    const date = addDays(startOfDay(new Date()), daysFromNow);
    setSelectedDate(date);
  };

  const handleSchedule = () => {
    if (!user?.id || !selectedDate) return;

    scheduleVideo.mutate({
      user_id: user.id,
      video_id: videoId,
      scheduled_date: format(selectedDate, 'yyyy-MM-dd'),
    });

    onOpenChange(false);
    setSelectedDate(undefined);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Schedule Video</SheetTitle>
          <SheetDescription className="line-clamp-2">
            {videoTitle}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Quick Schedule Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quick Schedule</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSchedule(0)}
                className={cn(
                  selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'bg-primary text-primary-foreground'
                    : ''
                )}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSchedule(1)}
                className={cn(
                  selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(addDays(new Date(), 1), 'yyyy-MM-dd')
                    ? 'bg-primary text-primary-foreground'
                    : ''
                )}
              >
                Tomorrow
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSchedule(6)}
                className={cn(
                  selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(addDays(new Date(), 6), 'yyyy-MM-dd')
                    ? 'bg-primary text-primary-foreground'
                    : ''
                )}
              >
                Next Week
              </Button>
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Or pick a date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < startOfDay(new Date())}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Schedule Button */}
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || scheduleVideo.isPending}
            className="w-full"
            size="lg"
          >
            {scheduleVideo.isPending ? 'Scheduling...' : 'Schedule Video'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};