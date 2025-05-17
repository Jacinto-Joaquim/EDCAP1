
    import { useEffect } from 'react';

    export const supabaseSessionManager = (supabase, loadUserProfile, setLoading, setIsAuthenticated, setUser, setUserRole, navigate) => {
      const manageSession = async () => {
        if (!supabase) return;
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          setIsAuthenticated(false);
          setUser(null);
          setUserRole(null);
        } else if (session) {
          await loadUserProfile(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setUserRole(null);
        }
        setLoading(false);
      };

      const onAuthStateChange = () => {
        if (!supabase) return { data: { subscription: null } };
        return supabase.auth.onAuthStateChange(async (event, session) => {
          setLoading(true);
          if (event === 'SIGNED_IN' && session) {
            await loadUserProfile(session.user);
          } else if (event === 'SIGNED_OUT') {
            setIsAuthenticated(false);
            setUser(null);
            setUserRole(null);
            if (navigate) navigate('/painel-edcap-admin-s3cr3t0l0g1n');
          } else if (event === 'USER_UPDATED' && session) {
            await loadUserProfile(session.user, true); 
          } else if (event === 'PASSWORD_RECOVERY') {
            // Handle password recovery if needed, e.g., redirect to a password reset page
            console.log("Password recovery event detected");
          } else if (event === 'TOKEN_REFRESHED') {
            console.log("Token refreshed");
          }
          setLoading(false);
        });
      };
      
      return { manageSession, onAuthStateChange };
    };
  