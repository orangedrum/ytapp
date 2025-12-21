import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { usePracticePartners, useUserLeaderboardPosition } from "@/hooks/useLeaderboard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PracticePartners = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: currentUserStats } = useUserLeaderboardPosition(user?.id);
  const { data: userProfile } = useUserProfile(user?.id);
  const { data: partners, isLoading } = usePracticePartners(user?.id);

  // Force cache invalidation when component mounts
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['practice-partners', user?.id] });
  }, [queryClient, user?.id]);

  // Force cache invalidation when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        queryClient.invalidateQueries({ queryKey: ['practice-partners', user?.id] });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [queryClient, user?.id]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!currentUserStats) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Start Practicing First</h3>
        <p className="text-muted-foreground">
          Complete some practice sessions to find your practice partners!
        </p>
      </div>
    );
  }

  if (!partners || partners.length === 0) {
    // Check if user hasn't set their dance role
    if (!userProfile?.dance_role) {
      return (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Set Your Dance Role</h3>
          <p className="text-muted-foreground mb-2">
            To find practice partners, please set your dance role preference in your profile settings.
          </p>
          <p className="text-sm text-muted-foreground">
            Choose Leader, Follower, or Both to get matched with compatible partners!
          </p>
        </div>
      );
    }
    
    // Original "No Partners Found Yet" message for users with role set
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Partners Found Yet</h3>
        <p className="text-muted-foreground mb-2">
          Your practice score: {currentUserStats.practice_score}%
        </p>
        <p className="text-sm text-muted-foreground">
          Keep practicing! We'll find partners in your area with compatible dance roles, matching skill level, and similar practice scores
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Your Practice Partners
        </h2>
        <p className="text-muted-foreground">
          Compatible dancers in your area with matching skill level and similar practice scores ({currentUserStats.practice_score}%)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {partners.map((partner) => (
          <Card key={partner.user_id} className="hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {partner.display_name || "Anonymous"}
                </CardTitle>
                {partner.practice_score >= 80 && (
                  <Star className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <CardDescription>
                Practice score: {partner.practice_score}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dance Role</span>
                  <Badge variant="outline">{partner.dance_role || "Not set"}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <Badge variant="outline">{partner.location || "Not set"}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Streak</span>
                  <Badge variant="secondary">{partner.current_streak} days</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Practice Days</span>
                  <Badge variant="secondary">{partner.total_days_practiced}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Practice Score</span>
                  <Badge variant="secondary">{partner.practice_score}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
