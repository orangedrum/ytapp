import { useAuth } from "@/components/AuthProvider";
import { usePracticeScoreLeaderboard } from "@/hooks/useLeaderboard";
import { LeaderboardUserCard } from "./LeaderboardUserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export const LeaderboardScoreTab = () => {
  const { user } = useAuth();
  const { data: leaderboard, isLoading } = usePracticeScoreLeaderboard();

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
        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
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
          <TrendingUp className="w-6 h-6 text-primary" />
          Practice Score Leaderboard
        </h2>
        <p className="text-muted-foreground">
          Users ranked by consistency (% of days practiced since starting)
        </p>
      </div>

      {leaderboard.map((entry, index) => (
        <LeaderboardUserCard
          key={entry.user_id}
          entry={entry}
          rank={index + 1}
          isCurrentUser={entry.user_id === user?.id}
          showPracticeScore={true}
        />
      ))}
    </div>
  );
};
