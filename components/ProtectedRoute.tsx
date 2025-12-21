import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, rolesLoading, isAdmin, isInstructor, isTester } = useAuth();

  if (loading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Future subscription check will be added here
  // Admins, instructors, and testers will bypass subscription requirements
  // if (!hasActiveSubscription && !isAdmin && !isInstructor && !isTester) {
  //   return <Navigate to="/pricing" replace />;
  // }

  return <>{children}</>;
};
