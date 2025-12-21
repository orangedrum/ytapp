import { LeaderboardEntry } from "@/hooks/useLeaderboard";
import { Flame, Trophy, Star, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSendCheer, useHasCheeredToday } from "@/hooks/useCheers";
import { useAuth } from "@/components/AuthProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LeaderboardUserCardProps {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
  showPracticeScore?: boolean;
}

export const LeaderboardUserCard = ({
  entry,
  rank,
  isCurrentUser,
  showPracticeScore = false,
}: LeaderboardUserCardProps) => {
  const { user } = useAuth();
  const sendCheer = useSendCheer();
  const { data: hasCheeredToday } = useHasCheeredToday(entry.user_id);

  const handleCheer = () => {
    console.log('🎯 Cheer button tapped!', { userId: entry.user_id, displayName: entry.display_name });
    if (!entry.user_id) return;
    
    sendCheer.mutate({
      receiverId: entry.user_id,
      receiverName: entry.display_name || 'Anonymous Dancer',
    });
  };

  const handleCheerTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasCheeredToday && !sendCheer.isPending && entry.user_id) {
      console.log('🎯 Touch cheer triggered!', { userId: entry.user_id });
      handleCheer();
    }
  };

  const getRankDisplay = () => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}`;
  };

  const getRankColor = () => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-600";
    if (rank <= 10) return "text-primary";
    return "text-muted-foreground";
  };

  const isGoldAchiever = entry.practice_score >= 80;

  const getBadgeWithTooltip = () => {
    if (isGoldAchiever) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="cursor-pointer touch-manipulation inline-block">
              <Star className="w-5 h-5 text-black drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Practice Score: 80%+</p>
          </TooltipContent>
        </Tooltip>
      );
    }
    if (entry.current_streak >= 7) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="cursor-pointer touch-manipulation inline-block">
              <Flame className="w-4 h-4 text-orange-500 pointer-events-none" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Streak: 7+ days</p>
          </TooltipContent>
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "p-2 transition-all hover:shadow-md",
          isCurrentUser && "ring-2 ring-primary bg-primary/5",
          isGoldAchiever && "bg-gradient-to-r from-yellow-300 to-amber-400 border-amber-500 hover:shadow-xl hover:shadow-yellow-400/60"
        )}
      >
      <div className="flex items-center gap-2">
        {/* Rank */}
        <div className={cn("text-xl font-bold w-6 text-center shrink-0", getRankColor())}>
          {getRankDisplay()}
        </div>

        {/* Profile Photo */}
        <div className="shrink-0">
          {entry.avatar_url ? (
            <img 
              src={entry.avatar_url} 
              alt={entry.display_name || "User"} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm truncate">
              {entry.display_name || "Anonymous"}
            </h3>
            {isCurrentUser && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                You
              </span>
            )}
            {getBadgeWithTooltip()}
          </div>
          {entry.total_cheers_received > 0 && (
            <div className="text-xs text-muted-foreground">
              {entry.total_cheers_received} {entry.total_cheers_received === 1 ? 'cheer' : 'cheers'} 👏
            </div>
          )}
        </div>

        {/* Stats Badge and Cheer Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            {showPracticeScore ? (
              <div>
                <div className="text-2xl font-bold text-primary">
                  {entry.practice_score ?? 0}%
                </div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-primary flex items-center gap-1 justify-end">
                  <Flame className="w-5 h-5 text-orange-500" />
                  {entry.current_streak ?? 0}
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            )}
          </div>
          
          <div className="w-[44px] flex justify-center">
            {!isCurrentUser && user && (
              <Button
                size="sm"
                variant={hasCheeredToday ? "outline" : "default"}
                onClick={handleCheer}
                onTouchEnd={handleCheerTouchEnd}
                disabled={hasCheeredToday || sendCheer.isPending}
                className="text-base px-2 touch-manipulation active:scale-95 transition-transform"
              >
                {hasCheeredToday ? '✓' : '👏'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
    </TooltipProvider>
  );
};
