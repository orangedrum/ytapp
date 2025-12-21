import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { CheckCircle2, Play, X, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/AuthProvider";
import { useLogManualPractice, useRemoveScheduledVideo, useDeletePracticeLog, ScheduledPractice } from "@/hooks/usePracticeZone";
import { usePracticeLogs } from "@/hooks/useUserProgress";
import { getVideoEmbedUrl } from "@/lib/videoUtils";
import { supabase } from "@/integrations/supabase/client";

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface PracticeDaySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  scheduledVideos: ScheduledPractice[];
  isPracticed: boolean;
}

export const PracticeDaySheet = ({
  open,
  onOpenChange,
  date,
  scheduledVideos,
  isPracticed,
}: PracticeDaySheetProps) => {
  const { user } = useAuth();
  const logPractice = useLogManualPractice();
  const removeScheduled = useRemoveScheduledVideo();
  const deletePracticeLog = useDeletePracticeLog();
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string; url: string } | null>(null);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const hasAutoLoggedRef = useRef(false);
  const playerRef = useRef<any>(null);
  const progressCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch practice logs for this specific date
  const { data: allPracticeLogs = [] } = usePracticeLogs(
    user?.id,
    date ? format(date, 'yyyy-MM-dd') : undefined,
    date ? format(date, 'yyyy-MM-dd') : undefined
  );

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Auto-log practice when video reaches 80%
  const checkVideoProgress = () => {
    if (!playerRef.current || !selectedVideo || hasAutoLoggedRef.current || !user?.id || !date) return;
    
    try {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      
      if (currentTime && duration && (currentTime / duration) >= 0.8) {
        hasAutoLoggedRef.current = true;
        
        // Silently log practice without showing any notification
        logPractice.mutate({
          user_id: user.id,
          practice_date: format(date, 'yyyy-MM-dd'),
        });
        
        // Clear the interval
        if (progressCheckIntervalRef.current) {
          clearInterval(progressCheckIntervalRef.current);
          progressCheckIntervalRef.current = null;
        }
      }
    } catch (error) {
      console.error('Error checking video progress:', error);
    }
  };

  // Initialize YouTube player when video dialog opens
  useEffect(() => {
    if (videoDialogOpen && selectedVideo && window.YT && window.YT.Player) {
      // Reset auto-log flag when opening new video
      hasAutoLoggedRef.current = false;
      
      const timer = setTimeout(() => {
        const iframe = document.querySelector('.practice-video-iframe') as HTMLIFrameElement;
        if (iframe) {
          try {
            playerRef.current = new window.YT.Player(iframe, {
              events: {
                onReady: () => {
                  // Check progress every 2 seconds
                  if (!progressCheckIntervalRef.current) {
                    progressCheckIntervalRef.current = setInterval(checkVideoProgress, 2000);
                  }
                },
                onStateChange: (event: any) => {
                  // If video is paused or ended, clear the interval
                  if (event.data === 2 || event.data === 0) {
                    if (progressCheckIntervalRef.current) {
                      clearInterval(progressCheckIntervalRef.current);
                      progressCheckIntervalRef.current = null;
                    }
                  }
                  // If playing, restart the interval
                  if (event.data === 1 && !progressCheckIntervalRef.current) {
                    progressCheckIntervalRef.current = setInterval(checkVideoProgress, 2000);
                  }
                }
              }
            });
          } catch (error) {
            console.error('Error initializing YouTube player:', error);
          }
        }
      }, 500);
      
      return () => {
        clearTimeout(timer);
        if (progressCheckIntervalRef.current) {
          clearInterval(progressCheckIntervalRef.current);
        }
      };
    }
  }, [videoDialogOpen, selectedVideo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressCheckIntervalRef.current) {
        clearInterval(progressCheckIntervalRef.current);
      }
    };
  }, []);

  if (!date) return null;

  // Handle sheet close with confetti if practice was logged
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !hasShownConfetti && allPracticeLogs.length > 0) {
      // Closing sheet and there are practice logs - show confetti!
      setHasShownConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
      });
    }
    
    // Reset confetti flag when opening
    if (newOpen) {
      setHasShownConfetti(false);
    }
    
    onOpenChange(newOpen);
  };

  const handlePracticeToday = () => {
    if (!user?.id) return;
    
    logPractice.mutate({
      user_id: user.id,
      practice_date: format(date, 'yyyy-MM-dd'),
    }, {
      onSuccess: () => {
        // Trigger confetti celebration!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
        });
        onOpenChange(false);
      }
    });
  };

  const handleRemoveVideo = (scheduleId: string) => {
    removeScheduled.mutate(scheduleId);
  };

  const handleWatchVideo = async (videoId: string) => {
    const { data: video } = await supabase
      .from('videos')
      .select('video_url, title')
      .eq('id', videoId)
      .single();
    
    if (video) {
      setSelectedVideo({ id: videoId, title: video.title, url: video.video_url });
      setVideoDialogOpen(true);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{format(date, 'EEEE, MMMM d, yyyy')}</SheetTitle>
          <SheetDescription>
            {isPracticed ? (
              <span className="text-green-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Practice logged for this day!
              </span>
            ) : (
              'Scheduled videos and practice tracking'
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Existing Practice Logs */}
          {allPracticeLogs.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">
                Practice Logged ({allPracticeLogs.length})
              </h3>
              {allPracticeLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Practice logged at {format(new Date(log.created_at), 'h:mm a')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deletePracticeLog.mutate(log.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Scheduled Videos */}
          {scheduledVideos.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">
                Scheduled Videos ({scheduledVideos.length})
              </h3>
              {scheduledVideos.map((scheduled) => (
                <div
                  key={scheduled.id}
                  className="bg-muted/50 rounded-lg p-3 flex items-center gap-3"
                >
                  {scheduled.videos?.thumbnail_url && (
                    <img
                      src={scheduled.videos.thumbnail_url}
                      alt={scheduled.videos.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">
                        {scheduled.videos?.title}
                      </p>
                      {(scheduled as any).auto_generated && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full whitespace-nowrap">
                          🎯 Auto-scheduled
                        </span>
                      )}
                    </div>
                    {scheduled.videos?.duration && (
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(scheduled.videos.duration / 60)} min
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleWatchVideo(scheduled.video_id)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveVideo(scheduled.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No videos scheduled for this day</p>
              <p className="text-sm mt-2">Browse the library to schedule videos</p>
            </div>
          )}

          {/* Manual Practice Button - Prominent CTA */}
          {!isPracticed && (
            <Button
              onClick={handlePracticeToday}
              className="w-full"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              I Practiced Today
            </Button>
          )}
        </div>
      </SheetContent>

      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="aspect-[9/16] w-full">
              <iframe
                src={getVideoEmbedUrl(selectedVideo.url, true)}
                className="practice-video-iframe w-full h-full rounded"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};