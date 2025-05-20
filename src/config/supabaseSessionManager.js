
    import { useEffect } from 'react';

    export const supabaseSessionManager = (supabase, loadUserProfile, setLoadingAuthState, setIsAuthenticated, setUserState, setUserRoleState, navigate) => {
      const manageSession = async () => {
        if (!supabase) {
            setLoadingAuthState(false);
            return;
        }
        setLoadingAuthState(true);
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
                setIsAuthenticated(false);
                setUserState(null);
                setUserRoleState(null);
            } else if (session) {
                // Garantir que o perfil do usuário seja carregado corretamente
                await loadUserProfile(session.user);
                
                // Definir explicitamente o estado de autenticação
                setIsAuthenticated(true);
                setUserState(session.user);
                
                console.log("Sessão recuperada com sucesso:", session.user.email);
            } else {
                console.log("Nenhuma sessão ativa encontrada");
                setIsAuthenticated(false);
                setUserState(null);
                setUserRoleState(null);
            }
        } catch (e) {
            console.error("Unexpected error in manageSession:", e);
            setIsAuthenticated(false);
            setUserState(null);
            setUserRoleState(null);
        } finally {
            setLoadingAuthState(false);
        }
      };

      const onAuthStateChange = () => {
        if (!supabase) return { data: { subscription: null } };
        
        return supabase.auth.onAuthStateChange(async (event, session) => {
          setLoadingAuthState(true);
          try {
            if (event === 'SIGNED_IN' && session) {
              await loadUserProfile(session.user);
            } else if (event === 'SIGNED_OUT') {
              setIsAuthenticated(false);
              setUserState(null);
              setUserRoleState(null);
              if (navigate) navigate('/painel-edcap-admin-s3cr3t0l0g1n');
            } else if (event === 'USER_UPDATED' && session) {
              await loadUserProfile(session.user, true); 
            } else if (event === 'PASSWORD_RECOVERY') {
              console.log("Password recovery event detected");
            } else if (event === 'TOKEN_REFRESHED') {
              console.log("Token refreshed");
            } else if (!session) {
                setIsAuthenticated(false);
                setUserState(null);
                setUserRoleState(null);
            }
          } catch (e) {
            console.error("Unexpected error in onAuthStateChange handler:", e);
            setIsAuthenticated(false);
            setUserState(null);
            setUserRoleState(null);
          } finally {
            setLoadingAuthState(false);
          }
        });
      };
      
      return { manageSession, onAuthStateChange };
    };
  