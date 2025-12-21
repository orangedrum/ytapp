import { Flame, Calendar, TrendingUp } from "lucide-react";
import { usePracticeStats } from "@/hooks/usePracticeZone";
import { useAuth } from "@/components/AuthProvider";
import { useUserLeaderboardPosition } from "@/hooks/useLeaderboard";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PracticeStatsHeader = () => {
  const { user } = useAuth();
  const { data: stats } = usePracticeStats(user?.id);
  const { data: leaderboardData } = useUserLeaderboardPosition(user?.id);
  const { data: profile } = useUserProfile(user?.id);

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 md:p-6 mb-6">
      <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Practice Zone</h1>
      
      <TooltipProvider>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 md:p-4 flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-br from-orange-500/30 to-orange-600/30 p-1.5 md:p-3 rounded-full shrink-0">
              <Flame className="w-4 h-4 md:w-6 md:h-6 text-orange-500 fill-orange-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Current Streak</p>
              <p className="text-base md:text-2xl font-bold whitespace-nowrap">{stats?.current_streak || 0} days</p>
            </div>
          </div>
          
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 md:p-4 flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-br from-primary/30 to-primary/20 p-1.5 md:p-3 rounded-full shrink-0">
              <Calendar className="w-4 h-4 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">This Month</p>
              <p className="text-base md:text-2xl font-bold whitespace-nowrap">{stats?.days_practiced_this_month || 0} days</p>
            </div>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 md:p-4 flex items-center gap-2 md:gap-3 cursor-help">
                <div className="bg-gradient-to-br from-accent/30 to-accent/20 p-1.5 md:p-3 rounded-full shrink-0">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Practice Score</p>
                  <p className="text-base md:text-2xl font-bold whitespace-nowrap">{leaderboardData?.practice_score || 0}%</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Your consistency: percentage of days you've practiced since your first practice session</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      
      {stats && stats.longest_streak > stats.current_streak && (
        <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3 text-center">
          Your best streak: {stats.longest_streak} days 🏆
        </p>
      )}
      
      {profile?.practice_days_last_updated && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Practice score based on schedule from{' '}
          {new Date(profile.practice_days_last_updated).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};