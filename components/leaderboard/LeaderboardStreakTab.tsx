import { useAuth } from "@/components/AuthProvider";
import { useStreakLeaderboard } from "@/hooks/useLeaderboard";
import { LeaderboardUserCard } from "./LeaderboardUserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame } from "lucide-react";

export const LeaderboardStreakTab = () => {
  const { user } = useAuth();
  const { data: leaderboard, isLoading } = useStreakLeaderboard();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="text-center py-12">
        <Flame className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Practice Data Yet</h3>
        <p className="text-muted-foreground">
          Start practicing to appear on the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          Streak Leaderboard
        </h2>
        <p className="text-muted-foreground">
          Users ranked by their current practice streak
        </p>
      </div>

      {leaderboard.map((entry, index) => (
        <LeaderboardUserCard
          key={entry.user_id}
          entry={entry}
          rank={index + 1}
          isCurrentUser={entry.user_id === user?.id}
          showPracticeScore={false}
        />
      ))}
    </div>
  );
};
