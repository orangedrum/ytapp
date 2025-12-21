import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  rolesLoading: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  isTester: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  rolesLoading: true,
  isAdmin: false,
  isInstructor: false,
  isTester: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isTester, setIsTester] = useState(false);

  const fetchUserRoles = async (userId: string) => {
    console.log('🔍 fetchUserRoles started for userId:', userId);
    setRolesLoading(true);
    
    // Wait for auth context to settle
    await new Promise(resolve => setTimeout(resolve, 150));
    console.log('⏱️ Delay complete, querying user_roles...');
    
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout after 5 seconds')), 5000);
      });
      
      // Create the query promise
      const queryPromise = supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      // Race them
      const { data: roles, error } = await Promise.race([queryPromise, timeoutPromise]);
      
      console.log('🔍 fetchUserRoles response:', { 
        roles, 
        error,
        roleCount: roles?.length || 0 
      });
      
      if (error) {
        console.error('❌ Supabase error in fetchUserRoles:', error);
        throw error;
      }
      
      const userRoles = roles?.map(r => r.role) || [];
      setIsAdmin(userRoles.includes('admin'));
      setIsInstructor(userRoles.includes('instructor'));
      setIsTester(userRoles.includes('tester'));
      
      console.log('🔍 fetchUserRoles completed:', { 
        isAdmin: userRoles.includes('admin'),
        isInstructor: userRoles.includes('instructor'),
        isTester: userRoles.includes('tester')
      });
    } catch (error) {
      console.error('❌ Error in fetchUserRoles:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        userId
      });
      setIsAdmin(false);
      setIsInstructor(false);
      setIsTester(false);
    } finally {
      console.log('🔍 Setting rolesLoading to false');
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 AuthProvider useEffect started');
    let mounted = true;
    
    // Check for existing session first
    const initAuth = async () => {
      try {
        console.log('📋 Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('📋 getSession completed, hasSession:', !!session, 'error:', error);
        
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserRoles(session.user.id);
        } else {
          console.log('⚠️ No session in getSession, setting rolesLoading to false');
          setRolesLoading(false);
        }
        
        console.log('✅ Setting loading to false (getSession)');
        setLoading(false);
      } catch (error) {
        console.error('❌ Error in initAuth:', error);
        if (mounted) {
          setLoading(false);
          setRolesLoading(false);
        }
      }
    };
    
    initAuth();
    
    // Set up auth state listener for future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 onAuthStateChange fired:', event, 'hasSession:', !!session);
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check user roles after state update
        if (session?.user) {
          // Add small delay before fetching roles to let auth context settle
          setTimeout(() => {
            fetchUserRoles(session.user.id);
          }, 150);
        } else {
          console.log('⚠️ No session, setting roles to false');
          setIsAdmin(false);
          setIsInstructor(false);
          setIsTester(false);
          setRolesLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, rolesLoading, isAdmin, isInstructor, isTester }}>
      {children}
    </AuthContext.Provider>
  );
};