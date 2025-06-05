import { useEffect } from 'react';

export const supabaseSessionManager = (supabase, loadUserProfile, setLoadingAuthState, setIsAuthenticated, setUserState, setUserRoleState, navigate) => {
  const manageSession = async () => {
    if (!supabase) {
        console.error("[SupabaseSessionManager] manageSession: Supabase client not available.");
        setLoadingAuthState(false);
        console.log("[SupabaseSessionManager] manageSession: setLoadingAuthState(false) due to no Supabase client.");
        return;
    }
    
    console.log("[SupabaseSessionManager] manageSession: Iniciando. setLoadingAuthState(true).");
    setLoadingAuthState(true);
    
    try {
        console.log("[SupabaseSessionManager] manageSession: Verificando sessão existente...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error("[SupabaseSessionManager] manageSession: Error fetching session:", error);
            setIsAuthenticated(false);
            setUserState(null);
            setUserRoleState(null);
            // Não há return aqui, o finally cuidará do loading
        } else if (session?.user) {
            console.log("[SupabaseSessionManager] manageSession: Sessão encontrada para:", session.user.email);
            
            const userProfile = await loadUserProfile(session.user);
            
            if (userProfile) {
                setIsAuthenticated(true);
                setUserState(session.user);
                // setUserRoleState é definido dentro de loadUserProfile
                console.log("[SupabaseSessionManager] manageSession: Sessão recuperada com sucesso:", session.user.email, "Role:", userProfile.role);
            } else {
                console.warn("[SupabaseSessionManager] manageSession: Perfil não encontrado para sessão existente:", session.user.email);
                setIsAuthenticated(false);
                setUserState(null);
                setUserRoleState(null);
            }
        } else {
            console.log("[SupabaseSessionManager] manageSession: Nenhuma sessão ativa encontrada.");
            setIsAuthenticated(false);
            setUserState(null);
            setUserRoleState(null);
        }
    } catch (e) {
        console.error("[SupabaseSessionManager] manageSession: Unexpected error:", e);
        setIsAuthenticated(false);
        setUserState(null);
        setUserRoleState(null);
    } finally {
        console.log("[SupabaseSessionManager] manageSession: Bloco finally. setLoadingAuthState(false).");
        setLoadingAuthState(false);
    }
  };

  const onAuthStateChange = () => {
    if (!supabase) {
        console.error("[SupabaseSessionManager] onAuthStateChange: Supabase client not available.");
        return { data: { subscription: null } }; // Retornar um objeto compatível
    }
    
    return supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[SupabaseSessionManager] onAuthStateChange: Evento: ${event}.`);
      
      console.log("[SupabaseSessionManager] onAuthStateChange: setLoadingAuthState(true).");
      setLoadingAuthState(true);
      
      try {
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("[SupabaseSessionManager] onAuthStateChange: Usuário conectado:", session.user.email);
          const userProfile = await loadUserProfile(session.user);
          
          if (userProfile) {
            console.log("[SupabaseSessionManager] onAuthStateChange: Perfil carregado após SIGNED_IN:", userProfile.email);
            // Estados de autenticação e usuário já são definidos por loadUserProfile
          } else {
            console.warn("[SupabaseSessionManager] onAuthStateChange: Falha ao carregar perfil após SIGNED_IN.");
            // Considerar se é necessário redefinir estados de autenticação aqui
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("[SupabaseSessionManager] onAuthStateChange: Usuário desconectado.");
          setIsAuthenticated(false);
          setUserState(null);
          setUserRoleState(null);
          
          if (navigate) {
            console.log("[SupabaseSessionManager] onAuthStateChange: Redirecionando para página de login após SIGNED_OUT.");
            navigate('/painel-edcap-admin-s3cr3t0l0g1n', { replace: true });
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          console.log("[SupabaseSessionManager] onAuthStateChange: Dados do usuário atualizados:", session.user.email);
          await loadUserProfile(session.user, true); // Forçar recarregamento do perfil
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("[SupabaseSessionManager] onAuthStateChange: Evento de recuperação de senha detectado.");
          // Geralmente não altera o estado de loading ou autenticação diretamente
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("[SupabaseSessionManager] onAuthStateChange: Token atualizado.");
          // Geralmente não altera o estado de loading ou autenticação diretamente
        } else if (!session) {
          // Este caso pode ocorrer para eventos como INITIAL_SESSION se não houver sessão,
          // ou após um logout se o evento SIGNED_OUT não for o último.
          console.log(`[SupabaseSessionManager] onAuthStateChange: Sessão não disponível após evento ${event}.`);
          // Se não há sessão, garantir que o usuário não está autenticado.
          // Evitar chamar setLoadingAuthState(false) aqui se outro evento mais específico já o fez ou fará.
          // A lógica de `loadUserProfile` e o `finally` devem cobrir a maioria dos casos.
        }
      } catch (e) {
        console.error("[SupabaseSessionManager] onAuthStateChange: Unexpected error in handler:", e);
        setIsAuthenticated(false);
        setUserState(null);
        setUserRoleState(null);
      } finally {
        console.log(`[SupabaseSessionManager] onAuthStateChange: Bloco finally para evento ${event}. setLoadingAuthState(false).`);
        setLoadingAuthState(false);
      }
    });
  };
  
  return { manageSession, onAuthStateChange };
};
