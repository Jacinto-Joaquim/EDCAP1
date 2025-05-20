import { useEffect } from 'react';

export const supabaseSessionManager = (supabase, loadUserProfile, setLoadingAuthState, setIsAuthenticated, setUserState, setUserRoleState, navigate) => {
  const manageSession = async () => {
    if (!supabase) {
        console.error("Supabase client not available in session manager");
        setLoadingAuthState(false);
        return;
    }
    
    setLoadingAuthState(true);
    
    try {
        console.log("Verificando sessão existente...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error("Error fetching session:", error);
            setIsAuthenticated(false);
            setUserState(null);
            setUserRoleState(null);
            return;
        } 
        
        if (session?.user) {
            console.log("Sessão encontrada para:", session.user.email);
            
            // Garantir que o perfil do usuário seja carregado corretamente
            const userProfile = await loadUserProfile(session.user);
            
            if (userProfile) {
                // Definir explicitamente o estado de autenticação
                setIsAuthenticated(true);
                setUserState(session.user);
                
                console.log("Sessão recuperada com sucesso:", session.user.email, "Role:", userProfile.role);
            } else {
                console.warn("Perfil não encontrado para sessão existente:", session.user.email);
                // Não fazer logout automático, apenas manter o estado não autenticado
                setIsAuthenticated(false);
                setUserState(null);
                setUserRoleState(null);
            }
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
    if (!supabase) {
        console.error("Supabase client not available for auth state change");
        return { data: { subscription: null } };
    }
    
    return supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change event:", event);
      
      setLoadingAuthState(true);
      
      try {
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("Usuário conectado:", session.user.email);
          const userProfile = await loadUserProfile(session.user);
          
          if (userProfile) {
            console.log("Perfil carregado após login:", userProfile.email);
          } else {
            console.warn("Falha ao carregar perfil após login");
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("Usuário desconectado");
          setIsAuthenticated(false);
          setUserState(null);
          setUserRoleState(null);
          
          // Navegar para a página de login apenas se o evento for explicitamente SIGNED_OUT
          if (navigate) {
            console.log("Redirecionando para página de login após logout");
            navigate('/painel-edcap-admin-s3cr3t0l0g1n', { replace: true });
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          console.log("Dados do usuário atualizados:", session.user.email);
          await loadUserProfile(session.user, true); 
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("Evento de recuperação de senha detectado");
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("Token atualizado");
        } else if (!session) {
          console.log("Sessão não disponível após evento:", event);
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
